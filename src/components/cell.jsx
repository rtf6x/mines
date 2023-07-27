import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  openCell as _openCell,
  flagCell as _flagCell,
  endGame as _endGame,
  startGame as _startGame,
  tickGame as _tickGame,
  openCellsAround as _openCellsAround,
} from '../actions';

class Cell extends Component {
  render() {
    const { openCell, flagCell, endGame, startGame, cell, blowedUp, gameStarted, tickGame, mines, openCellsAround, finished } = this.props;
    let open = (e) => {
      switch (e.button){
        case 0:
          if (cell.marked || blowedUp || finished) {
            return;
          } else if (!gameStarted) {
            return startGame(setInterval(() => tickGame(), 1000), mines, cell.row, cell.cell);
          } else if (cell.hasMine) {
            return endGame(cell.row, cell.cell);
          } else if (cell.opened && !cell.hasMine){
            return openCellsAround(cell.row, cell.cell);
          }
          return openCell(cell.row, cell.cell);
        case 2:
          if (blowedUp || finished) {
            return;
          }
          return flagCell(cell.row, cell.cell, !cell.marked);
        default:
          if (blowedUp || finished) {
            return;
          }
          return flagCell(cell.row, cell.cell, !cell.marked);
      }
    };
    let className = 'cell';

    if (cell.marked) {
      className += ' cell-flag';
      if (!cell.hasMine && blowedUp) {
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
      }
    }

    return (
      <div onMouseUp={open} className={className} />
    )
  }
}

Cell.propTypes = {
  flagCell: PropTypes.func.isRequired,
  openCell: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  tickGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  openCellsAround: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired,
  cellKey: PropTypes.number.isRequired,
  rowKey: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
};

Cell = connect(
  (state, props) => {
    return {
      cell: state.game.field[props.rowKey][props.cellKey],
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
    openCellsAround: (row, cell) => {
      dispatch(_openCellsAround(row, cell))
    },
  })
)(Cell);

export default Cell;
