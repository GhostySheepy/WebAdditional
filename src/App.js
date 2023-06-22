import React, { useState, useEffect } from 'react';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  const fetchAlbumPhotos = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((response) => response.json())
      .then((data) => setAlbumPhotos(data));
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    fetchAlbumPhotos(albumId);
  };

  const handleClosePopup = () => {
    setSelectedAlbum(null);
    setAlbumPhotos([]);
  };

  return (
    <div className="App">
      <h1 className='headerMain'>Альбоми</h1>
      <div className="grid">
        {albums.map((album) => (
          <div
            key={album.id}
            className="albumCard"
            onClick={() => handleAlbumClick(album.id)}
          >
            <p className='albumTitle'>{album.title}</p>
          </div>
        ))}
      </div>
      {selectedAlbum && (
        <div className="popup">
          <div className="popupContent">
            <div className="popupHeader">
            <h2>Фото</h2>
              <button className="closeButton" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="photoGrid">
              {albumPhotos.map((photo) => (
                <div key={photo.id} className="photoCard">
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
