import {
  BLOW_UP,
  STOP_GAME,
  TICK_GAME,
  OPEN_CELL,
  FLAG_CELL,
  CHANGE_SETTINGS,
  START_GAME,
  GENERATE_FIELD,
  OPEN_CELLS_AROUND,
} from '../constants';

import {
  field,
  minesLeft,
  checkFailedFlags,
  reRenderCell,
  generateField,
  generateMines,
  revealBombs,
  cellsToOpenLeft,
  installFlag,
  openCell,
  openCellsAround,
} from './helpers';

const game = (state = {
  field: field,
  started: false,
  timer: 0
}, action) => {
  switch (action.type) {

    case CHANGE_SETTINGS:
      clearInterval(state.timerInstance);
      generateField(action.settings.rows, action.settings.cols, action.settings.mines);
      return {
        field,
        started: false,
        timer: 0,
        minesLeft
      };

    case START_GAME:
      generateMines(action.mines, action.row, action.cell);
      return {
        ...state,
        field,
        started: true,
        timerInstance: !state.timerInstance ? action.timerInstance : state.timerInstance
      };

    case GENERATE_FIELD:
      clearInterval(state.timerInstance);
      generateField(action.rows, action.cols, action.mines);
      return {
        field,
        started: false,
        timer: 0,
        minesLeft
      };

    case FLAG_CELL:
      installFlag(action.row, action.cell, action.mark);
      return {
        ...state,
        field,
        minesLeft
      };

    case OPEN_CELL:
      openCell(action.row, action.cell);
      if (!cellsToOpenLeft) {
        clearInterval(state.timerInstance);
      }
      return {
        ...state,
        field,
        started: !!cellsToOpenLeft,
        finished: !cellsToOpenLeft
      };

    case OPEN_CELLS_AROUND:
      openCellsAround(action.row, action.cell);
      if (checkFailedFlags()) {
        revealBombs();
        clearInterval(state.timerInstance);
        return {
          ...state,
          field,
          started: false,
          blowedUp: true
        };
      }
      if (!cellsToOpenLeft) {
        clearInterval(state.timerInstance);
      }
      return {
        ...state,
        field,
        started: !!cellsToOpenLeft,
        finished: !cellsToOpenLeft
      };

    case BLOW_UP:
      clearInterval(state.timerInstance);
      reRenderCell(action.row, action.cell, { opened: true, hit: true });
      revealBombs();
      return {
        ...state,
        field,
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