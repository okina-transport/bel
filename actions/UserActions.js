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
