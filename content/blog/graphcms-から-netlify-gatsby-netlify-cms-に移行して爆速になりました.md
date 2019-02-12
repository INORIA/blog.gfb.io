---
templateKey: blog-post
slug: graphcms-to-netlify-gatsby-netlifycms
title: GraphCMS から Netlify+Gatsby+Netlify CMS に移行して爆速になりました
date: 2019-02-12T14:08:40.695Z
tags:
  - blog-update
---
2/5 頃にこのサイトを GraphCMS から Netlify+Gatsby+Netlify CMS 構成に変更しました。
もともとの構成は記事取得に API リクエストがかかるので比較するのはフェアではないのですが、PageSpeed Insights だと 21 から 96 まであがりました。

Netlify CMS を使ってみたくて調べてみると Hugo と Gatsby と Middleman のテンプレートが用意されてました。

https://www.netlifycms.org/docs/start-with-a-template/

Gatsby は React を使っているようなので Gatsby を採用することにしました。
このサイトはブログなので [Gatsby's blog starter](https://github.com/gatsbyjs/gatsby-starter-blog) を採用しました。

[Gatsyby + Netlify CMS Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms) をベースにしてもいいかもしれません。

# 全体構成

記事を書くには Git リポジトリにある Markdown ファイルを編集します。
この Markdown をもとに Gatsby がビルドを行ってサイトを構築します。
そしてできたページを Netlify でホストしています。
ビルドは Netlify で行っていて、git push に反応して自動でビルドが実行されます。
CMS の部分は GraphCMS から Netlify CMS に変更しました。CMS といっても動的なサーバーではなく画像をリポジトリにコミットたり Markdown をリポジトリにコミットする感じな挙動をするページを用意する感じになります。
残念ながら現時点 (19/2/5) ではスマホ等の対応はしていないので PC からのみ利用できます。(※無理やりつかえなくはなさそうでしたが・・・)

# サイトの作成

## リポジトリの作成

gatsby cli をインストールしたあと以下のコマンドを実行します。

```
gatsby new . https://github.com/gatsbyjs/gatsby-starter-blog
```

これで現在のディレクトリに Gatsby のプロジェクトが構築されます。
あとは、これに手を加えます。

## Netlify CMS の導入

### 必要ファイルの追加

テンプレートを利用すると設定されていると思いますが、Gatsby のサイトに自動で導入しました。

https://www.netlifycms.org/docs/add-to-your-site/

公式に手順が用意されているのでほとんどそのままです。

staic 中に admin フォルダを作成します。

※ Gatsby では static 配下のファイルはビルド時に public フォルダにコピーされるようになってます。
https://www.gatsbyjs.org/docs/static-folder/

admin の中に index.html と config.yml ファイルを作成します。

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </body>
</html>
```

```yaml:config.yml
backend:
  name: git-gateway
  branch: master

media_folder: static/images/uploads
public_folder: /images/uploads

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "blog-post",
        }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Tags", name: "tags", widget: "list" }
```

上記 config.yml はこのサイトの config.xml ですが、フォルダ構成と Markdown に使うフィールドによって変更を加える必要があります。
[このサイトの config.xml](https://github.com/INORIA/blog.gfb.io/blob/master/static/admin/config.yml)

## Netlify Identity Widget の追加

Netlify のメールからリンクで飛んできたときに認証情報回りの処理やその他関連の処理(?)をやってくれるスクリプトを読み込むように設定します。

Gatsby だと、head への書き込みは Helmet を利用しているようなので無理やり以下のような感じで読み込みました。

```jsx
import React from "react";
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

function ExternalAssets() {
  return (
    <Helmet>
      <script>{`if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }`}</script>
    </Helmet>
  );
}

export default ExternalAssets;
```

これを layout.js などで読み込ませます。

## 認証情報の設定

Netlify で CMS へログインするための認証情報を設定します。

### Netlify から Git を操作できるように連携

Netlify のプロジェクトを選択 or 作成して、Settings -> Identity とたどります。

![Netlify Identity Settings](https://blog.gfb.io/images/uploads/graphcms2netlify-identity.png)

Enable Identity service とあるので、Enable Identity を押して Github と連携させます。

### サイトのデプロイ

ユーザーの作成の前に一旦サイトをデプロイする必要があります。
というのも Netlify の認証はサイト上での操作でパスワードを登録するのでデプロイしておきます。

### ユーザーの作成

次にタブメニューから Identity を選択すると Enable Identity と出るので押します。

![Invite User](https://blog.gfb.io/images/uploads/graphcms2netlify-invite-user.png)

すると Invite users ボタンがあるのでそこにログインに利用するメールアドレスを入れて Send を押します。

Netlify から入力したメールアドレスへメールが届くので、そこにリンクがあるのでそのリンク先を https://ドメイン名?invite_token=foobar となっているのを https://ドメイン名/admin?invite_token=foobar へ変更してアクセスします。
(これは設定ミスっているだけかもです)

するとパスワードの入力画面が表示されるのでログイン時に使用したいパスワードをいれて Sign up を完了します。

これで Sign up 完了です。

Netlify CMS へのログインは https://ドメイン名/admin から行います。

あとは画面に従ってページの作成や画像のアップロードができます。作業内容は Git Repository にコミットという形で保存するので少し時間がかかります。
Netlify CMS で記事を書くと Markdown ファイルが push されます。
それを Netlify が検知してビルドを実行してサイトが公開されるという流れです。

## おまけ

### Material UI の導入

普通の React を使っているように Material UI を導入すると初回ロード時にスタイルが適用されない現象が起きました。

`gatsby develop` では問題なくてビルド済みの状態で問題が起きました。

[gatsby v2 で material-ui v3 で gatsby build (production)すると、develop で綺麗に表示されていた css が崩れる](https://qiita.com/github0013@github/items/f268ca6609e47298d308)

上記と似たような状況な感じでしたが 2 回目のリロード以降は問題なく動作してました。

Gatsby に Material UI を導入しているリポジトリがあったので同じように調整することで問題ない動作に変わりました。
https://github.com/mui-org/material-ui/tree/master/examples/gatsby

具体的には上記のリポジトリの withRoot.js と getPageContext.js と gatsby-ssr.js を導入して `createMuiTheme` と `MuiThemeProvider` の配置を withRoot.js と getPageContext.js 内に移動しました。

# 速度

Mobile は GraphCMS: 21 から Gatsby: 96 へ
Desktop は GraphCMS: 63 から Gatsby: 100 へ改善しました。
爆速(?)です

![PageSpeed Insights](https://blog.gfb.io/images/uploads/graphcm2stogatsby-result.png)

# 最後に

Netlify CMS 導入しましたがモバイルで使えなかったので画像アップローダとして使うことになりそうです。
Netlify CMS 上で書くにしても Markdown で書く場合は画像の設定が面倒なのでどうしたものか・・・

GraphCMS は良いサービスなので別の形で使いたいです。
