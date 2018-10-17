import gql from 'graphql-tag'

export const TRENDING_TAGS = gql`
  query trendingTags($first: Int, $after: Cursor) {
    trendingTags(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          text
        }
      }
    }
  }
`

export const REGISTER_BABEL_TAG = gql`
  mutation registerBabelTag($input: RegisterBabelTagInput!) {
    registerBabelTag(input: $input) {
      babelTag {
        tagId
        babelId
        tagByTagId {
          id
          text
        }
      }
    }
  }
`

export const DELETE_BABEL_TAG = gql`
  mutation deleteBabelTagById($input: DeleteBabelTagByIdInput!) {
    deleteBabelTagById(input: $input) {
      babelByBabelId {
        id
      }
    }
  }
`
