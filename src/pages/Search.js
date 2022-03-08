import React, { Component } from 'react';
import Header from '../component/Header';
import Loading from '../component/Loading';
import AlbumCard from '../component/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// Solução baseada na branch de Luá Octaviano
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/lua-octaviano-trybetunes/src/pages/Search.js)
class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artist: '',
      artistSearched: '',
      searched: true,
      load: false,
      dbAlbums: [],
    };
  }

  handleText = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      searched: true,
    }, () => this.validate());
  }

  async getAlbumsAPI() {
    const { artist } = this.state;
    const currentArtist = artist;
    this.setState({
      load: true,
      artist: '',
      disabled: true,
    },
    async () => {
      const getAlbums = await searchAlbumsAPI(currentArtist);
      this.setState({
        load: false,
        searched: false,
        artistSearched: currentArtist,
        dbAlbums: getAlbums,
      });
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.getAlbumsAPI();
  }

  validate = () => {
    const { artist } = this.state;
    const MIN_LEN_ARTIST = 2;
    this.setState({ disabled: artist.length < MIN_LEN_ARTIST });
  }

  showResultAlbums = () => {
    const {
      artistSearched,
      dbAlbums } = this.state;
    return (
      <>
        { artistSearched && (
          <p>
            { `Resultado de álbuns de: ${artistSearched}`}
          </p>
        )}
        {!dbAlbums.length
          ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div className="cards-albums">
              {dbAlbums.map(
                (album) => <AlbumCard album={ album } key={ album.collectionId } />,
              )}
            </div>
          )}
      </>
    );
  }

  handleSearch = () => {
    const {
      disabled,
      artist,
      searched } = this.state;
    return (
      <form onSubmit={ this.submitForm }>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.handleText }
          name="artist"
          placeholder="Digite o nome do artista"
          value={ artist }
        />
        <button
          name="button-search-artist"
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Procurar
        </button>
        { searched ? '' : this.showResultAlbums() }
      </form>
    );
  }

  render() {
    const { load } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { load ? <Loading /> : this.handleSearch() }
      </div>
    );
  }
}

export default Search;
