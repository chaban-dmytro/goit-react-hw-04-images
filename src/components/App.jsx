import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const Context = React.createContext();

export const App = () => {
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Context.Provider
        value={{
          name: name,
          set: setName,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
        }}
      >
        <Searchbar></Searchbar>
        <ImageGallery></ImageGallery>
      </Context.Provider>
    </>
  );
};

export default App;
