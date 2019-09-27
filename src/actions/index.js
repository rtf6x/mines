import {
  BLOW_UP,
  CHANGE_SETTINGS,
  FLAG_CELL,
  GENERATE_FIELD,
  OPEN_CELL,
  OPEN_CELLS_AROUND,
  OPEN_SETTINGS,
  START_GAME,
  TICK_GAME,
} from '../constants';

export const tickGame = () => {
  return {
    type: TICK_GAME
  };
};

export const changeSettings = (settings) => {
  return {
    type: CHANGE_SETTINGS,
    settings
  };
};

export const openSettings = () => {
  return {
    type: OPEN_SETTINGS,
    opened: true
  };
};

export const startGame = (timerInstance, mines, row, cell) => {
  return {
    type: START_GAME,
    timerInstance,
    mines,
    row,
    cell
  };
};

export const generateField = (rows, cols, mines) => {
  return {
    type: GENERATE_FIELD,
    rows,
    cols,
    mines,
  };
};

export const flagCell = (row, cell, mark) => {
  return {
    type: FLAG_CELL,
    row,
    cell,
    mark
  };
};

export const openCell = (row, cell) => {
  return {
    type: OPEN_CELL,
    row,
    cell
  };
};

export const endGame = (row, cell) => {
  return {
    type: BLOW_UP,
    row,
    cell
  };
};

export const openCellsAround = (row, cell) => {
  return {
    type: OPEN_CELLS_AROUND,
    row,
    cell
  };
};
