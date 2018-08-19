"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// メッセージ
exports.Message = '汝の悪しき行いは必ず仏罰として返って来るであろう！';
// --------GoogleHomeデバイスの設定--------
// デフォルト読み上げ音声の言語
exports.Language = 'ja';
// 接続モードIpAddressの時に使用。GoogleHomeのIPアドレス、スマホアプリなどで確認できる
exports.GoogleHomeIp = '192.168.0.4';
// GoogleHomeデバイス名
exports.Device = 'Google-Home';
// ----GoogleHomeデバイスの設定ここまで----
// 接続モード、どちらでもよい
var Connect;
(function (Connect) {
    Connect[Connect["Default"] = 0] = "Default";
    Connect[Connect["IpAddress"] = 1] = "IpAddress";
})(Connect = exports.Connect || (exports.Connect = {}));
exports.ConnectMode = Connect.Default;
// 音声モード
// GoogleHomeデフォルトの音声
// VoiceTextの音声：こちらはAPIキーの取得とGoogleCloudStorageの設定が必要で結構大変
var VoiceService;
(function (VoiceService) {
    VoiceService[VoiceService["Default"] = 0] = "Default";
    VoiceService[VoiceService["VoiceText"] = 1] = "VoiceText";
})(VoiceService = exports.VoiceService || (exports.VoiceService = {}));
exports.VoiceServiceMode = VoiceService.VoiceText;
// ----------------音声モードVoiceTextの場合は以下も設定する--------------------
// ローカルに音声ファイルを書き出すか？
exports.isWriteLocal = false;
// ローカル及びクラウドストレージに書き出すファイルの名前、拡張子なし
exports.Filename = 'voice';
// VoiceTextのAPIキー
exports.VoiceTextApiKey = 'cgkq4c90rzynr62x';
// GoogleCloudの認証のためのキーファイルの名前と置き場所
exports.KeyFilename = './penguintalk-g0530-firebase-adminsdk-dy4y0-25856ccacd.json';
// バケット名の指定
exports.BucketName = 'penguintalk-g0530.appspot.com';
// 標準は100
// 声のピッチ
exports.Pitch = 90;
// 速度
exports.Speed = 120;
// 音量
exports.Volume = 200;
// ----------------音声モードVoiceTextの場合の設定ここまで--------------------
//# sourceMappingURL=settings.js.map