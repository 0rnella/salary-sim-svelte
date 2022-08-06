const getDebtAtMonth = ({ month, debt, debtRepaymentMonths }): number => {
    const monthsPaidToDate = debtRepaymentMonths < month ? debtRepaymentMonths : month;
    const debtPaidToDate = (monthsPaidToDate * debt) / debtRepaymentMonths;

    return -Math.round(debt - debtPaidToDate);
};

const getWealthAtMonth = ({ month, debtAtMonth, salary, cushionedMonthlySpend }): number => {
    const moneyEarned = salary * month / 12;
    const moneySpent = cushionedMonthlySpend * month;
    return Math.round(moneyEarned - moneySpent + debtAtMonth);
};

export const calculateMoneyAtMonth = ({ month, finances }): {debt: number, wealth:number} => {
    const { salary, cushionedMonthlySpend } = finances;
    const { debt, debtRepaymentMonths } = finances.formValues;

    const debtAtMonth = getDebtAtMonth({month, debt, debtRepaymentMonths});

    const wealth = getWealthAtMonth({month, debtAtMonth, salary, cushionedMonthlySpend})

    return {
        debt: debtAtMonth,
        wealth
    }
};

const scaleX = (index: number, width, valueLength) => Math.round((width / valueLength) * index);
export const scaleY = ({value, height, valueRange}) => Math.round((height * (valueRange.max - value)) / (valueRange.max - valueRange.min || 1));
export const addCoordinates = ({valueRange, values, width, height}) => {
   
    return values.map((value, i) => ({value, x: scaleX(i, width, values.length), y: scaleY({value, height, valueRange})}))
}

export const makePointString = (points) => {
    return points.map((point) => `${point.x},${point.y}`).join('\n');
}

export const makeYAnnotations = (valueRange) => {
    let annotations = [];
    let scale = 0;

    while (scale >= valueRange.min) scale -= 5000;

    while (scale <= valueRange.max) {
        scale += 10000;
        annotations.push(scale);
    }
    return annotations;
};