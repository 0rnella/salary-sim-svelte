<script lang="ts">
    import { getChartData, scaleY } from '../utils/chart';
    import { calculations, userInfo } from '../stores.js';

    const width = 600;
    const height = 400;
    const numberMonths = 12;
    let chartData;

    calculations.subscribe((calc) => {
        chartData = getChartData(
            {
                width,
                height,
                numberMonths,
            },
            $userInfo,
            calc,
        );
    });
</script>

<div id="chart">
    <p>Based on this salary, your next 12 months could look like this:</p>
    <svg {width} {height}>
        <!-- x axis -->
        <line x1="0" x2={width} y1={height} y2={height} />
        <g class="x" transform={`translate(0,${height + 20})`}>
            {#each chartData.debtPoints as point, i}
                <text x={point.x}>{i}</text>
            {/each}
        </g>

        <!-- x line for 0-->
        {#if chartData.valueRange.min <= 0 && chartData.valueRange.max >= 0}
            <line
                x1="0"
                x2={width}
                y1={scaleY({ value: 0, valueRange: chartData.valueRange, height })}
                y2={scaleY({ value: 0, valueRange: chartData.valueRange, height })}
            />
        {/if}

        <!-- y axis -->
        <line x1="0" x2="0" y1="0" y2={height} />
        <g class="y" transform="translate(-10,0)">
            {#each chartData.yAnnotations as value}
                <text y={scaleY({ value, valueRange: chartData.valueRange, height })}>{Math.floor(value / 1000)}k</text>
            {/each}
        </g>

        <!-- data -->
        {#if chartData.debtPoints}
            <polyline style="stroke: red; stroke-width: 2" points={chartData.debtString} />
            {@const endDebtPoint = chartData.debtPoints[numberMonths - 1]}

            <text y={endDebtPoint.y - 20} x={endDebtPoint.x + 60}>
                Debt: {endDebtPoint.value}
            </text>
        {/if}

        {#if chartData.wealthPoints}
            <polyline style="stroke: green; stroke-width: 2" points={chartData.wealthString} />
            {@const endWealth = chartData.wealthPoints[numberMonths - 1]}

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
