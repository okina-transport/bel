import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MdAccount from 'material-ui/svg-icons/action/account-circle';
import Identity from 'material-ui/svg-icons/action/perm-identity';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { connect } from 'react-redux';
import AsyncActions from '../actions/AsyncActions';
import roleParser from '../roles/roleParser';
import logo from '../static/logo/logo_ratp.png';
import { darkColor, primaryDarker } from '../styles/themes/naq/';
import MdLibraryBooks from 'material-ui/svg-icons/av/library-books';
import UserActions from '../actions/UserActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleSupplierChange(id) {
    if (id > -1) {
      this.props.dispatch(AsyncActions.getProviderStatus(id));
    }
    this.handleRequestClose();
  }

  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  goToDocumentaryBase() {
    this.props.dispatch(UserActions.navigateTo('documentaryBase', ''));
  }

  render() {
    const { activeSupplier, kc, supplierList } = this.props;
    let title = activeSupplier ? activeSupplier.name : '';
    let signOut = 'Déconnecter ' + kc.tokenParsed.preferred_username;

    let userOrganisations = roleParser.getUserOrganisations(
      kc.tokenParsed,
      supplierList
    );

    return (
      <div>
        <AppBar
          title={
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{pointerEvents: 'none'}}>{title}</div>
              <img src={logo} style={{width: 140, height: 'auto', marginTop:10}}/>
            </div>
          }
          showMenuIconButton={true}
          style={{ background: darkColor }}
          iconElementLeft={
            <IconButton onTouchTap={this.handleTouchTap}>
              <Identity />
            </IconButton>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                leftIcon={<MdLibraryBooks color={primaryDarker}/>}
                onClick={this.goToDocumentaryBase.bind(this)}
                primaryText={"Base documentaire"}
              />
              <MenuItem
                leftIcon={<MdAccount color={primaryDarker}/>}
                primaryText={signOut}
                onClick={() => kc.logout()}
              />
            </IconMenu>
          }
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          {this.props.supplierList
            ? <Menu>
                {userOrganisations.map((supplier, index) =>
                  <MenuItem
                    key={'supplier' + index}
                    onClick={() => {
                      this.handleSupplierChange(supplier.id);
                    }}
                    primaryText={supplier.name}
                    secondaryText={<span style={{fontSize: '0.8em'}}>{supplier.id}</span>}
                  />
                )}
              </Menu>
            : <div style={{ padding: 20 }}>Ingen forhandlere</div>}
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supplierList: state.asyncReducer.suppliers,
  activeSupplier: state.asyncReducer.currentSupplier,
  kc: state.userReducer.kc
});

export default connect(mapStateToProps)(Header);
