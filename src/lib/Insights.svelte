<script lang="ts">
    import { calculate } from '../utils';
    export let finances, updateFinances;

    const calculations = calculate(finances);
    updateFinances({ ...calculations });
</script>

<div id="insights">
    <p>Yearly spending: {finances.yearlySpend}</p>
    <p>Minimum gross salary: {finances.minSalary}</p>
    <p>Starting net wealth: {-finances.formValues.debt}</p>
</div>
