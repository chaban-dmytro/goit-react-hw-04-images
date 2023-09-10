import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const Btn = ({ state, loadMore }) => {
  return (
    <>
      {state.currentPage < state.totalPages && (
        <Button variant="contained" id="load-more-btn" onClick={loadMore}>
          Load more
        </Button>
      )}
    </>
  );
};

Btn.propTypes = {
  state: PropTypes.object,
  loadMore: PropTypes.func,
};

export default Btn;
