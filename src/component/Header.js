import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

// Solução encontra na branch de Tomas Breuckmann
// (https://github.com/tryber/sd-019-a-project-trybetunes/blob/tomas-breuckmann-project-trybetunes/src/components/Header.js)
class Header extends Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
      load: false,
    };
  }

  componentDidMount() {
    this.returnGetUser();
  }

  async returnGetUser() {
    this.setState(
      { load: true },
      async () => {
        const user = await getUser();
        this.setState({
          load: false,
          usuario: user,
        });
      },
    );
  }

  render() {
    const { usuario, load } = this.state;

    return (
      <header data-testid="header-component">
        <h1>Tryber Tunes</h1>
        <h2>
          { load && <Loading /> }
          Usuário:
          <p data-testid="header-user-name">{ usuario.name }</p>
        </h2>
        <ul>
          <li>
            <Link exact to="/search" data-testid="link-to-search">Search</Link>
          </li>
          <li>
            <Link exact to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li>
            <Link exact to="/profile" data-testid="link-to-profile">Profile</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
