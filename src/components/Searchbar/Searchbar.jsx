import { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Context } from 'components/App';

export const Searchbar = () => {
  const [name, setName] = useState('');

  const context = useContext(Context);

  function handleFormChange(event) {
    setName(event.currentTarget.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (name.trim() === '') {
      alert('Enter name!');
      return;
    }
    context.set(name);
    context.setCurrentPage(1);
    setName('');
  }

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleFormSubmit}>
        <Button variant="contained" type="submit" className="button">
          <span className="button-label">Search</span>
        </Button>
        <TextField
          id="outlined-basic"
          label="Search images and photos"
          variant="outlined"
          value={name}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleFormChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
