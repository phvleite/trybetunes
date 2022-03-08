import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Solução baseada na branch de Luá Octaviano
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/lua-octaviano-trybetunes/src/components/AlbumCard.js)
class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = album;
    return (
      <div className="card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <span className="albumTitle">{collectionName}</span>
        <span className="artistName">{artistName}</span>
        <span className="release">{releaseDate}</span>
        <span className="track-count">{trackCount}</span>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Visualizar álbum
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AlbumCard;
