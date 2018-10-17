import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
  root: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 180,
    height: 345,
    padding: 10,
  },
});

class PackItemForm extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState){
        return {
          packId: nextProps.packId,
        }
      }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    const { babelId, packId } = this.props;
    this.state = {
      babelId,
      packId,
    }
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit() {
    let { babelId, packId, uri } = this.state;
    // let amazonRegex = /https?:\/\/(?=(?:....)?amazon|smile)(www|smile)\S+com(((?:\/(?:dp|gp)\/([A-Z0-9]+))?\S*[?&]?(?:tag=))?\S*?)(?:#)?(\w*?-\w{2})?(\S*)(#?\S*)+/;
    // if (uri.match(amazonRegex) && uri.match(amazonRegex).length > 0) {
    //   uri = uri.match(/.+?(?=\/ref=)/)[0];
    // }

    this.props.submit({ input: { babelId, packId, uri } });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} key='form'>
        <Card raised={true} className={classes.card}>
          <div>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="uri"
                label="Link"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Add an Amazon product link"
                onChange={(event) => this.handleChange('uri', event)}
                fullWidth
                margin="normal"
              />
            </form>
            <Button color="primary" type="submit" onClick={this.onSubmit} variant="contained" component="span" disableRipple={true}>
              Submit
            </Button>
          </div>
          <div>

          </div>
        </Card>
      </div>
    );
  }
}

PackItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PackItemForm);
