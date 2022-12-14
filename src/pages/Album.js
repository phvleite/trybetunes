import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../component/MusicCard';

// Solução baseada na branch de Luá Octaviano
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/lua-octaviano-trybetunes/src/pages/Album.js)
class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      load: true,
      favoritesList: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musicList = await getMusics(id);
    this.setState({
      musicList,
      load: false,
    });
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs = async () => {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favoritesList: favoritesSongs,
    });
  }

  toggleLoad = () => {
    this.setState((prevState) => ({
      load: !prevState.load,
    }));
  }

  render() {
    const { musicList, load, favoritesList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { load ? <Loading /> : (
          <div>
            <img src={ musicList[0].artworkUrl100 } alt={ musicList[0].collectionName } />
            <span data-testid="album-name">{musicList[0].collectionName}</span>
            <span data-testid="artist-name">{musicList[0].artistName}</span>
            {musicList.map((track, index) => (
              index > 0
               && <MusicCard
                 track={ track }
                 key={ track.trackId }
                 favoritesList={ favoritesList }
                 updateFavoriteSongs={ this.updateFavoriteSongs }
                 toggleLoad={ this.toggleLoad }
               />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
