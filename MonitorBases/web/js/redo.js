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
                str += "\t<td>N�" + res[i] + "</td>";
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