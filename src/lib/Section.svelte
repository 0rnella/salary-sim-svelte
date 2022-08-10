<script lang="ts">
    export let title, id;
</script>

<section class="container">
    <h2>{title}</h2>
    <div {id}>
        <slot />
    </div>
</section>
