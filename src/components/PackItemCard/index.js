import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import parse from 'url-parse'
import Mutation from '../Mutation';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { DELETE_PACK_ITEM } from 'modules/pack-item/deletePackItemMutation';

const styles = {
  card: {
    width: 200,
    height: 345,
  },
  media: {
    height: 150,
  },
  text: {
    flexWrap: 'wrap',
  },
  viewOn: {
    fontSize: 14,
  },
  deleteButton: {
    position: 'absolute',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const formatTitle = (title) => {
  if (title.length > 80) {
    title = `${title.substring(0, 70)}...`;
  }
  return title;
}

const PackItemCard = ({ packItem: { id, productByProductId: { uri, imageUri, title, price } }, classes, isEditable }) => (
  <a href={uri} id={id} className={classes.link}>
    <Card raised={true} className={classes.card}>
      {(() => {
        if (isEditable === true) {
          return (
            <Mutation
              mutation={DELETE_PACK_ITEM}
              refetchQueries={[`PackDetail`]}
            >
              {mutate => (
                <Fragment>
                  <IconButton className={classes.deleteButton} aria-label="Delete" onClick={() => mutate({ variables: { input: { id } } })} >
                    <ClearIcon />
                  </IconButton>
                </Fragment>
              )}
            </Mutation>
          );
        }
      })()}
      <CardMedia
        className={classes.media}
        image={imageUri}
        title={title}
      />
      <CardContent>
        <p className={classes.text} style={{height: 80}}>
          {formatTitle(title)}
        </p>
        <p className={classes.text}>
          {price}
        </p>
        <p className={classes.viewOn}>View on {parse(uri, true).hostname}</p>
      </CardContent>
    </Card>
  </a>
)

PackItemCard.fragments = {
  packItem: gql`
    fragment PackItemCard on PackItem {
      id
      productByProductId {
        id
        uri
        imageUri
        title
        price
      }
    }
  `,
};

PackItemCard.propTypes = {
  packItem: propType(PackItemCard.fragments.packItem).isRequired,
  isEditable: PropTypes.bool,
};

PackItemCard.defaultProps = {
  isEditable: false,
};

export default withStyles(styles)(PackItemCard);
