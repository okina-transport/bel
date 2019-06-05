/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

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

