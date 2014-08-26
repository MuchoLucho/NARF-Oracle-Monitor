<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="../img/favicon.png">
        <title>NARF Oracle Monitor</title>
        <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="../css/sb-admin.css" rel="stylesheet" type="text/css">
        <link href="../css/style.css" rel="stylesheet" type="text/css">
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body onload="updatePools();
            SGAMonitor();
            sharedPool();
            largePool();
            javaPool();
            datos();">
        <div id="wrapper">
            <!-- Navigation -->
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.jsp" rel="home">
                        <img src="../img/logo_lg.png" class="hidden-xs" alt="NARF Oracle Monitor"/>
                        <img src="../img/logo_xs.png" class="hidden-lg hidden-md hidden-sm" alt="NARF Oracle Monitor"/>
                    </a>
                </div>
                <!-- Top Menu Items -->
                <form method="post" action="Lougout">
                    <ul class="nav navbar-right top-nav">
                        <li>
                            <button class="btn btn-danger"><span class="glyphicon glyphicon-log-out"></span> Logout </button>
                        </li>
                    </ul>
                </form>
                <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
                <br/><br/>
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav side-nav">
                        <li class="active">
                            <a href="dashboard.jsp"><span class="glyphicon glyphicon-home"></span>  Dashboard</a>
                        </li> 
                        <li>
                            <a href="tablespaces.jsp"><span class="glyphicon glyphicon-hdd"></span>  Tablespaces</a>
                        </li>
                        <li>
                            <a href="redo.jsp"><span class="glyphicon glyphicon-time"></span>  Redo Log</a>
                        </li>
                        <li>
                            <a href="licenses.jsp"><span class="glyphicon glyphicon-file"></span>  Licenses</a>
                        </li>                        
                    </ul>
                </div><!-- /.navbar-collapse -->
            </nav>
            <div id="page-wrapper">
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                Dashboard <small>Welcome</small>
                            </h1>
                        </div>                        
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-3 col-sm-3 inverseBox">
                            <h3>General Information</h3>
                            <span id="info"></span>
                            <hr/>
                            <h3>Database Health</h3>
                            <h4>Status</h4><span class="health" id="health"></span>                            
                        </div>
                        <div class="col-md-6 col-lg-6"><!--Si se quiere CPU y RAM se ponen col-md-6-->
                            <div id="chartContainer" style="height: 500px; width: 100%;"></div>
                        </div>
                        <div class="col-md-3 col-lg-3">
                            <table class="table">
                                <tr><th colspan="2">Shared Pool</th></tr>
                                <tr><td><canvas id="sharedPool" class="center-block"></canvas></td><td id="sPtext"></td></tr>
                                <tr><th colspan="2">Large Pool</th></tr>
                                <tr><td><canvas id="largePool" class="center-block"></canvas></td><td id="lPtext"></td></tr>
                                <tr><th colspan="2">Java Pool</th></tr>
                                <tr><td><canvas id="javaPool" class="center-block"></canvas></td><td id="jPtext"></td></tr>
                            </table>
                        </div>
                    </div>
                </div><!--Container-fluid-->
            </div><!-- /#page-wrapper -->
        </div><!-- /#wrapper -->
        <script type="text/javascript" src="../js/jquery-1.11.0.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/canvasjs.min.js"></script>
        <script type="text/javascript" src="../js/gauge.min.js"></script>
        <script type="text/javascript" src="../js/scripts.js"></script>
    </body>
</html>
