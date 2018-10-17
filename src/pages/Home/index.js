import React from 'react'
import { BPSearchBar, TrendingBabels, TrendingTags } from 'components';
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
    <BPSearchBar onRequestSearch={value => history.push(`/search?search=${value}`)} />
    <div className={classes.tagContainer}>
      <TrendingTags />
    </div>
    <TrendingBabels />
  </section>);
}

export default withStyles(styles)(HomePage);
