import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const Context = React.createContext();

export const App = () => {
  const [name, setName] = useState('');

  return (
    <>
      <Context.Provider value={{ name: name, set: setName }}>
        <Searchbar></Searchbar>
        <ImageGallery></ImageGallery>
      </Context.Provider>
    </>
  );
};

export default App;
