<script lang="ts">
    export let finances, updateSalary;
</script>

<div>
    <label for="salary">What is your desired salary?</label>
    <input type="number" value={finances.salary} on:change={updateSalary} />
</div>
