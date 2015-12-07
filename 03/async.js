var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var mainWindow = null;

// 起動
app.on('ready', function(){
    mainWindow = new BrowserWindow({width:800, height:600});
    mainWindow.loadUrl('file://' + __dirname + '/async.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});

// 非同期プロセス通信
ipc.on('async', function( event, args ){
    console.log( args );
    var result = args.value * 2;
    // レンダープロセスへsend
    event.sender.send('async-reply', result);
});
