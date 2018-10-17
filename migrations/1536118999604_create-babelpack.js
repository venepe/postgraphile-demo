exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createSchema('babelpack');

  pgm.createTable({schema: 'babelpack', name: 'babel'}, {
   id: 'id',
   telos: { type: 'varchar(500)', notNull: true },
   uri: { type: 'varchar' },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createIndex({schema: 'babelpack', name: 'babel'}, 'telos');

  pgm.createTable({schema: 'babelpack', name: 'product'}, {
   id: 'id',
   uri: { type: 'varchar', notNull: true },
   image_uri: { type: 'varchar' },
   title: { type: 'varchar' },
   description: { type: 'varchar' },
   price: { type: 'varchar' },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createTable({schema: 'babelpack', name: 'pack'}, {
   id: 'id',
   babel_id: {
     type: 'integer',
     notNull: true,
     references: 'babelpack.babel ON DELETE CASCADE',
   },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createTable({schema: 'babelpack', name: 'pack_item'}, {
   id: 'id',
   product_id: {
     type: 'integer',
     notNull: true,
     references: 'babelpack.product',
   },
   pack_id: {
     type: 'integer',
     notNull: true,
     references: 'babelpack.pack ON DELETE CASCADE',
   },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createTable({schema: 'babelpack', name: 'tag'}, {
   id: 'id',
   text: { type: 'varchar(90)', notNull: true, unique: true },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createIndex({schema: 'babelpack', name: 'tag'}, 'text');

  pgm.createTable({schema: 'babelpack', name: 'babel_tag'}, {
   id: 'id',
   tag_id: {
     type: 'integer',
     notNull: true,
     references: {schema: 'babelpack', name: 'tag'}
   },
   babel_id: {
     type: 'integer',
     notNull: true,
     references: 'babelpack.babel ON DELETE CASCADE',
   },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createFunction(
    {schema: 'babelpack', name: 'search_babels'},
    [{name: 'search', type: 'text'}],
    {returns: 'setof babelpack.babel', language: 'sql', behavior: 'stable'},
    " select babel.* from babelpack.babel as babel left outer join babelpack.babel_tag as babel_tag ON babel.id = babel_tag.babel_id left outer join babelpack.tag as tag ON tag.id = babel_tag.tag_id where babel.telos ilike ('%' || search || '%') or tag.text ilike ('%' || search || '%') group by babel.id "
  );

  pgm.createFunction(
    {schema: 'babelpack', name: 'trending_tags'},
    [],
    {returns: 'setof babelpack.tag', language: 'sql', behavior: 'stable'},
    " select tag.* from babelpack.tag as tag left outer join babelpack.babel_tag as babel_tag ON tag.id = babel_tag.tag_id left outer join babelpack.babel as babel ON babel.id = babel_tag.babel_id group by tag.id order by count(*) desc "
  );

  pgm.createFunction(
    {schema: 'babelpack', name: 'trending_babels'},
    [],
    {returns: 'setof babelpack.babel', language: 'sql', behavior: 'stable'},
    " select babel.* from babelpack.babel as babel inner join babelpack.pack as pack ON babel.id = pack.babel_id group by babel.id order by babel.created_at desc "
  );
};

exports.down = (pgm) => {

};
