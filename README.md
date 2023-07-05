# GeoTagging プラグイン

<img width="1383" alt="WX20220809-171914@2x" src="https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/6ed23d2b-3d30-4fa9-ab38-205b5dd9e772">

## このプラグインについて
- 写真のEXIFデータから緯度、経度情報を取得し、該当の座標にフォトオーバーレイレイヤーを作成し写真をマッピングします。マッピングされた写真はアイコンとして表示され、アイコンをクリックするとオリジナルの写真が表示されます。写真に説明文を付加することもできます。

　
## 使用方法
### 右パネルの設定項目
- Image List タブ<br>
  読み込む写真を指定します。Image Listの「＋」ボタンをクリックし、画像リストを追加してください。

    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/47c7f487-3cf1-43eb-aef2-fa8dd96a33e0)

  各画像に以下の各パラメータを設定します。
  - Image
    必須項目です。
    読み込むジオタグ付き画像を指定してください。
  - Height

    地上からの高さを指定します。実際のマッピング位置は次のHeight Standardパラメータの指定従います。
  - Height Standard

    Heigthパラメータの処理方法を指定します。Absolute / Clamp to ground / Relative to ground から選択します。デフォルトは Absoluteです。
  - Camera

    カメラ位置を指定します。
  - Icon size

    写真アイコンのサイズを指定します。 
  - Icon crop

    写真アイコンのトリミングを指定します。None / Circle から選択します。デフォルトは None です。
  - Icon shadow

    写真アイコンの影の On / Off スイッチです。
  - Shadow color

    写真アイコンの影の色を指定します。
  - Shadow radius

    影の範囲を指定します。
  - Shadow X

    影をX方向にずらします。
  - Shadow Y

    影をY方向にずらします。
  - Photo description

    写真の説明文です。写真アイコンをクリックしてオリジナル写真を表示した時、写真の左下に表示されます。

### 操作方法
- 写真の読み込み

  右パネルのメニューで取り込む写真を指定します。＋ボタンで必要な数だけリストに追加します。取り込んだ写真はマップ上にアイコン表示されます。
- 写真の表示

  写真アイコンをクリックすると元画像が表示されます。元画像、背景などをクリックするとアイコン表示に戻ります。

### 留意点
- EXIFに緯度、経度の情報が含まれていない場合、画像は取り込まれず、アイコン表示もされません。

## 備考
- テストブラウザ環境
  - OS:Mac OS Montery 12.6.5
  - ブラウザ：Google Chrome 112.0.5615.121

## 開発者欄

このプラグインは、Re:Earth公式プラグインです。

 ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/7a02274f-7afa-41fa-a9f8-d720c365978c)

ソースコードはこちら(https://github.com/eukarya-inc/reearth-plugin-geotagging)

本プラグインを使用したサンプルページは以下から閲覧することができます。
https://geotagging-plugin-sample.reearth.io

- コミュニティ

  - このプラグインを利用したプロジェクトをユーザーコミュニティでシェアしましょう。

  - このプラグインについての不明点がある場合にもここからRe:Earthチームや他の開発者に質問することができます。

  - Discordへのリンクはこちら(https://discord.gg/BXcQhvwqqM)
<br>
<br>
