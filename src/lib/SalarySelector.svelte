<script lang="ts">
    export let finances, updateFinances;

    const updateSalary = ({ target }) => {
        const salary = Number(target.value);
        const netSalary = salary * (1 - finances.formValues.incomeTaxRate / 100);
        updateFinances({ salary, netSalary });
    };
</script>

<div id="salary-selector">
    <label for="salary">How much do you want to make yearly?</label>
    {#key finances.minSalary}
        <input type="number" name="salary" value={finances.salary || finances.minSalary} on:change={updateSalary} />
    {/key}
</div>
