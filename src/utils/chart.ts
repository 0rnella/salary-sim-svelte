
export const calculateMoneyAtMonth = ({ month, userInfo, calculations }): {debt: number, wealth:number} => {
    const { netSalary, yearlySpend } = calculations;
    const { debt, debtRepaymentMonths } = userInfo;
    
    const monthsPaidToDate = debtRepaymentMonths < month ? debtRepaymentMonths : month;
    const debtPaidToDate = (monthsPaidToDate * debt) / debtRepaymentMonths;
    
    const moneyEarned = netSalary * month / 12;
    const moneySpent = yearlySpend * month / 12;
    const debtAtMonth = -Math.round(debt - debtPaidToDate);
    const wealth = Math.round(moneyEarned - moneySpent + debtAtMonth);


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