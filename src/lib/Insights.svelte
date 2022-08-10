<script lang="ts">
    import { calculations, userInfo } from '../stores';
    console.log('from insights: user info was refreshed', $userInfo);
</script>

<div id="insights">
    <p>Your yearly spending: {$calculations.yearlySpend}</p>
    <p>You should ask for a minimum gross salary of: {$calculations.minSalary}</p>
</div>
