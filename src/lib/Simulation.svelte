<script lang="ts">
    import SalarySelector from './SalarySelector.svelte';
    import Chart from './Chart.svelte';
    export let finances, updateFinances;
</script>

<section id="simulation" class="container">
    <h2>Simulation</h2>
    <SalarySelector {finances} {updateFinances} />
    {#key finances.formValues}
        <Chart {finances} />
    {/key}
</section>
