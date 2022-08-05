<script lang="ts">
    export let finances, updateFinances;

    const updateSalary = ({ target }) => {
        const newSalary = Number(target.value);
        updateFinances({ salary: newSalary });
    };
</script>

<div id="salary-selector">
    <label for="salary">How much do you want to make yearly?</label>
    {#key finances.minSalary}
        <input type="number" name="salary" value={finances.salary || finances.minSalary} on:change={updateSalary} />
    {/key}
</div>
