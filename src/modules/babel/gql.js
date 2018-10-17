import gql from 'graphql-tag'
import { BabelCard, PackItemsHorizontalList, CreatePackButton } from 'components'

export const TRENDING_BABELS = gql`
  query trendingBabels($first: Int, $after: Cursor) {
    trendingBabels(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...BabelCard
        }
      }
    }
  }
  ${BabelCard.fragments.babel}
`

export const PACKLESS_BABELS = gql`
  query packlessBabels($first: Int, $after: Cursor) {
    packlessBabels(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...BabelCard
        }
      }
    }
  }
  ${BabelCard.fragments.babel}
`

export const SEARCH_BABELS = gql`
  query searchBabels($search: String, $first: Int, $after: Cursor) {
    searchBabels(search: $search, first: $first, after: $after) {
      edges {
        node {
          ...BabelCard
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${BabelCard.fragments.babel}
`

export const TAGGED_BABELS = gql`
  query tagByText($text: String!, $first: Int, $after: Cursor) {
    tagByText(text: $text) {
      text
      babelTagsByTagId(first: $first, after: $after) {
        edges {
          node {
            babelByBabelId {
              ...BabelCard
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${BabelCard.fragments.babel}
`

export const BABEL_DETAIL = gql`
  query BabelDetail($id: Int!) {
    babelById(id: $id) {
      ...BabelCard
      ...CreatePackButton
      packsByBabelId (first: 5) {
        edges {
          node {
            id
            packItemsByPackId {
              edges {
                ...PackItemsHorizontalList
              }
            }
          }
        }
      }
    }
  }
  ${BabelCard.fragments.babel}
  ${CreatePackButton.fragments.babel}
  ${PackItemsHorizontalList.fragments.packItems}
`

export const CREATE_BABEL = gql`
  mutation createBabel($input: CreateBabelInput!) {
    createBabel(input: $input) {
      babel {
        id
        telos
        uri
        description
      }
    }
  }
`

export const UPDATE_BABEL = gql`
  mutation updateBabelById($input: UpdateBabelByIdInput!) {
    updateBabelById(input: $input) {
      babel {
        id
        telos
        uri
        description
      }
    }
  }
`

export const DELETE_BABEL = gql`
  mutation deleteBabelById($input: DeleteBabelByIdInput!) {
    deleteBabelById(input: $input) {
      babel {
        id
      }
    }
  }
`
