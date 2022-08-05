<script lang="ts">
    export let finances, updateSalary;
</script>

<div id="salary-selector">
    <label for="salary">How much do you want to make yearly?</label>
    <input type="number" value={finances.salary} on:change={updateSalary} />
</div>
