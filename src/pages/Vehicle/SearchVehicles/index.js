import React from 'react'
import queryString from 'query-string'
import { Query, VPSearchBar, VehicleCard, NoResult, Spinner } from 'components'
import { SEARCH_VEHICLES } from 'modules/vehicle/gql'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const IS_FETCHING_MORE = 3;

const styles = {
  root: {
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
  },
};

class SearchVehiclesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, location: { search }, classes } = this.props;
    const values = queryString.parse(search);
    return (
    <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <VPSearchBar value={values.search} onRequestSearch={value => history.push(`/search?search=${value}`)} />
      <Query
        query={SEARCH_VEHICLES}
        variables={{ search: values.search, first: 20, after: null }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { searchVehicles }, fetchMore, networkStatus}) => {
          if (searchVehicles.edges.length < 1) {
            return (
              <NoResult telos={values.search} />
            );
          }

          let list = searchVehicles.edges.map(({ node }) => {
            let { id } = node;
            return (
              <div className={classes.root} key={id}>
                <VehicleCard link={`/vehicles/${id}`} vehicle={node} />
              </div>
            );
          });
          if (searchVehicles.pageInfo.hasNextPage && networkStatus !== IS_FETCHING_MORE) {
            list.push((
              <IconButton key={'more'} onClick={() => {
                fetchMore({
                    variables: { search: values.search, first: 20, after: searchVehicles.pageInfo.endCursor},
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return {
                        searchVehicles: {
                          edges: [
                            ...previousResult.searchVehicles.edges,
                            ...fetchMoreResult.searchVehicles.edges,
                          ],
                          pageInfo: fetchMoreResult.searchVehicles.pageInfo,
                          __typename: searchVehicles.__typename,
                        }
                      };
                    },
                  });
                }} style={{alignSelf: 'center'}} aria-label="FetchMore">
                <ExpandMoreIcon />
              </IconButton>
            ));
          } else if (networkStatus === IS_FETCHING_MORE) {
            list.push((<Spinner key={'spinner'}/>));
          }
          return list;
        }}
      </Query>
    </section>
  );
  }
}

export default withStyles(styles)(SearchVehiclesPage);
