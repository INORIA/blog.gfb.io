---
title: PDF を R2L (右綴じ) にする方法
date: "2017-09-03T07:27:00.000Z"
tags:
  - uncategorized
---

最近自炊をしているのですがマンガは大体右綴じになっています。  
なのですが、ScanSnap のソフトで PDF にすると左綴じになってしまいます。  
おそらく PDF の仕様で、指定がないと左綴じがデフォルトということだと思ってます。

このままだと PDF 対応のアプリを使っても逆にスクロールしてしまいます。  
なので右綴じに変更する方法を調べてみました。

調べる前はコマンドでもあるのだろうと思っていたのですが、なかなか手軽そうなものがありませんでした。 色々調べた中である程度取っ付きやすそうな Python にしました。

## Python の pdfrw

https://github.com/pmaupin/pdfrw

基本的には  
https://hanepjiv.blogspot.jp/2014/11/pdfpython.html  
こちらの方が作成されているものを使ったのですが、ScanSnap からの PDF だと、うまく動作しなかったので、pdfr2l 関数をちょっと調整しました。

```python
def pdfr2l(a_src, a_dest):
    """
    pdfr2l
    """
    # --------------------------------------------------------------------------
    src = PdfReader(a_src)
    dest = PdfWriter()

    # dest.addpages(src.pages)

    dest.trailer = src

    # print dest.trailer.Root

    if dest.trailer.Root.ViewerPreferences:
        dest.trailer.Root.ViewerPreferences = PdfDict(Direction=PdfName.R2L)
    else:
        dest.trailer.Root.ViewerPreferences = PdfDict()
        dest.trailer.Root.ViewerPreferences.Direction = PdfName.R2L

    dest.trailer.Root.PageLayout = PdfName.TwoColumnRight

    dest.write(a_dest)
```

具体的には dest.addpages(src.pages)` をコメントアウト。 dest.trailer.Root.ViewerPreferences = PdfDict() を追加しました。

本家が bitbucket なのですが普段から GitHub の方しか使っていないので GitHub の方へ調整した版をあげました。 https://github.com/INORIA/pdf-r2l-script

## その他の方法

### Adobe Acrobat

有料ですが一番安心のソフトです。ただし、一冊一冊対応しないといけないので増えてくると大変です。 プログラムを書くのが面倒、または書けないという方はこちらを使うことになります。

### Perl の PDF::API2 モジュール

http://toga.vegalta.org/wordpress/2016/05/15/830

### PHP の TCPDF

http://tohokuaiki.hateblo.jp/entry/set-binding-direction-with-tcpdf

### Java の iText

http://d.hatena.ne.jp/kiwanami/20101215/1292400269

## 所感

なかなか面倒です。普通にバイナリ一発でできるコマンドとか提供してくれていると楽なのですが ∧( 'Θ' )∧

## 参考

http://www.adobe.com/devnet/pdf.html ~~http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf\_reference\_1-7.pdf~~
