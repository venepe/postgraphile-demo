import React from 'react'
import styled from 'styled-components'
import { Query, PackItemsHorizontalList, VehicleCard, CreatePackButton } from 'components'
import { VEHICLE_DETAIL } from 'modules/vehicle/gql'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const VehicleContainer = styled.div`
  margin-bottom: 25px;
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
`

const styles = {
  card: {
    width: 400,
  },
  media: {
    height: 350,
  },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export const VehicleDetailPage = ({ history, match: { params: { vehicleId } }, classes }) => {
  return (
  <section>
    <Query
      query={VEHICLE_DETAIL}
      variables={{ id: vehicleId }}
    >
      {({ data: { vehicleById } }) => {
        return (
          <VehicleContainer key={id}>
            <div style={{display: 'flex', justifyContent: 'space-around', backgroundColor: grey['200'], padding: 10}}>
              <VehicleCard link={uri} vehicle={vehicleById} displayDescription={true} />
            </div>
          </VehicleContainer>
        )
      }}
    </Query>
  </section>);
}

export default withStyles(styles)(VehicleDetailPage);
