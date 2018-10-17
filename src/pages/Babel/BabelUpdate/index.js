import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Mutation, Query } from 'components'
import { BABEL_DETAIL, UPDATE_BABEL, DELETE_BABEL } from 'modules/babel/gql'
import { REGISTER_BABEL_TAG, DELETE_BABEL_TAG } from 'modules/tag/gql'
import BabelForm from 'modules/babel/forms'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ChipInput from 'material-ui-chip-input';
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
  chipContainer: {
    width: 450,
  },
  chipRoot: {
    width: 450,
  },
});

export const BabelUpdatePage = ({ history, match: { params: { babelId } }, classes }) => {
  return (
  <section className={classes.root}>
    <Query
      query={BABEL_DETAIL}
      variables={{ id: babelId }}
    >
      {({ data: { babelById } }) => {
        let { id, telos, uri, description, babelTagsByBabelId } = babelById;
        let tags = [];
        let babelTagIds = [];
        babelTagsByBabelId.nodes.map(({ id, tagByTagId: { text } }) => {
          console.log(id);
          tags.push(text);
          babelTagIds.push(id);
        });
        return (
          <div>
            <Mutation
              mutation={UPDATE_BABEL}
              refetchQueries={[`BabelDetail`]}
            >
              {mutate => (
                <Fragment>
                  <h2>Update Babel</h2>
                  <BabelForm telos={telos} uri={uri} description={description} submit={values => mutate({ variables: { input: { id, babelPatch: values.babel } } })} />
                </Fragment>
              )}
            </Mutation>
            <Mutation
              mutation={REGISTER_BABEL_TAG}
              refetchQueries={[`BabelDetail`]}
            >
              {mutate => (
                <Fragment>
                  <h2>Add Tags</h2>
                  <div className={classes.chipContainer}>
                    <ChipInput
                      classes={{root: classes.chipRoot}}
                      value={tags}
                      onAdd={(chip) => mutate({ mutation: REGISTER_BABEL_TAG, variables: { input: { text: chip, babelId: id } } })}
                      onDelete={(chip, index) => mutate({ mutation: DELETE_BABEL_TAG, variables: { input: { id: babelTagIds[index] } } })}
                    />
                  </div>
                </Fragment>
              )}
            </Mutation>
            <h2></h2>
            <Button onClick={() => history.push(`/babels/${id}`)} variant="contained" component="span" className={classes.button} disableRipple={true}>Update</Button>
          </div>
        )
      }}
    </Query>
  </section>);
}

export default withStyles(styles)(BabelUpdatePage);
