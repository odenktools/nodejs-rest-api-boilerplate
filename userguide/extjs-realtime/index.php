<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta content="noindex, nofollow" name="robots">

    <meta content="no-cache" http-equiv="Pragma">

    <meta content="no-cache" http-equiv="Cache-Control">

    <meta content="id, en" http-equiv="content-language">

    <meta content="all" name="spiders">

    <meta content="all" name="robots">

    <title>ExtJS Realtime With NodeJS</title>

    <!-- ** CSS ** -->
    <!-- base library -->
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/commercial/3.4.1.1/resources/css/ext-all.css"/>

    <link rel="stylesheet" type="text/css" href="assets/css/silk-icon.css" />

    <link rel="stylesheet" type="text/css" href="assets/shared/examples.css" />

    <!-- page specific -->
    <style type="text/css">

        /* global css */
        body {
            padding:0 2em 3em;
            font: normal 12px arial, helvetica, sans-serif;
            color: #282828;
        }

    </style>

    <script type="text/javascript">


        <?php
            $base_url = ($_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}";
            $base_url .= '/' . 'extjs-realtime/';
        ?>

        var base_url = '<?php echo $base_url ?>';



    </script>

    <script type="text/javascript" src="assets/js/jquery-1.9.1.min.js"></script>

    <!-- ** Javascript ** -->
    <!-- ExtJS library: base/adapter -->
	<script type="text/javascript" src="http://cdn.sencha.com/ext/commercial/3.4.1.1/adapter/ext/ext-base.js"></script>

    <!-- ExtJS library: all widgets -->
    <script type="text/javascript" src="http://cdn.sencha.com/ext/commercial/3.4.1.1/ext-all.js"></script>

    <script type="text/javascript">

        $jQuery = jQuery.noConflict();

    </script>

    <script type="text/javascript" src="assets/js/socket.io.js"></script>

    <script type="text/javascript" src="assets/js/Ext.ux.OdkSocketIO.js"></script>

    <script type="text/javascript" src="assets/js/Ext.ux.OdkSocketGridPanel.js"></script>

</head>

<body>

	<script type="text/javascript" src="realtimeapp.js"></script>

	<div id="form-ct" style=""></div>
	<div id="grid-example" style=""></div>

</body>

</html>