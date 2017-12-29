import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { generateField } from '../actions';

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
      <div className="controls">
        <button
          className="generate"
          onClick={(e) => dispatch(generateField(settings.rows, settings.cols, settings.mines))}>
          New (F2)
        </button>
        <div className={timerClass}>{time}</div>
        <div className="mines_count">Mines left: <span>{game.minesLeft}</span></div>
      </div>
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