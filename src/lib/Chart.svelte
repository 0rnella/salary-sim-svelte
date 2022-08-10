<script lang="ts">
    import { addCoordinates, calculateMoneyAtMonth, makePointString, makeYAnnotations, scaleY } from '../utils/chart';
    export let userInfo, calculations;

    const width = 600;
    const height = 400;
    const numberMonths = 12;

    const debtValues = [];
    const wealthValues = [];
    for (let month = 0; month <= numberMonths; month++) {
        const moneyAtMonth = calculateMoneyAtMonth({ month, userInfo, calculations });

        debtValues.push(moneyAtMonth.debt);
        wealthValues.push(moneyAtMonth.wealth);
    }
    const valueRange = {
        max: Math.max(...debtValues, ...wealthValues),
        min: Math.min(...debtValues, ...wealthValues),
    };

    const debtPoints = addCoordinates({ valueRange, values: debtValues, width, height });
    const wealthPoints = addCoordinates({ valueRange, values: wealthValues, width, height });

    const debtString = makePointString(debtPoints);
    const wealthString = makePointString(wealthPoints);

    const yAnnotations = makeYAnnotations(valueRange);
</script>

<div id="chart">
    <p>Based on this salary, your next 12 months could look like this:</p>
    <svg {width} {height}>
        <!-- x axis -->
        <line x1="0" x2={width} y1={height} y2={height} />
        <g class="x" transform={`translate(0,${height + 20})`}>
            {#each debtPoints as point, i}
                <text x={point.x}>{i}</text>
            {/each}
        </g>

        <!-- x line for 0-->
        {#if valueRange.min <= 0 && valueRange.max >= 0}
            <line
                x1="0"
                x2={width}
                y1={scaleY({ value: 0, valueRange, height })}
                y2={scaleY({ value: 0, valueRange, height })}
            />
        {/if}

        <!-- y axis -->
        <line x1="0" x2="0" y1="0" y2={height} />
        <g class="y" transform="translate(-10,0)">
            {#each yAnnotations as value}
                <text y={scaleY({ value, valueRange, height })}>{Math.floor(value / 1000)}k</text>
            {/each}
        </g>

        <!-- data -->
        {#if debtPoints}
            <polyline style="stroke: red; stroke-width: 2" points={debtString} />
            {@const endDebtPoint = debtPoints[numberMonths - 1]}

            <text y={endDebtPoint.y - 20} x={endDebtPoint.x + 60}>
                Debt: {endDebtPoint.value}
            </text>
        {/if}

        {#if wealthPoints}
            <polyline style="stroke: green; stroke-width: 2" points={wealthString} />
            {@const endWealth = wealthPoints[numberMonths - 1]}

            <text y={endWealth.y - 20} x={endWealth.x + 60}>
                Wealth: {endWealth.value}
            </text>
        {/if}
    </svg>
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
