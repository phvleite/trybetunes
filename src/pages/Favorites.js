import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      favoritesList: [],
    };
  }

  async componentDidMount() {
    this.setState({ load: true }, async () => {
      const favoritesList = await getFavoriteSongs();
      this.setState({
        load: false,
        favoritesList });
    });
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
    const { load, favoritesList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { load ? <Loading /> : (
          <div>
            {favoritesList.map((track, index) => (
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

export default Favorites;
