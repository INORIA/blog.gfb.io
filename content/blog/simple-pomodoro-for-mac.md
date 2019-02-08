---
templateKey: blog-post
title: Mac でお手軽ポモドーロ
date: "2019-02-08T16:46:12.953Z"
tags:
  - command-line
---

# 5 分待機して・メッセージ送信

以下のコマンドで 5 分間待機した後にシステムの通知を利用してメッセージを送信します。

```bash
sleep $(expr 60 \* 5) && osascript -e 'display notification "The time have passed." with title "lets get to workgc"'
```

時間を変更したい場合は `60 \* 5` の部分を任意の時間に変更します。
`sleep` へ渡す数値は秒なので 60 秒 \* 5 = 5 分 になってます。
