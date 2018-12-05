import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Mutation } from 'components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CREATE_DEALERSHIP } from 'modules/dealership/gql'
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

class DealershipCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  render() {
    const { history, classes } = this.props;
    return (
      <section className={classes.root}>
        <Mutation
          mutation={CREATE_DEALERSHIP}
          onCompleted={({ createDealership: { dealership: { id }}}) => history.push(`/dealerships/${id}/edit`)}
        >
          {mutate => (
            <Fragment>
              <h2>Create New Dealership</h2>
              <TextField
                id="name"
                label="Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.name}
                onChange={(event) => this.setState({name: event.target.value})}
                placeholder="Name of Dealership"
                fullWidth
                margin="normal"
              />
              <Button type="submit" onClick={() => mutate({ variables: { input: {dealership: this.state}}})} variant="contained" component="span" className={classes.button} disableRipple={true}>
                Submit
              </Button>
            </Fragment>
          )}
        </Mutation>
      </section>
    );
  }
}

DealershipCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withStyles(styles)(DealershipCreatePage);
