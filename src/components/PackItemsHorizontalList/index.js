import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { withStyles } from '@material-ui/core/styles';
import parse from 'url-parse'
import { Link, PackItemCard } from 'components'
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'scroll',
    marginTop: 5,
    flexWrap: 'nowrap',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 0,
  },
  buttonRight: {
    position:'absolute',
    right: 0,
    marginTop: 150,
  },
  buttonLeft: {
    position:'absolute',
    left: 0,
    marginTop: 150,
  },
};

const fromStores = (packItems) => {
  let uris = [];
  for (let i = 0; i < packItems.length && uris.length < 4; i++) {
    let product = packItems[i].node.productByProductId;
    let productUri = parse(product.uri).hostname;
    if (!uris.find(uri => uri === productUri)) {
      uris.push(productUri);
    }
  }
  return `from ${uris.join(', ')}`;
}

class PackItemsHorizontalList extends React.Component {
  constructor(props) {
    super(props);
    this.scollRef = React.createRef();
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  moveLeft() {
    this.scollRef.current.scrollLeft -= 100;
  }

  moveRight() {
    this.scollRef.current.scrollLeft += 100;
  }

  render() {
    const { classes, packItems, isEditable } = this.props;
    let headerText = `${packItems.length} items`;
    return (
      <div>
        <div className={classes.headerContainer}>
          <h2 className={classes.headerText}>{headerText}</h2>
          <p className={classes.headerText}>{fromStores(packItems)}</p>
        </div>
      <div ref={this.scollRef} className={classes.root}>
        {packItems.map(({ node }) => {
          return (
            <div style={{marginTop: 15, marginBottom: 15, marginLeft: 10, marginRight: 10}} key={node.id}>
              <PackItemCard packItem={node} isEditable={isEditable} />
            </div>
          );
        })}
        <div className={classes.buttonLeft}>
          <IconButton onClick={this.moveLeft} className={classes.button} aria-label="NavigateBefore">
            <NavigateBeforeIcon />
          </IconButton>
        </div>
        <div className={classes.buttonRight}>
          <IconButton onClick={this.moveRight} className={classes.button} aria-label="NavigateNext">
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
      </div>
    );
  }
}

PackItemsHorizontalList.fragments = {
  packItems: gql`
    fragment PackItemsHorizontalList on PackItemsEdge {
      node {
        ...PackItemCard
      }
    }
    ${PackItemCard.fragments.packItem}
  `,
};

PackItemsHorizontalList.propTypes = {
  classes: PropTypes.object.isRequired,
  packItems: propType(PackItemsHorizontalList.fragments.packItems).isRequired,
  isEditable: PropTypes.bool,
};

PackItemsHorizontalList.defaultProps = {
  isEditable: false,
};

export default withStyles(styles)(PackItemsHorizontalList);
