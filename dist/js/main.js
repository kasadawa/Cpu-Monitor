const socket = new WebSocket('ws://localhost:8080');

var trace = {
    x: [],
    y: [],
    type: 'scatter'
};
var i = 0;

socket.onmessage = function (event) {
    (i == 60) ? (reorder(), i = 59) : i;
    trace.y.push(event.data);
    trace.x.push(i++);
    
    if (i == 1) {
        var data = [trace];
        var layout = {
            title: 'Processor Percentage',
            xaxis: {
                range: [0, 60],
                autorange: false
            },
            yaxis: {
                range: [0, 100],
                autorange: false
            },
        };
        Plotly.newPlot('myDiv', data, layout);

    } else {
        Plotly.redraw('myDiv');
    }

}

function reorder() {
    var tmpY = [];
    trace.y.map((value, index) => {
        if (index != trace.y.length - 1) {
            tmpY.push(trace.y[index + 1]);
        }
    });
    trace.y.length = 0;
    trace.y = tmpY;
    trace.x.pop();
}
