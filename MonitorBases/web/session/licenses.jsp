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
                        <li>
                            <a href="dashboard.jsp"><span class="glyphicon glyphicon-home"></span>  Dashboard</a>
                        </li> 
                        <li>
                            <a href="tablespaces.jsp"><span class="glyphicon glyphicon-hdd"></span>  Tablespaces</a>
                        </li>
                        <li>
                            <a href="redo.jsp"><span class="glyphicon glyphicon-time"></span>  Redo Log</a>
                        </li>
                        <li class="active">
                            <a href="licenses.jsp"><span class="glyphicon glyphicon-file"></span>  Licenses</a>
                        </li>                        
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
            <div id="page-wrapper">
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                Licenses <small>We're free too!</small>
                            </h1>
                        </div>                        
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h2>This Software is licensed by GPL 3.0 and Creative Commons 3.0</h2>
                            <p>The art used in this site is licensed by Creative Commons BY-NC-SA</p>
                            <p>The code used in this site is licensed by GNU Public License 3.0</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-sm-3">
                            <h3>Bootstrap</h3>
                            <p>The MIT License (MIT)
                                <br/>
                                Copyright (c) 2011-2014 Twitter, Inc
                                <br/>
                                Permission is hereby granted, free of charge, to any person obtaining a copy
                                of this software and associated documentation files (the "Software"), to deal
                                in the Software without restriction, including without limitation the rights
                                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                copies of the Software, and to permit persons to whom the Software is
                                furnished to do so, subject to the following conditions:
                                <br/>
                                The above copyright notice and this permission notice shall be included in
                                all copies or substantial portions of the Software.
                                <br/>
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                                THE SOFTWARE.
                            </p>
                            <h5><a href="http://getbootstrap.com/">Oficial Site</a></h5>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <h3>Gauges</h3>
                            <p>
                                HTML5 Canvas Gauge implementation
                                <br/>
                                This code is subject to MIT license.
                                <br/>
                                Copyright (c) 2012 Mykhailo Stadnyk mikhus@gmail.com
                                <br/>
                                Permission is hereby granted, free of charge, to any person obtaining a copy of
                                this software and associated documentation files (the "Software"), to deal in
                                the Software without restriction, including without limitation the rights to use,
                                copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
                                Software, and to permit persons to whom the Software is furnished to do so,
                                subject to the following conditions:
                                <br/>
                                The above copyright notice and this permission notice shall be included in all
                                copies or substantial portions of the Software.
                                <br/>
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
                                FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                                COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
                                IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                                CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                <br/>
                                @authors: Mykhailo Stadnyk mikhus@gmail.com
                                Chris Poile poile@edwards.usask.ca
                                Luca Invernizzi http://www.lucainvernizzi.net
                                Robert Blackburn http://www.rwblackburn.com
                            </p>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <h3>CanvasJS</h3>
                            <p>
                                Licence "creative common attribution-noncommercial 3.0"
                                <br/>
                                You are free to:
                                <br/>
                                -Share: copy and redistribute the material in any medium or format
                                -Adapt: remix, transform, and build upon the material
                                The licensor cannot revoke these freedoms as long as you follow the license terms.
                                <br/>
                                Under the following terms:
                                <br/>
                                -Attribution: You must give appropriate credit, provide a link to the license, and
                                indicate if changes were made. You may do so in any reasonable manner, but not in
                                any way that suggests the licensor endorses you or your use
                                <br/>
                                -NonCommercial: You may not use the material for commercial purposes.
                                <br/>
                                No additional restrictions: You may not apply legal terms or technological measures
                                that legally restrict others from doing anything the license permits
                            </p>
                            <h5><a href="http://www.canvasjs.com">Official Site</a></h5>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <h3>jQuery</h3>
                            <p>
                                Licencia MIT/GPL
                                <br/>
                                The MIT License is a free software license originating at the Massachusetts Institute of Technology (MIT).
                                It is a permissive free software license, meaning that it permits reuse within proprietary software provided 
                                all copies of the licensed software include a copy of the MIT License terms and the copyright notice. 
                                Such proprietary software retains its proprietary nature even though it incorporates software under the MIT 
                                License. The license is also GPL-compatible, meaning that the GPL permits combination and redistribution with
                                software that uses the MIT License.
                                <br/>
                                Notable software packages that use one of the versions of the MIT License include Expat, the Mono development 
                                platform class libraries, Ruby on Rails, Nodejs, Lua (from version 5.0 onwards), Wayland and the X Window 
                                System, for which the license was written.
                                <br/>
                                The GNU General Public License (GNU GPL or GPL) is the most widely used free software 
                                license, which guarantees end users (individuals, organizations, companies) the 
                                freedoms to use, study, share (copy), and modify the software. Software that allows 
                                these rights is called free software and, if the software is copylefted, then it also 
                                requires that this be retained. The GPL demands both. The license was originally 
                                written by Richard Stallman of the Free Software Foundation (FSF) for the GNU project.
                                <br/>
                                In other words, the GPL grants the recipients of a computer program the rights of the 
                                Free Software Definition[6] and uses copyleft to ensure the freedoms are preserved 
                                whenever the work is distributed, even when the work is changed or added to. The GPL 
                                is a copyleft license, which means that derived works can only be distributed under 
                                the same license terms. This is in distinction to permissive free software licenses, 
                                of which the BSD licenses and the MIT License are the standard examples. GPL was the 
                                first copyleft license for general use.
                            </p>
                            <h5><a href="http://www.jquery.com">Official Site</a></h5>
                        </div>
                    </div>
                </div> <!--Container-fluid-->
            </div><!-- /#page-wrapper -->
        </div><!-- /#wrapper -->
        <script type="text/javascript" src="../js/jquery-1.11.0.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
    </body>
</html>