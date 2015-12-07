// Electronの準備
var app = require('app');
var BrowserWindow = require('browser-window');

// ブラウザ(Chromium)を保管しておく変数
// ガベージコレクションの対象外にするため、グローバルに定義
var mainWindow = null;

// Electronの初期化が終わってから実行
app.on('ready', function () {

	// ブラウザ(Chromium)の起動させ、初期画面のロード
    mainWindow = new BrowserWindow({ width:800, height:600 });
    mainWindow.loadUrl('file://' + __dirname + '/hello.html');

    // closedしたときに変数を初期化
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});