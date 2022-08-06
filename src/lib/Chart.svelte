<script>
    // import type { Finances } from '../App.svelte';
    export let finances;
    let scale = 30;
    let width = scale * 12;
    let height = scale * 10;

    console.log('FINANCES', finances);

    let points = [];
    for (let month = 0; month <= 12; month++) {
        const monthsPaidToDate =
            finances.formValues.debtRepaymentMonths < month ? finances.formValues.debtRepaymentMonths : month;
        const debtPaidToDate = monthsPaidToDate * finances.monthlyDebtPay;

        const debtRemaining = -Math.round(finances.formValues.debt - debtPaidToDate);

        points.push(debtRemaining);
    }

    const range = {
        max: Math.max(...points),
        min: Math.min(...points),
    };

    const scaleValue = (value) => (height * (range.max - value)) / (range.max - range.min);

    console.log('POINTS', points);

    let debtString = points.map((point, i) => `${i * scale},${scaleValue(point)}`).join('\n');
</script>

<div id="chart">
    {#if finances.salary}
        <svg width={scale * (points.length - 1)} height={10 * scale}>
            <!-- x axis -->
            <line x1="0" x2={scale * (points.length - 1)} y1={10 * scale} y2={10 * scale} />
            <g class="x" transform={`translate(0,${10 * scale + 20})`}>
                {#each points as point, i}
                    <text x={i * scale}>{i}</text>
                {/each}
            </g>

            <!-- y axis -->
            <line x1="0" x2="0" y1="0" y2={height} />
            <g class="y" transform="translate(-10,0)">
                {#each points as point, i}
                    <text y={scaleValue(point)}>{point}</text>
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
