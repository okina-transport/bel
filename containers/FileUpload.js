import { connect } from 'react-redux';
import React from 'react';
import ModalDialog from '../components/ModalDialog';
import UserActions from '../actions/UserActions';
import AsyncActions from '../actions/AsyncActions';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import MdClose from 'material-ui/svg-icons/navigation/close';
import '../styles/css/fileUpload.css';
import * as types from '../actions/actionTypes';
import MdCheck from 'material-ui/svg-icons/action/check-circle';
import MdError from 'material-ui/svg-icons/alert/error';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  closeModal() {
    const { dispatch } = this.props;
    this.setState({
      files: []
    });
    dispatch(UserActions.dismissFileUploadDialog());
  }

  handleOnDrop(acceptedFiles, user) {
    if (acceptedFiles.length) {
      var arrayFile = Array.from(acceptedFiles);
      arrayFile[0].user =  user.tokenParsed.preferred_username;
      this.setState({
          files: arrayFile
      });
    }
  }

  handleUpload() {
    const { dispatch } = this.props;
    const { files } = this.state;
    if (files && files.length) dispatch(AsyncActions.uploadFiles(files));
  }

  formatFileSize(size) {
    if (size > 1024) {
      return `${parseFloat(size / 1024).toFixed(2)} Mb`;
    }
    return `${parseFloat(size).toFixed(2)} Kb`;
  }

  handleDescription(description){
      let file = this.state.files[0];
      file.description = description;
      this.setState({
        file: file
      });
  }

  render() {
    const { isModalOpen, fileUpload, kc } = this.props;
    const { files } = this.state;
    const { progress, state } = fileUpload;

    const totalFileSize = files.length
      ? files.map(file => file.size / 1024).reduce((f1, f2) => f1 + f2)
      : 0;

    return (
      <ModalDialog isOpen={isModalOpen} onClose={() => this.closeModal()}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 15,
            justifyContent: 'space-between'
          }}
        >
          <div style={{display: 'flex'}}>
            <div
              style={{
                fontSize: '1.1em',
                marginLeft: 10,
                textTransform: 'uppercase'
              }}
            >
              Importer de nouvelles données
            </div>
          </div>
          <MdClose
            style={{ marginRight: 15, cursor: 'pointer' }}
            onClick={() => this.closeModal()}
          />
        </div>
          <div className="file-zone">
              <input className="file-select" type="file" onChange={(e) => this.handleOnDrop(e.target.files, kc)}/>
          </div>
          <div
              style={{
                  marginLeft: 20,
                  marginTop: 20,
                  textTransform: 'uppercase'
              }}
          >Description (Facultatif)
          </div>
          <div className="file-zone-description">
            <textarea
                disabled={!files.length}
                className="file-list"
                onChange={(e) => this.handleDescription(e.target.value)}
            />
          </div>
        {state === types.FILE_UPLOAD_COMPLETED
          ? <div
              style={{
                maxWidth: '65%',
                margin: '20px auto',
                display: 'flex',
                padding: 10,
                background: 'rgba(0, 128, 0, 0.1)',
                alignItems: 'middle'
              }}
            >
              <MdCheck color="green" />
              {' '}<div
                style={{
                  marginLeft: 5,
                  textTransform: 'uppercase',
                  position: 'relative',
                  top: 3
                }}
              >
                Les données sont chargées
              </div>
            </div>
          : null}
        {state === types.FILE_UPLOAD_FAILED
          ? <div
              style={{
                maxWidth: '65%',
                textAlign: 'center',
                margin: '20px auto',
                display: 'flex',
                padding: 10,
                background: 'rgba(255, 0, 0, 0.05)',
                alignItems: 'middle'
              }}
            >
              <MdError color="red" />
              {' '}<div
                style={{
                  marginLeft: 5,
                  textTransform: 'uppercase',
                  position: 'relative',
                  top: 3
                }}
              >
                Erreur lors de l'envoi du fichier
              </div>
            </div>
          : null}
        <div style={{ maxWidth: '75%', margin: '20px auto' }}>
          {state !== types.FILE_UPLOAD_NOT_STARTED
            ? <LinearProgress mode="determinate" value={progress} />
            : null}
        </div>
        <div
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <div
            style={{
              fontSize: '0.9em',
              visibility: totalFileSize ? 'visible' : 'hidden'
            }}
          >
            Taille totale : {this.formatFileSize(totalFileSize)}
          </div>
          <RaisedButton
            style={{ marginRight: 10 }}
            disabled={!files.length}
            label="Importer les données"
            primary={true}
            onClick={() => this.handleUpload()}
          />
        </div>
      </ModalDialog>
    );
  }
}

const mapStateToProps = state => ({
  isModalOpen: state.userReducer.isModalOpen,
  fileUpload: state.userReducer.fileUpload,
  kc: state.userReducer.kc
});

export default connect(mapStateToProps)(FileUpload);
