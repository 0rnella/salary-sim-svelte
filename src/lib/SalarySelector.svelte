<script lang="ts">
    import { calculate } from '../utils';
    import { calculations, userInfo } from '../stores.js';

    const updateSalary = ({ target }) => {
        const selectedSalary = Number(target.value);
        userInfo.update((userInfo) => ({ ...userInfo, selectedSalary }));
        calculations.set(calculate($userInfo));
    };
</script>

<div id="salary-selector">
    <label for="salary">How much do you want to make yearly?</label>
    {#key $calculations.minSalary}
        <input
            type="number"
            name="salary"
            value={$userInfo.selectedSalary || $calculations.minSalary}
            on:change={updateSalary}
        />
    {/key}
</div>
