

export type Finances = {
    formValues: {
        monthlySpend?: number;
        debt?: number;
        debtRepaymentMonths?: number;
        incomeTaxRate?: number;
    };
    monthlyDebtPay?: number;
    cushionedMonthlySpend?: number;
    yearlySpend?: number;
    minSalary?: number;
    netSalary?: number;
};

export type UserInfo = {
    monthlySpend?: number;
    debt?: number;
    debtRepaymentMonths?: number;
    incomeTaxRate?: number;
    selectedSalary: number;
};

export type Calculations = {
    monthlyDebtPay: number;
    cushionedMonthlySpend: number;
    yearlySpend: number;
    minSalary: number;
    netSalary: number;
};