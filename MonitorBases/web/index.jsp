<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="img/favicon.png"/>
        <title>NARF Oracle Monitor</title>
        <link href="css/bootstrap.css" rel="stylesheet"/>
        <link href="css/sb-admin.css" rel="stylesheet"/>
        <link href="css/style.css" rel="stylesheet"/>
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>        
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <img src="img/logo_lg.png" class="hidden-xs" alt="NARF Oracle Monitor"/>
                    <img src="img/logo_sm.png" class="hidden-lg hidden-md hidden-sm" alt="NARF Oracle Monitor"/>
                </div>
            </div>
            <div class="row">
                <form class="col-md-12" action="#" method="get">
                    <h2 style="color: white">User Information</h2>
                    <div class="form-group">
                        <input type="text" class="form-control input-lg" placeholder="Username" name="user">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control input-lg" placeholder="Password" name="password">
                    </div>
                    <%if (1 == 1)//Comprobación de que el monitor está conectado o no
                        out.print("<h2 style='color: white'>Database Information</h2><div class='form-group'><input"
                                + " type='text' class='form-control input-lg' placeholder='SID'></div><div class='form-group'"
                                + "><input type='text' class='form-control input-lg' placeholder='Host Name'></div><div class="
                                + "'form-group'><input type='text' class='form-control input-lg' placeholder='Port'></div><div"
                                + " class='form-group'><input type='hidden' value='db' name='db'></div>");
                    %>
                    <div class='form-group'>
                        <!--<button class='btn btn-primary btn-lg btn-block btn-danger' type='submit'>Log In</button>-->
                        <a class='btn btn-primary btn-lg btn-block btn-danger' href='session/dashboard.jsp'>Log In</a>
                    </div>
                </form><br/><br/>
            </div>
        </div>
        <script type="text/javascript" src="js/jquery-1.11.0.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
    </body>
</html>

