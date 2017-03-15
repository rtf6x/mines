export var field = [];
export var bombs = [];
export var cellsToOpenLeft = 0;

export const reRenderCell = (row, cell, newProps) => {
  field[row][cell] = Object.assign({}, field[row][cell], newProps);
};

export const openCell = (row, cell) => {
  if (!field[row][cell].label) {
    unreveal(row, cell);
  } else {
    reRenderCell(row, cell, { opened: true });
    cellsToOpenLeft--;
  }
};

export const unreveal = (row, cell) => {
  if (!field[row]) return;
  if (!field[row][cell]) return;
  if (field[row][cell].marked) return;
  if (field[row][cell].opened) return;
  reRenderCell(row, cell, { opened: true });
  cellsToOpenLeft--;
  if (!field[row][cell].label) {
    unreveal(row, cell + 1);
    unreveal(row, cell - 1);
    unreveal(row + 1, cell - 1);
    unreveal(row + 1, cell);
    unreveal(row + 1, cell + 1);
    unreveal(row - 1, cell - 1);
    unreveal(row - 1, cell);
    unreveal(row - 1, cell + 1);
  }
};

export const installFlag = (row, cell, mark) => {
  if (!field[row][cell].opened) reRenderCell(row, cell, { marked: mark });
};

export const revealBombs = () => {
  bombs.map(function (bomb) {
    if (!field[bomb.row][bomb.cell].marked) {
      field[bomb.row][bomb.cell].opened = true;
    }
  });
};

export const openCellsAround = (row, cell) => {
  if (field[row][cell].label <= markedMinesCountAround(row, cell)) {
    unreveal(row, cell + 1);
    unreveal(row, cell - 1);
    unreveal(row + 1, cell - 1);
    unreveal(row + 1, cell);
    unreveal(row + 1, cell + 1);
    unreveal(row - 1, cell - 1);
    unreveal(row - 1, cell);
    unreveal(row - 1, cell + 1);
  }
};

export const checkFailedFlags = () => {
  let count = 0;
  bombs.map((bomb) => {
    if (!field[bomb.row][bomb.cell].marked && field[bomb.row][bomb.cell].opened) {
      reRenderCell(field[bomb.row][bomb.cell].row, field[bomb.row][bomb.cell].cell, { hit: true });
      count++;
    }
  });
  return count;
};

export const markedMinesCountAround = (row, cell) => {
  var count = 0;
  if (field[row] && field[row][cell + 1] && field[row][cell + 1].marked) count++;
  if (field[row] && field[row][cell - 1] && field[row][cell - 1].marked) count++;
  if (field[row + 1] && field[row + 1][cell - 1] && field[row + 1][cell - 1].marked) count++;
  if (field[row + 1] && field[row + 1][cell] && field[row + 1][cell].marked) count++;
  if (field[row + 1] && field[row + 1][cell + 1] && field[row + 1][cell + 1].marked) count++;
  if (field[row - 1] && field[row - 1][cell - 1] && field[row - 1][cell - 1].marked) count++;
  if (field[row - 1] && field[row - 1][cell] && field[row - 1][cell].marked) count++;
  if (field[row - 1] && field[row - 1][cell + 1] && field[row - 1][cell + 1].marked) count++;
  return count;
};

export const generateMines = (mines, fcRow, fcCell) => {
  cellsToOpenLeft -= mines;
  for (let i = 1; i <= mines; i++) {
    installRandomMine(fcRow, fcCell);
  }

  // Расставляем цифры
  bombs.map(function (bomb) {
    markMines(bomb.row, bomb.cell);
  });

  openCell(fcRow, fcCell);
};

export const installRandomMine = (fcRow, fcCell) => {
  var row = Math.floor(Math.random() * field.length);
  var cell = Math.floor(Math.random() * field[row].length);
  if (field[row][cell].hasMine || (fcRow == row && fcCell == cell)) {
    installRandomMine(fcRow, fcCell);
  } else {
    field[row][cell].hasMine = true;
    field[row][cell].label = 'X';
    bombs.push(field[row][cell]);
  }
};

export const markMines = (row, cell) => {
  // left, right
  plusOne(row, cell + 1);
  plusOne(row, cell - 1);
  // top, top-left, top-right
  plusOne(row - 1, cell);
  plusOne(row - 1, cell + 1);
  plusOne(row - 1, cell - 1);
  // bottom, bottom-left, bottom-right
  plusOne(row + 1, cell);
  plusOne(row + 1, cell + 1);
  plusOne(row + 1, cell - 1);
};

export const plusOne = (row, cell) => {
  if (!field[row] || !field[row][cell]) return;
  if (!field[row][cell].hasMine) {
    field[row][cell].label ? field[row][cell].label++ : field[row][cell].label = 1;
  }
};

export const generateField = (rows, cols) => {
  field = [];
  bombs = [];
  cellsToOpenLeft = rows * cols;
  for (let row = 0; row < rows; row++) {
    field[row] = [];
    for (let cell = 0; cell < cols; cell++) {
      field[row][cell] = {
        row: row,
        cell: cell
      }
    }
  }
};
