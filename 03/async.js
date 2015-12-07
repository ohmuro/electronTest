var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var mainWindow = null;

// 起動
app.on('ready', function(){
    mainWindow = new BrowserWindow({width:800, height:600});
    mainWindow.loadUrl('file://' + __dirname + '/index2.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});

// 非同期プロセス通信
ipc.on('mul-async', function( event, arg ){
    console.log( arg );
    var result = arg.a * arg.b;
    // レンダープロセスへsend
    event.sender.send('mul-async-reply', result);
});
