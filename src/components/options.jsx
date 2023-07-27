import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changeSettings as _changeSettings,
  openSettings as _openSettings,
} from '../actions';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.settings;
    this.changeRows = this.changeRows.bind(this);
    this.changeCols = this.changeCols.bind(this);
    this.changeMines = this.changeMines.bind(this);
  }

  changeRows(event) {
    this.props.settings.rows = parseInt(event.target.value);
  }

  changeCols(event) {
    this.props.settings.cols = parseInt(event.target.value);
  }

  changeMines(event) {
    this.props.settings.mines = parseInt(event.target.value);
  }

  openSettings() {
    this.props.settings.opened = true;
  }

  render() {
    let { changeSettings, openSettings, settings } = this.props;
    if (!settings.opened){
      return (
        <div className="settings_form">
          <button
            className="open_settings"
            onClick={openSettings}>
            Open Settings
          </button>
        </div>
      )
    }
    return (
      <div className="settings_form">
        <div className="rows">
          <label htmlFor="rows">Rows:</label>
          <input defaultValue={settings.rows} onChange={this.changeRows}/>
        </div>
        <div className="cols">
          <label htmlFor="cols">Cols:</label>
          <input defaultValue={settings.cols} onChange={this.changeCols}/>
        </div>
        <div className="mines">
          <label htmlFor="mines">Mines count:</label>
          <input defaultValue={settings.mines} onChange={this.changeMines}/>
        </div>
        <button
          className="change_settings"
          onClick={(e) => changeSettings(settings)}>
          Change Settings
        </button>
      </div>
    )
  }
}

Options.propTypes = {
  changeSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

Options = connect(
  (state, props) => {
    return {
      settings: state.settings,
    }
  },
  dispatch => ({
    changeSettings: (settings) => {
      dispatch(_changeSettings(settings))
    },
    openSettings: () => {
      dispatch(_openSettings())
    },
  })
)(Options);

export default Options;
