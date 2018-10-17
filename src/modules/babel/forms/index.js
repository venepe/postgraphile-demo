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

class BabelForm extends React.Component {
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
    const babel = {
      telos,
      uri,
      description,
    }
    this.props.submit({ babel } );
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="telos"
          label="Telos"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.telos}
          onChange={(event) => this.handleChange('telos', event)}
          placeholder="What are we doing? What are we making?"
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

BabelForm.propTypes = {
  classes: PropTypes.object.isRequired,
  telos: PropTypes.string,
  uri: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(styles)(BabelForm);
