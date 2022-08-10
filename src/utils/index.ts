import type { Calculations, UserInfo } from './types';

export const calculate = (userInfo: UserInfo): Calculations => {
    const { monthlySpend, incomeTaxRate, debt, debtRepaymentMonths, selectedSalary } = userInfo;

    /* Debt*/
    const monthlyDebtPay = debtRepaymentMonths ? debt / debtRepaymentMonths : 0;
    const repaymentMonths = debtRepaymentMonths <= 12 ? debtRepaymentMonths : 12;
    const oneyearDebtPay = repaymentMonths * monthlyDebtPay;

    /* Spending*/
    const cushion = 15 / 100; // 15% cushion relative to monthly spending, to account for large purchases, etc.
    const cushionedMonthlySpend = monthlySpend * (1 + cushion);
    const yearlySpend = Math.round((cushionedMonthlySpend * 12 + oneyearDebtPay));
    
    /* Tax */
    const percentageSalaryAfterTax = (100 - incomeTaxRate) / 100;

    /* Salary */
    const minSalary = Math.round(yearlySpend / percentageSalaryAfterTax);
    const netSalary = Math.round(selectedSalary * percentageSalaryAfterTax);

    return {yearlySpend, minSalary, monthlyDebtPay, cushionedMonthlySpend, netSalary};
}