<script lang="ts">
    import { addCoordinates, getDebtAtMonth, makePointString } from '../utils/chart';
    export let finances;
    const { debt, debtRepaymentMonths } = finances.formValues;

    const width = 600;
    const height = 400;
    const numberPoints = 13;

    const debtValues = new Array(numberPoints).fill(0).map((point, i) =>
        getDebtAtMonth({
            month: i,
            debt,
            debtRepaymentMonths,
        }),
    );

    const debtPoints = addCoordinates({ values: debtValues, width, height });

    const debtString = makePointString(debtPoints);
</script>

<div id="chart">
    {#if finances.salary}
        <svg {width} {height}>
            <!-- x axis -->
            <line x1="0" x2={width} y1={height} y2={height} />
            <g class="x" transform={`translate(0,${height + 20})`}>
                {#each debtPoints as point, i}
                    <text x={point.x}>{i}</text>
                {/each}
            </g>

            <!-- y axis -->
            <line x1="0" x2="0" y1="0" y2={height} />
            <g class="y" transform="translate(-10,0)">
                {#each debtPoints as point}
                    <text y={point.y}>{point.value}</text>
                {/each}
            </g>

            <!-- data -->
            <polyline style="stroke: red; stroke-width: 2" points={debtString} />
        </svg>
    {/if}
</div>

<style>
    svg {
        overflow: visible;
        margin: 3em;
    }

    line,
    polyline {
        fill: none;
        stroke: black;
    }

    .x text {
        text-anchor: middle;
    }

    .y text {
        text-anchor: end;
    }
</style>
