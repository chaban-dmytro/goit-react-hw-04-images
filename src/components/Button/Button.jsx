import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const Btn = ({ currentPage, totalPages, loadMore }) => {
  return (
    <>
      {currentPage < totalPages && (
        <Button variant="contained" id="load-more-btn" onClick={loadMore}>
          Load more
        </Button>
      )}
    </>
  );
};

Btn.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  loadMore: PropTypes.func,
};

export default Btn;
