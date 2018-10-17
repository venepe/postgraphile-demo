import React from 'react'
import { Query, BabelCard } from 'components'
import { PACKLESS_BABELS } from 'modules/babel/gql'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
};

class PacklessBabels extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
    <section className={classes.root}>
      <Query
        query={PACKLESS_BABELS}
        variables={{ first: 6, after: null }}
      >
        {({ data: { packlessBabels }}) => {
          let list = packlessBabels.edges.map(({ node }) => {
            let { id } = node;
            return (
              <div style={{margin: 10}} key={id}>
                <BabelCard link={`/babels/${id}`} babel={node} />
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

export default withStyles(styles)(PacklessBabels);
