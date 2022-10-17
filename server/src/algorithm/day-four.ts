type Board = Array<Array<number>>;

const MARK_NUMBER = -1;

export const parse = (input: string) => {
  const lines = input.split('\n');
  const drawn = (lines.shift() as string).split(',').map((n) => parseInt(n, 10));

  const boards = lines.reduce((prev, line) => {
    if (line === '') {
      prev.push([]);
    } else {
      const row = line
        .split(' ')
        .filter((el) => el !== '')
        .map((n) => parseInt(n, 10));

      prev[prev.length - 1].push(row);
    }

    return prev;
  }, [] as Array<Board>);

  return { drawn, boards };
};

export const markDrawnNumber = (board: Board, drawnNumber: number) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === drawnNumber) {
        board[i][j] = MARK_NUMBER;
      }
    }
  }

  return board;
};

// this can be incorporated in markDrawnNumber, but since there was no any performance specifications
// I'll leave it like this for better readability
export const isWon = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    // check rows
    if (board[i].every((n) => n === MARK_NUMBER)) {
      return true;
    }

    // check columns
    const column = [];
    for (let j = 0; j < board[i].length; j++) {
      column.push(board[j][i]);
    }
    if (column.every((n) => n === MARK_NUMBER)) {
      return true;
    }
  }

  return false;
};

export const sumUnmarked = (board: Board) => {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== MARK_NUMBER) {
        sum += board[i][j];
      }
    }
  }

  return sum;
};

export const playBingo = ({ drawn, boards }: ReturnType<typeof parse>) => {
  for (let i = 0; i < drawn.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      boards[j] = markDrawnNumber(boards[j], drawn[i]);

      if (isWon(boards[j])) {
        return sumUnmarked(boards[j]) * drawn[i];
      }
    }
  }
};

