import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Mutation } from 'components'
import Button from '@material-ui/core/Button';
import VehicleForm from 'modules/vehicle/forms'
import { CREATE_VEHICLE } from 'modules/vehicle/gql'
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

class VehicleCreatePage extends React.Component {
  constructor(props) {
    super(props);
    const { location: { search } } = props;
    this.state = {
      telos: '',
      uri: '',
      description: '',
    }
  }

  render() {
    const { history, location: { search }, classes } = this.props;
    return (
      <section className={classes.root}>
        <Mutation
          mutation={CREATE_VEHICLE}
          onCompleted={({ createVehicle: { vehicle: { id }}}) => history.push(`/vehicles/${id}/edit`)}
        >
          {mutate => (
            <Fragment>
              <h2>Create New Vehicle</h2>
              <VehicleForm
                handleChange={(name, value) => {
                  this.setState({
                    [name]: value,
                  });
                }}
                telos={queryString.parse(search).telos} />
              <Button type="submit" onClick={() => mutate({ variables: { input: {vehicle: this.state}}})} variant="contained" component="span" className={classes.button} disableRipple={true}>
                Submit
              </Button>
            </Fragment>
          )}
        </Mutation>
      </section>
    );
  }
}

VehicleCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withStyles(styles)(VehicleCreatePage);
