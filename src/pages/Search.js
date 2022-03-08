import React, { Component } from 'react';
import Header from '../component/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artist: '',
      // load: false,
      // redirect: false,
    };
  }

  handleText = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validate());
  }

  validate = () => {
    const { artist } = this.state;
    const MIN_LEN_ARTIST = 2;
    this.setState({ disabled: artist.length < MIN_LEN_ARTIST });
  }

  render() {
    const { disabled, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
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
        </form>
      </div>
    );
  }
}

export default Search;
