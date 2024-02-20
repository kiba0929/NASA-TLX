# NASA-TLX Questionnaire App

NASA-TLX の日本語版のアンケート用Webアプリケーションです。
基本的にGithub Pagesで動作することを前提に作られていますが、設定を変更することで、他のホスティングサイト上でも動作すると思います。

## 使い方

データの保存のためにfirebaseから情報を取得し、`src/firebase.ts` の`firebaseConfig`に必要な情報を記入してください。
NASA-TLXの質問文の情報を `src/constraints.ts` に記入してください。

また、GitHubのリポジトリ名をbasenameに設定するため、`package.json`の`--base=/nasa-tlx-ja-questionnaire/`の部分をリポジトリ名に変更してください。

リポジトリにGitHub Pagesの設定をしてください。

GitHub Actionsを設定しているため、mainブランチにpushすると、正しく設定できていればGitHub Pagesで動作します。
