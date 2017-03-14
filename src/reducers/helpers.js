export const changeCell = (field, row, cell, object) => {
  return [
    ...field.slice(0, row), [
      ...field[row].slice(0, cell),
      Object.assign({}, field[row][cell], object),
      ...field[row].slice(cell + 1),
    ], ...field.slice(row + 1)
  ];
};

export const revealBombs = (field) => {
  for (let row = 0; row < field.length; row++) {
    for (let cell = 0; cell < field[row].length; cell++) {
      if (field[row][cell].hasMine && !field[row][cell].marked){
        field = changeCell(field, row, cell, { opened: true });
      }
      if (!field[row][cell].hasMine && field[row][cell].marked){
        field = changeCell(field, row, cell, { fail: true });
      }
    }
  }
  return field;
};

export const installRandomMine = (field, fcRow, fcCell) => {
  var row = Math.floor(Math.random() * field.length);
  var cell = Math.floor(Math.random() * field[row].length);
  if (field[row][cell].hasMine || (fcRow == row && fcCell == cell)) {
    field = installRandomMine(field, fcRow, fcCell);
  } else {
    field = changeCell(field, row, cell, { hasMine: true, label: 'X' });
  }
  return field;
};

export const unreveal = (field, row, cell) => {
  if (!field[row]) return field;
  if (!field[row][cell]) return field;
  if (field[row][cell].marked) return field;
  if (field[row][cell].opened) return field;
  field = changeCell(field, row, cell, { opened: true });
  if (!field[row][cell].label) {
    field = unreveal(field, row, cell + 1);
    field = unreveal(field, row, cell - 1);
    field = unreveal(field, row + 1, cell - 1);
    field = unreveal(field, row + 1, cell);
    field = unreveal(field, row + 1, cell + 1);
    field = unreveal(field, row - 1, cell - 1);
    field = unreveal(field, row - 1, cell);
    field = unreveal(field, row - 1, cell + 1);
  }
  return field;
};

export const markMines = (field, row, cell) => {
  // left, right
  plusOne(field, row, cell + 1);
  plusOne(field, row, cell - 1);
  // top, top-left, top-right
  plusOne(field, row - 1, cell);
  plusOne(field, row - 1, cell + 1);
  plusOne(field, row - 1, cell - 1);
  // bottom, bottom-left, bottom-right
  plusOne(field, row + 1, cell);
  plusOne(field, row + 1, cell + 1);
  plusOne(field, row + 1, cell - 1);
};

export const checkMinesAround = (state, row, cell) => {
  // Проверить количество мин вокруг. Если выделено нужное количество, открываем.
  if (state.field[row][cell].label <= markedMinesCountAround(state.field, row, cell)) {
    state.field = unreveal(state.field, row, cell + 1);
    state.field = unreveal(state.field, row, cell - 1);
    state.field = unreveal(state.field, row + 1, cell - 1);
    state.field = unreveal(state.field, row + 1, cell);
    state.field = unreveal(state.field, row + 1, cell + 1);
    state.field = unreveal(state.field, row - 1, cell - 1);
    state.field = unreveal(state.field, row - 1, cell);
    state.field = unreveal(state.field, row - 1, cell + 1);
  }

  if (checkFailedMines(state.field)){
    clearInterval(state.timerInstance);
    return {
      ...state,
      field: revealBombs(state.field),
      started: false,
      blowedUp: true
    };
  }
  return state;
};

export const checkFailedMines = (field) => {
  let count = 0;
  field.map(function(row){
    return row.map(function(cell){
      if (cell.hasMine && !cell.marked && cell.opened){
        cell.opened = true;
        cell.hit = true;
        count++;
      }
      return cell;
    });
  });
  return count;
};

export const checkClosedCellsLeft = (state) => {
  let count = 0;
  state.field.map(function(row){
    return row.map(function(cell){
      if (!cell.hasMine && !cell.opened){
        count++;
      }
      return cell;
    });
  });
  if (!count){
    clearInterval(state.timerInstance);
    state.started = false;
    state.finished = true;
  }
};

export const markedMinesCountAround = (field, row, cell) => {
  var count = 0;
  if (field[row]     && field[row][cell + 1]      && field[row][cell + 1].marked) count++;
  if (field[row]     && field[row][cell - 1]      && field[row][cell - 1].marked) count++;
  if (field[row + 1] && field[row + 1][cell - 1]  && field[row + 1][cell - 1].marked) count++;
  if (field[row + 1] && field[row + 1][cell]      && field[row + 1][cell].marked) count++;
  if (field[row + 1] && field[row + 1][cell + 1]  && field[row + 1][cell + 1].marked) count++;
  if (field[row - 1] && field[row - 1][cell - 1]  && field[row - 1][cell - 1].marked) count++;
  if (field[row - 1] && field[row - 1][cell]      && field[row - 1][cell].marked) count++;
  if (field[row - 1] && field[row - 1][cell + 1]  && field[row - 1][cell + 1].marked) count++;
  return count;
};

export const plusOne = (field, row, cell) => {
  if (!field[row] || !field[row][cell]) return;
  if (!field[row][cell].hasMine) {
    field[row][cell].label ? field[row][cell].label++ : field[row][cell].label = 1;
  }
};

export const generateMines = (field, mines, fcRow, fcCell) => {
  let rows = field.length;
  let cols = field[0].length;
  if (mines >= (rows * cols)) {
    field = field.map(function(row){
      return row.map(function(cell){
        cell.hasMine = true;
        return cell;
      });
    });
    // for (let row = 0; row < field.length; row++) {
    //   for (let cell = 0; cell < field[row].length; cell++) {
    //     field = changeCell(field, row, cell, { hasMine: true });
    //   }
    // }
  } else for (let i = 1; i <= mines; i++) {
    field = installRandomMine(field, fcRow, fcCell);
  }

  // Расставляем цифры
  field = field.map(function(row){
    return row.map(function(cell){
      if (cell.hasMine) {
        markMines(field, cell.row, cell.cell);
      }
      return cell;
    });
  });

  if (!field[fcRow][fcCell].label) {
    field = unreveal(field, fcRow, fcCell);
  }
  field = changeCell(field, fcRow, fcCell, { opened: true });

  return field;
};

export const generateField = (rows, cols) => {
  let field = [];
  for (let row = 0; row < rows; row++) {
    field[row] = [];
    for (let cell = 0; cell < cols; cell++) {
      field[row][cell] = {
        row: row,
        cell: cell,
        opened: false,
        hasMine: false
      }
    }
  }

  return field;
};
