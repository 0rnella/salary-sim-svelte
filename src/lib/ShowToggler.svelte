<script lang="ts">
    export let storeKey;
    let show = true;
    storeKey.subscribe((key) => (show = !key));
</script>

<div>
    {#if show}
        <slot name="show-state" />
    {:else}
        <slot name="hide-state" />
    {/if}
</div>
