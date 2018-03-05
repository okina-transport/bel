import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmDialog extends Component {
  render() {

    const { open, handleClose, handleConfirm } = this.props;

    const actions = [
      <FlatButton
        label={"Annuler"}
        onClick={handleClose}
      />,
      <FlatButton
        primary={true}
        label={"Valider"}
        onClick={handleConfirm}
      />
    ];

    return (
      <Dialog
        actions={actions}
        title={"Valider des données"}
        open={open}
        onRequestClose={() => {
          console.log("Closing dialog")
        }}
      >
        <span>
          Voulez-vous lancer la validation des données ?
        </span>
      </Dialog>
    );
  }
}

export default ConfirmDialog;

