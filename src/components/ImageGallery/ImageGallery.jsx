import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Btn from 'components/Button/Button';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

import { fetchImages } from 'api';
import { Alert } from '@mui/material';

const imagesOnPage = 12;

export class ImageGallery extends Component {
  state = {
    data: null,
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ currentPage: 1, status: 'pending' });
      try {
        const images = await fetchImages(
          this.props.name,
          this.state.currentPage,
          imagesOnPage
        );
        this.setState({ data: images.data });
        this.setState({
          totalPages: Math.ceil(images.data.totalHits / imagesOnPage),
        });
        this.setState({ status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
    }

    if (prevState.currentPage < this.state.currentPage) {
      try {
        const images = await fetchImages(
          this.props.name,
          this.state.currentPage,
          imagesOnPage
        );
        this.setState(prevState => {
          const newData = { ...prevState.data };
          newData.hits = [...prevState.data.hits, ...images.data.hits];
          return {
            data: newData,
          };
        });
        this.setState({ status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error);
      }
    }
  }

  handleLoadMore = event => {
    this.setState(({ currentPage }) => {
      return {
        currentPage: currentPage + 1,
      };
    });
  };

  render() {
    return (
      <>
        {this.state.status === 'idle' ? null : (
          <>
            <ul className="gallery">
              {this.state.status === 'pending' && <Loader />}
              {this.state.status === 'rejected' && (
                <Alert severity="error">Error! Reload page</Alert>
              )}
              {this.state.status === 'resolved' &&
                (this.state.data.hits.length === 0 ? (
                  <Alert severity="error">There are no images!</Alert>
                ) : (
                  this.state.data.hits.map(
                    ({ webformatURL, id, tags, largeImageURL }) => (
                      <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        tags={tags}
                        largeImageURL={largeImageURL}
                        status={this.state.status}
                      ></ImageGalleryItem>
                    )
                  )
                ))}
            </ul>
            <Btn
              state={this.state}
              loadMore={this.handleLoadMore}
              imagesOnPage={imagesOnPage}
            ></Btn>
          </>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  name: PropTypes.string,
};

export default ImageGallery;
