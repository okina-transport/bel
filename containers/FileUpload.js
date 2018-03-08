import { connect } from 'react-redux';
import React from 'react';
import ModalDialog from '../components/ModalDialog';
import UserActions from '../actions/UserActions';
import AsyncActions from '../actions/AsyncActions';
import Dropzone from 'react-dropzone';
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

  handleOnDrop(acceptedFiles) {
    if (acceptedFiles.length) {
      this.setState({
        files: acceptedFiles
      });
      return false;
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

  render() {
    const { isModalOpen, fileUpload } = this.props;
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
        <Dropzone
          className="dropZone"
          activeClassName="dropZone--active"
          rejectClassName="dropZone--reject"
          accept=".zip,.rar"
          onDrop={(accepted, rejected) => {
            if (rejected && rejected.length) {
              console.warn('File not accepted', rejected);
            } else {
              this.handleOnDrop(accepted);
            }
          }}
        >
          <div
            style={{
              color: 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: '0.9em',
              maxWidth: '65%',
              margin: 'auto'
            }}
          >
            Faites glisser des fichiers ici, ou bien cliquez pour sélectionner les fichiers à télécharger.
            Seuls les fichiers au format zip et rar sont pris en charge.
          </div>
        </Dropzone>
        <div className="filelist">
          <select className="file-select" multiple>
            {files.map((file, index) => {
              return <option key={'file-' + index}>{file.name}</option>;
            })}
          </select>
        </div>
        {state == types.FILE_UPLOAD_COMPLETED
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
        {state == types.FILE_UPLOAD_FAILED
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
  fileUpload: state.userReducer.fileUpload
});

export default connect(mapStateToProps)(FileUpload);
