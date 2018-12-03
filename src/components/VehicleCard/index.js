import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: 400,
  },
  media: {
    height: 300,
  },
};

const VehicleCard = ({ vehicle: { id, manufacturer, model, image_uri, description,  }, classes, link }) => (
  <Card className={classes.card}>
    <a href={link} style={{ textDecoration: 'none' }}>
      {
        (() => {
          if (image_uri && image_uri.length > 0) {
            return (<CardMedia
              className={classes.media}
              image={image_uri}
              title={manufacturer}
            />);
          }
        })()
      }
      <CardContent style={{paddingBottom: 0}}>
        <Typography gutterBottom variant="headline" component="h4">
          {manufacturer} {model}
        </Typography>
        {(() => {
          if (displayDescription === true) {
            return (
              <Typography gutterBottom component="p">
                {description}
              </Typography>
            );
          }
        })()}
      </CardContent>
    </a>
    <Divider />
  </Card>
)

VehicleCard.fragments = {
  vehicle: gql`
    fragment VehicleCard on Vehicle {
      id
      manufacturer
      model
      image_uri
      description
    }
  `,
};

VehicleCard.defaultProps = {
  link: '#',
};

VehicleCard.propTypes = {
  vehicle: propType(VehicleCard.fragments.vehicle).isRequired,
  link: PropTypes.string,
};

export default withStyles(styles)(VehicleCard);
