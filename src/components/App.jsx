import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    name: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ name: searchValue });
  };

  render() {
    return (
      <>
        <Searchbar submitForm={this.handleFormSubmit}></Searchbar>
        <ImageGallery name={this.state.name}></ImageGallery>
      </>
    );
  }
}

export default App;
