<script lang="ts">
    import type { UserInfo, Calculations } from './utils/types';

    import { formComplete } from './stores.js';

    import { Section, Form, Insights, SalarySelector, Chart, ShowToggler } from './lib/_index';

    let userInfo: UserInfo = {
        selectedSalary: 0,
    };
    let calculations: Calculations;

    const updateUserInfo = (newUserInfo) => {
        userInfo = { ...userInfo, ...newUserInfo };
        console.log('user info', userInfo);
    };
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
