import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { getUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Profile extends Component {
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
    const { name, email, image, description } = usuario;
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Profile</h2>
        { load
          ? <Loading />
          : (
            <>
              <img src={ image } data-testid="profile-image" alt={ `Usuário: ${name}` } />
              <span>{name}</span>
              <span>{email}</span>
              <span>{description}</span>
              <div>
                <Link exact to="/profile/edit">Editar perfil</Link>
              </div>
            </>
          ) }
      </div>
    );
  }
}

export default Profile;
