import React, { Fragment } from 'react'
import styled from 'styled-components'
import { DeleteDealershipButton, Mutation, Query } from 'components'
import { DEALERSHIP_DETAIL, UPDATE_DEALERSHIP, DELETE_DEALERSHIP } from 'modules/dealership/gql'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

class DealershipUpdatePage extends React.Component {
  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
    this.state = {
      name: '',
      didLoad: false,
    }
  }

  updateName(name) {
    if (!this.state.didLoad) {
      this.setState({
        didLoad: true,
        name,
      });
    }
  }

  render() {
    const { history, match: { params: { dealershipId } }, classes } = this.props;
    return (
    <section className={classes.root}>
      <Query
        query={DEALERSHIP_DETAIL}
        variables={{ id: dealershipId }}
      >
        {({ data: { dealershipById } }) => {
          let { id, name, nodeId } = dealershipById;
          this.updateName(name);
          return (
            <div>
              <Mutation
                mutation={UPDATE_DEALERSHIP}
                refetchQueries={[`DealershipDetail`]}
              >
                {mutate => (
                  <Fragment>
                    <h2>Update Dealership</h2>
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
                    <Button type="submit" onClick={() => mutate({ variables: { input: {id, dealershipPatch: {name: this.state.name}}}})} variant="contained" component="span" className={classes.button} disableRipple={true}>
                      Submit
                    </Button>
                    <DeleteDealershipButton nodeId={nodeId}></DeleteDealershipButton>
                  </Fragment>
                )}
              </Mutation>
            </div>
          )
        }}
      </Query>
    </section>);
  }

}

export default withStyles(styles)(DealershipUpdatePage);
