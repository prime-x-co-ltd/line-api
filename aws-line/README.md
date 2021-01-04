# LINE API 使ってみた

## 開発環境

-   LINE Messaging API
    -   データ形式が JSON なので Node.js 採用
-   AWS Lambda
-   AWS API Gateway
-   AWS DynamoDB

## Flex message

-   JSON データで出来てる
-   ポストバックアクションでドリルダウンできる
-   UI 画面から設計できる

## リッチメニュー

-   領域を区切ったオブジェクトに画像を割り当てる
-   デザイナー必須

## LIFF（LINE Frontend Framework）

-   検証中
-   作り込むなら出番ありそう

## 課題

-   多数のリクエストに耐えられるか
    -   場合によっては S3 ＋ CloudFront あたりを検討する
-   ユーザ情報の取得
    -   できるが個人情報なので保守コスト増、品質を担保する開発コスト増
-   デザイナー必須
    -   アイコン、画像、メニュー等 UX デザインが肝要と思われ

## 技術課題

-   Lambda 開発環境
    -   ローカルからアップロード＆デバッグしたい

## 技術資料

-   <a href="https://developers.line.biz/console/">LINE Developers</a>
-   <a href="https://manager.line.biz/">LINE Official Account Manager</a>
-   <a href="https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/">Flex message</a>
-   <a href="https://developers.line.biz/flex-simulator/">Flex Message Simulator</a>
-   <a href="https://developers.line.biz/ja/reference/messaging-api/">Messaging API</a>
