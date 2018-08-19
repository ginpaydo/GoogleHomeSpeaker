// メッセージ
export const Message = '汝の悪しき行いは必ず仏罰として返って来るであろう！';

// --------GoogleHomeデバイスの設定--------
// デフォルト読み上げ音声の言語
export const Language = 'ja';

// 接続モードIpAddressの時に使用。GoogleHomeのIPアドレス、スマホアプリなどで確認できる
export const GoogleHomeIp = '192.168.0.4';

// GoogleHomeデバイス名
export const Device = 'Google-Home';
// ----GoogleHomeデバイスの設定ここまで----

// 接続モード、どちらでもよい
export enum Connect {
    Default,
    IpAddress
}
export let ConnectMode = Connect.Default;

// 音声モード
// GoogleHomeデフォルトの音声
// VoiceTextの音声：こちらはAPIキーの取得とGoogleCloudStorageの設定が必要で結構大変
export enum VoiceService {
    Default,
    VoiceText
}
export let VoiceServiceMode = VoiceService.VoiceText;

// ----------------音声モードVoiceTextの場合は以下も設定する--------------------
// ローカルに音声ファイルを書き出すか？
export let isWriteLocal = false;

// ローカル及びクラウドストレージに書き出すファイルの名前、拡張子なし
export const Filename = 'voice';

// VoiceTextのAPIキー
export const VoiceTextApiKey = 'VoiceTextのAPIキー';

// GoogleCloudの認証のためのキーファイルの名前と置き場所
export const KeyFilename = './キーファイルの名前.json';

// バケット名の指定
export const BucketName = 'バケット名';

// 標準は100
// 声のピッチ
export const Pitch = 90;
// 速度
export const Speed = 120;
// 音量
export const Volume = 200;

// ----------------音声モードVoiceTextの場合の設定ここまで--------------------


