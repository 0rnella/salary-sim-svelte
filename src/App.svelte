<script lang="ts">
    import { calculate } from './utils';
    import { formComplete, calculations, userInfo } from './stores.js';
    import { Section, Form, Insights, SalarySelector, Chart, ShowToggler } from './lib/_index';

    calculations.set(calculate($userInfo));
</script>

<main>
    <h1>Salary Sim</h1>
    <Section title="About You" id="about-content">
        <ShowToggler storeKey={formComplete}>
            <Form slot="show-state" />
            <div slot="hide-state">
                <button on:click={() => formComplete.set(false)}>Edit info</button>
                <Insights />
            </div>
        </ShowToggler>
    </Section>

    {#if $calculations.minSalary}
        <Section title="Simulation" id="simulation">
            <SalarySelector />
            {#if $userInfo.selectedSalary}
                <Chart />
            {/if}
        </Section>
    {/if}
</main>

<style>
</style>
