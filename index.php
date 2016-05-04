<?php
/**
 * Created by PhpStorm.
 * User: bit_zt
 * Date: 16/3/19
 * Time: 下午8:38
 */
$dir = opendir("./video");
$source = array();

while(($file = readdir($dir)) !== false){
    if($file != '.' && $file != '..' && substr(strrchr($file,'.'),1) == 'mp4'){
        $source[] = "./video/".basename($dir.DIRECTORY_SEPARATOR.$file);
    }
}
closedir($dir);
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>ZTax</title>
    <link rel="stylesheet" href="./css/pure-min.css">
    <link rel="stylesheet" href="./css/main.css">
</head>
<body>
    <script src="./js/jquery-1.9.0.min.js"></script>
    <script src="./js/main.js"></script>
    <div class="zone">
        <div class="toparea">
            <span class="toptitle">Ztax</span>
            <span class="topsign">see in your own way &nbsp&nbsp&nbsp</span>
            <span class="topprogrammer">by ZT</span>
        </div>
        <div class="body">
            <div class="wrapper">
                <div class="pure-g">
                    <div class="pure-u-1">
                        <div class="player">
                            <video id="player" width="700" height="400">您的浏览器不支持HTML5您的浏览器不支持HTML5
                                <source src="./video/Kobe%20Bryants%20Muse.mp4">
                            </video>
                        </div>
                        <div class="pure-g" id="controller">
                            <div class="pure-u-1-12">
                                <span id="play" class="icon icon-play"></span>
                                <span id="stop" class="icon icon-stop"></span>
                            </div>
                            <div class="pure-u-13-24 overflow-h">
                                <div id="progressBar" class="controlBar">
                                    <div id="innerBar" class="controlInner"></div>
                                </div>
                            </div>
                            <div class="pure-u-1-4">
                                <span id="timer">0:00</span>
                                <span id="volume" class="icon icon-volume"></span>
                                <div id="volume-control" class="controlBar">
                                    <div id="volume-inner" class="controlInner"></div>
                                </div>
                            </div>
                            <div class="pure-u-1-8 overflow-h">
                                <span id="expand" class="icon icon-expand"></span>
                                <span id="upload" class="icon icon-upload"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pure-g">
                    <div class="pure-u-1">
                        <input type="file" id="file">
                    </div>
                </div>
            </div>
            <div class="post-right">
                <div class="right-title">&nbsp;&nbsp;Video list</div>
                <table class="right-body">
                        <?php
                        foreach($source as $val) {
                            ?>
                            <tr >
                                <td class="right-item-title">
                                    &nbsp;<?php echo basename($val,".mp4"); ?>
                                </td>
                            </tr>
                            <tr class="post-item">
                                <td>
                                    <a href="javascript:play('<?php echo $val ?>')"><img src="./pic/<?php echo basename($val,".mp4"); ?>.png"></a>
                                </td>
                            </tr>
                            <?php
                        }
                        ?>
                </table>
            </div>
        </div>
    </div>
</body>
</html>