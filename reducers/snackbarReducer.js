import * as types from './../actions/actionTypes';

const intialState = {
  isOpen: false,
  message: '',
  status: null,
  errorMsg: null,
};

const snackbarReducer = (state = intialState, action) => {
  switch (action.type) {

    case types.SUCCESS_VALIDATE_DATASET:
      return Object.assign({}, state, {
        isOpen: true,
        message: 'La validation a démarré',
        status: types.STATUS_SUCCESS,
        errorMsg: null
      });

    case types.ERROR_VALIDATE_DATASET:
      return Object.assign({}, state, {
        isOpen: true,
        message: 'Une erreur inattendue s\'est produite',
        status: types.STATUS_ERROR,
        errorMsg: action.payLoad.errorMsg
      });

    case types.DISMISSED_SNACKBAR:
      return Object.assign({}, state, intialState);

    default:
      return state;
  }
};

export default snackbarReducer;

