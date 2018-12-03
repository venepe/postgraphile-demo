import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      telos: props.telos,
      uri: props.uri,
      description: props.description,
    }
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
    this.props.handleChange(name, event.target.value);
  }

  onSubmit() {
    const { telos, uri, description } = this.state;
    const vehicle = {
      manufacturer,
      model,
      image_uri,
      description,
      price,
    }
    this.props.submit({ vehicle } );
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="manufacturer"
          label="Manufacturer"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.manufacturer}
          onChange={(event) => this.handleChange('manufacturer', event)}
          placeholder="Who makes it?"
          fullWidth
          margin="normal"
        />
        <TextField
          id="model"
          label="Model"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.model}
          onChange={(event) => this.handleChange('model', event)}
          placeholder="What is the model?"
          fullWidth
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.description}
          onChange={(event) => this.handleChange('description', event)}
          placeholder="A little background never hurt"
          fullWidth
          margin="normal"
          multiline
          rowsMax="4"
        />
        <TextField
          id="uri"
          label="Url"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Link to a picture worth a thousand words"
          value={this.state.uri}
          onChange={(event) => this.handleChange('uri', event)}
          fullWidth
          margin="normal"
        />
      </form>
    );
  }
}

VehicleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  manufacturer: PropTypes.string,
  model: PropTypes.string,
  image_uri: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};

export default withStyles(styles)(VehicleForm);
