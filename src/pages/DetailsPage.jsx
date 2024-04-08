import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

const BookDetails = () => {

  const param = useParams();
  console.log(param.id);

  const [book, setBook] = useState(null);
  const apiUrl = `http://localhost:3000/api/books/${param.id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiUrl]);

  return (
  <>
  <Layout/>
    <div>
      {book ? (
       <>
       <div className='detail-container'>
       <img src={`http://localhost:3000/${book.image}` } alt={book.title} className='image-container'/>
       <h2 style={{color:'blue',fontWeight:'bold'}}>{book.title}</h2>
       <h3 style={{color:'grey', fontWeight:'bold'}}>By {book.author}</h3>
       <h6>{book.type}</h6>
       </div>
       <div style={{padding:'10px 20px', textAlign:'justify'}}>
       <h2 style={{color:'violet'}}>Description</h2>
       <p style={{fontSize:'20px',color:'blue'}}>{book.description}</p>
       </div>
       </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </>
  );
};

export default BookDetails;
