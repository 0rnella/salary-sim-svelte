<script lang="ts">
    export let key: string,
        prompt: string,
        value: number,
        minimum: number,
        defaultValue: number = minimum;
</script>

<p>
    <label for={key}>{prompt}</label>
    <input type="number" name={key} min={minimum} value={value ?? defaultValue} />
</p>
