import React from 'react'
import queryString from 'query-string'
import { Query, BPSearchBar, BabelCard, NoResult, Spinner } from 'components'
import { SEARCH_BABELS } from 'modules/babel/gql'
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

class SearchBabelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, location: { search }, classes } = this.props;
    const values = queryString.parse(search);
    return (
    <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <BPSearchBar value={values.search} onRequestSearch={value => history.push(`/search?search=${value}`)} />
      <Query
        query={SEARCH_BABELS}
        variables={{ search: values.search, first: 20, after: null }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { searchBabels }, fetchMore, networkStatus}) => {
          if (searchBabels.edges.length < 1) {
            return (
              <NoResult telos={values.search} />
            );
          }

          let list = searchBabels.edges.map(({ node }) => {
            let { id } = node;
            return (
              <div className={classes.root} key={id}>
                <BabelCard link={`/babels/${id}`} babel={node} />
              </div>
            );
          });
          if (searchBabels.pageInfo.hasNextPage && networkStatus !== IS_FETCHING_MORE) {
            list.push((
              <IconButton key={'more'} onClick={() => {
                fetchMore({
                    variables: { search: values.search, first: 20, after: searchBabels.pageInfo.endCursor},
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return {
                        searchBabels: {
                          edges: [
                            ...previousResult.searchBabels.edges,
                            ...fetchMoreResult.searchBabels.edges,
                          ],
                          pageInfo: fetchMoreResult.searchBabels.pageInfo,
                          __typename: searchBabels.__typename,
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

export default withStyles(styles)(SearchBabelsPage);
