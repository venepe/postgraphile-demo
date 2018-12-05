import React from 'react'
import styled from 'styled-components'
import { Query, PackItemsHorizontalList, DealershipCard, CreatePackButton } from 'components'
import { DEALERSHIP_DETAIL } from 'modules/dealership/gql'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const DealershipContainer = styled.div`
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

export const DealershipDetailPage = ({ history, match: { params: { dealershipId } }, classes }) => {
  return (
  <section>
    <Query
      query={DEALERSHIP_DETAIL}
      variables={{ id: dealershipId }}
    >
      {({ data: { dealershipById } }) => {
        return (
          <DealershipContainer key={id}>
            <div style={{display: 'flex', justifyContent: 'space-around', backgroundColor: grey['200'], padding: 10}}>
              <DealershipCard dealership={dealershipById} displayDescription={true} />
            </div>
          </DealershipContainer>
        )
      }}
    </Query>
  </section>);
}

export default withStyles(styles)(DealershipDetailPage);
