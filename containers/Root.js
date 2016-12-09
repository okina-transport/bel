import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import AsyncActions from '../actions/AsyncActions'
import FileUpload from './FileUpload'
import ValidationReport from './ValidationReport'
import Header from '../components/Header'
import Main from './Main'
import Footer from '../components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="appContent">
          <Header/>
          <Main/>
          <FileUpload/>
          <ValidationReport/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
}