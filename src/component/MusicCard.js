import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

// Solução baseada na branch de Luá Octaviano
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/lua-octaviano-trybetunes/src/components/MusicCard.js)
class MusicCard extends Component {
  handleFavoritesSongs = async ({ target }) => {
    const { track, toggleLoad, updateFavoriteSongs } = this.props;
    const wasChecked = !target.checked;
    toggleLoad();
    if (wasChecked) {
      await removeSong(track);
    } else {
      await addSong(track);
    }
    await updateFavoriteSongs();
    toggleLoad();
  }

  render() {
    const { track, favoritesList } = this.props;
    const { trackName, previewUrl, trackId } = track;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `check-${trackId}` }>
          Favorita
          <input
            id={ `check-${trackId}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => this.handleFavoritesSongs(event, trackId) }
            checked={ favoritesList.some((song) => song.trackId === trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleLoad: PropTypes.func.isRequired,
  updateFavoriteSongs: PropTypes.func.isRequired,
  favoritesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
