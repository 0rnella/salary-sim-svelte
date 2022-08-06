import type { Finances } from '../App.svelte';

export const calculate = (finances:Finances): Partial<Finances> => {
    const { monthlySpend, incomeTaxRate, debt, debtRepaymentMonths } = finances.formValues;

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

    return {yearlySpend, minSalary, monthlyDebtPay, cushionedMonthlySpend};
}