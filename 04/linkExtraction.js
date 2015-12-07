var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var client = require('cheerio-httpcli');
var URL = require('url');
var mainWindow = null;

app.on('ready', function(){

    mainWindow = new BrowserWindow({width:800, height:600});
    mainWindow.loadUrl('file://' + __dirname + '/linkExtraction.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });

});

// 非同期プロセス通信
ipc.on('link-extraction-async', function( event, arg ){

    var target = arg['target'];

    client.fetch( target, {}, function(err, $, res) {

        if( err ){
            // エラーの場合、レンダラープロセスへnullを返す
            event.sender.send('link-extraction-reply', null);
            return;
        }

        // 一時保存用のArray
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
                href : href2
            };

            // 保存しておく
            resulrObjArr.push( tempObj );
        });

        // レンダラープロセスへ返す
        event.sender.send('link-extraction-reply', resulrObjArr);
    });

});