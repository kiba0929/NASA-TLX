# NASA-TLX Questionnaire App

NASA-TLX の日本語版のアンケート用Webアプリケーションです。
このWebアプリケーションでは 参考文献[1] の日本語訳をそのまま使用しています。
Github Pagesで動作することを前提に作られていますが、設定を変更することで、他のホスティングサイト上でも動作すると思います。
目盛りの表示が必要な場合、`src/NasaTLXQuestion.tsx` 中の `viewAnswerScale` を `true` に変更してください。

## 使い方

データの保存のためにfirebaseから情報を取得し、`src/firebase.ts` の`firebaseConfig`に必要な情報を記入してください。
また、GitHubのリポジトリ名をbasenameに設定するため、`package.json`の`--base=/nasa-tlx-ja-questionnaire/`の部分をリポジトリ名に変更してください。
リポジトリにGitHub Pagesの設定をしてください。
GitHub Actionsを設定しているため、mainブランチにpushすると、正しく設定できていればGitHub Pagesで動作します。

## お願い

本Webアプリケーションを使用した研究を論文として公開する場合、必ず参考文献の論文を引用してください。
また、可能であればサイトのリンク https://github.com/nae-lab/nasa-tlx-ja-questionnaire を論文中に記載していただけますと幸いです。

## 参考文献

[1] 芳賀 繁, 水上 直樹, 日本語版NASA-TLXによるメンタルワークロード測定, 人間工学, 1996, 32 巻, 2 号, p. 71-79, 公開日 2010/03/12, Online ISSN 1884-2844, Print ISSN 0549-4974, https://doi.org/10.5100/jje.32.71, https://www.jstage.jst.go.jp/article/jje1965/32/2/32_2_71/_article/-char/ja, 抄録:
