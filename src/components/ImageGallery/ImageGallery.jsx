import { useContext, useEffect, useState } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Btn from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

import { fetchImages } from 'api';
import { Alert } from '@mui/material';
import { Context } from 'components/App';

const imagesOnPage = 12;

const ImageGallery = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('idle');

  const context = useContext(Context);

  useEffect(() => {
    if (context.name) {
      console.log(context.name);
      setCurrentPage(1);
      fetchData();
    }

    if (currentPage > 1) {
      fetchMoreImages();
    }

    async function fetchData() {
      console.log('Download');
      console.log(currentPage);
      try {
        const images = await fetchImages(
          context.name,
          currentPage,
          imagesOnPage
        );
        setData(images.data);
        setTotalPages(Math.ceil(images.data.totalHits / imagesOnPage));
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }

    async function fetchMoreImages() {
      console.log('Load more');
      console.log(currentPage);
      try {
        const images = await fetchImages(
          context.name,
          currentPage,
          imagesOnPage
        );
        setData(prevState => {
          const newData = { ...prevState };
          newData.hits = [...prevState.hits, ...images.data.hits];
          return newData;
        });
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
  }, [context.name, currentPage]);

  // useEffect(() => {
  //   async function fetchMoreImages() {
  //     console.log('Load more');
  //     console.log(currentPage);
  //     try {
  //       const images = await fetchImages(
  //         context.name,
  //         currentPage,
  //         imagesOnPage
  //       );
  //       setData(prevState => {
  //         const newData = { ...prevState };
  //         newData.hits = [...prevState.hits, ...images.data.hits];
  //         return newData;
  //       });
  //       setStatus('resolved');
  //     } catch (error) {
  //       setStatus('rejected');
  //       console.log(error);
  //     }
  //   }
  //   if (currentPage > 1) {
  //     fetchMoreImages();
  //   }
  //   // eslint-disable-next-line
  // }, [currentPage]);

  function handleLoadMore(event) {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      {status === 'idle' ? null : (
        <>
          <ul className="gallery">
            {status === 'pending' && <Loader />}
            {status === 'rejected' && (
              <Alert severity="error">Error! Reload page</Alert>
            )}
            {status === 'resolved' &&
              (data.hits.length === 0 ? (
                <Alert severity="error">There are no images!</Alert>
              ) : (
                data.hits.map(({ webformatURL, id, tags, largeImageURL }) => (
                  <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    largeImageURL={largeImageURL}
                    status={status}
                  ></ImageGalleryItem>
                ))
              ))}
          </ul>
          {
            <Btn
              currentPage={currentPage}
              totalPages={totalPages}
              loadMore={handleLoadMore}
            ></Btn>
          }
        </>
      )}
    </>
  );
};

export default ImageGallery;
