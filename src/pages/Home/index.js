import React from 'react'
import { VPSearchBar, TrendingBabels, TrendingTags } from 'components';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
  },
};

export const HomePage = ({ history, classes }) => {
  return (
  <section>
    <VPSearchBar onRequestSearch={value => history.push(`/search?search=${value}`)} />
  </section>);
}

export default withStyles(styles)(HomePage);
