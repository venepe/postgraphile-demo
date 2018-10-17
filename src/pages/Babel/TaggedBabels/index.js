import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import { Query, BabelCard } from 'components'
import { TAGGED_BABELS } from 'modules/babel/gql'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';

const BabelContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
`

const BabelListContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const styles = {
  chipContainer: {
    width: 400,
    alignSelf: 'center',
  },
  chip: {
    margin: 5,
  },
};

class TaggedBabelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: false,
    }
  }

  render() {
    const { history, location: { search }, classes } = this.props;
    const values = queryString.parse(search);
    return (
    <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className={classes.chipContainer}>
        <Chip label={values.text} className={classes.chip} color="primary" />
      </div>
      <Query
        query={TAGGED_BABELS}
        variables={{ text: values.text, first: 20, after: null }}
      >
        {({ data: { tagByText: { babelTagsByTagId } }, fetchMore}) => {
          let list = babelTagsByTagId.edges.map(({ node: { babelByBabelId } }) => {
            let { id } = babelByBabelId;
            return (
              <BabelContainer key={id}>
                  <BabelCard link={`/babels/${id}`} babel={babelByBabelId} />
              </BabelContainer>
            );
          });
          if (babelTagsByTagId.pageInfo.hasNextPage) {
            list.push((
              <IconButton key={'more'} onClick={() => {
                fetchMore({
                    variables: { search: values.text, first: 20, after: babelTagsByTagId.pageInfo.startCursor},
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return {
                        tagByText: {
                          text: values.text,
                          babelTagsByTagId: {
                            edges: [
                              ...previousResult.tagByText.babelTagsByTagId.edges,
                              ...fetchMoreResult.tagByText.babelTagsByTagId.edges,
                            ],
                            pageInfo: fetchMoreResult.tagByText.babelTagsByTagId.pageInfo,
                            __typename: fetchMoreResult.tagByText.babelTagsByTagId.__typename,
                          },
                          __typename: fetchMoreResult.tagByText.__typename,
                        }
                      };
                    },
                  });
                }} style={{alignSelf: 'center'}} aria-label="FetchMore">
                <ExpandMoreIcon />
              </IconButton>
            ));
          }
          return list;
        }}
      </Query>
    </section>
  );
  }
}

export default withStyles(styles)(TaggedBabelsPage);
