<script lang="ts">
    import Insights from './Insights.svelte';
    import Form from './Form.svelte';
    export let finances, updateFinances;

    let formHidden: boolean;

    const toggleForm = () => (formHidden = !formHidden);
</script>

<section class="container">
    <h2>About you</h2>
    <div id="about-content">
        {#key formHidden}
            {#if formHidden}
                <button on:click={toggleForm}>Edit info</button>
            {:else}
                <Form formValues={finances.formValues} {updateFinances} {toggleForm} />
            {/if}
        {/key}
        {#if finances.formValues.monthlySpend}
            <!-- {#key finances.formValues} -->
            <Insights {finances} {updateFinances} />
            <!-- {/key} -->
        {/if}
    </div>
</section>
