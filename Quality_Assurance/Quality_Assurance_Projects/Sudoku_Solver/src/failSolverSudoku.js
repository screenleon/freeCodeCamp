const raw = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let test = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const answer = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

const check = function (number, testBoard, fillIndex) {
    const record = [], duplicateIndexes = [];
    record.push(checkRow(number, testBoard, fillIndex));
    record.push(checkColumn(number, testBoard, fillIndex));
    record.push(checkTable(number, testBoard, fillIndex));
    record.forEach(element => {
        if (element.duplicateIndex)
            duplicateIndexes.push(element.duplicateIndex)
    });
    return { check: record.every(element => element.check === true), duplicateIndexes };
}

const checkRow = function (number, testBoard, fillIndex) {
    for (let index = Math.floor(fillIndex / 9) * 9; index < Math.ceil(fillIndex / 9) * 9; index++) {
        if (number === String(testBoard).charAt(index)) {
            return { check: false, duplicateIndex: index };
        }
    }

    return { check: true };
}

const checkColumn = function (number, testBoard, fillIndex) {
    for (let index = fillIndex % 9; index < testBoard.length; index += 9) {
        if (number === String(testBoard).charAt(index)) {
            return { check: false, duplicateIndex: index };
        }
    }

    return { check: true };
}

const checkTable = function (number, testBoard, fillIndex) {
    const startIndex = 27 * Math.floor(fillIndex / 27) + 3 * Math.floor(fillIndex % 9 / 3);
    // const endIndex = 27 * Math.floor(fillIndex / 27) + 18 + 3 * Math.floor(fillIndex % 9 / 3) + 2;
    const tableIndexes = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    for (let tableIndex of tableIndexes) {
        if (number === String(testBoard).charAt(startIndex + tableIndex)) {
            return { check: false, duplicateIndex: startIndex + tableIndex };
        }
    }

    return { check: true };
}

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
    for (let index = numberIndex % 9; index < (Math.floor(numberIndex / 9) + 1) * 9; index += 9) {
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

const generateBoard = function () {
    for (let index = 0; index < raw.length; index++) {
        if (test.charAt(index) !== '.') continue;
        for (let value = 1; value <= 9; value++) {
            if (errorLog.hasOwnProperty(index) && errorLog[index].some(element => element === value)) { continue; }
            const checkRecord = check(value.toString(), test, index);
            if (checkRecord.check) {
                test = replaceCharacter(test, index, value.toString());
                console.log(index.toString().padStart(2, ' '), value.toString().padStart(2, ' '), test);
                break;
            }
        }
    }

    for (let resetIndex = 0; resetIndex < raw.length; resetIndex++) {
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
            // console.log('reset index:', resetIndex);
            // console.log('index      index-value     ', index, test[resetIndex]);
            // console.log('resetindex resetIndex-value', resetIndex, test[resetIndex]);
            if (errorLog.hasOwnProperty(resetIndex))
                errorLog[resetIndex].push(parseInt(test[resetIndex]));
            else
                errorLog[resetIndex] = [parseInt(test[resetIndex])];
            test = replaceCharacter(test, resetIndex, '.');
            console.log('replace:', test);
            break;
        }
    }
}

const errorLog = {};
while (test.search('.') >= 0) {
    generateBoard();
}

console.log('     ', test)
console.log('     ', answer)



