import React from 'react'
import queryString from 'query-string'
import { Query, DealershipCard, NoResult, Spinner } from 'components'
import { ALL_DEALERSHIPS } from 'modules/dealership/gql'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
  },
};

class DealershipListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, classes } = this.props;
    return (
    <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Query
        query={ALL_DEALERSHIPS}
        variables={{ first: 20, after: null }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { allDealerships }, networkStatus}) => {
          if (allDealerships.edges.length < 1) {
            return (
              <NoResult />
            );
          }

          let list = allDealerships.edges.map(({ node }) => {
            let { id } = node;
            return (
              <div className={classes.root} key={id}>
                <DealershipCard dealership={node} />
              </div>
            );
          });
          return list;
        }}
      </Query>
    </section>
  );
  }
}

export default withStyles(styles)(DealershipListPage);
