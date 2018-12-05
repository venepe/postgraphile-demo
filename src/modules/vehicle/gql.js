import gql from 'graphql-tag'
import { VehicleCard } from 'components'

export const VEHICLE_DETAIL = gql`
  query VehicleDetail($id: Int!) {
    vehicleById(id: $id) {
      ...VehicleCard
    }
  }
  ${VehicleCard.fragments.vehicle}
`

export const CREATE_VEHICLE = gql`
  mutation createVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      vehicle {
        id
        manufacturer
        model
        image_uri
        description
        price
      }
    }
  }
`

export const UPDATE_VEHICLE = gql`
  mutation updateVehicleById($input: UpdateVehicleByIdInput!) {
    updateVehicleById(input: $input) {
      vehicle {
        id
        manufacturer
        model
        image_uri
        description
        price
      }
    }
  }
`

export const DELETE_VEHICLE = gql`
  mutation deleteVehicleById($input: DeleteVehicleByIdInput!) {
    deleteVehicleById(input: $input) {
      vehicle {
        id
      }
    }
  }
`
