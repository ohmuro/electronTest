
var TARGET_URL = "https://ja.wikipedia.org/";

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function(){

    // メインウィンドウを作成
    mainWindow = new BrowserWindow({width:800, height:600});

    // 指定のURLを読み込み
    mainWindow.loadUrl(TARGET_URL);
});

