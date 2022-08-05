<script lang="ts">
    import { calculate } from '../utils';
    export let finances, updateFinances;

    const calculations = calculate(finances);
    updateFinances({ ...calculations });
</script>

<div id="insights">
    {#key finances.yearlySpend}
        <p>Yearly spending: {finances.yearlySpend}</p>
        <p>Minimum gross salary: {finances.minSalary}</p>
    {/key}
    {#key finances.formValues.debt}
        <p>Starting net wealth: {-finances.formValues.debt}</p>
    {/key}
</div>
