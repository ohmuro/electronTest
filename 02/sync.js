var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var mainWindow = null;

// 起動
app.on('ready', function(){

    mainWindow = new BrowserWindow({width:800, height:600});
    mainWindow.loadUrl('file://' + __dirname + '/sync.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    });

});

// 同期プロセス通信
ipc.on('sync', function( event, args ){
    console.log( args );
    event.returnValue = args.value * 2;
});