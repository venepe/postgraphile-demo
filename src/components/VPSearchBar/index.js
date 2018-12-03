import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-center',
    marginTop: 5,
  },
};

class VPSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onRequestSearch = this.onRequestSearch.bind(this);
    this.state = {
      value: this.props.value,
    }
  }

  onRequestSearch(val) {
    this.props.onRequestSearch(val);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} noValidate autoComplete="off">
        <SearchBar
          onChange={this.onChange}
          onRequestSearch={this.onRequestSearch}
          value={this.state.value}
          style={{
            margin: '0 auto',
            width:500
          }}
        />
      </div>
    );
  }
}

VPSearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

VPSearchBar.defaultProps = {
  value: ''
};

export default withStyles(styles)(VPSearchBar);
