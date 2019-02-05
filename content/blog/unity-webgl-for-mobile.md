---
title: Unity WebGL のスマホ対応
date: "2017-11-25T17:51:00.000Z"
tags: ["uncategorized"]
---

Unity で WebGL のビルドができるのですが、スマホ対応を公式には謳っていないので色々と調整が必要でした。  
それをまとめてみました。

Unity Version: 2017.2.0f3

## 警告を非表示

今はスマホ対応していないので警告が出てしまいます。  
OK を押すとそのまま進めるのですが、スマホでも動作するように軽めに作っているプロジェクトだといちいちタップするのが大変です。

![Please note that Unity WebGL is not currently supported on mobiles. Press OK if you wish to continue anyway.](/assets/uploads/B415279D3213E1B737A6E7C61D73CFE3.png)

これはドキュメントに任意に off にすることができますとあった記憶がありますが未だに(2017.2.0f3)設定が見当たらないのでちょいと手を加えます。  
判定処理は Build/UnityLoader.js (minify されてます) で行われていて当該箇所は以下のようになっています。

```javascript
compatibilityCheck: function(e, t, r) {
  UnityLoader.SystemInfo.hasWebGL ? UnityLoader.SystemInfo.mobile ? e.popup("Please note that Unity WebGL is not currently supported on mobiles. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
  }]) : ["Firefox", "Chrome", "Safari"].indexOf(UnityLoader.SystemInfo.browser) == -1 ? e.popup("Please note that your browser is not currently supported for this Unity WebGL content. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
  }]) : t() : e.popup("Your browser does not support WebGL", [{
      text: "OK",
      callback: r
  }])
},
```

UnityLoader.SystemInfo.mobile が true の場合に e.popup が実行されるようなので強制的に false にします。index.html を開いてすでにある直書きの script タグを以下のようにします。

```html
<script>
  UnityLoader.SystemInfo.mobile = false;
  var gameInstance = UnityLoader.instantiate(
    "gameContainer",
    "Build/xxx.json",
    { onProgress: UnityProgress }
  );
</script>
```

## Viewport を追加

Canvas のサイズなどは px 打ちされているのでそのままだとスマホでちょっと辛いことになります。  
それを自動で調整するようにします。まずは Viewport を追加します。

```html
<meta name="viewport" content="width=1136,initial-scale=1" />
```

## JavaScript で自動サイズ調整

</body> の直前に以下のスクリプトを追加します。

```html
<script>
  const doc = document.documentElement;
  const content = document.querySelector(".webgl-content");
  setInterval(function() {
    const c = document.querySelector("canvas");
    if (!c) {
      return;
    }
    if (doc.clientWidth <= c.clientWidth) {
      const scale = doc.clientWidth / c.clientWidth;
      content.style.transformOrigin = "top left";
      content.style.top = content.style.left = "0";
      content.style.transform = "scale(" + scale + ")";
    } else {
      content.style.transformOrigin = "";
      content.style.top = content.style.left = "";
      content.style.transform = "";
    }
  }, 1000);
</script>
```

これでスマホで必要最低限なサイズ調整されると思います。
