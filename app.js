let XValuePlayer = 'X';
let OValuePlayer = 'O';
let player = "";

let buttonCrossElement = document.getElementById(XValuePlayer);
let buttonZeroElement = document.getElementById(OValuePlayer);

buttonCrossElement.addEventListener("click", () => {
  player = buttonCrossElement.innerText;
})

buttonZeroElement.addEventListener("click", () => {
  player = buttonZeroElement.innerText;
})


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

const convertIndexInNumber = (row, column) => {
  const key = row + column;
  switch (key) {
    case 0: return 0;
    case 1: return 1;
    case 2: return 2;
    case 2: return 2;

      break;

    default:
      break;
  }
}

const convertingValueInArrIndexX_O = (allCell) => {
  // const arrXCombination = [
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""],
  // ];
  const arrXCombination = [];
  const arrOCombination = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  allCell.forEach((arrValues, index) => {
    arrValues.forEach((value, i) => {
      if (value === XValuePlayer) {
        if (index === 0) {
          // arrXCombination[index][i] = index + i;
          arrXCombination.push(index + i)
        }
        if (index === 1) {
          // arrXCombination[index][i] = 3 + i;
          arrXCombination.push(3 + i)
        }
        if (index === 2) {
          // arrXCombination[index][i] = 6 + i;
          arrXCombination.push(6 + i)
        }
      }

      if (value === OValuePlayer) {
        if (index === 0) {
          arrOCombination[index][i] = index + i;
        }
        if (index === 1) {
          arrOCombination[index][i] = 3 + i;
        }
        if (index === 2) {
          arrOCombination[index][i] = 6 + i;
        }
      }
    })
  })

  return {
    X_arr_indexes: arrXCombination,
    O_arr_indexes: arrOCombination,
  }
}

const getArrPotentialWinCombination = (valueIndex) => {
  return arrayWinCombinations.filter((arrCombination) => arrCombination[0] === valueIndex)
}

const checkIfThereIsWinner = (arrAllCell) => {


  const { X_arr_indexes, O_arr_indexes } = convertingValueInArrIndexX_O(arrAllCell)

  const findThreeTrue = (arrWinCombinationForCurrentValue, arrAllValues) => {
    for (let i = 0; i < arrWinCombinationForCurrentValue.length; i++) {
      const nestedArrayWinIndexes = arrWinCombinationForCurrentValue[i];

      const win = nestedArrayWinIndexes.every((winNumber) => arrAllValues.includes(winNumber))
      if (win) {
        return true;
      }

    }
    return false;
  }

  const checkWin = (arrIndexPlayer, player) => {
    for (let i = 0; i < arrIndexPlayer.length; i++) {
      const nestedArrayIndexes = arrIndexPlayer[i];
      const arrPotentialWinCombination = getArrPotentialWinCombination(nestedArrayIndexes);

      if (findThreeTrue(arrPotentialWinCombination, X_arr_indexes)) {
        return player;
      }
    }
  }

  if (checkWin(X_arr_indexes, "X")) {
    alert(`Winner player ${checkWin(X_arr_indexes, "X")}`)
  }
  console.log({ getWin: checkWin(X_arr_indexes, "X") })


  // TODO: беремо масив з записаними числами перебираємо знаходимо число берем його і його індекс в масиві
  // TODO: перебираємо масив виграшних комбінацій порінюємо підмасиви щоб співпадали індекси і значння в під масиві фільтруємо 


  // const winX = () => {

  //   let filteredWInArr = [];
  //   arrXCombination.some((arrValues, index) => {
  //     arrValues.some((numberValues, i) => {
  //       if (!numberValues) {
  //         return false
  //       }

  //       filteredWInArr = arrayWinCombinations.filter((rowCombinationArr) => {
  //         // debugger;

  //         console.log({ booleun: rowCombinationArr[i] === numberValues, rowCombinationArr: rowCombinationArr[i], numberValues })
  //         return rowCombinationArr[i] === numberValues
  //       })
  //     })
  //   })
  //   console.log({ filteredWInArr })
  //   // arrXCombination.some((arrValues, index) => {
  //   //   arrValues.some((numberValues, i) => {
  //   //     if (!numberValues) {
  //   //       return false
  //   //     }
  //   //     const filteredWInArr = arrayWinCombinations.filter((rowCombinationArr) => rowCombinationArr[i] === numberValues)

  //   //   })
  //   // })
  //   // arrayWinCombinations.filter((rowCombinationArr, index) => {
  //   //   debugger;

  //   //   return rowCombinationArr.some((currentNumber, i) => {
  //   //     if (i === 0) {
  //   //       return arrXCombination[index][i] === currentNumber || arrOCombination[index][i] === currentNumber
  //   //     } else {
  //   //       return false
  //   //     }
  //   //   })

  //   // });

  // }
  // winX()
  // const filteredArrWithWinCombination = arrayWinCombinations.filter((rowCombinationArr, index) => {

  //   return rowCombinationArr.some((currentNumber, i) => {
  //     if (i === 0) {
  //       return arrXCombination[index][i] === currentNumber || arrOCombination[index][i] === currentNumber
  //     } else {
  //       return false
  //     }
  //   })

  // });

  // const win = filteredArrWithWinCombination.some((rowCombinationArr, index) => {

  //   let XWin = 0;
  //   let OWin = 0;
  //   rowCombinationArr.filter((currentNumber, i) => {
  //     if (i === 0) {
  //       return arrXCombination[index][i] === currentNumber || arrOCombination[index][i] === currentNumber
  //     } else {
  //       return false
  //     }
  //   }).forEach((currentNumber, i) => {
  //     if (arrXCombination[index][i] === currentNumber) {
  //       XWin++
  //     }

  //     if (arrOCombination[index][i] === currentNumber) {
  //       OWin++
  //     }
  //   })
  //   if (XWin === 3) {
  //     return alert("Win player X")
  //   }
  //   if (OWin === 3) {
  //     return alert("Win player O")
  //   }
  // });

  // console.log({ win })

}

const playingField = document.getElementById("playingField")

const arrCurrentValuesOnPlayingFields = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const getArrAllCells = (parentElement) => {
  let arrAllCell = [];
  for (let index = 0; index < parentElement.children.length; index++) {
    const children = [...parentElement.children[index].children];
    children.forEach((cell, i) => {
      arrCurrentValuesOnPlayingFields[index][i] = cell.innerText
      arrAllCell.push(cell)
    })
  }

  return arrAllCell
}

playingField.addEventListener('click', (event) => {
  const currentCell = event.target;

  if (player === XValuePlayer) {
    currentCell.innerText = player;
    player = OValuePlayer
  } else if (player === OValuePlayer) {
    currentCell.innerText = player;
    player = XValuePlayer
  }
  console.log({ getArrAllCells: getArrAllCells(playingField), arrCurrentValuesOnPlayingFields, check: checkIfThereIsWinner(arrCurrentValuesOnPlayingFields) })

})



// TODO: Step one save value in arrValues
// TODO: Step two check win Сombination
// TODO: Step three display a win message
// TODO: Step four disable button after choosing who you play for
// TODO: Step five cross out the winning combination