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

import * as types from './actionTypes';
import { browserHistory } from 'react-router';

const UserActions = {};

const goToRoute = (path) => {
    const basePath = window.config.endpointBase;
    if (path.length && path[0] === '/') {
        path = path.slice(1);
    }
    browserHistory.push(basePath + path);
};

UserActions.openFileUploadDialog = () => dispatch =>
  dispatch({ type: types.OPENED_FILEUPLOAD_MODAL });

UserActions.dismissFileUploadDialog = () => dispatch =>
  dispatch({ type: types.DISMISSED_FILEUPLOAD_MODAL });

UserActions.dismissSnackbar = () => dispatch => {
  dispatch({ type: types.DISMISSED_SNACKBAR });
};

UserActions.navigateTo = (path) => dispatch => {
  dispatch({ type: types.NAVIGATE_TO });
  goToRoute(path);
};

export default UserActions;
