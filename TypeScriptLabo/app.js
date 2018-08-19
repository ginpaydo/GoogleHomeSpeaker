"use strict";
// 外部ファイル参照
/// <reference path="settings.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var settings = require("./settings");
var googlehome = require('google-home-notifier');
// OGGファイルしかできない。WAVは転送量が増える、MP3はGoogleHomeで再生できない。
var voiceFilename = settings.Filename + ".ogg";
// 接続モード
if (settings.ConnectMode === settings.Connect.Default) {
    // 同一ネットワークのgooglehomeを探して喋らせる
    googlehome.device(settings.Device, settings.Language);
}
else {
    // もし Google Home のIPアドレスを指定するなら、以下のスクリプトに置き換える
    googlehome.ip(settings.GoogleHomeIp, settings.Language);
}
// 音声モード
if (settings.VoiceServiceMode === settings.VoiceService.Default) {
    // デフォルト音声で喋らせる
    googlehome.notify(settings.Message, function (res) {
        console.log(res);
    });
}
else {
    // VoiceText Web APIを使って喋らせる
    var VoiceText = require('voicetext');
    var voice = new VoiceText(settings.VoiceTextApiKey);
    // Google Cloud client のライブラリをインポートする
    var Storage = require('@google-cloud/storage');
    var admin_1 = require("firebase-admin");
    // ダウンロードした秘密鍵をこの名前にして保存している
    var serviceAccount = require(settings.KeyFilename);
    // Cloud StorageのAdmin認証を行う
    admin_1.initializeApp({
        credential: admin_1.credential.cert(serviceAccount),
        storageBucket: settings.BucketName
    });
    voice
        .speaker(voice.SPEAKER.BEAR)
        .format(voice.FORMAT.OGG)
        .pitch(settings.Pitch)
        .speed(settings.Speed)
        .volume(settings.Volume)
        .speak(settings.Message, function (e, buf) {
        // バケット取得
        var bucket = admin_1.storage().bucket();
        // 保存するファイル名
        var file = bucket.file(voiceFilename);
        // audioのメタデータにする
        var stream = file.createWriteStream({
            metadata: {
                contentType: "audio/ogg"
            }
        });
        // ローカルにファイルを保存する
        if (settings.isWriteLocal) {
            fs.writeFile("./" + voiceFilename, buf, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("\u30ED\u30FC\u30AB\u30EB\u306B\u30D5\u30A1\u30A4\u30EB\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002 " + voiceFilename);
            });
        }
        // stream.writeメソッドは使わない。下記も書き込み処理を行い、それと重複するため繰り返し音声になってしまう。
        stream.end(buf, function () {
            console.log("\u300C" + settings.Message + "\u300D");
            // googlehomeで再生する
            var address = "https://storage.googleapis.com/" + settings.BucketName + "/" + voiceFilename;
            googlehome.play(address, function (res) {
                console.log(address);
                console.log(res);
            });
        });
    });
}
//# sourceMappingURL=app.js.map