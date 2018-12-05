import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Mutation } from 'components'
import Button from '@material-ui/core/Button';
import { DELETE_DEALERSHIP } from 'modules/dealership/gql'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    alignSelf: 'center',
    width: 200,
  },
});

class DeleteDealershipButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeId: props.nodeId,
    }
  }

  render() {
    const { classes, } = this.props;
    return (
      <section className={classes.root}>
        <Mutation
          mutation={DELETE_DEALERSHIP}
          onCompleted={({ deleteDealership: { deletedDealershipId }}) => history.push(`/dealerships`)}
        >
          {mutate => (
            <Fragment>
              <Button type="submit" onClick={() => mutate({ variables: { input: {nodeId: this.state.nodeId}}})} variant="contained" component="span" className={classes.button} disableRipple={true}>
                Delete
              </Button>
            </Fragment>
          )}
        </Mutation>
      </section>
    );
  }
}

DeleteDealershipButton.propTypes = {
  nodeId: PropTypes.string,
};

export default withStyles(styles)(DeleteDealershipButton);
