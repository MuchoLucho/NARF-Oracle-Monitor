var currentTBS = "nothing";
var currentTable = "nothing";
var refreshRate = 3000;

function itarativeUpdate() {
    updateTBS();
    memTBS();
    tablesText();
    tablesTBS();
    setTimeout(itarativeUpdate, refreshRate);
}

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
                    fontSize: 20
                },
                data: [{
                        type: "pie",
                        startAngle: -20,
                        showInLegend: true,
                        toolTipContent: "{legendText}: {y} KB",
                        dataPoints: tbs,
                        click: function(e) {
                            currentTBS = (e.dataPoint.legendText).toUpperCase();
                            memTBS();
                            tablesText();
                            tablesTBS();
                        }
                    }]
            });
            chart.render();
            tbs = [];
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
            setTimeout(tablesText, refreshRate);
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
            var chart = new CanvasJS.Chart("memoryChart", {
                title: {
                    text: "Ramaining Space"
                },
                animationEnabled: false,
                legend: {
                    verticalAlign: "center",
                    horizontalAlign: "left",
                    fontSize: 20
                },
                data: [{
                        type: "pie",
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
                    fontSize: 20
                },
                data: [{
                        type: "pie",
                        startAngle: -20,
                        showInLegend: true,
                        toolTipContent: "{legendText}: {y} KB",
                        dataPoints: tablestbs
                    }]
            });
            chart.render();
        }
    });
}