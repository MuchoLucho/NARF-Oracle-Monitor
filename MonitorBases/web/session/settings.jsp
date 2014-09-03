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
    <body>
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
                <form method="post" action="Parameters">
                    <ul class="nav navbar-right top-nav">
                        <li class="dropdown">
                            <br class="hidden-lg hidden-md"/>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> <% out.print((String) session.getAttribute("username"));%>  <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li>
                                    <button type="submit" name="history" class="submitLink"><span class="glyphicon glyphicon-list"></span> Logs</button>
                                </li>
                                <li>
                                    <button type="submit" name="settings" class="submitLink"><span class="glyphicon glyphicon-cog"></span> Settings</button>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <button type="submit" name="logout" class="submitLink"><span class="glyphicon glyphicon-log-out"></span> Log Out</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </form>
                <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
                <br/><br/>
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav side-nav">
                        <li>
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
                                Settings
                            </h1>
                        </div>                        
                    </div><!-- /.row -->
                    <div class="row">
                        <form class="col-md-12" action="Login" method="post"> 
                            <div class="form-group" style="border: 1px #222 solid; padding: 15px">
                                <h2>SGA Limits</h2>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon">Warning Level</span>
                                    <input type="number" class="form-control" value="60">
                                    <span class="input-group-addon">%</span>
                                </div><br/>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon">Danger Level&nbsp;</span>
                                    <input type="number" class="form-control" value="80">
                                    <span class="input-group-addon">%</span>
                                </div><br/>                           
                            </div>
                            <div class='form-group form-group-lg'>
                                <button class='btn btn-primary btn-lg btn-block btn-danger' type="submit">Submit</button>
                            </div>
                        </form><br/><br/>
                    </div>
                </div><!--Container-fluid-->
            </div><!-- /#page-wrapper -->
        </div><!-- /#wrapper -->
        <script type="text/javascript" src="../js/jquery-1.11.0.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
    </body>
</html>
