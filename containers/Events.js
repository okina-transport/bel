import { connect } from 'react-redux';
import React from 'react';
import UserActions from '../actions/UserActions';
import RaisedButton from 'material-ui/RaisedButton';
import Upload from 'material-ui/svg-icons/file/file-upload';
import { color } from 'bogu/styles';
import AsyncActions from '../actions/AsyncActions';
import { EventDetails } from 'bogu';
import ConfirmValidateDialog from '../components/ConfirmValidateDialog';

class Events extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDialogOpen: false
    };
  }

  componentWillMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentSupplierId !== nextProps) {
      clearTimeout(this.timeout);
    }

    if (!nextProps.isFetchingEvents) {
      this.startPolling();
    }
  }

  startPolling = () => {
    this.timeout  = setTimeout(() => {
      if (this.props.currentSupplierId) {
        this.props.dispatch(
          AsyncActions.getProviderEvents(this.props.currentSupplierId)
        );
      }
    }, 5000);
  };

  handleUploadFile() {
    this.props.dispatch(UserActions.openFileUploadDialog());
  }

  handleShowConfirmValidate() {
    this.setState({
      confirmDialogOpen: true
    });
  }

  handleCloseConfirmValidate() {
    this.setState({
      confirmDialogOpen: false
    });
  }

  handleValidate() {
    const { currentSupplierId, dispatch } = this.props;
    this.handleCloseConfirmValidate();
    dispatch(AsyncActions.validateDataSet(currentSupplierId));
  }

  handleCleanDataspace = () => {
    const response = confirm(
        'Etes-vous sûr de vouloir vider l\'espace de données ?'
    );
    if (response == true) {
      const { dispatch } = this.props;
      dispatch(UserActions.cleanDataspace(this.props.currentSupplierId));
    }
  };

  render() {
    const { events } = this.props;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 0,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <RaisedButton
            label="Importer de nouvelles données"
            labelPosition="before"
            primary={true}
            onClick={this.handleUploadFile.bind(this)}
            icon={<Upload />}
          />
          <RaisedButton
            label="Valider les données"
            primary={true}
            style={{marginLeft: 10}}
            onClick={this.handleShowConfirmValidate.bind(this)}
          />
          <RaisedButton
              label="Vider l'espace de données"
              primary={true}
              style={{marginLeft: 10}}
              onClick={this.handleCleanDataspace}
          />
        </div>
        {events && events.length
          ? <EventDetails locale="fr" dataSource={events} />
          : <div
            style={{
              padding: 40,
              background: color.tableInfo,
              marginTop: 40,
              fontWeight: 500
            }}
          >
            Aucun import de données
          </div>}
          <ConfirmValidateDialog
            open={this.state.confirmDialogOpen}
            handleClose={this.handleCloseConfirmValidate.bind(this)}
            handleConfirm={this.handleValidate.bind(this)}
          />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentSupplierId: state.asyncReducer.currentSupplier.id,
  events: state.asyncReducer.events,
  isFetchingEvents: state.asyncReducer.isFetchingEvents
});

export default connect(mapStateToProps)(Events);
