import gql from 'graphql-tag'
import { DealershipCard } from 'components'

export const DEALERSHIP_DETAIL = gql`
  query DealershipDetail($id: Int!) {
    dealershipById(id: $id) {
      ...DealershipCard
    }
  }
  ${DealershipCard.fragments.dealership}
`

export const ALL_DEALERSHIPS = gql`
  query AllDealerships($first: Int) {
    allDealerships(first: $first) {
      edges {
        cursor
        node {
          ...DealershipCard
        }
      }
    }
  }
  ${DealershipCard.fragments.dealership}
`

export const CREATE_DEALERSHIP = gql`
  mutation createDealership($input: CreateDealershipInput!) {
    createDealership(input: $input) {
      dealership {
        nodeId
        id
        name
        createdAt
      }
    }
  }
`

export const UPDATE_DEALERSHIP = gql`
  mutation updateDealershipById($input: UpdateDealershipByIdInput!) {
    updateDealershipById(input: $input) {
      dealership {
        nodeId
        id
        name
        createdAt
      }
    }
  }
`

export const DELETE_DEALERSHIP = gql`
  mutation deleteDealership($input: DeleteDealershipInput!) {
    deleteDealership(input: $input) {
      deletedDealershipId
    }
  }
`
