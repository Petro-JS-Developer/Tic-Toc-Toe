const XValuePlayer = "X";
let OValuePlayer = "O";
let player = "";

let buttonCrossElement = document.getElementById(XValuePlayer);
let buttonZeroElement = document.getElementById(OValuePlayer);

buttonCrossElement.addEventListener("click", () => {
  player = buttonCrossElement.innerText;
  document.getElementById("X").classList.add("disabled");
  document.getElementById("O").classList.add("disabled");
});

buttonZeroElement.addEventListener("click", () => {
  player = buttonZeroElement.innerText;
  document.getElementById("X").classList.add("disabled");
  document.getElementById("O").classList.add("disabled");
});

const arrayWinCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playingField = document.getElementById("playingField");

let arrCurrentValuesOnPlayingFields = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const convertIndexInNumber = (row, column) => {
  const key = row + column;

  switch (key) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
  }
};

const convertingValueInArrIndexX_O = (allCell) => {
  const arrXCombination = [];

  const arrOCombination = [];

  allCell.forEach((arrValues, index) => {
    arrValues.forEach((value, i) => {
      if (value === XValuePlayer) {
        if (index === 0) {
          arrXCombination.push(index + i);
        }
        if (index === 1) {
          arrXCombination.push(3 + i);
        }
        if (index === 2) {
          arrXCombination.push(6 + i);
        }
      }

      if (value === OValuePlayer) {
        if (index === 0) {
          arrOCombination.push(index + i);
        }
        if (index === 1) {
          arrOCombination.push(3 + i);
        }
        if (index === 2) {
          arrOCombination.push(6 + i);
        }
      }
    });
  });

  return {
    X_arr_indexes: arrXCombination,
    O_arr_indexes: arrOCombination,
  };
};

const getArrPotentialWinCombination = (valueIndex) => {
  return arrayWinCombinations.filter(
    (arrCombination) => arrCombination[0] === valueIndex
  );
};

const getArrAllCells = (parentElement) => {
  let arrAllCell = [];
  for (let index = 0; index < parentElement.children.length; index++) {
    const children = [...parentElement.children[index].children];
    children.forEach((cell, i) => {
      arrCurrentValuesOnPlayingFields[index][i] = cell.innerText;
      arrAllCell.push(cell);
    });
  }

  return arrAllCell;
};

const checkIfThereIsWinner = (arrAllCell) => {
  const { X_arr_indexes, O_arr_indexes } =
    convertingValueInArrIndexX_O(arrAllCell);

  const findThreeTrue = (arrWinCombinationForCurrentValue, arrAllValues) => {
    for (let i = 0; i < arrWinCombinationForCurrentValue.length; i++) {
      const nestedArrayWinIndexes = arrWinCombinationForCurrentValue[i];

      const win = nestedArrayWinIndexes.every((winNumber) =>
        arrAllValues.includes(winNumber)
      );
      if (win) {
        return true;
      }
    }
    return false;
  };

  const checkWin = (arrIndexPlayer, player) => {
    for (let i = 0; i < arrIndexPlayer.length; i++) {
      const nestedArrayIndexes = arrIndexPlayer[i];
      const arrPotentialWinCombination =
        getArrPotentialWinCombination(nestedArrayIndexes);

      if (findThreeTrue(arrPotentialWinCombination, arrIndexPlayer)) {
        return player;
      }
    }
  };

  if (checkWin(X_arr_indexes, "X")) {
    alert(`Winner player ${checkWin(X_arr_indexes, "X")}`);
    playingField.classList.add("disabled");
  }

  if (checkWin(O_arr_indexes, "O")) {
    alert(`Winner player ${checkWin(O_arr_indexes, "O")}`);
    playingField.classList.add("disabled");
  }
};

playingField.addEventListener("click", (event) => {
  const currentCell = event.target;

  if (player === XValuePlayer) {
    currentCell.innerText = player;
    player = OValuePlayer;
  } else if (player === OValuePlayer) {
    currentCell.innerText = player;
    player = XValuePlayer;
  }

  getArrAllCells(playingField);
  checkIfThereIsWinner(arrCurrentValuesOnPlayingFields);
});

// TODO: Step one save value in arrValues
// TODO: Step two check win Сombination
// TODO: Step three display a win message and cross out the winning combination

// TODO: Step four disable button after choosing who you play for

// TODO: Step six if all cells are filled view message "Draw"
