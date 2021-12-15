import React, { Component } from "react";

class LoadingWheel extends React.Component {
  render() {
    return (
      <div id="loadingWrapper">
        <div id="loadingWheelWrapper">
          <div id="loadingWheel"></div>
        </div>
      </div>
    );
  }
}

export default LoadingWheel;
