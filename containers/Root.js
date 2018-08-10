import React, { Component, PropTypes } from 'react';
import RouterContainer from "./RouteContainer";

export default class Root extends React.Component {
  render() {
    const {path, history} = this.props;
    return (
        <RouterContainer path={path} history={history} />
    );
  }
}
