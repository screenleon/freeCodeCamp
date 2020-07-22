let raw = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
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

const generatePossibleBoard = () => {
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
};

const fillBoard = () => {
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
}

while (test.search(/[.]/) !== -1) {
    console.log('start search .')
    generatePossibleBoard();
    fillBoard();

    console.log(dataPossible);
    console.log(test);

    for (let resetIndex = 0; resetIndex < raw.length; resetIndex++) {
        console.log('resetIndex:', resetIndex);
        if (Math.floor(resetIndex / 9) * 9 === resetIndex && checkRowSum(test, resetIndex)) {
            console.log('row sum');
            for (let deleteIndex = resetIndex; deleteIndex < resetIndex + 9; deleteIndex++) {
                console.log('row deleteIndex', deleteIndex);
                raw = replaceCharacter(raw, deleteIndex, test[deleteIndex].toString());
                delete dataPossible[deleteIndex];
            }
            resetIndex = Math.floor(resetIndex / 9) * 9 + 8;
            continue;
        } else if (resetIndex % 3 === 0 &&
            checkTableSum(test, resetIndex)) {
            console.log('table sum');
            for (let deleteIndex = resetIndex; deleteIndex < resetIndex + 3; deleteIndex++) {
                console.log('table deleteIndex', deleteIndex);
                raw = replaceCharacter(raw, deleteIndex, test[deleteIndex].toString());
                delete dataPossible[deleteIndex];
            }
            resetIndex += 2;
            continue;
        } else if (checkColumnSum(test, resetIndex)) {
            console.log('column sum');
            for (let deleteIndex = resetIndex % 9; deleteIndex < raw.length; deleteIndex += 9) {
                console.log('column deleteIndex', deleteIndex);
                raw = replaceCharacter(raw, deleteIndex, test[deleteIndex].toString());
                delete dataPossible[deleteIndex];
            }
            continue;
        } else if (raw[resetIndex] !== '.') {
            console.log('raw data');
            continue;
        }
    }

    
    console.log(test);

    for (let resetIndex in dataPossible) {
        dataPossible[resetIndex] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        test = replaceCharacter(test, parseInt(resetIndex), '.');
    }
    console.log(dataPossible);
}

console.log(dataPossible);
console.log(test);