var wii = 2175498;

function Tablespaces() {
    var chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
                    text: "Gaming Consoles Sold in 2012"
                },
                animationEnabled: false,
                data: [
                    {
                        click: function(e) {
                            alert("dataSeries Event => Name: " + e.dataSeries.name + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
                        },
                        type: "pie",
                        showInLegend: false,
                        dataPoints: [
                            {y: 4181563, legendText: "PS 3", indexLabel: "PlayStation 3"},
                            {y: wii, legendText: "Wii", indexLabel: "Wii"},
                            {y: 3125844, legendText: "Xbox", indexLabel: "Xbox 360"},
                            {y: 1176121, legendText: "DS", indexLabel: "Nintendo DS"},
                            {y: 1727161, legendText: "PSP", indexLabel: "PSP"},
                            {y: 4303364, legendText: "3DS", indexLabel: "Nintendo 3DS"},
                            {y: 1717786, legendText: "Vita", indexLabel: "PS Vita"}
                        ]
                    }
                ]
            });
    chart.render();
    wii += 1000000;
    setTimeout(Tablespaces, 3000);
}

/////////////////////////////////////
function RAMusage() {
    var ram = new Gauge({
        renderTo: 'gauge2',
        width: 200,
        height: 200,
        glow: true,
        units: '%',
        title: 'RAM',
        strokeTicks: false,
        highlights: [{
                from: 60,
                to: 80,
                color: 'Yellow'
            }, {
                from: 80,
                to: 100,
                color: 'Red'
            }],
        animation: {
            delay: 10,
            duration: 300,
            fn: 'bounce'
        }
    });
    ram.onready = function() {
        setInterval(function() {
            ram.setValue(Math.random() * 100);
        }, 1000);
    };
    ram.draw();
}

function CPUusage() {
    var cpu = new Gauge({
        renderTo: 'gauge1',
        width: 200,
        height: 200,
        glow: true,
        units: '%',
        title: 'CPU',
        strokeTicks: false,
        highlights: [{
                from: 60,
                to: 80,
                color: 'Yellow'
            }, {
                from: 80,
                to: 100,
                color: 'Red'
            }],
        animation: {
            delay: 10,
            duration: 300,
            fn: 'bounce'
        }
    });
    cpu.onready = function() {
        setInterval(function() {
            cpu.setValue(Math.random() * 100);
        }, 1000);
    };
    cpu.draw();
}

////////////////////////////////
var yy = 5;
var sgaArray = new Array();
function SGAMonitor() {
    sgaArray.push({x: new Date(), y: Math.round(Math.random() * 100)});
    var chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
                    text: "SGA Usage"
                },
                axisX: {
                    labelAngle: 45,
                    valueFormatString: "HH:mm",
                    title: "Time"
                },
                axisY: {
                    title: "% SGA Consumed"
                },
                data: [
                    {
                        color: "rgb(175, 0, 0)",
                        type: "area",
                        dataPoints: sgaArray
                    }
                ]
            });
    chart.render();
    if (sgaArray.length > 60)
        sgaArray.shift();
    setTimeout(SGAMonitor, 1000);
}
//////////////////////////////////

/////////////////////////////////

var yy = 5;
var transArray = new Array();
function TransMonitor() {
    transArray.push({x: new Date(), y: Math.round(Math.random() * 100)});
    var chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
                    text: "Transactions for a X time"
                },
                axisX: {
                    labelAngle: 45,
                    valueFormatString: "HH:mm",
                    title: "Time"
                },
                axisY: {
                    title: "Transactions"
                },
                data: [
                    {
                        color: "rgb(175, 0, 0)",
                        type: "area",
                        dataPoints: transArray
                    }
                ]
            });
    chart.render();
    if (transArray.length > 60)
        transArray.shift();
    setTimeout(TransMonitor, 1000);
}

/////////////////////////////////
/*
 // using jQuery for simplicity, but you can implement in other libraries or vanilla javascript if you want
 function drawChart() {
 var options = {
 title: 'Company Performance',
 vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
 };
 var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
 function updateChart () {
 $.ajax({
 url: 'path/to/data/source/',
 data: {// any parameters you need to pass to the server to get your data back
 },
 dataType: // text, json, XML, whatever your server returns,
 success: function (response) {
 // use response to create/update DataTable
 chart.draw(data, options);
 // update the chart again in 2 seconds
 setTimeout(updateChart, 2000);
 },
 error: function (response) {
 // handle errors
 }
 });
 }
 updateChart();
 }*/