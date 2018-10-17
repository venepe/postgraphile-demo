import React from 'react'
import styled from 'styled-components'
import { Query, PackItemsHorizontalList, BabelCard, CreatePackButton } from 'components'
import { BABEL_DETAIL } from 'modules/babel/gql'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const BabelContainer = styled.div`
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

export const BabelDetailPage = ({ history, match: { params: { babelId } }, classes }) => {
  return (
  <section>
    <Query
      query={BABEL_DETAIL}
      variables={{ id: babelId }}
    >
      {({ data: { babelById } }) => {
        let { id, telos, uri, packsByBabelId } = babelById;
        return (
          <BabelContainer key={id}>
            <div style={{display: 'flex', justifyContent: 'space-around', backgroundColor: grey['200'], padding: 10}}>
              <BabelCard link={uri} babel={babelById} displayDescription={true} />
            </div>
          {
            packsByBabelId.edges.map(({ node }) => {
              let { packItemsByPackId, id } = node;
              return (
                <Paper key={id} style={{marginTop:15, marginBottom:15, backgroundColor: grey['50']}}>
                  <PackItemsHorizontalList packItems={packItemsByPackId.edges} />
                </Paper>
              );
            })
          }
          {(() => {
            if (packsByBabelId.edges.length < 1) {
              return (
                <div className={classes.emptyContainer}>
                  <p>No packs</p>
                </div>
              );
            }
          })()}
            <CreatePackButton babel={babelById}/>
          </BabelContainer>
        )
      }}
    </Query>
  </section>);
}

export default withStyles(styles)(BabelDetailPage);
