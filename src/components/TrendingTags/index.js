import React from 'react'
import { Query } from 'components'
import { TRENDING_TAGS } from 'modules/tag/gql'
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    margin: 5,
  },
};

class TrendingTags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
    <section className={classes.root}>
      <Query
        query={TRENDING_TAGS}
        variables={{ first: 6, after: null }}
      >
        {({ data: { trendingTags }}) => {
          let list = trendingTags.edges.map(({ node }) => {
            let { id, text } = node;
            return (
              <Chip
                key={id}
                label={text}
                className={classes.chip}
                component="a"
                href={`/tags?text=${text}`}
                clickable
                color="primary"
              />
            );
          });
          return list;
        }}
      </Query>
    </section>
  );
  }
}

export default withStyles(styles)(TrendingTags);
