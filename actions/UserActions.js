import * as types from './actionTypes';
import { browserHistory } from 'react-router';
import axios from 'axios';

const UserActions = {};

const goToRoute = (path) => {
    const basePath = window.config.endpointBase;
    if (path.length && path[0] === '/') {
        path = path.slice(1);
    }
    browserHistory.push(basePath + path);
};

const getConfig = () => {
    let config = {};
    let token = localStorage.getItem('BEL::jwt');

    config.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };
    return config;
};

function sendData(payLoad, type) {
    return {
        payLoad: payLoad,
        type: type
    };
}

function requestCleanDataspace() {
    return { type: types.REQUEST_DELETE_DATA };
}

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

UserActions.addNotification = (message, level) => {
    return {
        type: types.ADD_NOTIFICATION,
        message,
        level
    };
};

UserActions.logEvent = event => {
    return {
        type: types.LOG_EVENT,
        payLoad: event
    };
};


UserActions.cleanDataspace = id => dispatch => {
    const url = window.config.timetableAdminBaseUrl + `${id}/clean`;

    dispatch(requestCleanDataspace());
    return axios({
        url: url,
        timeout: 20000,
        method: 'post',
        ...getConfig()
    })
        .then(function(response) {
            dispatch(sendData(response.data, types.SUCCESS_DELETE_DATA));
            dispatch(
                UserActions.addNotification(
                    'Suppression des données',
                    'success'
                )
            );
            dispatch(
                UserActions.logEvent({
                    title: `Cleaned data space for provider ${id}`
                })
            );
        })
        .catch(function(response) {
            dispatch(sendData(response.data, types.ERROR_DELETE_DATA));
            dispatch(
                UserActions.addNotification(
                    'Erreur lors de la suppression des données',
                    'error'
                )
            );
            dispatch(
                UserActions.logEvent({
                    title: `Cleaning data space failed for provider ${id}`
                })
            );
        });
};

export default UserActions;
