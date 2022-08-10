<script lang="ts">
    export let userInfo, calculations, updateUserInfo;

    const updateSalary = ({ target }) => {
        const selectedSalary = Number(target.value);
        updateUserInfo({ selectedSalary });
    };
</script>

<div id="salary-selector">
    <label for="salary">How much do you want to make yearly?</label>
    {#key calculations.minSalary}
        <input
            type="number"
            name="salary"
            value={userInfo.selectedSalary || calculations.minSalary}
            on:change={updateSalary}
        />
    {/key}
</div>
