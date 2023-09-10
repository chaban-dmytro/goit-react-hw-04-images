import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';


export const fetchImages = async ( name, currentPage, imagesOnPage ) => {
  return await axios.get( `/?&page=${currentPage}&q=${name}`,
    {
      params: {
        key: '38307490-77491a55abe31d7c70378f259',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: imagesOnPage,
      },
    }
  )
}