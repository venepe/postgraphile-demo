import React, { Fragment } from 'react'
import queryString from 'query-string'
import { Query, PackDetail, BabelCard, Mutation } from 'components'
import { BABEL_DETAIL } from 'modules/babel/gql'
import { PACK_DETAIL } from 'modules/pack/gql'
import { REGISTER_PRODUCT_AND_CREATE_PACK_ITEM } from 'modules/pack-item/gql'
import PackItemForm from 'modules/pack-item/forms'
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    marginBottom: 25,
  },
  card: {
    width: 345,
  },
  media: {
    height: 300,
  },
  packContainer: {
    overflow: 'scroll',
    flexWrap: 'nowrap',
    backgroundColor: grey['50'],
  },
};

export class PackUpdatePage extends React.Component {
  constructor(props) {
    super(props);
    this.onRegisteredPackItem = this.onRegisteredPackItem.bind(this);
    const { match: { params: { packId } } } = this.props;

    this.state = {
      packId,
    }
  }

  onRegisteredPackItem(packItem) {
    this.setState({
      packId: packItem.packId,
    });
  }

  render() {
    const { history, match: { params: { babelId, packId } }, classes } = this.props;
    let packComponent = null;
    if (this.state.packId) {
      packComponent = (<PackDetail className={classes.packContainer} packId={this.state.packId} isEditable={true} />);
    }
    return (
    <section>
      <Query
        query={BABEL_DETAIL}
        variables={{ id: babelId }}
      >
        {({ data: { babelById } }) => {
          let { id, telos, uri, packsByBabelId } = babelById;
          return (
            <div className={classes.root} key={id}>
              <div style={{display: 'flex', justifyContent: 'space-around', backgroundColor: grey['200'], padding: 10}}>
                <BabelCard link={uri} babel={babelById} />
              </div>
          </div>
          )
        }}
      </Query>
      {packComponent}
      {
        <Mutation
          mutation={REGISTER_PRODUCT_AND_CREATE_PACK_ITEM}
          refetchQueries={[`PackDetail`]}
          onCompleted={({ registerProductAndCreatePackItem: { packItem }}) => this.onRegisteredPackItem(packItem)}
        >
          {mutate => (
            <Fragment>
              <PackItemForm babelId={babelId} packId={packId} submit={values => mutate({ variables: values })} />
            </Fragment>
          )}
        </Mutation>
      }
    </section>);
  }
}

export default withStyles(styles)(PackUpdatePage);
