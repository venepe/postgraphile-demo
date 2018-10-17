import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'components'
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    margin: 5,
  }
};

const CreatePackButton = ({ classes, babel : { id } }) => (
  <div className={classes.root}>
    <div className={classes.rowContainer}>
      <Link to={`/babels/${id}/packs/new`} className={classes.link}>Add your own pack</Link>
    </div>
  </div>
)

CreatePackButton.fragments = {
  babel: gql`
    fragment CreatePackButton on Babel {
      id
    }
  `,
};

CreatePackButton.propTypes = {
  babel: propType(CreatePackButton.fragments.babel).isRequired,
};

export default withStyles(styles)(CreatePackButton);
