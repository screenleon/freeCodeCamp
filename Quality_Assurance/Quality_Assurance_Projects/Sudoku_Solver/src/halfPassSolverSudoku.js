const raw = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let test = String(raw);
const answer = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';

const replaceCharacter = function (string, index, character) {
    return string.substring(0, index) + character + string.substring(index + 1);
}

const checkRowSum = (string, numberIndex) => {
    let sum = 0;
    for (let index = Math.floor(numberIndex / 9) * 9; index < (Math.floor(numberIndex / 9) + 1) * 9; index++) {
        if (string[index] === '.') return false;
        sum += parseInt(string[index]);
    }
    return sum === 45;
}

const checkColumnSum = (string, numberIndex) => {
    console.log(string, numberIndex)
    let sum = 0;
    for (let index = numberIndex % 9; index < raw.length; index += 9) {
        if (string[index] === '.') return false;
        sum += parseInt(string[index]);
    }
    return sum === 45;
}

const checkTableSum = (string, tableIndex) => {
    const startIndex = 27 * Math.floor(tableIndex / 27) + 3 * Math.floor(tableIndex % 9 / 3);
    const tableIndexes = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    let sum = 0;
    for (let index = 0; index < tableIndexes.length; index++) {
        if (string[startIndex + tableIndexes[index]] === '.') return false;
        sum += parseInt(string[startIndex + tableIndexes[index]]);
        // console.log(startIndex + tableIndexes[index], parseInt(string[startIndex + tableIndexes[index]]), sum);
    }
    return sum === 45;
}

const checkRowPossible = (string, numberIndex, value) => {
    for (let index = Math.floor(numberIndex / 9) * 9; index < Math.floor(numberIndex / 9) * 9 + 9; index++) {
        // console.log(value.toString(), string[index]);
        if (value.toString() === string[index]) return false;
    }
    return true;
}

const checkColumnPossible = (string, numberIndex, value) => {
    for (let index = numberIndex % 9; index < string.length; index += 9) {
        if (value.toString() === string[index]) return false;
    }
    return true;
}

const checkTablePossible = (string, numberIndex, value) => {
    const startIndex = 27 * Math.floor(numberIndex / 27) + 3 * Math.floor(numberIndex % 9 / 3);
    const tableIndexes = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    for (let index = 0; index < tableIndexes.length; index++) {
        // console.log(value.toString(), string[startIndex + tableIndexes[index]]);
        if (value.toString() === string[startIndex + tableIndexes[index]]) return false;
    }
    return true;
}

const checkRowMissValue = (string, numberIndex) => {

    for (let index = Math.floor(numberIndex / 9) * 9; index < Math.floor(numberIndex / 9) * 9 + 9; index++) {
        if (string[index] === '.') continue;
        sum += parseInt(string[index]);
    }
    return true;
}

// ex: {'1': {possible: [1,3,4]}, '2': {}}
const dataPossible = {};


for (let index in raw) {
    if (raw[index] === '.') {
        dataPossible[index] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
}

for (let index = 0; index < raw.length; index++) {
    if (!dataPossible.hasOwnProperty(index)) continue;
    for (let value = 1; value < 10; value++) {
        if (dataPossible[index].every(element => element !== value)) continue;
        if (checkRowPossible(test, index, value) && checkColumnPossible(test, index, value) && checkTablePossible(test, index, value)) {
            continue;
        }
        else {
            dataPossible[index].splice(dataPossible[index].findIndex(element => element === value), 1);
        }
    }

    if (dataPossible[index].length === 1) {
        test = replaceCharacter(test, index, dataPossible[index][0].toString());
        delete dataPossible[index];
    }
}

for (let index = 0; index < raw.length; index++) {
    if (!dataPossible.hasOwnProperty(index)) continue;
    for (let value = 1; value < 10; value++) {
        if (dataPossible[index].every(element => element !== value)) continue;
        if (checkRowPossible(test, index, value) && checkColumnPossible(test, index, value) && checkTablePossible(test, index, value)) {
            test = replaceCharacter(test, index, value.toString());
            break;
        }
        else {
            dataPossible[index].splice(dataPossible[index].findIndex(element => element === value), 1);
        }
    }
    if (dataPossible[index].length === 1) delete dataPossible[index];
}

console.log(dataPossible);
console.log(test);

for (let resetIndex = 0, errorLog = {}, allPass = true; resetIndex < raw.length; resetIndex++) {
    console.log('resetIndex:', resetIndex);
    if (Math.floor(resetIndex / 9) * 9 === resetIndex && checkRowSum(test, resetIndex)) {
        console.log('row sum');
        resetIndex = Math.floor(resetIndex / 9) * 9 + 8;
        continue;
    } else if (resetIndex % 3 === 0 &&
        checkTableSum(test, resetIndex)) {
        console.log('table sum');
        resetIndex += 2;
        continue;
    } else if (checkColumnSum(test, resetIndex)) {
        console.log('column sum');
        continue;
    } else if (raw[resetIndex] !== '.') {
        console.log('raw data');
        continue;
    }
    else {
        allPass = false;
        // console.log(test);
        if (test[resetIndex] !== '.')
            if (errorLog.hasOwnProperty(resetIndex))
                errorLog[resetIndex].push(parseInt(test[resetIndex]));
            else
                errorLog[resetIndex] = [parseInt(test[resetIndex])];
        for (let value = 1; value < 10; value++) {
            if (errorLog.hasOwnProperty(resetIndex) && errorLog[resetIndex].every(element => element === value)) continue;
            if (checkRowPossible(test, resetIndex, value) && checkTablePossible(test, resetIndex, value)) {
                test = replaceCharacter(test, resetIndex, value.toString());
                break;
            }
        }
        // console.log(test);
    }
    if (resetIndex === raw.length - 1) {
        if (allPass === false) {
            resetIndex = -1;
        }
    }
}

console.log(dataPossible);
console.log(test);