<script lang="ts">
    import { getChartData } from '../utils/chart';
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

    let abbreviate = (num: number): string => {
        return Math.abs(num) < 1000 ? num.toString() : `${Math.floor(num / 100) / 10}k`;
    };
</script>

<div id="chart">
    <p>Based on this salary, your next 12 months could look like this:</p>
    <svg {width} {height}>
        <!-- x axis -->
        <line x1="0" x2={width} y1={height} y2={height} />
        <g class="x" transform={`translate(0,${height + 20})`}>
            {#each chartData.categories[0].points as point, i}
                <text x={point.x}>{i}</text>
            {/each}
        </g>

        <!-- x line for 0-->
        {#if chartData.zeroY < height && chartData.zeroY >= 0}
            <line x1="0" x2={width} y1={chartData.zeroY} y2={chartData.zeroY} />
        {/if}

        <!-- y axis -->
        <line x1="0" x2="0" y1="0" y2={height} />
        <g class="y" transform="translate(-10,0)">
            {#each chartData.yAnnotations as annotation}
                {#if annotation.y >= 0}
                    <text y={annotation.y}>{abbreviate(annotation.value)}</text>
                {/if}
            {/each}
        </g>

        <!-- data -->
        {#each chartData.categories as category}
            {@const { points, string, displayColor, displayName } = category}
            {@const endPoint = points[points.length - 1]}
            <polyline style="stroke: {displayColor}; stroke-width: 2" points={string} />

            <text y={endPoint.y - 20} x={endPoint.x + 60}>
                {displayName}: {endPoint.value}
            </text>
        {/each}
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
