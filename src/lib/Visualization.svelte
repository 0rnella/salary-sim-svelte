<script lang="ts">
    import type { Finances } from '../App.svelte';
    export let finances: Finances;

    const { monthlySpend, incomeTaxRate, debt, debtRepaymentMonths } = finances;

    const percentageSalaryAfterTax = (100 - incomeTaxRate) / 100;
    const cushion = 15 / 100; // 15% cushion relative to monthly spending, to account for large purchases, etc. It's what I've used in my budgeting for years.

    /* Calculations*/
    const monthlyDebtPay = debtRepaymentMonths ? debt / debtRepaymentMonths : 0;
    const oneyearDebtPay = debtRepaymentMonths <= 12 ? monthlyDebtPay * debtRepaymentMonths : monthlyDebtPay * 12;
    const totalMonthlySpend = monthlySpend * (1 + cushion);
    finances.yearlySpend = Math.round((totalMonthlySpend * 12 + oneyearDebtPay) / percentageSalaryAfterTax);
    if (!finances.salary) finances.salary = finances.yearlySpend;
    const oneYearSavings = finances.salary - finances.yearlySpend;
</script>

<div>
    {#key finances.yearlySpend}
        <p>The minimum salary to cover your spending goals is {finances.yearlySpend}</p>
    {/key}
    {#key oneYearSavings}
        <p>Your savings after one year would be {oneYearSavings}</p>
    {/key}
</div>
