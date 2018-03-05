import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import cfgreader from '../config/readConfig';
import TabsContainer from './TabsContainer';
import AsyncActions from '../actions/AsyncActions';

class Main extends React.Component {
  componentDidMount() {
    this.props.dispatch(AsyncActions.getAllSuppliers());
  }

  handleLogout() {
    const { kc } = this.props;
    localStorage.removeItem('BEL::jwt');
    kc.logout();
  }

  render() {
    const { noOrganisations } = this.props;

    if (!noOrganisations) {
      return (
        <div>
          <TabsContainer />
        </div>
      );
    } else {
    }
    return (
      <div>
        <div style={{ marginTop: 20, fontWeight: 600, fontSize: 18 }}>
          Cet utilisateur n'est affilié à aucune organisation
        </div>
        <div>
          <a href="mailto:rmr@okina.fr
          ?subject=[RMR] Portail fournisseurs de données : problème d'accès">Contactez votre administrateur pour corriger les droits d'accès.</a>
        </div>
        <a
          style={{ cursor: 'pointer' }}
          onClick={this.handleLogout.bind(this)}
        >
          Se déconnecter
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noOrganisations: state.userReducer.noOrganisations,
  kc: state.userReducer.kc
});

export default connect(mapStateToProps)(Main);
