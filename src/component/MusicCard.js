import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';

// Solução baseada na branch de Luá Octaviano
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/lua-octaviano-trybetunes/src/components/MusicCard.js)
class MusicCard extends Component {
  render() {
    const { track } = this.props;
    const { trackName, previewUrl } = track;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
