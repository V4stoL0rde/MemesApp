import React, { useState, useEffect } from 'react';

const Home = () => {
  const [memes, setMemes] = useState([]);

  const fetchMemes = async (sortBy) => {
    try {
      const response = await fetch(
        `https://memes-api.grye.org/memes?sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMemes(data);
      } else {
        console.error('Error al obtener memes');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMemes('new');
  }, []);

  return (
    <div className="home-container">
      <div className="sort-buttons">
        <button onClick={() => fetchMemes('new')}>Más nuevos</button>
        <button onClick={() => fetchMemes('likes')}>Más likes</button>
      </div>
      <div className="gallery">
        {memes.map((meme) => (
          <div className="post" key={meme.id}>
            <img src={meme.imageUrl} alt="Meme" />
            <div className="post-info">
              <button>👍 {meme.likes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
