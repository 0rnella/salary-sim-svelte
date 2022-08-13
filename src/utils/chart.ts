import type { UserInfo, Calculations } from './types';

export const getChartData = ({ height, width, numberMonths }, userInfo: UserInfo, calculations: Calculations) => {
    const debtValues = [];
    const wealthValues = [];
    for (let month = 0; month <= numberMonths; month++) {
        const moneyAtMonth = calculateMoneyAtMonth({ month, userInfo, calculations });

        debtValues.push(moneyAtMonth.debt);
        wealthValues.push(moneyAtMonth.wealth);
    }

    const valueRange = {
        max: Math.max(...debtValues, ...wealthValues),
        min: Math.min(...debtValues, ...wealthValues),
    };

    const scale = buildScale({ height, width, valueRange, valueLength: debtValues.length });

    const debtPoints = addCoordinates({ values: debtValues, scale });
    const wealthPoints = addCoordinates({ values: wealthValues, scale });
    return {
        categories: [
            { points: debtPoints, string: makePointString(debtPoints), displayName: 'Debt', displayColor: '#E5989B' },
            {
                points: wealthPoints,
                string: makePointString(wealthPoints),
                displayName: 'Wealth',
                displayColor: 'black',
            },
        ],
        valueRange,
        yAnnotations: addCoordinates({ values: makeYNotches(valueRange), scale }),
        zeroY: scale.scaleY(0),
    };
};

const calculateMoneyAtMonth = ({ month, userInfo, calculations }): { debt: number; wealth: number } => {
    const { netSalary, yearlySpend } = calculations;
    const { debt, debtRepaymentMonths } = userInfo;

    const monthsPaidToDate = debtRepaymentMonths < month ? debtRepaymentMonths : month;
    const debtPaidToDate = (monthsPaidToDate * debt) / debtRepaymentMonths;

    const moneyEarned = (netSalary * month) / 12;
    const moneySpent = (yearlySpend * month) / 12;
    const debtAtMonth = -Math.round(debt - debtPaidToDate);
    const wealth = Math.round(moneyEarned - moneySpent + debtAtMonth);

    return {
        debt: debtAtMonth,
        wealth,
    };
};

const buildScale = ({ height, width, valueRange, valueLength }) => {
    return {
        scaleX: (val: number) => Math.round((width / valueLength) * val),
        scaleY: (val: number) => Math.round((height * (valueRange.max - val)) / (valueRange.max - valueRange.min || 1)),
    };
};

export const addCoordinates = ({ values, scale }) => {
    return values.map((value, i) => ({
        value,
        x: scale.scaleX(i),
        y: scale.scaleY(value),
    }));
};

export const makePointString = (points) => {
    return points.map((point) => `${point.x},${point.y}`).join('\n');
};

export const makeYNotches = ({ min, max }) => {
    let notches = [min, max];
    const range = Math.abs(max - min);

    // we want 5-ish notches
    const amtNotches = 5;
    const rangeDigitsLength = Math.floor(range / amtNotches).toString().length;
    const quotient = Math.pow(10, rangeDigitsLength - 1);
    const space = Math.round(range / amtNotches / quotient) * quotient;

    let notch = Math.round(min / space) * space;

    while (notch <= max) {
        notch += space;
        notches.push(notch);
    }

    return notches;
};
