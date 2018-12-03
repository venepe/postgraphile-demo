import React from 'react'
import PropTypes from 'prop-types';
import { Link, TrendingTags } from 'components'
import { withStyles } from '@material-ui/core/styles';

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
    marginLeft: 5,
    marginRight: 5,
  }
};

const NoResult = ({ classes, telos }) => (
  <div className={classes.root}>
    <div className={classes.rowContainer}>
      <p>No results.</p>
        <Link to={`/babels/new?telos=${telos}`} className={classes.link}>Create it</Link>
      <p>or try something trending.</p>
    </div>
    <TrendingTags />
  </div>
)

NoResult.propTypes = {
  classes: PropTypes.object.isRequired,
  telos: PropTypes.string,
};

NoResult.defaultProps = {
  telos: ''
};

export default withStyles(styles)(NoResult);
