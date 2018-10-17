import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
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
  chip: {
    margin: 5,
  }
};

const BabelCard = ({ babel: { id, telos, uri, description, babelTagsByBabelId }, classes, link, displayDescription }) => (
  <Card className={classes.card}>
    <a href={link} style={{ textDecoration: 'none' }}>
      {
        (() => {
          if (uri && uri.length > 0) {
            return (<CardMedia
              className={classes.media}
              image={uri}
              title={telos}
            />);
          }
        })()
      }
      <CardContent style={{paddingBottom: 0}}>
        <Typography gutterBottom variant="headline" component="h4">
          {telos}
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
    <CardContent style={{paddingBottom: 10, paddingTop: 10}}>
      {babelTagsByBabelId.nodes.map(({ tagByTagId: { id, text } }) => {
        return (
          <Chip
            key={id}
            label={text}
            className={classes.chip}
            component="a"
            href={`/tags?text=${text}`}
            clickable
            color="primary"
          />
        );
      })}
    </CardContent>
  </Card>
)

BabelCard.fragments = {
  babel: gql`
    fragment BabelCard on Babel {
      id
      telos
      uri
      description
      babelTagsByBabelId(first: 5) {
        nodes {
          id
          tagByTagId {
            id
            text
          }
        }
      }
    }
  `,
};

BabelCard.defaultProps = {
  link: '#',
  displayDescription: false,
};

BabelCard.propTypes = {
  babel: propType(BabelCard.fragments.babel).isRequired,
  link: PropTypes.string,
  displayDescription: PropTypes.bool,
};

export default withStyles(styles)(BabelCard);
