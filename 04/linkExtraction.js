//
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

//
var client = require('cheerio-httpcli');
var URL = require('url');

var mainWindow = null;

// 起動
app.on('ready', function(){

    mainWindow = new BrowserWindow({width:800, height:600});
    mainWindow.loadUrl('file://' + __dirname + '/index3.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });

});

// 非同期プロセス通信
ipc.on('mul-async', function( event, arg ){

    var target = arg['target'];

    client.fetch( target, {}, function(err, $, res) {

        if( err ){
            // レンダラープロセスへsend
            event.sender.send('mul-async-reply', null);
            return;
        }

        var resulrObjArr = [];

        $("a").each(function( idx ) {

            var text = $(this).text();
            var href = $(this).attr('href');

            if( !href ){
                return;
            }

            // URLモジュールを使い、絶対パスに変換
            var href2 = URL.resolve( target, href );

            // Objectにする
            var tempObj = {
                text : text,
                href : href
            };

            // 一時保存
            resulrObjArr.push( tempObj );
        });

        // レンダラープロセスへsend
        event.sender.send('mul-async-reply', resulrObjArr);
    });

});