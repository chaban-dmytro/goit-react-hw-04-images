import React from 'react';
import ModalImage from 'react-modal-image';
import PropTypes from 'prop-types';
import noImage from '../../no_img.jpg';

export const ImageGalleryItem = ({
  webformatURL = noImage,
  tags = 'No info',
  largeImageURL = noImage,
}) => {
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
