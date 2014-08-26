var currentTBS = "nothing";
var currentTable = "nothing";
var sgaTimeLine = new Array();
var sgaArray = [];
function updateTBS() {
    var tbs = [];
    $.ajax({
        url: 'tbsService',
        dataType: 'text',
        data: {
            update: 'update'
        },
        success: function(response) {
            var tbsaux = response.split(";");
            tbsaux.pop();
            for (i = 0; i < tbsaux.length; i += 2) {
                tbs.push({
                    y: parseInt(tbsaux[i + 1]),
                    legendText: tbsaux[i],
                    indexLabel: "#percent%"
                });
            }
            var chart = new CanvasJS.Chart("mainChart", {
                title: {
                    text: "Tablespaces"
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
                        dataPoints: tbs,
                        click: function(e) {
                            currentTBS = e.dataPoint.legendText;
                        }
                    }
                ]
            });
            chart.render();
            tbs = [];
            setTimeout(updateTBS, 3000);
        }
    });
}

function tablesText() {
    $.ajax({
        url: 'tbsService',
        dataType: 'text',
        data: {
            text: currentTable
        },
        success: function(response) {
            var ar = response.split(";");
            var tbsaux = document.getElementById("tablesText");
            tbsaux.innerHTML = "<h4>Owner</h4><p>" + ar[0] + "</p>" +
                    "<h4>Used Space</h4><p>" + ar[1] + "</p><h4># Rows</h4>" +
                    "<p>" + ar[2] + "</p><h4>AVG Row Lenght</h4><p>" + ar[3] + "</p>" +
                    "<h4>Tablespace</h4><p>" + ar[4] + "</p>";
            setTimeout(tablesText, 3000);
        }
    });
}

function memTBS() {
    var memtbs = [];
    $.ajax({
        url: 'tbsService',
        dataType: 'text',
        data: {
            mem: currentTBS
        },
        success: function(response) {
            var tbsaux = response.split(";");
            tbsaux.pop();
            //for (i = 0; i < tbsaux.length; i += 2) {
                memtbs.push({
                    y: parseInt(tbsaux[0]),
                    legendText: "USED",
                    indexLabel: "#percent%"
                });
                memtbs.push({
                    y: parseInt(tbsaux[1]),
                    legendText: "REMAINING",
                    indexLabel: "#percent%"
                });
            //}
            var chart = new CanvasJS.Chart("memoryChart", {
                title: {
                    text: "Ramaining Space"
                },
                animationEnabled: false,
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "left",
                    fontSize: 20,
                    fontFamily: "Helvetica"
                },
                data: [{
                        type: "pie",
                        indexLabelFontFamily: "Garamond",
                        indexLabelFontSize: 20,
                        startAngle: -20,
                        showInLegend: true,
                        toolTipContent: "{legendText}: {y} KB",
                        dataPoints: memtbs
                    }]
            });
            chart.render();
            var memText = document.getElementById("memText");
            memText.innerHTML = "<h4>Memory Used</h4><p>" + tbsaux[0] + "</p>" +
                    "<h4>Total Memory</h4><p>" + tbsaux[1] + "</p><h4>Location</h4>" +
                    "<p>" + tbsaux[2] + "</p>";
            memtbs = [];
            setTimeout(memTBS, 3000);
        }
    });
}

function tablesTBS() {
    var tablestbs = [];
    $.ajax({
        url: 'tbsService',
        dataType: 'text',
        data: {
            tables: currentTBS
        },
        success: function(response) {
            var tbsaux = response.split(";");
            tbsaux.pop();
            for (i = 0; i < tbsaux.length; i += 2) {
                num = parseInt(tbsaux[i + 1]);
                tablestbs.push({
                    y: num,
                    legendText: tbsaux[i],
                    indexLabel: "#percent%"
                });
            }
            var chart = new CanvasJS.Chart("tablesChart", {
                title: {
                    text: "Tables"
                },
                animationEnabled: false,
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "left",
                    fontSize: 20,
                    fontFamily: "Helvetica"
                },
                data: [{
                        type: "pie",
                        indexLabelFontFamily: "Garamond",
                        indexLabelFontSize: 20,
                        startAngle: -20,
                        showInLegend: true,
                        toolTipContent: "{legendText}: {y} KB",
                        dataPoints: tablestbs
                    }]
            });
            chart.render();
            //tablestbs = [];
            setTimeout(tablesTBS, 3000);
        }
    });
}

////////////////SGA MONITOR///////////////////////////////////////////////////////////


function SGAMonitor() {
    var total = parseInt(sgaArray[1]) + parseInt(sgaArray[3]) + parseInt(sgaArray[5]);
    var used = parseInt(sgaArray[0]) + parseInt(sgaArray[2]) + parseInt(sgaArray[4]);
    sgaTimeLine.push({
        x: new Date(),
        y: Math.round(used * 100 / total)
    });
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "SGA Usage"
        },
        axisX: {
            labelAngle: 45,
            valueFormatString: "HH:mm:ss",
            title: "Time"
        },
        axisY: {
            title: "% SGA Consumed"
        },
        data: [{
                color: "rgb(175, 0, 0)",
                type: "area",
                dataPoints: sgaTimeLine
            }]
    });
    chart.render();
    updateSmile(Math.round(used * 100 / total));
    if (sgaTimeLine.length > 60)
        sgaTimeLine.shift();
    setTimeout(SGAMonitor, 2000);
}

function updatePools() {
    $.ajax({
        url: 'SGAService',
        dataType: 'text',
        success: function(response) {
            sgaArray = response.split(";");
            setTimeout(updatePools, 2000);

        }
    });
}

function updateSmile(i) {
    var health = document.getElementById("health");
    if (parseInt(i) > 80) {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/bad.png\" alt=\"BAD\"/>";
    } else if (parseInt(i) > 60) {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/regular.png\" alt=\"ALERT\"/>";
    } else {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/good.png\" alt=\"GOOD\"/>";
    }
}

function sharedPool() {
    var sharedPool = new Gauge({
        renderTo: 'sharedPool',
        width: 100,
        height: 100,
        glow: true,
        units: '% Consumed',
        title: 'Shared Pool',
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

    sharedPool.onready = function() {
        setInterval(function() {
            sharedPool.setValue(parseInt(parseInt(sgaArray[0]) * 100 / parseInt(sgaArray[1])));
            var sPtext = document.getElementById("sPtext");
            sPtext.innerHTML = "<strong>Mem Used: </strong>" + String(sgaArray[0]) + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[1] + " bytes";
            sharedPool.draw();
        }, 2000);
    };

    var sPtext = document.getElementById("sPtext");
    sPtext.innerHTML = "<strong>Mem Used: </strong>" + String(sgaArray[0]) + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[1] + " bytes";
    sharedPool.draw();
}

function largePool() {
    var largePool = new Gauge({
        renderTo: 'largePool',
        width: 100,
        height: 100,
        glow: true,
        units: '% Consumed',
        title: 'Large Pool',
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
    //alert("SGA Array before onready funct " + sgaArray);
    largePool.onready = function() {
        setInterval(function() {
            largePool.setValue(parseInt(parseInt(sgaArray[2]) * 100 / parseInt(sgaArray[3])));
            var lPtext = document.getElementById("lPtext");
            lPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[2] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[3] + " bytes";
            largePool.draw();
        }, 2000);
    };
    var lPtext = document.getElementById("lPtext");
    lPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[2] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[3] + " bytes";
    largePool.draw();
}

function javaPool() {
    var javaPool = new Gauge({
        renderTo: 'javaPool',
        width: 100,
        height: 100,
        glow: true,
        units: '% Consumed',
        title: 'Java Pool',
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
    javaPool.onready = function() {
        setInterval(function() {
            javaPool.setValue(parseInt(parseInt(sgaArray[4]) * 100 / parseInt(sgaArray[5])));
            var jPtext = document.getElementById("jPtext");
            jPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[4] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[5] + " bytes";
            javaPool.draw();
        }, 2000);
    };
    var jPtext = document.getElementById("jPtext");
    jPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[4] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[5] + " bytes";
    javaPool.draw();
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
        data: {
            type: String(logSelected)
        },
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
        data: {
            type: 'update'
        },
        dataType: 'text',
        success: function(response) {
            res = response.split(";");
            res.pop();
            for (i = 0; i < res.length; i += 3) {
                str += "<tr onclick=\"changeSelectedLog(" + res[i] + ")\">";
                str += "\t<td><img src=\"../img/" + res[i + 2].toLowerCase() + ".png\" alt=\"" + res[i + 1] + "\" class=\"semaphore\"/></td>";
                str += "\t<td>Nº" + res[i] + "</td>";
                str += "\t<td>" + res[i + 1] + " member" + ((res[i + 2] === '1') ? "" : "s") + "</td>";
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