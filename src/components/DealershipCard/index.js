import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: 400,
  },
};

const DealershipCard = ({ dealership: { name,  }, classes, }) => (
  <Card className={classes.card}>
      <CardContent style={{paddingBottom: 0}}>
        <Typography gutterBottom variant="headline" component="h4">
          {name}
        </Typography>
      </CardContent>
  </Card>
)

DealershipCard.fragments = {
  dealership: gql`
    fragment DealershipCard on Dealership {
      nodeId
      id
      name
    }
  `,
};

DealershipCard.defaultProps = {};

DealershipCard.propTypes = {
  dealership: propType(DealershipCard.fragments.dealership).isRequired,
};

export default withStyles(styles)(DealershipCard);
