import React, { Component, PropTypes } from 'react';
import FileUpload from './FileUpload';
import Header from '../components/Header';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import enturTheme from '../styles/themes/naq/';
import SnackbarWrapper from '../components/SnackbarWrapper';
import RouterContainer from "./RouteContainer";

export default class Root extends React.Component {
  render() {
    const { history} = this.props;
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(enturTheme)}>
            <div className="appContent">
                <div className="version">v{process.env.VERSION}</div>
                <RouterContainer history={history} />
            </div>
        </MuiThemeProvider>
    );
  }
}
