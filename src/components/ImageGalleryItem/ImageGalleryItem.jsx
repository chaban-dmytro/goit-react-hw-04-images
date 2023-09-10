import React from 'react';
import ModalImage from 'react-modal-image';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li className="gallery-item">
      <ModalImage
        small={webformatURL}
        large={largeImageURL}
        hideDownload={true}
        hideZoom={true}
        imageBackgroundColor="transperend"
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
