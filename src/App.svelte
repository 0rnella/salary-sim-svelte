<script lang="ts">
    import { formComplete, calculations, userInfo } from './stores.js';
    import { Section, Form, Insights, SalarySelector, Chart, ShowToggler } from './lib/_index';
</script>

<main>
    <h1>Salary Sim</h1>
    <a href="https://ornella.xyz/projects/salary-sim/" target="_blank" rel="noopener noreferrer">
        What is this, honey?
    </a>
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
