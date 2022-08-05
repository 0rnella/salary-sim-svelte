<script lang="ts" context="module">
    export type Finances = {
        monthlySpend?: number;
        debt?: number;
        debtRepaymentMonths?: number;
        incomeTaxRate?: number;
        yearlySpend?: number;
        salary: number;
    };
</script>

<script lang="ts">
    import Visualization from './lib/Visualization.svelte';
    import SalarySelector from './lib/SalarySelector.svelte';
    import Form from './lib/Form.svelte';

    const processForm = ({ target }) => {
        const formData = new FormData(target);
        for (const entry of formData.entries()) {
            const [name, value] = entry;
            finances[name] = Number(value);
        }
    };

    const updateSalary = ({ target }) => {
        finances.salary = target.value;
    };

    let finances: Finances = { monthlySpend: 0, incomeTaxRate: 25, salary: 0 };
</script>

<main>
    <h1>Salary Sim</h1>
    <Form {finances} {processForm} />
    {#key finances}
        {#if finances.monthlySpend}
            <SalarySelector {finances} {updateSalary} />
            <Visualization {finances} />
        {/if}
    {/key}
</main>

<style>
</style>
