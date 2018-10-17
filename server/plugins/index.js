const {
  makeExtendSchemaPlugin,
  gql,
} = require('graphile-utils');
import axios from 'axios';
const SCARPER_URL = 'http://138.197.8.61:8002/api/product';

export const RegisterProductMutationPlugin =
makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      input RegisterProductInput {
        uri: String!
      }

      type RegisterProductPayload {
        product: Product @recurseDataGenerators
      }

      extend type Mutation {
        registerProduct(input: RegisterProductInput!):
          RegisterProductPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerProduct: async (
          _query,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) => {
          const { pgClient } = context;
          const { uri } = args.input;
          // Start a sub-transaction
          await pgClient.query('SAVEPOINT graphql_mutation');
          try {
            // Get the product values
            console.log('begin_scrape');
            const { data: { product : { imageUri, title, description, price } } } = await axios.post(SCARPER_URL, { product: { uri }});

            console.log('end_scrape');
            const image_uri = imageUri;
            // Our custom logic to register the product:
            const { rows: [product] } = await pgClient.query(
              `INSERT INTO babelpack.product(
                uri, image_uri, title, description, price
              ) VALUES ($1, $2, $3, $4, $5)
              RETURNING *`,
              [
                args.input.uri,
                image_uri,
                title,
                description,
                price
              ]
            );

            // Now we fetch the result that the GraphQL
            // client requested, using the new product
            // account as the source of the data.
            const [row] =
              await selectGraphQLResultFromTable(
                sql.fragment`babelpack.product`,
                (tableAlias, sqlBuilder) => {
                  sqlBuilder.where(
                    sql.fragment`${tableAlias}.id = ${
                      sql.value(product.id)
                    }`
                  );
                }
              );

            // Success! Write the product to the database.
            await pgClient.query('RELEASE SAVEPOINT graphql_mutation');

            // We pass the fetched result via the
            // `product` field to match the
            // @recurseDataGenerators directive
            // used above. GraphQL mutation
            // payloads typically have additional
            // fields.
            return {
              product: row,
            };
          } catch (e) {
            // Oh noes! If at first you don't succeed,
            // destroy all evidence you ever tried.
            await pgClient.query('ROLLBACK TO SAVEPOINT graphql_mutation');
            throw e;
          }
        },
      },
    },
  };
});

export const RegisterProductAndCreatePackItemMutationPlugin =
makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      input RegisterProductAndCreatePackItemInput {
        uri: String!
        packId: Int
        babelId: Int
      }

      type RegisterProductAndCreatePackItemPayload {
        packItem: PackItem @recurseDataGenerators
      }

      extend type Mutation {
        registerProductAndCreatePackItem(input: RegisterProductAndCreatePackItemInput!):
          RegisterProductAndCreatePackItemPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerProductAndCreatePackItem: async (
          _query,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) => {
          const { pgClient } = context;
          let { uri, packId, babelId } = args.input;
          // Start a sub-transaction
          await pgClient.query('SAVEPOINT graphql_mutation');
          try {
            if (!babelId && !packId) {
              throw new Error('babelId or packId is required');
            }

            if (!packId) {
              const { rows: [pack] } = await pgClient.query(
                `INSERT INTO babelpack.pack(
                  babel_id
                ) VALUES ($1)
                RETURNING *`,
                [
                  babelId
                ]
              );

              packId = pack.id;
            }
            // Get the product values
            console.log('begin_scrape');
            const { data: { product : { imageUri, title, description, price } } } = await axios.post(SCARPER_URL, {product: { uri }});
            console.log('end_scrape');
            const image_uri = imageUri;
            const pack_id = packId;
            // Our custom logic to register the product:
            const { rows: [product] } = await pgClient.query(
              `INSERT INTO babelpack.product(
                uri, image_uri, title, description, price
              ) VALUES ($1, $2, $3, $4, $5)
              RETURNING *`,
              [
                args.input.uri,
                image_uri,
                title,
                description,
                price
              ]
            );

            const product_id = product.id;

            const { rows: [packItem] } = await pgClient.query(
              `INSERT INTO babelpack.pack_item(
                product_id, pack_id
              ) VALUES ($1, $2)
              RETURNING *`,
              [
                product_id,
                pack_id
              ]
            );

            console.log(packItem);

            // Now we fetch the result that the GraphQL
            // client requested, using the new product
            // account as the source of the data.
            const [row] =
              await selectGraphQLResultFromTable(
                sql.fragment`babelpack.pack_item`,
                (tableAlias, sqlBuilder) => {
                  sqlBuilder.where(
                    sql.fragment`${tableAlias}.id = ${
                      sql.value(packItem.id)
                    }`
                  );
                }
              );

              console.log(row);

            // Success! Write the product to the database.
            await pgClient.query('RELEASE SAVEPOINT graphql_mutation');

            // We pass the fetched result via the
            // `product` field to match the
            // @recurseDataGenerators directive
            // used above. GraphQL mutation
            // payloads typically have additional
            // fields.
            return {
              packItem: row,
            };
          } catch (e) {
            // Oh noes! If at first you don't succeed,
            // destroy all evidence you ever tried.
            await pgClient.query('ROLLBACK TO SAVEPOINT graphql_mutation');
            throw e;
          }
        },
      },
    },
  };
});

export const RegisterBabelTagMutationPlugin =
makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      input RegisterBabelTagInput {
        text: String!
        babelId: Int!
      }

      type RegisterBabelTagPayload {
        babelTag: BabelTag @recurseDataGenerators
      }

      extend type Mutation {
        registerBabelTag(input: RegisterBabelTagInput!):
          RegisterBabelTagPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerBabelTag: async (
          _query,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) => {
          const { pgClient } = context;
          let { text, babelId } = args.input;

          // Start a sub-transaction
          await pgClient.query('SAVEPOINT graphql_mutation');
          try {
            const { rows: [insertTag] } = await pgClient.query(
              `INSERT INTO babelpack.tag(
                text
              ) VALUES ($1)
              ON CONFLICT (text) DO NOTHING
              RETURNING *`,
              [
                text
              ]
            );

            const { rows: [tag] } = await pgClient.query(
              `SELECT id, text FROM babelpack.tag
              WHERE text = $1
              LIMIT 1`,
              [
                text
              ]
            );

            const { rows: [babelTag] } = await pgClient.query(
              `INSERT INTO babelpack.babel_tag(
                tag_id, babel_id
              ) VALUES ($1, $2)
              RETURNING *`,
              [
                tag.id,
                babelId
              ]
            );

            // Now we fetch the result that the GraphQL
            // client requested, using the new product
            // account as the source of the data.
            const [row] =
              await selectGraphQLResultFromTable(
                sql.fragment`babelpack.babel_tag`,
                (tableAlias, sqlBuilder) => {
                  sqlBuilder.where(
                    sql.fragment`${tableAlias}.id = ${
                      sql.value(babelTag.id)
                    }`
                  );
                }
              );

              console.log(row);

            // Success! Write the product to the database.
            await pgClient.query('RELEASE SAVEPOINT graphql_mutation');

            // We pass the fetched result via the
            // `product` field to match the
            // @recurseDataGenerators directive
            // used above. GraphQL mutation
            // payloads typically have additional
            // fields.
            return {
              babelTag: row,
            };
          } catch (e) {
            // Oh noes! If at first you don't succeed,
            // destroy all evidence you ever tried.
            await pgClient.query('ROLLBACK TO SAVEPOINT graphql_mutation');
            throw e;
          }
        },
      },
    },
  };
});
