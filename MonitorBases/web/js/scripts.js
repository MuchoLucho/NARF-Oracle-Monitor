/////////////TABLESPACES/////////////////////////////////////////////////////////////
var wii = 1.67;
function tablespaces() {
    var chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
                    text: "Gaming Consoles Sold in 2012"
                },
                animationEnabled: false,
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "left",
                    fontSize: 20,
                    fontFamily: "Helvetica"
                },
                data: [
                    {
                        type: "pie",
                        indexLabelFontFamily: "Garamond",
                        indexLabelFontSize: 20,
                        startAngle: -20,
                        showInLegend: true,
                        toolTipContent: "{legendText}: {y} KB",
                        dataPoints: [
                            {y: 80.24, legendText: "Google", indexLabel: "#percent%"},
                            {y: 8.16, legendText: "Yahoo!", indexLabel: "#percent%"},
                            {y: 4.67, legendText: "Bing", indexLabel: "#percent%"},
                            {y: wii, legendText: "Baidu", indexLabel: "#percent%"},
                            {y: 0.98, legendText: "Others", indexLabel: "#percent%"}
                        ]
                    }
                ]
            });
    chart.render();
    wii += 3;
    setTimeout(tablespaces, 3000);
}
/*
 <div class="col-lg-4 col-md-4 col-sm-4 jumbotron">
 <div id="mainChart" style="height: 450px; width: 100%;"></div>
 </div>
 <div class="col-lg-4 col-md-4 col-sm-4 jumbotron">
 <div id="tablesChart" style="height: 450px; width: 100%;"></div>
 </div>
 <div class="col-lg-4 col-md-4 col-sm-4 jumbotron">
 <div id="memoryChart" style="height: 450px; width: 100%;"></div>
 </div> 
 */

//////////////GAUGES///////////////////////////////////////////////////////////////
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

////////////////SGA MONITOR///////////////////////////////////////////////////////////
var sgaArray = new Array();
function SGAMonitor() {
    $.ajax({
        url: 'SGAService',
        dataType: 'text',
        success: function(response) {
            sgaArray.push({x: new Date(), y: Math.round(parseInt(response))});
            var chart = new CanvasJS.Chart("chartContainer",
                    {
                        title: {text: "SGA Usage"},
                        axisX: {
                            labelAngle: 45,
                            valueFormatString: "HH:mm:ss",
                            title: "Time"
                        },
                        axisY: {title: "% SGA Consumed"},
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
            setTimeout(SGAMonitor, 2000);
        }
    });
}

////////////////TRANSACTION MONITOR//////////////////////////////////////////////////

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
                    valueFormatString: "HH:mm:ss",
                    title: "Time"
                },
                axisY: {
                    title: "Transactions"
                },
                data: [
                    {
                        color: "rgb(0, 175, 0)",
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

////////////////REDO LOGS//////////////////////////////////////////////////////////////

var logSelected = 0; //Indicates the selected group

function changeSelectedLog(i) {
    logSelected = parseInt(i);
}
function selectedRedo() {
    var especifico = document.getElementById("especifico");
    var str = "";
    var res = [];
    $.ajax({
        url: 'redoService',
        data: {type: String(logSelected)},
        dataType: 'text',
        success: function(response) {
            if (response === "nothing") {
                str = "<h2>Select one of the left group to show the log information</h2>";
            } else {
                res = response.split(";");
                str = "<table class=\"table\"><thead><tr><th><h3>Group " + String(logSelected) + "</h3></th></tr></thead>";
                str += "<tbody><tr><th>Sequence</strong></th></tr><tr><td>" + res[0] + "</td></tr>";
                str += "<tr><th>Size</strong></th></tr><tr><td>" + res[1] + " KB</td></tr>";
                str += "<tr><th># Members</strong></th></tr><tr><td>" + res[2] + " members</td></tr>";
                str += "<tr><th>Archived</strong></th></tr><tr><td>" + res[3] + "</td></tr>";
                str += "<tr><th>Status</strong></th></tr><tr><td>" + res[4] + "</td></tr>";
                str += "<tr><th>Path</strong></th></tr><tr><td>" + res[5] + "</td></tr>";
                str += "</tbody></table>";
            }
            especifico.innerHTML = str;
            setTimeout(selectedRedo, 2000);
        },
        error: function(response) {
            especifico.innerHTML = "Unespected error: " + response; //Show Errors
        }
    });
}
function genRedos() {
    var especifico = document.getElementById("general");
    var str = "";
    var res = [];
    $.ajax({
        url: 'redoService',
        data: {type: 'update'},
        dataType: 'text',
        success: function(response) {
            res = response.split(";");
            res.pop();
            for (i = 0; i < res.length; i += 3) {
                str += "<tr onclick=\"changeSelectedLog(" + res[i] + ")\">";
                str += "\t<td><img src=\"../img/" + res[i + 1].toLowerCase() + ".png\" alt=\"" + res[i + 1] + "\" class=\"semaphore\"/></td>";
                str += "\t<td>Nº" + res[i] + "</td>";
                str += "\t<td>" + res[i + 2] + " member" + ((res[i + 2] === '1') ? "" : "s") + "</td>";
                str += "</tr>";
            }
            especifico.innerHTML = str;
            setTimeout(genRedos, 30000);
        },
        error: function(response) {
            especifico.innerHTML = "Unespected error: " + response; //Show Errors
        }
    });
}