import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  openCell as _openCell,
  flagCell as _flagCell,
  endGame as _endGame,
  startGame as _startGame,
  tickGame as _tickGame,
  checkMinesAround as _checkMinesAround,
} from '../actions';

class Cell extends Component {
  render() {
    const { openCell, flagCell, endGame, startGame, cell, blowedUp, gameStarted, tickGame, mines, checkMinesAround, finished } = this.props;
    let open = (e) => openCell(cell.row, cell.cell);
    let context = (e) => flagCell(cell.row, cell.cell, !cell.marked);
    let className = 'cell';

    if (cell.hasMine) {
      open = (e) => endGame(cell.row, cell.cell);
    }

    if (cell.marked) {
      className += ' cell-flag';
      open = null;
      if (cell.fail) {
        className += ' cell-flag-fail';
      }
    }

    if (cell.opened) {
      className += ' cell-open';
      className += ' cell-dig' + cell.label;
      if (cell.hasMine) {
        className += ' cell-digX';
        if (cell.hit) {
          className += ' cell-digX-hit';
        }
      } else {
        open = (e) => {
          checkMinesAround(cell.row, cell.cell);
        };
      }
    }

    if (!gameStarted) {
      open = (e) => {
        startGame(setInterval(() => tickGame(), 1000), mines, cell.row, cell.cell);
      };
    }

    if (blowedUp || finished) {
      open = null;
      context = null;
    }

    return (
      <td onClick={open} onContextMenu={context} className={className}>
      </td>
    )
  }
}

Cell.propTypes = {
  flagCell: PropTypes.func.isRequired,
  openCell: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  tickGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  checkMinesAround: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired,
  mines: PropTypes.number.isRequired,
};

Cell = connect(
  (state, props) => {
    return {
      gameStarted: state.game.started,
      mines: state.settings.mines,
      blowedUp: state.game.blowedUp,
      finished: state.game.finished,
    }
  },
  dispatch => ({
    flagCell: (row, cell, mark) => {
      dispatch(_flagCell(row, cell, mark))
    },
    openCell: (row, cell) => {
      dispatch(_openCell(row, cell))
    },
    startGame: (timer, mines, row, cell) => {
      dispatch(_startGame(timer, mines, row, cell))
    },
    endGame: (row, cell) => {
      dispatch(_endGame(row, cell))
    },
    tickGame: (row, cell) => {
      dispatch(_tickGame(row, cell))
    },
    checkMinesAround: (row, cell) => {
      dispatch(_checkMinesAround(row, cell))
    },
  })
)(Cell);

export default Cell;