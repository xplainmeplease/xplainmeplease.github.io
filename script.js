function renderDataset(elementId, operationName, xAxisData, animation)
{
    const labels = [...Array(xAxisData.length).keys()]
    const data = {
        labels: labels,
        datasets: [{
            label: 'TestData',
            data: xAxisData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
                // 'rgba(255, 205, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                // 'rgb(255, 99, 132)',
                // 'rgb(255, 159, 64)',
                // 'rgb(255, 205, 86)',
                // 'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                // 'rgb(153, 102, 255)',
                // 'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            radius: 0
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            animation,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        threshold: 10
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },

                        pinch: {
                            enabled: true
                        },
                        mode: 'xy',
                    }
                }
            }
        },
    };

    const bar = new Chart(
        document.getElementById(elementId),
        config
    );

}

const data3 = [];
const data4 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 100; i++) {
    prev += 5 - Math.random() * 10;
    data3.push({x: i, y: prev});
    prev2 += 5 - Math.random() * 10;
    data4.push({x: i, y: prev2});
}

const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data3.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const renderAnimation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    }
};

let delayed;
const memeAnimation =  {
    onComplete: () => {
        delayed = true;
    },
        delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
    },
}

renderDataset("acquisitions","testLine",data3, memeAnimation);
renderDataset("acquisitions1","testLine1",data4, renderAnimation);



