<script lang="ts">
    import { calculations } from '../stores';
</script>

<div id="insights">
    <p>Your yearly spending: {$calculations.yearlySpend}</p>
    <p>You should ask for a minimum gross salary of: {$calculations.minSalary}</p>
</div>
