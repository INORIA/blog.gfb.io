---
title: JavaScript でファイルダウンロードさせる
date: 2014-02-24T06:10:00.000Z
slug: iframe-download-file
tags:
  - uncategorized
---

JavaScript で動的に作成した CSV ファイルをダウンロードさせる為に `window.location = 'url';` などでリダイレクトをかけていたのですが、これを実行した時点でページの読み込みが終了してしまいます。 iframe を利用したリダイレクトがあったので利用してみました。  
http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery

```javascript
var downloadURL = function downloadURL(url) {
  var hiddenIFrameID = "hiddenDownloader",
    iframe = document.getElementById(hiddenIFrameID);
  if (iframe === null) {
    iframe = document.createElement("iframe");
    iframe.id = hiddenIFrameID;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }
  iframe.src = url;
};
```

行っていることは、'hiddenDownload' という ID の要素があれば取得、なければ iframe を作成してその iframe の src にファイルの URL を指定しているようです。 CSV のファイル URL が `http://blog.gfb.io/list.csv` だとすると、以下のようなコードになります。

```javascript
downloadURL("http://blog.gfb.io/list.csv");
```

この関数を実行すると、ダウンロードが開始されてページの読み込みも問題なく継続されました。 ただ、そのまま更新ボタンを押すとまたダウンロードが開始されるのをどうしようかと思っています。
