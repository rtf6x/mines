import React, { Component } from 'react';
import Controls from './controls.jsx';
import Field from './field.jsx';
import Options from './options.jsx';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Controls/>
        <Field/>
        <Options/>
      </div>
    );
  }
}

export default App;
