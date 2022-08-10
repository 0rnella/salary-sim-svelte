<script lang="ts">
    // export let formValues, toggleForm, updateFinances;
    export let userInfo, updateUserInfo;

    const processForm = ({ target }) => {
        let formValues = {};
        const formData = new FormData(target);
        for (const entry of formData.entries()) {
            const [name, value] = entry;
            formValues[name] = Number(value);
        }

        updateUserInfo(formValues);
        // toggleForm();
    };
</script>

<form id="finances-form" on:submit|preventDefault={processForm}>
    <p>
        <label for="monthlySpend">How much do you spend monthly?</label>
        <input type="number" name="monthlySpend" min={1} value={userInfo.monthlySpend || 2500} />
    </p>

    <p>
        <label for="debt">How much debt do you have to pay?</label>
        <input type="number" name="debt" min={0} value={userInfo.debt ?? 0} />
    </p>

    <p>
        <label for="debtRepaymentMonths">Over how many months do you want to pay off your debt?</label>
        <input type="number" name="debtRepaymentMonths" min={1} value={userInfo.debtRepaymentMonths || 18} />
    </p>

    <p>
        <label for="incomeTax">What's your estimated total income tax (in percentage points)?</label>
        <input type="number" name="incomeTaxRate" min={0} value={userInfo.incomeTaxRate || 25} />
    </p>

    <button type="submit">Save info</button>
</form>
