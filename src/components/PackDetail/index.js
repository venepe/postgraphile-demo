import React from 'react'
import { Query, PackItemsHorizontalList } from 'components'
import { PACK_DETAIL } from 'modules/pack/gql'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    backgroundColor: grey['50'],
  }
};

class Pack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, packId, isEditable } = this.props;
    return (
    <Paper className={classes.root}>
      <Query
        query={PACK_DETAIL}
        variables={{ id: packId }}
      >
        {( { data: { packById: { packItemsByPackId} } } ) => {
          return (
              <PackItemsHorizontalList packItems={packItemsByPackId.edges} isEditable={isEditable} />
          )
        }}
      </Query>
    </Paper>
  );
  }
}

export default withStyles(styles)(Pack);
