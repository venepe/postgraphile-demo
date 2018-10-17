import gql from 'graphql-tag'
import { PackItemsHorizontalList } from 'components'

export const CREATE_PACK = gql`
  mutation createPack($input: CreatePackInput!) {
    createPack(input: $input) {
      pack {
        id
        babelId
      }
    }
  }
`

export const PACK_DETAIL = gql`
  query PackDetail($id: Int!) {
    packById(id: $id) {
      packItemsByPackId {
        edges {
          ...PackItemsHorizontalList
        }
      }
    }
  }
  ${PackItemsHorizontalList.fragments.packItems}
`
