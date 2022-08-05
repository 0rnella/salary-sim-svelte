<script lang="ts">
    export let finances, processForm;
</script>

<section class="container">
    <h2>About you</h2>
    <form id="finances-form" on:submit|preventDefault={processForm}>
        <p>
            <label for="monthlySpend">How much do you spend monthly?</label>
            <input type="number" name="monthlySpend" min={1} value={finances.monthlySpend} placeholder={'4000'} />
        </p>

        <p>
            <label for="debt">How much debt do you have to pay?</label>
            <input type="number" name="debt" min={0} value={finances.debt || 0} placeholder={'14000'} />
        </p>

        <p>
            <label for="debtRepaymentMonths">Over how many months do you want to pay off your debt?</label>
            <input
                type="number"
                name="debtRepaymentMonths"
                min={0}
                value={finances.debtRepaymentMonths || 0}
                placeholder={'24'}
            />
        </p>

        <p>
            <label for="incomeTax">What's your estimated total income tax (in percentage points)?</label>
            <input type="number" name="incomeTaxRate" min={0} value={finances.incomeTaxRate || 0} placeholder={'24'} />
        </p>

        <button type="submit">Save</button>
    </form>
</section>
