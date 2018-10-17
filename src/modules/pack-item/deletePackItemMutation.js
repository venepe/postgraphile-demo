import gql from 'graphql-tag';

export const DELETE_PACK_ITEM = gql`
  mutation deletePackItemById($input: DeletePackItemByIdInput!) {
    deletePackItemById(input: $input) {
      packItem {
        id
      }
    }
  }
`
