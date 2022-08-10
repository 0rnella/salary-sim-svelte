<script lang="ts">
    import type { UserInfo, Calculations } from './utils/types';
    import { calculate } from './utils';

    import { formComplete } from './stores.js';

    import { Section, Form, Insights, SalarySelector, Chart } from './lib/_index';

    let userInfo: UserInfo = {
        selectedSalary: 0,
    };
    let calculations: Calculations;

    const updateUserInfo = (newUserInfo) => {
        userInfo = { ...userInfo, ...newUserInfo };
        console.log('user info', userInfo);

        calculations = calculate(userInfo);
    };

    let showForm: boolean = true;
    formComplete.subscribe((complete) => (showForm = !complete));
</script>

<main>
    <h1>Salary Sim</h1>
    <Section title="About You" id="about-content">
        {#if showForm}
            <Form {userInfo} {updateUserInfo} />
        {:else}
            <button on:click={() => formComplete.set(false)}>Edit info</button>
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
