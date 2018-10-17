import gql from 'graphql-tag';
import { PackItemCard } from 'components';

export const REGISTER_PRODUCT_AND_CREATE_PACK_ITEM = gql`
  mutation registerProductAndCreatePackItem($input: RegisterProductAndCreatePackItemInput!) {
    registerProductAndCreatePackItem(input: $input) {
      packItem {
        packId
        ...PackItemCard
      }
    }
  }
  ${PackItemCard.fragments.packItem}
`
