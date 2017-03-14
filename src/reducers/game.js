import {
  BLOW_UP,
  STOP_GAME,
  TICK_GAME,
  OPEN_CELL,
  FLAG_CELL,
  START_GAME,
  GENERATE_FIELD,
  CHECK_MINES_AROUND,
} from '../constants';

import {
  unreveal,
  changeCell,
  generateField,
  generateMines,
  revealBombs,
  checkMinesAround,
  checkClosedCellsLeft,
} from './helpers';

const game = (state = {
  field: [],
  started: false,
  timer: 0
}, action) => {
  switch (action.type) {

    case START_GAME:
      return {
        ...state,
        field: generateMines(state.field, action.mines, action.row, action.cell),
        started: true,
        timer: !state.timer ? 0 : state.timer,
        timerInstance: !state.timerInstance ? action.timerInstance : state.timerInstance
      };

    case GENERATE_FIELD:
      clearInterval(state.timerInstance);
      return {
        field: generateField(action.rows, action.cols),
        started: false,
        timer: 0,
        minesLeft: action.mines
      };

    case FLAG_CELL:
      return {
        ...state,
        field: changeCell(state.field, action.row, action.cell, { marked: action.mark }),
        minesLeft: action.mark ? state.minesLeft - 1 : state.minesLeft + 1
      };

    case OPEN_CELL:
      if (!state.field[action.row][action.cell].label) {
        state.field = unreveal(state.field, action.row, action.cell);
      }
      state.field = changeCell(state.field, action.row, action.cell, { opened: true });
      checkClosedCellsLeft(state);
      return state;

    case CHECK_MINES_AROUND:
      return checkMinesAround(state, action.row, action.cell);

    case BLOW_UP:
      clearInterval(state.timerInstance);
      state.field = changeCell(state.field, action.row, action.cell, { opened: true, hit: true });
      return {
        ...state,
        field: revealBombs(state.field),
        started: false,
        blowedUp: true
      };

    case TICK_GAME:
      return {
        ...state,
        timer: state.timer + 1
      };

    default:
      return state;
  }
};

export default game;