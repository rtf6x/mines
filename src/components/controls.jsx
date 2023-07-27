import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { generateField } from '../actions';

const StyledControls = styled.div`
  .mines_count {
    font-size: 12px;
  }

  .timer {
    font-size: 18px;
    margin: 10px 0;

    &.green {
      color: green;
    }

    &.red {
      color: red;
    }
  }

  & button {
    border-style: solid;
    border-width: 0 0 3px;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    color: #FFFFFF;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: all 200ms ease-in-out 0s;
    white-space: nowrap;
    font-family: "Gotham Rounded A", "Gotham Rounded B", Helvetica, Arial, sans-serif;
    font-weight: 700;
    padding: 10px 20px;
    font-size: 12px;
    border-color: #288541;
    background-color: #50aa69;

    &:hover, &:focus, &:active {
      background-color: #4BC970;
      border-color: #3AC162;
    }
  }

  .generate {
    margin: 20px 0 0;
    border-style: solid;
    border-width: 0 0 3px;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    color: #FFFFFF;
    border-radius: 6px;
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: all 200ms ease-in-out 0s;
    white-space: nowrap;
    font-family: "Gotham Rounded A", "Gotham Rounded B", Helvetica, Arial, sans-serif;
    font-weight: 700;
    padding: 5px 10px 5px;
    font-size: 12px;
    border-color: #284185;
    background-color: #5069aa;

    &:hover, &:focus, &:active {
      background-color: #4B70C9;
      border-color: #3A62C1;
    }
  }
`;

class Controls extends Component {
  _handleKeyDown(e) {
    if (e.key === 'F2') {
      this.props.dispatch(generateField(this.props.settings.rows, this.props.settings.cols, this.props.settings.mines));
      return false;
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  render() {
    const { game, dispatch, settings } = this.props;
    let minutes = Math.floor(game.timer / 60);
    let seconds = game.timer - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let time = minutes + ':' + seconds;

    let timerClass = 'timer';
    if (game.finished) timerClass += ' green';
    if (game.blowedUp) timerClass += ' red';

    return (
      <StyledControls>
        <button
          className="generate"
          onClick={(e) => dispatch(generateField(settings.rows, settings.cols, settings.mines))}>
          New (F2)
        </button>
        <div className={timerClass}>{time}</div>
        <div className="mines_count">Mines left: <span>{game.minesLeft}</span></div>
      </StyledControls>
    )
  }
}

Controls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

Controls = connect(
  (state, props) => {
    return {
      game: state.game,
      settings: state.settings
    };
  },
  dispatch => ({
    dispatch
  })
)(Controls);

export default Controls;
