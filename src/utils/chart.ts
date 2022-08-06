export const getDebtAtMonth = ({ month, debt, debtRepaymentMonths }): number => {
    const monthsPaidToDate = debtRepaymentMonths < month ? debtRepaymentMonths : month;
    const debtPaidToDate = (monthsPaidToDate * debt) / debtRepaymentMonths;

    const debtRemaining = -Math.round(debt - debtPaidToDate);
    return debtRemaining;
};

export const addCoordinates = ({values, width, height}) => {
    const range = {
        yMax: Math.max(...values),
        yMin: Math.min(...values),
    };
    
    const scaleX = (index: number) => Math.round((width / values.length) * index);
    const scaleY = (value: number) => Math.round((height * (range.yMax - value)) / (range.yMax - range.yMin || 1));
   
    return values.map((value, i) => ({value, x: scaleX(i), y: scaleY(value)}))
}

export const makePointString = (points) => {
    return points.map((point) => `${point.x},${point.y}`).join('\n');
}