import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Mutation, Query } from 'components'
import { VEHICLE_DETAIL, UPDATE_VEHICLE, DELETE_VEHICLE } from 'modules/vehicle/gql'
import VehicleForm from 'modules/vehicle/forms'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

export const VehicleUpdatePage = ({ history, match: { params: { vehicleId } }, classes }) => {
  return (
  <section className={classes.root}>
    <Query
      query={VEHICLE_DETAIL}
      variables={{ id: vehicleId }}
    >
      {({ data: { vehicleById } }) => {
        let { id, telos, uri, description, vehicleTagsByVehicleId } = vehicleById;
        let tags = [];
        let vehicleTagIds = [];
        vehicleTagsByVehicleId.nodes.map(({ id, tagByTagId: { text } }) => {
          console.log(id);
          tags.push(text);
          vehicleTagIds.push(id);
        });
        return (
          <div>
            <Mutation
              mutation={UPDATE_VEHICLE}
              refetchQueries={[`VehicleDetail`]}
            >
              {mutate => (
                <Fragment>
                  <h2>Update Vehicle</h2>
                  <VehicleForm telos={telos} uri={uri} description={description} submit={values => mutate({ variables: { input: { id, vehiclePatch: values.vehicle } } })} />
                </Fragment>
              )}
            </Mutation>
            <h2></h2>
            <Button onClick={() => history.push(`/vehicles/${id}`)} variant="contained" component="span" className={classes.button} disableRipple={true}>Update</Button>
          </div>
        )
      }}
    </Query>
  </section>);
}

export default withStyles(styles)(VehicleUpdatePage);
