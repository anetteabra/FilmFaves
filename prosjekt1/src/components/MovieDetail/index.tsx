import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieDetail.module.css';

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the movie ID from the URL
  
    return (
      <div>
        <h1>Movie Details for ID: {id}</h1>
        {/* Fetch and display movie details using the ID */}
      </div>
    );
  };
  
  export default MovieDetail;
