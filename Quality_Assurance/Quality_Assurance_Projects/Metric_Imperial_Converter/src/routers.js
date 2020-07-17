module.exports = function (app) {
    app.route('/')
        .get((req, res) => {
            res.json({ message: 'test' });
        });

    app.route('/api/convert')
        .get(ConvertUnit);

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });

    function ConvertUnit(req, res) {
        const input = String(req.query.input);
        let numberError = false, unitError = true;
        let output = {}, errorString = '', amount, unit, convert = {};
        const unitTypes = {
            gal: {
                name: 'gallons',
                unit: 'L',
                unitName: 'litres',
                coefficient: 3.78541
            },
            lbs: {
                name: 'pounds',
                unit: 'kg',
                unitName: 'kilograms',
                coefficient: 0.453592
            },
            mi: {
                name: 'miles',
                unit: 'km',
                unitName: 'kilometers',
                coefficient: 1.60934
            }
        }

        try {
            amount = input.slice(0, input.search(/[a-z]/i)).length === 0 ? 1 : eval(input.slice(0, input.search(/[a-z]/i)));
        } catch (e) {
            numberError = true;
        }

        unit = input.slice(input.search(/[a-z]/i));
        for (let unitType in unitTypes) {
            if (unitType === unit) {
                unitError = false;
                convert = {
                    unit, amount,
                    unitName: unitTypes[unitType].name,
                    convertUnit: unitTypes[unitType].unit,
                    convertUnitName: unitTypes[unitType].unitName,
                    convertAmount: parseFloat((amount * unitTypes[unitType].coefficient).toFixed(5))
                }
                break;
            }
            else if (unitTypes[unitType].unit === unit) {
                unitError = false;
                convert = {
                    unit, amount,
                    unitName: unitTypes[unitType].unitName,
                    convertUnit: unitType,
                    convertUnitName: unitTypes[unitType].name,
                    convertAmount: parseFloat((amount * 1 / unitTypes[unitType].coefficient).toFixed(5))
                }
                break;
            }
        }
        if (unitError && numberError) errorString = 'invalid number and unit';
        else if (numberError) errorString = 'invalid number';
        else if (unitError) errorString = 'invalid unit';

        if (errorString.length > 0) output['error'] = errorString;
        else {
            output['initNum'] = convert.amount;
            output['initUnit'] = convert.unit;
            output['returnNum'] = convert.convertAmount;
            output['returnUnit'] = convert.convertUnit;
            output['string'] = [convert.amount, convert.unitName, 'converts to', convert.convertAmount, convert.convertUnitName].join(' ');
        }

        res.json(output);
    }
}