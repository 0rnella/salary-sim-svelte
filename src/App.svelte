<script lang="ts">
    import type { UserInfo, Calculations } from './utils/types';
    import { calculate } from './utils';
    import Section from './lib/Section.svelte';
    import Form from './lib/Form.svelte';
    import Insights from './lib/Insights.svelte';
    import SalarySelector from './lib/SalarySelector.svelte';
    import Chart from './lib/Chart.svelte';

    let userInfo: UserInfo = {
        selectedSalary: 0,
    };
    let calculations: Calculations;
    let showForm = true;

    const updateUserInfo = (newUserInfo) => {
        userInfo = { ...userInfo, ...newUserInfo };
        console.log('user info', userInfo);

        calculations = calculate(userInfo);
    };

    const toggleForm = () => (showForm = !showForm);
</script>

<main>
    <h1>Salary Sim</h1>
    <Section title="About You" id="about-content">
        {#if showForm}
            <Form {userInfo} {updateUserInfo} {toggleForm} />
        {:else}
            <button on:click={toggleForm}>Edit info</button>
        {/if}
        {#if calculations}
            {#key calculations}
                <Insights {calculations} />
            {/key}
        {/if}
    </Section>
    {#if calculations}
        <Section title="Simulation" id="simulation">
            <SalarySelector {userInfo} {calculations} {updateUserInfo} />
            {#if userInfo.selectedSalary}
                {#key calculations}
                    <Chart {userInfo} {calculations} />
                {/key}
            {/if}
        </Section>
    {/if}
</main>

<style>
</style>
