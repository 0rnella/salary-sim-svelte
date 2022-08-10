<script lang="ts">
    import { FormInput } from './_index';
    import { formComplete } from '../stores.js';

    export let userInfo, updateUserInfo;

    const processForm = ({ target }) => {
        let formValues = {};
        const formData = new FormData(target);
        for (const entry of formData.entries()) {
            const [name, value] = entry;
            formValues[name] = Number(value);
        }

        updateUserInfo(formValues);
        formComplete.set(true);
    };
</script>

<form id="finances-form" on:submit|preventDefault={processForm}>
    <FormInput
        key="monthlySpend"
        prompt="How much do you spend monthly?"
        minimum={1}
        value={userInfo.monthlySpend}
        defaultValue={2500}
    />
    <FormInput key="debt" prompt="How much debt do you have to pay?" minimum={0} value={userInfo.debt} />
    <FormInput
        key="debtRepaymentMonths"
        prompt="Over how many months do you want to pay off your debt?"
        minimum={1}
        value={userInfo.debtRepaymentMonths}
    />
    <FormInput
        key="incomeTaxRate"
        prompt="What's your estimated total income tax (in percentage points)?"
        minimum={1}
        value={userInfo.incomeTaxRate}
        defaultValue={25}
    />

    <button type="submit">Save info</button>
</form>
