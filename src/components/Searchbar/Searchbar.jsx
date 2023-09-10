import React, { Component } from 'react';
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleFormChange = event => {
    this.setState({ name: event.currentTarget.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      alert('Enter name!');
      return;
    }
    this.props.submitForm(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <Button variant="contained" type="submit" className="button">
            <span className="button-label">Search</span>
          </Button>
          <TextField
            id="outlined-basic"
            label="Search images and photos"
            variant="outlined"
            value={this.state.name}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleFormChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  submitForm: PropTypes.func,
};

export default Searchbar;
