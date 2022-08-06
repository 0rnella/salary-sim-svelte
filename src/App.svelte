<script lang="ts" context="module">
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
        salary: number;
    };
</script>

<script lang="ts">
    import AboutYou from './lib/AboutYou.svelte';
    import Simulation from './lib/Simulation.svelte';

    let finances: Finances = {
        formValues: {},
        salary: 0,
    };

    const updateFinances = (newFinances) => (finances = { ...finances, ...newFinances });
</script>

<main>
    <h1>Salary Sim</h1>
    <AboutYou {finances} {updateFinances} />
    {#key finances}
        {#if finances.formValues.monthlySpend}
            <Simulation {finances} {updateFinances} />
        {/if}
    {/key}
</main>

<style>
</style>
