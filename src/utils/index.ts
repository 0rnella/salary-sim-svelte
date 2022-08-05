import type { Finances } from '../App.svelte';

export const calculate = (finances:Finances): Partial<Finances> => {

    const { monthlySpend, incomeTaxRate, debt, debtRepaymentMonths } = finances.formValues;

    
    /* Debt*/
    const monthlyDebtPay = debtRepaymentMonths ? debt / debtRepaymentMonths : 0;
    const oneyearDebtPay = debtRepaymentMonths <= 12 ? monthlyDebtPay * debtRepaymentMonths : monthlyDebtPay * 12;
    
    /* Spending*/
    const cushion = 15 / 100; // 15% cushion relative to monthly spending, to account for large purchases, etc. It's what I've used in my budgeting for years.
    const totalMonthlySpend = monthlySpend * (1 + cushion);
    const yearlySpend = Math.round((totalMonthlySpend * 12 + oneyearDebtPay));

    /* Tax */
    const percentageSalaryAfterTax = (100 - incomeTaxRate) / 100;

    /* Salary */
    const minSalary = Math.round(yearlySpend / percentageSalaryAfterTax);

    return {yearlySpend, minSalary};
}