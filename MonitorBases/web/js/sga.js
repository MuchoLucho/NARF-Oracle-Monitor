var sgaArray = [];
var first = false;
//////////////////
var sgaTimeLine = [];
var sgaP = 1;
//////////////////
var sharedTimeLine = [];
var sharedP = 1;
sharedPT = 1;
//////////////////
var largeTimeLine = [];
var largeP = 1;
largePT = 1;
//////////////////
var javaTimeLine = [];
var javaP = 1;
javaPT = 1;
//////////////////
var warning = 60;
var danger = 80;
/////////////////

function runSGAService() {
    runLoop();
    sharedPool();
    largePool();
    javaPool();
    datos();
}

function runLoop() {
    updatePools();
    updateValues();
    SGAMonitor();
    updateSmile();
    setTimeout(runLoop, 2000);
}

function updatePools() {
    $.when($.ajax({
        url: 'SGAService',
        dataType: 'text',
        success: function(response) {
            sgaArray = response.split(";");
        }
    })).then(function() {
        first = true;
    });
}

function updateValues() {
    sgaTotal = parseInt(sgaArray[1]) + parseInt(sgaArray[3]) + parseInt(sgaArray[5]);
    sgaP = Math.round((parseInt(sgaArray[0]) + parseInt(sgaArray[2]) + parseInt(sgaArray[4])) * 100 / sgaTotal);
    sharedP = Math.round(parseInt(sgaArray[0]) * 100 / parseInt(sgaArray[1]));
    largeP = Math.round(parseInt(sgaArray[2]) * 100 / parseInt(sgaArray[3]));
    javaP = Math.round(parseInt(sgaArray[4]) * 100 / parseInt(sgaArray[5]));
    sharedPT = Math.round(parseInt(sgaArray[0]) * 100 / sgaTotal);
    largePT = Math.round(parseInt(sgaArray[2]) * 100 / sgaTotal);
    javaPT = Math.round(parseInt(sgaArray[4]) * 100 / sgaTotal);
}

function SGAMonitor() {
    if (first === true) {
        var date = new Date();
        sgaTimeLine.push({
            x: date,
            y: sgaP
        });
        sharedTimeLine.push({
            x: date,
            y: sharedPT
        });
        largeTimeLine.push({
            x: date,
            y: largePT
        });
        javaTimeLine.push({
            x: date,
            y: javaPT
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
                title: "% SGA Consumed",
                stripLines: [{value: danger, color: 'red', thickness: 3, label: "Danger", labelFontColor: "red"},
                    {value: warning, color: 'yellow', thickness: 3, label: "Warning", labelFontColor: "yellow"}]
            },
            data: [{//Total
                    name: "SGA Memory Used",
                    showInLegend: true,
                    type: "area",
                    color: "rgba(0,22,255,200)",
                    dataPoints: sgaTimeLine
                }, {//Shared
                    name: "Shared Pool",
                    showInLegend: true,
                    type: "area",
                    color: "rgba(0,255,255,200)",
                    dataPoints: sharedTimeLine
                }, {//Large
                    name: "Large Pool",
                    showInLegend: true,
                    type: "area",
                    color: "rgba(200,255,0,200)",
                    dataPoints: largeTimeLine
                }, {//Java
                    name: "Java Pool",
                    showInLegend: true,
                    type: "area",
                    color: "rgba(255,22,150,200)",
                    dataPoints: javaTimeLine
                }
            ]
        });
        chart.render();
        if (sgaTimeLine.length > 60) {
            sgaTimeLine.shift();
            sharedTimeLine.shift();
            largeTimeLine.shift();
            javaTimeLine.shift();
        }
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
        highlights: [{from: warning, to: danger, color: 'Yellow'}, {from: danger, to: 100, color: 'Red'}],
        animation: {delay: 10, duration: 300, fn: 'bounce'}
    });
    sharedPool.onready = function() {
        setInterval(function() {
            sharedPool.setValue(sharedP);
            var sPtext = document.getElementById("sPtext");
            sPtext.innerHTML = "<strong>Mem Used: </strong>" + String(sgaArray[0]) + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[1] + " bytes";
            sharedPool.draw();
        }, 2000);
    };
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
        highlights: [{from: warning, to: danger, color: 'Yellow'}, {from: danger, to: 100, color: 'Red'}],
        animation: {delay: 10, duration: 300, fn: 'bounce'}
    });
    largePool.onready = function() {
        setInterval(function() {
            largePool.setValue(largeP);
            var lPtext = document.getElementById("lPtext");
            lPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[2] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[3] + " bytes";
            largePool.draw();
        }, 2000);
    };
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
        highlights: [{from: warning, to: danger, color: 'Yellow'}, {from: danger, to: 100, color: 'Red'}],
        animation: {delay: 10, duration: 300, fn: 'bounce'}
    });
    javaPool.onready = function() {
        setInterval(function() {
            javaPool.setValue(javaP);
            var jPtext = document.getElementById("jPtext");
            jPtext.innerHTML = "<strong>Mem Used: </strong>" + sgaArray[4] + " bytes<br/><strong>Total Mem: </strong>" + sgaArray[5] + " bytes";
            javaPool.draw();
        }, 2000);
    };
    javaPool.draw();
}

/////////////////////////////////////////BD Data//////////////////

function datos() {
    $.ajax({
        url: 'DBInfoService',
        dataType: 'text',
        success: function(response) {
            res = response.split(";");
            var info = document.getElementById("info");
            info.innerHTML = "<h4>DB Name</h4><p>" + res[0] + "</p><h4>Oracle Version</h4><p>" + res[1] + "</p>";
        }
    });
}

function updateSmile() {
    var health = document.getElementById("health");
    if (sgaP > danger) {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/bad.png\" alt=\"BAD\"/>";
    } else if (sgaP > warning) {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/regular.png\" alt=\"ALERT\"/>";
    } else {
        health.innerHTML = "<img class=\"health center-block\" src=\"../img/good.png\" alt=\"GOOD\"/>";
    }
}