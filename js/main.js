/**
 * Created by bit_zt on 16/3/20.
 */

/*
*
* $(function(){}) 是 $(document).ready(function(){}) 的简写
* 用来在DOM加载完成之后执行一系列预先定义好的函数
*
* */
$(function(){
    var $player = $('#player'),
        $play = $('#play'),
        $stop = $('#stop'),
        $volume = $('#volume'),
        $expand = $('#expand'),
        $upload = $('#upload'),

        //confused
        player = $player[0],

        $file = $('#file'),
        $timer = $('#timer'),
        $progressBar = $('#progressBar'),
        $innerBar = $('#innerBar'),
        $volumeControl = $('#volume-control'),
        $volumeInner = $('#volume-inner');

    $play
        .on('click', function(){
            if(player.paused){
                player.play();
                $(this).removeClass('icon-play').addClass('icon-pause');
            }else{
                player.pause();
                $(this).removeClass('icon-pause').addClass('icon-play');
            }
        });

    $stop
        .on('click', function(){
            player.currentTime = 0;
            $innerBar.css('width', 0 + 'px');
        });

    $volume
        .on('click', function(){
            if(player.muted){
                player.muted = false;
                $(this).removeClass('icon-volume-mute').addClass('icon-volume');
                $volumeInner.css('width', 100 + '%');
            }else{
                player.muted = true;
                $(this).removeClass('icon-volume').addClass('icon-volume-mute');
                $volumeInner.css('width', 0);
            }
        });

    $expand
        .on('click', function() {
            if (!document.webkitIsFullScreen) {
                player.webkitRequestFullScreen(); //全屏
                $(this).removeClass('icon-expand').addClass('icon-contract');
            } else {
                document.webkitCancelFullScreen();
                $(this).removeClass('icon-contract').addClass('icon-expand');
            }
        });

    $upload
        .on('click', function(){
            $file.trigger('click');
        });

    $file
        .on('change', function(e){
            var file = e.target.files[0],
                 canPlayType = player.canPlayType((file.type));
            if(canPlayType === 'maybe' || canPlayType === 'probably'){
                src = window.URL.createObjectURL(file);
                player.src = src;
                player.currentTime = 0;
                player.play();
                $play.removeClass('icon-play').addClass('icon-pause');
                player.onload = function(){
                    window.URL.revokeObjectURL(src);
                };
            }else{
                alert("浏览器不支持您选择的文件格式");
            }
        });

    $player
        .on('timeupdate', function(){
            var time = player.currentTime.toFixed(1),
                minutes = Math.floor((time / 60) % 60),
                seconds = Math.floor(time % 60);

            if(seconds < 10){
                seconds = '0' + seconds;
            }
            $timer.text(minutes + ':' + seconds);

            var width = $progressBar.width();
            if(player.duration){
                var per = (player.currentTime / player.duration).toFixed(3);
                window.per = per;
            }else{
                per = 0;
            }
            $innerBar.css('width', (width * per).toFixed(0) + 'px');

            if(player.ended){
                $play.removeClass('icon-pause').addClass('icon-play');
            }
        });

    $progressBar
        .on('click', function(e){
            var width = $(this).width(),
                x = e.offsetX;  //e.offsetX表示鼠标指针的位置相对于触发事件的对象的X坐标
            window.per = (x / width).toFixed(3);

            var duration = player.duration;
            player.currentTime = (duration * window.per).toFixed(1);

            $innerBar.css('width', x + 'px');
        });

    $volumeControl
        .on('click', function(e){
            var width = $(this).width(),
                x = e.offsetX;
            window.vol = (x / width).toFixed(1);

            player.volume = window.vol;
            $volumeInner.css('width', x + 'px');
        });

    $(document)
        .on('webkitfullscreenchange', function(e){
            var progress_width = $progressBar.width(),
                volume_width = $volumeControl.width();

            if(window.per){
                $innerBar.css('width', (window.per * progress_width).toFixed(0) + 'px');
            }
            if(window.vol){
                $volumeInner.css('width', (window.vol * volume_width).toFixed(0) + 'px');
            }
        });

    $("#rightitem").click(function($name){
        player.src = $name;
        player.play();
        $(this).removeClass('icon-play').addClass('icon-pause');
    });


});

function play($name){
    player.src = $name;
    player.play();
    $('#play').removeClass('icon-play').addClass('icon-pause');
}