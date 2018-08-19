// 外部ファイル参照
/// <reference path="settings.ts"/>

import { connect } from 'tls';
import * as fs from 'fs';
import * as settings from './settings';
const googlehome = require('google-home-notifier')

// OGGファイルしかできない。WAVは転送量が増える、MP3はGoogleHomeで再生できない。
const voiceFilename = `${settings.Filename}.ogg`

// 接続モード
if (settings.ConnectMode === settings.Connect.Default) {
    // 同一ネットワークのgooglehomeを探して喋らせる
    googlehome.device(settings.Device, settings.Language);
} else {
    // もし Google Home のIPアドレスを指定するなら、以下のスクリプトに置き換える
    googlehome.ip(settings.GoogleHomeIp, settings.Language);
}

// 音声モード
if (settings.VoiceServiceMode === settings.VoiceService.Default) {
    // デフォルト音声で喋らせる
    googlehome.notify(settings.Message, function (res) {
        console.log(res);
    });
} else {
    // VoiceText Web APIを使って喋らせる
    const VoiceText = require('voicetext');
    let voice = new VoiceText(settings.VoiceTextApiKey);

    // Google Cloud client のライブラリをインポートする
    const Storage = require('@google-cloud/storage');
    const admin = require("firebase-admin");

    // ダウンロードした秘密鍵をこの名前にして保存している
    let serviceAccount = require(settings.KeyFilename);

    // Cloud StorageのAdmin認証を行う
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: settings.BucketName
    });

    voice
        .speaker(voice.SPEAKER.BEAR)
        .format(voice.FORMAT.OGG)
        //.emotion(voice.EMOTION.HAPPINESS)
        //.emotion_level(voice.EMOTION_LEVEL.HIGH)
        .pitch(settings.Pitch)
        .speed(settings.Speed)
        .volume(settings.Volume)
        .speak(settings.Message, function (e, buf) {
            // バケット取得
            var bucket = admin.storage().bucket();

            // 保存するファイル名
            const file = bucket.file(voiceFilename);

            // audioのメタデータにする
            const stream = file.createWriteStream({
                metadata: {
                    contentType: "audio/ogg"
                }
            });

            // ローカルにファイルを保存する
            if (settings.isWriteLocal) {
                fs.writeFile(`./${voiceFilename}`, buf, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log(`ローカルにファイルを保存しました。 ${voiceFilename}`);
                });
            }

            // stream.writeメソッドは使わない。下記も書き込み処理を行い、それと重複するため繰り返し音声になってしまう。
            stream.end(buf, () => {
                console.log(`「${settings.Message}」`);

            // googlehomeで再生する
                let address = `https://storage.googleapis.com/${settings.BucketName}/${voiceFilename}`;
                googlehome.play(address, function (res) {
                    console.log(address);
                    console.log(res);
                });
            });
        });
    
}

