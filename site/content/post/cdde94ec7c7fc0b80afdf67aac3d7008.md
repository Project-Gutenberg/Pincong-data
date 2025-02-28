---
layout: default
Lastmod: 2020-06-02T02:51:56.183395+00:00
date: 2020-03-23T00:00:00.000Z
title: "〖圖文教學〗如何使用PGP加密以便在非安全通訊工具內進行加密通訊"
author: "Ashley777"
tags: [信息安全,加密,OpenPGP,GPG,PGP]
---

看到內地很多朋友被匪共原子化得相當利害，使用國內通訊軟件時根本一丁點保障都沒有，有時候發生什麼災難的，相隔一個市甚至一條街的人都會因為消息封鎖而毫不知情，連「私人」群組內發佈消息都可以被當成造謠者，如李文亮等八醫生當初都只不過是在私人群組提一提醒群友就被抽出來批鬥，可想而知現在身處武漢的災民們是受到什麼樣子的言論管制和監控，敢於報導、公佈共匪稍不同意的消息根本就是找死被封殺。  
  
吐槽完畢，入正題。本教學希望能提供一個途徑讓「敏感地區人士」吹哨子，把自己身邊的人道災難和不義公諸於世。歡迎己懂翻牆人士把下面教學轉發到牆內你認為有需要的朋友去。  
  
另：這個教學寫到一半才發現己經有人寫了一篇教材撞車了，見：[【安全上网】GPG入门教程- 新·品葱](https://pincong.rocks/article/11717 "https://pincong.rocks/article/11717")。那篇文章的教程應該比我這篇更詳細，而且他所用的 Kleopatra 是中文版，應該大家會覺得比較易明。如果你已看過那篇的話，可以直接跳到 Android 的 OpenKeyChain 那一節。  
  
\==========================================  
公匙加密法的基礎概念（亦稱「非對稱加密法」）  
\==========================================  
  
這章節旨在快速介紹公匙私匙的基本特性和操作流程，有些細節會不太準確，更不會探討當中的數學原理（我不熟悉，亦不重要），有興趣的請自己 Google, Wiki。  
  
為何要使用公匙加密法？說公匙加密法的優勢之前，一定要說一說密匙加密法（亦稱「對稱加密法」，AES 和 ChaCha20 都是這類）的一個缺點：如何安全地向通訊對方發送密匙。  
  
事實上，由於對稱加密法的密匙既用於加密，亦用於解密（你可以當成密碼來看，甚至有時候密碼確實會被當作對稱加密法的密匙來用），一旦密匙被監控方竊聽，任何後續的加密通訊都是徙勞的。除非通訊雙方事先已分享密匙，否則是完全沒有辨法保密地遠端傳送密匙的。  
  
公匙加密法解決的，就是錀匙的輸送問題。  
  
跟對稱加密法的密匙不同，公匙私匙加密法有以下特性：  
1\. 私匙所加密的信息，只有相對應的公匙才可以解密。\*(1)  
2\. 公匙所加密的信息，只有相對應的私匙才可以解密。  
  
對公匙、私匙的管理：  
1\. 公匙是用來分享給對方而不怕被截獲的，理論上公匙被截取的話也無法計算出其相對應的私匙，亦無法使用同一條公匙解密密文。  
2\. 私匙在任何情況下需要絕對保密的。  
  
公匙、私匙的一般用途：  
1\. 公匙的第一用途是讓別人拿來加密，並向你發送**只有你**才可以解密的加密信息。  
2\. 相對地，私匙的第一用途是用來解密別人用對應公匙加密過的信息。  
3\. 私匙所「加密」過的信息皆可以由公匙解密。由於公匙是公開的，看起來好像沒義意，但是由於其相對應公匙能夠順利解密，說明該信息是確實出自私匙擁有者（你）的手，且數據信息沒有損壞甚至篡改。由此，私匙的第二用途是「簽名」  
4\. 相對地，公匙的第二用途是「驗證簽名」。某些情況下，人們乾脆將公匙用作「身份識辨」，如加密幣的所謂錢包地址其實就是公匙。  
  
使用公匙加密法的流程概括：  
1\. 通訊雙方生成屬於自己的公私匙對。  
2\. 通訊雙方交換公匙。 **注意！** 公匙交換時必須確保公匙沒有被人調包。下面討論「中間人攻擊」時會進行探討  
3\. 若要匿名傳送加密信息的話：  
    - 加密：使用收件人的公匙加密信息，並傳送之  
    - 解密：收件人使用自己的私匙即可解密  
4\. 若要公佈消息並防止他人篡改的話：  
    - 簽名：使用自己的私匙對信息進行簽名，並公佈之  
    - 驗證：讀者使用發佈者的公匙進行簽名驗證，以證明文章內容出自誰手以及其完整性  
5\. 若要傳送加密信息並令對方確認信息撰寫人的話：  
    - 加密：先使用自己的私匙進行簽名，再使用收件人的公匙進行加密上一步的內容，並傳送之  
    - 解密：收件人先使用自己的私匙解密，再使用傳送人的公匙進行驗證  
  
備註：  
\* (1) 實際應用上，大部分公匙算法可以藉由私匙來產生其相對應公匙，變相私匙加密過的文件用同一條私匙亦可解密。所以私匙的保密性是極其重要  
  
\==========================================  
\[big\]PGP 的實際應用\[/big\]  
\==========================================  
  
以下教學主要面向 Android 和 Windows，如果需要在其他作業系統上操作，請自行尋找相對應的 OpenPGP 程式和教學  
  
超簡略講解一下幾個名詞：PGP、OpenPGP、GPG  
\- PGP 是一套應用公匙加密法的商業軟件  
\- OpenPGP 是由 PGP 研發者所發佈的，跟原本 PGP 兼容的網絡標準  
\- GPG（或 GnuPG）是眾多實現 OpenPGP 標準的開源軟件中最有名氣的一個  
  
各作業系統中的 OpenPGP 軟件可由[OpenPGP.org]( "https://www.openpgp.org/software/")的網站中找到。以下是我自己篩選的軟件：  
\- Windows: [GPG4Win]( "https://www.gpg4win.org/download.html") 軟件包中的 Kleopatra 或 GPA  
\- Android: [OpenKeyChain]( "https://f-droid.org/packages/org.sufficientlysecure.keychain/")  
\- Linux: GPG、KGPG、Kleopatra、GPA。懂得用 Linux 的都應該懂得自己應付了吧？  
\- OS X: [GPG Tools]( "https://gpgtools.org/")  
\- iOS: ??? 我找不到開源甚至免費的 PGP 軟件，大家可以嘗試一下 [PGP Everywhere]( "https://apps.apple.com/us/app/pgp-everywhere/id1011677987") 或其他在上面 OpenPGP.org 的連結中找一找（吐槽時間：我想不到一間對開源那麼抗拒的公司憑什麼說自己著重私隱？）（吐槽之二：[淦你娘，Apple]( "https://www.reddit.com/r/saraba2nd/comments/fl2iku/%E7%96%AB%E6%83%85%E6%9C%9F%E9%97%B4%E5%BC%80%E5%8F%91%E7%9A%84%E5%8A%A0%E5%AF%86%E8%BE%93%E5%85%A5%E6%B3%95%E8%A2%AB%E8%8B%B9%E6%9E%9C%E5%95%86%E5%BA%97%E4%B8%8B%E6%9E%B6")）  
\- Firefox, Google Chrome 插件：[Mailvelope]( "https://keys.mailvelope.com/")  
  
題外話：如果有空的話我打算弄一個網頁版的 PGP 讓所有系統都有機會玩一玩，No Promise, tho.  
\----------------------------------------------------  
Windows: GPG4Win  
\----------------------------------------------------  
1\. [下載 GPG4Win]( "https://www.gpg4win.org/get-gpg4win.html")：  
  
![https://images.weserv.nl/?url=https://i.imgur.com/oYJnZsz.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FoYJnZsz.png)  
  
  
選擇 $0 ，並點選 Download 下載  
  
2\. 安裝 GPG4Win：  
  
![https://images.weserv.nl/?url=https://i.imgur.com/8QHGa2z.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F8QHGa2z.png)  
執行剛下載的安裝檔。  
  
小知識：Windows執行應用程式時，有時候會有一個「已驗證的發行者」之類的欄位，這就是公匙加密法的「簽名與驗證」的應用例子之一。發行者使用自己的私匙為軟件簽名，如果 Windows 信任發行者的公匙，並使用該公匙順利驗證軟件，那麼 Windows 則 信任該軟件出自受信任的發行者的手，而作為用戶的你亦可以間接信任軟件沒有被人調包。  
  
![https://images.weserv.nl/?url=https://i.imgur.com/z0W2IWd.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2Fz0W2IWd.png)  
本教學使用 Kleopatra，請點選之。軟件包中其他的軟件歡迎自行實驗  
  
3\. 生成公私匙對：  
![https://images.weserv.nl/?url=https://i.imgur.com/VeHyLWL.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FVeHyLWL.png)  
點選 New Key Pair 來生成公私匙對  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/KjUYA5B.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FKjUYA5B.png)  
填寫「名字」，「Email」，再點選 Next 下一步  
  
**注意**：你不一定要填寫你的真名和真實 Email ，視乎你的實際用途，你可以填寫你的化名和一個假 Email 地址以盡量保持匿名性。  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/rH9FkXP.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FrH9FkXP.png)  
密碼，用在本機加密私匙用的  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/GnwiUhD.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FGnwiUhD.png)  
成功生成匙對！注意匙對的 Fingerprint 指紋，以後分享交換公匙時會有用  
  
4\. 導出公匙，以分享給通訊對方：  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/1Rwq8VT.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F1Rwq8VT.png)  
右鍵點選 Export 導出  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/gkH1DSf.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FgkH1DSf.png)  
選擇路徑  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/VLnPrEx.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FVLnPrEx.png)  

```
  
-----BEGIN PGP PUBLIC KEY BLOCK-----  
  
mQENBF5uM68BCADMHtEAyPXrWYOOKiOVgzTyimjCwHPc6HB96C46ZoB5z1t9qqrV  
sbKXKJ5thUXmqS0BTdEXBip6NuFxiy5aD5aYpavHqlP4k8KCHqlm5SJMhyzdFnm1  
nJIaktsfAC79job2EWrJMJRWfm6khPosZU30gCwUJQau6GShI7fnBg0ZGC6ensfD  
tXf6Dzhy0gBoUc8lTcqWpM6XNSHidK67+7oQyuscDb6xHaVruAOMhlgtgE+fe6Ag  
3HSBPstEHdbFyQCSuTtPt+oD8bzJf+7YqUNG0lr+h6ji/aS3/hPwWsXMYNvZGzyX  
MJW/bxkvir+yVtl/uIPpmKfvKHiMy71T0hTZABEBAAG0GndpbnZpcnQgPHdpbnZp  
cnRAdGVzdC5jb20+iQFUBBMBCAA+FiEEA5vdoBT5SHxcFGCIYSXNOEwTbtkFAl5u  
M68CGwMFCQPCroEFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQYSXNOEwTbtmS  
ngf/Xinj+dQQz7QAX7eQ2IQtqv2cYJn3+YcejhkYHJ/tkq9zM9HFePYNh291YlzV  
cjiDlM1OirJiebekwXJnTfKsB05RR7sznyW+yIy084J6HVmrGu4QNKfefA9Lo0ji  
7aou8svWK7eusrxzOaMJLR43IXA+BlIG23Tpu+XOdKTjAM9T6++xL/846zdfREpi  
IQdG56Vc4RDxDO3Ztj6V1MewwO8cvrMD5fxOLRe0CUZYGXZ+/+XEzjJWh1QIgPV6  
kCc4IKra6sMuY9nJ/guZLAkzJdsRoqGp3tYHsgKkiRr1S+QiBo+4ITY0tEB1Xwke  
QTgUzn1J44stItipdTbnMtzuY7kBDQRebjOvAQgA5hbWOtmZbFLERgrh2nyjibT1  
t80cvd6r4WpsLSC+3ARYv7do+cY4v/tILfjoOwKxnOKKoVezviLg+FbG41m65C8p  
9U71vwQGb8gDy9u/jlaRnVJanqv3QEIdMxcbMC9h9cs6bMakHtBRmCf36PS/pelN  
r6SrBY1VI8pwjZNPIqnFDN+CYctcCanJRA7Hhw02ZaqIdAi56WkqHplrQmzprIna  
q/JhAAuAD1xDncKSrRwkVqeeUejR9oM0la+UhBe0K9CZbZTB1mGBvvbnYi4mZTv2  
2QvX7492hzdONmtKw9XbfM68VRvave6IBlVSwS3hFoLOGf0+6dceNTqxDNnd9wAR  
AQABiQE8BBgBCAAmFiEEA5vdoBT5SHxcFGCIYSXNOEwTbtkFAl5uM68CGwwFCQPC  
roEACgkQYSXNOEwTbtmSDwf+L0eH46sBCFFMtSpSsJG57A5tUTejd1a32wABU93Y  
okCRASxlpIA4QzHtaODBixglhm0DUTgYzdNIjU4yU6BOX1d3U/WKI2WRX2j0tVVs  
q9CnlwXV9FYRQX45P6mWiV2krw/e0Lfh/eI0SiXkDdLMowAuRg62mMtnoZe/+EHx  
rSZPD1MGL52+Q/i444AAlA8p1LE7yBsZsj9SrFl/D+s0UUUCs97iAxZBkSN1FwbA  
x1KH+36fO8oOD0UkMbH6Slst+HCiefw+AstlElC4TeRohb16I7E+ZEk8LjBAemeJ  
NYkxHf52j39S+Jg9PJmT9MVySi8dx6oM5VT2weFnbprq3g==  
=74kT  
-----END PGP PUBLIC KEY BLOCK-----  

```

  
導出之後，使用純文字編輯器打開檔案。這串文字就是你的公匙了！  
  
5\. 獲取通訊對方公匙後，導入公匙：  
  
如果以純文字方式獲得對方的公匙：  

```
  
-----BEGIN PGP PUBLIC KEY BLOCK-----  
  
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  
1irtRng9Vy0MfXJL6Uc+dmC3rl7EJVPZ4g==  
=w69G  
-----END PGP PUBLIC KEY BLOCK-----  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/vNwUDmC.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FvNwUDmC.png)  
先將其複制到純文字編輯器上，並儲存副檔名為 .asc/.pgp/.gpg。  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/5yvZLBo.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F5yvZLBo.png)  
點選 Import 導入  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/Metgs9P.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FMetgs9P.png)  
選擇剛儲存的檔案導入  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/9gWIv5W.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F9gWIv5W.png)  
導入公匙後，Kleopatra 會叫你認證公匙實屬對方本人。由於公匙不需要認證就可以使用，這一步建議但不必要，可以暫時選 No，下一步會說一說如何認證。  
  
6\. 認證公匙身份  
  
![https://images.weserv.nl/?url=https://i.imgur.com/Y3NCvIe.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FY3NCvIe.png)  
  
![https://images.weserv.nl/?url=https://i.imgur.com/yYodlHi.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FyYodlHi.png)  
要查看鑰匙的 Fingerprint 指紋的話，右鍵點選 Detail 即可查看。跟對方核實公匙的指紋一致後可以進行下一步  
  
![https://images.weserv.nl/?url=https://i.imgur.com/BkjjsHS.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FBkjjsHS.png)  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/UcqUVT2.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FUcqUVT2.png)  
右鍵點選 Certify，選擇你自己的私匙後，再對公匙進行 Certify 認證。  
  
7\. 加密、簽名訊息：  
  
假設以下是要加密的訊息：  

```
  
Hello World, Android Open Key Chain  
  
中文秘密訊息 (UTF-8 test)  
  
\[中国 移动互联网:用户数\](https://www.ceicdata.com/zh-hans/china/telecommunication-statistic-monthly/cn-mobile-internet-no-of-subscriber)  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/s0K9hqy.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2Fs0K9hqy.png)  
點選 Notepad 記事本，再把訊息打上去  
  
![https://images.weserv.nl/?url=https://i.imgur.com/WSsLJ6F.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FWSsLJ6F.png)  
點選 Recipients 收件人。這裡有點複雜，先讓我解釋一下那三個選項：  
  
1\. 選擇使用哪一條私匙簽名。簽名之後，擁有並認證你公匙的人能有信心地確認訊息出自你手。相反地，如果這是你**不**希望發生的話，請剔除，以提昇訊息來源的「可抵賴性」  
2\. 用自己的公匙加密一遍。確保你弄失原文後可以重新使用自己的私匙對已發出的密文再解密一遍。另一種讀解，是指你可以直接把你硬盤上的原資料都刪掉，必要時才拿你的私匙解密密文。以後哪怕裝置被盗取後，如果盗竊者沒有你私匙的密碼，他們也沒辨法取得你秘密訊息的原文。  
3\. 用別人的公匙加密。如果有多名收件者的話，可以用多於一名收件者的公匙加密。另外，如果你想發佈的不是密文，而是可驗證身份的公告的話，把 2, 3 選項都剔除。  
  
完成選項之後，按 Sign/Encrypt Notepad 簽名/加密記事本的按鈕  
  
![https://images.weserv.nl/?url=https://i.imgur.com/Ab2Ugi0.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FAb2Ugi0.png)  
加密完畢之後， Notepad 頁裡面可以看到剛生成的密文：  

```
  
-----BEGIN PGP MESSAGE-----  
  
hQGMA/KWcBlrSLBxAQv9GVTK4e1ZH2cyPouPkwnhFYAAMEf8L3+6KBt9os6kq7lV  
mZA4uus3K027JU5u4ICYjhyY4PtXpDpqtwRiYINIlfM3NT0QSM0JhfJJiap1qw5d  
jccxVjXZvJeU68To02+kArzIEbIbvADYVh1sWURlvUmurLUv13aVDqJB13cLbjB9  
zG3pnP72ygYG+M9KSCabQBauEtUz1IKp+QZutEqVPizLBNWshdqvCzM5kLV6NCkY  
iaqVkm5UZtFt7jpHFkyLIZlY3iwX4hyj9+75gAULBk5MaqB69Jx4sKB9v3FCEECj  
fCn2TH8wY9lijUHWfKuFygoFALFTTChCB+qYgKJmp1VDWom919Y26oFyZy+ER/eg  
60KADeSmOytqaS4zR+ATBwf5KK7pCWgz6djqpdAD2L9H0P4Vfuhtgm698xTwxo7R  
CcjdAZ/C3Hm20z/FF6Ro9Jb0cO34C3ZftJe8/eb6B5urMRAKB6SUt7OLtqZR7NpG  
NnCd5EdOI5MDxHHB4P48hQEMA4hbTApmIts/AQf/X/Sd4Q+HCYQ1MYv8anh253Tt  
Kl8tql+eZkp+XDYw83oIWUeVu5e0d31+KkQ+UWWZ5NrY3DuN8gINj4EmfC3PvOVM  
uVPNjZuJ5YfHX9k2VInjF1jNWGoEkez1aCUdEWSnq9WCsBkzd722Y4mtzC3ATfuP  
TbJaVWu3GZwgDtZvTR0ruTFSzslrGoiIWQ1w5Tr/grZLQzhkAm1wWpVzDdpqDEJp  
B5peNMNEIfRSw6WOVqXtMMP/N+iOsfPpS53vCF/dwaODBQ99FrXeoj7TBfjJwbF9  
S1pg0jOOrXZp1HAEzjM5YwBUoUkSi1D/+KNhvaATr2Q+UV3bSeCepVnCwsqvgdLp  
ASlADS7TjGDsGSjLrxAM9LrTC7BwWfdBHdC6cAZUXP7sXnOYkx8xPVcIheMKbjlS  
K86DRFcWYnAPKrw+4MGRpbqtbd1BWoxy73kao8+KRfPlhg7EogmXCDVZVoYm0xdz  
vtaFKhscqv1pCGedsLIkdr881/0SYGiLJJ5c96nz+gNmjo0wpDeh5VlTTxwrWkjX  
MVCQANtVAc2+Qdev+7VYm8wMi7XuBjOJnJ/u3Hxtt9mie03U53Wlj+rc7ezHJ7qB  
Oli3jWitChfhp3e8VReBgPWutt42gFcUqihOA/saxOW2fNi18BfNyNx/FBiK4bue  
dZcA9HEGFO/RsRkzsGJk4C/SupXD0P2g/l3/PHmLwBB3rbIWUwwXcXpX9uzQ9/CN  
a1CfH9YKKep9DV9vmqE2ZcOZ5s9Q3A6pIf1hG95Bo7x5wyvb7Qh5k12gII8NMi7p  
oy+2FWAFG63+6zxUjLGGgp3iIP+1z1QsNZ/XsFmstxcmKH07zWZnOl+1eEVgW8HN  
mS/JA374qLafKTN6lQwIQh0K7vtAHGb8TydASqkibjrTS7xUrjTXxegdUjoM5/fu  
Q2b1XdmBOeXzWlDPOIAyWQjUmbF/35qaMLZtu9E/u4TaL84vNmdKgBclwhaVncEK  
emR5AEqJmuWC3qoZ4tiOFRAA3YwQFtFP1EOpshkFUIlWgNybJ7reNMDe4UwQ8GiU  
DKFapzQAccm8YdSI0KkmYI2w/NwXFfvS3PBhiGyIX4pQLltEA+61nudmihQrXM1a  
i0dhMQHdbC+4UY35nC2NrG0KB3OCEu0=  
=YJjG  
-----END PGP MESSAGE-----  

```

  
8\. 解密/驗證訊息：  
  
假設我們收到對方的密文：  

```
  
-----BEGIN PGP MESSAGE-----  
  
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  
S82n51Ra2eAT  
=cMVx  
-----END PGP MESSAGE-----  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/EsKR1EQ.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FEsKR1EQ.png)  
點選 Notepad 再把密文貼上後，點選 Decrypt/Verify Notepad 解密/驗證  
  
![https://images.weserv.nl/?url=https://i.imgur.com/DlpGXp8.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FDlpGXp8.png)  
成功！除了成功解密之外，可以看到驗證到信息出自 AndroidOpenKeyChain 手上  
  
Windows 上的 PGP 教學先暫時到此為止，PGP 除了加密純文字之外，亦有能力加密檔案。這個功能留給大家作家庭作業，自己研究一下吧（另一個方向是壓縮 zip 檔時使用隨機密碼加密，上傳網盤，再用 PGP 加密密碼、zip 檔的 Hash 、網盤地址送給對方）  
  
\---------------------------------------------------------------  
Android: OpenKeyChain  
\---------------------------------------------------------------  
  
1\. 安裝 [OpenKeyChain]( "https://f-droid.org/en/packages/org.sufficientlysecure.keychain/")：  
  
建議大家先安裝 [F-Droid 商城]( "https://f-droid.org/zh_Hant/")，再從 F-Droid 的商城內搜索 OpenKeyChain 並安裝  
  
2\. 生成公私匙對：  
  
![https://images.weserv.nl/?url=https://i.imgur.com/BMuXSkh.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FBMuXSkh.jpg)  
建立金鑰  
  
![https://images.weserv.nl/?url=https://i.imgur.com/p6GeqHR.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2Fp6GeqHR.jpg)  
輸入名稱（視乎實際情況，可以使用假名/暱稱）  
  
![https://images.weserv.nl/?url=https://i.imgur.com/tYQI7tD.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FtYQI7tD.jpg)  
輸入 Email（視乎實際情況，可以使用假 Email）  
  
![https://images.weserv.nl/?url=https://i.imgur.com/KlOuCFv.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FKlOuCFv.jpg)  
按下建立金鑰即可生成匙對。  
  
**注意**：教學到現在我一直怱略 KeyServer 公匙伺服器。下面談及公匙分享的途徑時會再談一談 KeyServer 以及我不使用它的原因。當然，如果你已經明白什麼是 KeyServer 以及覺得你有需要的話，可以剔選。（不剔選也沒關係，以後可以手動上傳）  
  
![https://images.weserv.nl/?url=https://i.imgur.com/EzkGAqN.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FEzkGAqN.jpg)  
成功生成匙對！按下匙對以進行再一步設定  
  
![https://images.weserv.nl/?url=https://i.imgur.com/Gpm9qn1.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FGpm9qn1.jpg)  
![https://images.weserv.nl/?url=https://i.imgur.com/N6PqmC9.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FN6PqmC9.jpg)  
（強烈建議）現在要為私匙加上密碼加密：點選鑰匙後，點選右上角的選項，再點選修改密碼以加密私匙。這一步的重要性比在電腦上的重要得多，因為手機被盗的機會大得多，加了密碼後即使私匙落入他人手上起碼無法直接被拿來盗用身份。  
  
3\. 導出公匙，以分享給通訊對方：  
  
![https://images.weserv.nl/?url=https://i.imgur.com/cvhxLAL.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FcvhxLAL.jpg)  
點擊複制的 Icon 即可把公匙複制到剪貼簿裡並可分享：  

```
  
-----BEGIN PGP PUBLIC KEY BLOCK-----  
  
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  
1irtRng9Vy0MfXJL6Uc+dmC3rl7EJVPZ4g==  
=w69G  
-----END PGP PUBLIC KEY BLOCK-----  

```

  
4\. 獲取通訊對方公匙後，導入公匙：  
  
假設你剛剛複制的公匙為下：  

```
  
-----BEGIN PGP PUBLIC KEY BLOCK-----  
  
mQENBF5uM68BCADMHtEAyPXrWYOOKiOVgzTyimjCwHPc6HB96C46ZoB5z1t9qqrV  
sbKXKJ5thUXmqS0BTdEXBip6NuFxiy5aD5aYpavHqlP4k8KCHqlm5SJMhyzdFnm1  
nJIaktsfAC79job2EWrJMJRWfm6khPosZU30gCwUJQau6GShI7fnBg0ZGC6ensfD  
tXf6Dzhy0gBoUc8lTcqWpM6XNSHidK67+7oQyuscDb6xHaVruAOMhlgtgE+fe6Ag  
3HSBPstEHdbFyQCSuTtPt+oD8bzJf+7YqUNG0lr+h6ji/aS3/hPwWsXMYNvZGzyX  
MJW/bxkvir+yVtl/uIPpmKfvKHiMy71T0hTZABEBAAG0GndpbnZpcnQgPHdpbnZp  
cnRAdGVzdC5jb20+iQFUBBMBCAA+FiEEA5vdoBT5SHxcFGCIYSXNOEwTbtkFAl5u  
M68CGwMFCQPCroEFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQYSXNOEwTbtmS  
ngf/Xinj+dQQz7QAX7eQ2IQtqv2cYJn3+YcejhkYHJ/tkq9zM9HFePYNh291YlzV  
cjiDlM1OirJiebekwXJnTfKsB05RR7sznyW+yIy084J6HVmrGu4QNKfefA9Lo0ji  
7aou8svWK7eusrxzOaMJLR43IXA+BlIG23Tpu+XOdKTjAM9T6++xL/846zdfREpi  
IQdG56Vc4RDxDO3Ztj6V1MewwO8cvrMD5fxOLRe0CUZYGXZ+/+XEzjJWh1QIgPV6  
kCc4IKra6sMuY9nJ/guZLAkzJdsRoqGp3tYHsgKkiRr1S+QiBo+4ITY0tEB1Xwke  
QTgUzn1J44stItipdTbnMtzuY7kBDQRebjOvAQgA5hbWOtmZbFLERgrh2nyjibT1  
t80cvd6r4WpsLSC+3ARYv7do+cY4v/tILfjoOwKxnOKKoVezviLg+FbG41m65C8p  
9U71vwQGb8gDy9u/jlaRnVJanqv3QEIdMxcbMC9h9cs6bMakHtBRmCf36PS/pelN  
r6SrBY1VI8pwjZNPIqnFDN+CYctcCanJRA7Hhw02ZaqIdAi56WkqHplrQmzprIna  
q/JhAAuAD1xDncKSrRwkVqeeUejR9oM0la+UhBe0K9CZbZTB1mGBvvbnYi4mZTv2  
2QvX7492hzdONmtKw9XbfM68VRvave6IBlVSwS3hFoLOGf0+6dceNTqxDNnd9wAR  
AQABiQE8BBgBCAAmFiEEA5vdoBT5SHxcFGCIYSXNOEwTbtkFAl5uM68CGwwFCQPC  
roEACgkQYSXNOEwTbtmSDwf+L0eH46sBCFFMtSpSsJG57A5tUTejd1a32wABU93Y  
okCRASxlpIA4QzHtaODBixglhm0DUTgYzdNIjU4yU6BOX1d3U/WKI2WRX2j0tVVs  
q9CnlwXV9FYRQX45P6mWiV2krw/e0Lfh/eI0SiXkDdLMowAuRg62mMtnoZe/+EHx  
rSZPD1MGL52+Q/i444AAlA8p1LE7yBsZsj9SrFl/D+s0UUUCs97iAxZBkSN1FwbA  
x1KH+36fO8oOD0UkMbH6Slst+HCiefw+AstlElC4TeRohb16I7E+ZEk8LjBAemeJ  
NYkxHf52j39S+Jg9PJmT9MVySi8dx6oM5VT2weFnbprq3g==  
=74kT  
-----END PGP PUBLIC KEY BLOCK-----  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/AHERwcj.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FAHERwcj.jpg)  
OpenKeyChain 除了可以手動導入下載下來的公匙檔案之外，更可以直接自動讀取你剛剛複制到剪貼簿內的公匙。  
  
![https://images.weserv.nl/?url=https://i.imgur.com/oOqsIES.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FoOqsIES.jpg)  
點選匯入即可！  
  
5\. 認證公匙身份  
  
![https://images.weserv.nl/?url=https://i.imgur.com/RDCzUXS.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FRDCzUXS.jpg)  
點選公匙後，點選右上角選項後，點選透過指紋確認  
  
![https://images.weserv.nl/?url=https://i.imgur.com/sGORykB.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FsGORykB.jpg)  
跟對方核實指紋後，點選指紋相符  
  
![https://images.weserv.nl/?url=https://i.imgur.com/J7e1lmM.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FJ7e1lmM.jpg)  
選擇使用哪一條私匙進行認證，並按確認金鑰  
  
6\. 加密、簽名訊息：  
  
假設以下是你想加密的訊息，先複製到剪貼簿：  

```
  
Hello, Winvirt  
  
收到你的訊息，謝謝。  
  
下面有些 Archive 找回來的 Data Dump，請查收:   
  
Binxing Fang, http://en.wikipedia.org/wiki/Fang\_Binxing 方滨兴,中国工程院院士,北京邮电大学教授,中国科学院计算技术研究所网 络方向首席科学家。 Gang Xiong,  
http://rd.springer.com/search?facet-author=%22Gang+Xiong%22 熊刚, 高级工程师, 研究方向为信息安全。E-mail: xionggang@ict.ac(dot) cn。 Weili Han, http://crypto.fudan.edu(dot) cn/people/weili/ 韩伟力,  
http://homepage.fudan.edu(dot) cn/wlhan/en This is just my personal gist clip. For discusion and NPOV (http://en.wikipedia.org/wiki/Wikipedia:Neutral\_point\_of\_view), please go to Wikipedia and help  
writing, please. http://en.wikipedia.org/wiki/Internet\_censorship\_in\_the\_People's\_Republic\_of\_China http://en.wikipedia.org/wiki/Fang\_Binxing  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/XVHlm5q.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FXVHlm5q.jpg)  
![https://images.weserv.nl/?url=https://i.imgur.com/x2zJSCx.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2Fx2zJSCx.jpg)  
![https://images.weserv.nl/?url=https://i.imgur.com/agPiux1.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FagPiux1.jpg)  
OpenKeyChain 會自動讀取剪貼簿內容。選擇收件人以及簽名用私匙之後，點擊加密按鈕，密文將自動複制到剪貼簿，如下：  

```
  
-----BEGIN PGP MESSAGE-----  
  
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  
S82n51Ra2eAT  
=cMVx  
-----END PGP MESSAGE-----  

```

  
7\. 解密/驗證訊息：  
  
複制對方的密文到剪貼簿：  

```
  
-----BEGIN PGP MESSAGE-----  
  
hQGMA/KWcBlrSLBxAQv9GVTK4e1ZH2cyPouPkwnhFYAAMEf8L3+6KBt9os6kq7lV  
mZA4uus3K027JU5u4ICYjhyY4PtXpDpqtwRiYINIlfM3NT0QSM0JhfJJiap1qw5d  
jccxVjXZvJeU68To02+kArzIEbIbvADYVh1sWURlvUmurLUv13aVDqJB13cLbjB9  
zG3pnP72ygYG+M9KSCabQBauEtUz1IKp+QZutEqVPizLBNWshdqvCzM5kLV6NCkY  
iaqVkm5UZtFt7jpHFkyLIZlY3iwX4hyj9+75gAULBk5MaqB69Jx4sKB9v3FCEECj  
fCn2TH8wY9lijUHWfKuFygoFALFTTChCB+qYgKJmp1VDWom919Y26oFyZy+ER/eg  
60KADeSmOytqaS4zR+ATBwf5KK7pCWgz6djqpdAD2L9H0P4Vfuhtgm698xTwxo7R  
CcjdAZ/C3Hm20z/FF6Ro9Jb0cO34C3ZftJe8/eb6B5urMRAKB6SUt7OLtqZR7NpG  
NnCd5EdOI5MDxHHB4P48hQEMA4hbTApmIts/AQf/X/Sd4Q+HCYQ1MYv8anh253Tt  
Kl8tql+eZkp+XDYw83oIWUeVu5e0d31+KkQ+UWWZ5NrY3DuN8gINj4EmfC3PvOVM  
uVPNjZuJ5YfHX9k2VInjF1jNWGoEkez1aCUdEWSnq9WCsBkzd722Y4mtzC3ATfuP  
TbJaVWu3GZwgDtZvTR0ruTFSzslrGoiIWQ1w5Tr/grZLQzhkAm1wWpVzDdpqDEJp  
B5peNMNEIfRSw6WOVqXtMMP/N+iOsfPpS53vCF/dwaODBQ99FrXeoj7TBfjJwbF9  
S1pg0jOOrXZp1HAEzjM5YwBUoUkSi1D/+KNhvaATr2Q+UV3bSeCepVnCwsqvgdLp  
ASlADS7TjGDsGSjLrxAM9LrTC7BwWfdBHdC6cAZUXP7sXnOYkx8xPVcIheMKbjlS  
K86DRFcWYnAPKrw+4MGRpbqtbd1BWoxy73kao8+KRfPlhg7EogmXCDVZVoYm0xdz  
vtaFKhscqv1pCGedsLIkdr881/0SYGiLJJ5c96nz+gNmjo0wpDeh5VlTTxwrWkjX  
MVCQANtVAc2+Qdev+7VYm8wMi7XuBjOJnJ/u3Hxtt9mie03U53Wlj+rc7ezHJ7qB  
Oli3jWitChfhp3e8VReBgPWutt42gFcUqihOA/saxOW2fNi18BfNyNx/FBiK4bue  
dZcA9HEGFO/RsRkzsGJk4C/SupXD0P2g/l3/PHmLwBB3rbIWUwwXcXpX9uzQ9/CN  
a1CfH9YKKep9DV9vmqE2ZcOZ5s9Q3A6pIf1hG95Bo7x5wyvb7Qh5k12gII8NMi7p  
oy+2FWAFG63+6zxUjLGGgp3iIP+1z1QsNZ/XsFmstxcmKH07zWZnOl+1eEVgW8HN  
mS/JA374qLafKTN6lQwIQh0K7vtAHGb8TydASqkibjrTS7xUrjTXxegdUjoM5/fu  
Q2b1XdmBOeXzWlDPOIAyWQjUmbF/35qaMLZtu9E/u4TaL84vNmdKgBclwhaVncEK  
emR5AEqJmuWC3qoZ4tiOFRAA3YwQFtFP1EOpshkFUIlWgNybJ7reNMDe4UwQ8GiU  
DKFapzQAccm8YdSI0KkmYI2w/NwXFfvS3PBhiGyIX4pQLltEA+61nudmihQrXM1a  
i0dhMQHdbC+4UY35nC2NrG0KB3OCEu0=  
=YJjG  
-----END PGP MESSAGE-----  

```

  
![https://images.weserv.nl/?url=https://i.imgur.com/9qGHuQM.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F9qGHuQM.jpg)  
點選「從剪貼簿中讀取」  
  
![https://images.weserv.nl/?url=https://i.imgur.com/2csQQGv.jpg](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2F2csQQGv.jpg)  
如果一切順利的話，OpenKeyChain 會自動解密並驗證密文  
  
Android 的 OpenKeyChain 教學先到此為止。跟 Kleopatra 一樣，OpenKeyChan 同樣可以加密、解密檔案。同樣留給大家作家庭作業自己研究吧  
  
\==========================================  
一些操作細節  
\==========================================  
  
1\. 淺談分享公匙和密文的途徑：  
  
PGP 公匙、密文、密件的內容格式，不論是純文字抑或二進制檔案，都是非常之容易辨認的。監控方使用機械人就可以輕易自動識別你嘗試建立加密通訊渠道的企圖。如果連企圖建立加密渠道都屬於違法行為的話（咳密碼法咳），PGP 也沒辨法幫到你的。所以如果可以的話，平時都儘量使用 Signal, Telegram, WhatsApp 之類的通訊軟件。  
  
另一個我想到的方法，是把公匙，密文都放到 pastebin 文本儲存網站裡面 (如[Pastebin.com]( "https://pastebin.com/"), [GitHub Gist]( "https://gist.github.com/"), [An]( "https://an.org/")等等 )，再傳送 pastebin 網址（甚至把網址和 id 分別通知）對方，叫對方收取。  
  
以我剛剛在上面 Windows Kleopatra 內生成的公匙為例，我放到了 pastebin.com 裡， ID 是 B35qc9Af。自己湊一條 URL 後再自己上去看吧～不明白的話直接視訊語音通訊吧～對， 像實時通話這些手段都會增加機械人自動審查的難度  
  
此外，很多 pastebin 是允許你作修改更新的。如果你事先約定通訊對方定期瀏覽你的 pastebin，以定期獲取你更新的訊息的話，機械人更難審查你們的舉動。  
  
可能會有人問我為啥不干脆放到 Keyserver 上。  
  
先說一說什麼是 KeyServer： KeyServer 是分佈世界各地，通常是去中心化的公匙資料庫，可以讓你憑著公匙的 指紋/ID（所謂 ID 其實就是指紋的最後幾個位罷了），或者名字和 Email（不可靠，冒認身份很容易）來搜索公匙。  
  
我不使用 KeyServer 有以下幾個原因：  
  
    1. Keyserver 基本上是 Write-only, 要刪除幾乎不可能。相比之下 Pastebin 還可以設定過期日或者親自刪除。由此，這個特性使得 KeyServer 更適合公眾人物使用（如記者的接頭人）。  
    2. 證書濫發攻擊：詳見 [CVE-2019-13050]( "https://access.redhat.com/articles/4264021"), Github Gist [(1)]( "https://gist.github.com/rjhansen/67ab921ffb4084c865b3618d6955275f") [2]( "https://gist.github.com/rjhansen/f716c3ff4a7068b50f2d8896e54e4b7e")，詳細解釋的話有點複雜，但是做成的後果是 OpenPGP 軟件，特別是 GPG ，導入被污染的公匙時會直接將程序當掉。  
    3. KeyServer 解決不了密文被識別的問題。  
    4. 可能是我自己笨或者設定有問題吧，但是我在寫這個教學時嘗試使用 Keyserver 搜尋，好像搜索不了我自己的公匙...\[/list\]  
  
2\. 「中間人攻擊」的危險，淺談認證指紋的方法：  
  
教學一開始已經說過，在只有對稱加密法的原始時代下，除非面對面事先分享密匙，遠距安全通訊基本上是不可能的，因為在通訊渠道被「中間人」監聽下，任何在渠道中輸送的密匙都會輕易被竊聽，使得後續的加密通訊毫無意義。  
  
通過上面教學我們可以看到，公匙加密的好處在於即使公匙被竊聽，「中間人」都沒辨法使用同一條公匙進行解密。那麼，公匙分享是否就免疫於「中間人攻擊」呢？  
  
不是的！如果「中間人」有能力截取通訊渠道並傳送偽造訊息，那麼「中間人」還是有能力竊聽通訊的：  
  
  
![https://images.weserv.nl/?url=https://i.imgur.com/iCKOSxS.png](https://images.weserv.nl/?url=https%3A%2F%2Fi.imgur.com%2FiCKOSxS.png)  
如上圖，如果 Alice 拿著他以為是 Bob 的公匙來進行加密，密文都會被 Mallory 輕易解密。對 Bob 來說反之亦然。  
  
在這個危險下，驗證公匙的身份變得非常之重要。正如上面的教材所說，通訊方一定要確認對方公匙的指紋跟剛剛導入的密匙一致。我個人想到的方法有二：  
  
    1. 面對面交換指紋：最保險的做法，不過在這個情況下乾脆直接交換公匙更方便  
    2. 視訊通話︓這個是假設監視方的科技還未擁有實時造假的能耐下的好方法。通話中用紙、筆寫下指紋字串，不斷地移動紙張，再親口朗讀指紋等等之類做法可大幅提昇實時造假難度。  
  
3\. 關於文件分享：  
  
要加密大型檔案如影片，相片，zip 之類的文件，PGP 是可以做到的，但是裡面的內容格式使得檔案非常容易被辨認出為 PGP 密件。  
  
相對地，一個加了密碼上了鎖的 zip 檔看起來平平無奇，上傳到如百度之類的網盤也不為過。  
  
如果你把你網盤的分享地址，zip 檔的 Hash 數值，以及 zip 檔的密碼使用 PGP 加密並傳送之，讓對方自行取件，檢驗 Hash，並解密，比起要對方去下載一個明顯是 PGP 密件的動作要隱閉得多。  
  
對了，Hash... Hash 的教學自己找吧～主要功能是用來檢驗檔案的完整性。如果使用 PGP 確保 Hash 值沒有被調包的話，Hash 會兼備驗證檔案沒被調包的功用。  
  
\=====================================================  
我可以在哪些地方用到 PGP 加密呢？  
\=====================================================  
  
正如我在文章開端的吐槽，本教學的原意是希望提供一個工具給吹哨人仕。如果身邊有甚麼非人道的事情想曝光給你身在遠方的朋友，以至是公諸於世給傳媒朋友，而不怕一下子就被人以造謠入罪的話，善用公匙加密法可大幅保護你在使用非安全渠道溝通的人身安全。  
  
給大家一些功課：  
1\. 為你覺得有需要的朋友上一門 PGP 課，並跟對方建立一條溝通渠道  
2\. 成功發起一輪 PGP 的互動。隨便你說甚麼閒話家常  
3\. 如果朋友不懂得翻牆的話，使用 PGP 和加密 zip 的方法為其走私一批翻牆工具。（例如編程隨想的推薦工具：BtSync key: BTLZ4A4UD3PEWKPLLWEOKH3W7OQJKFPLG ）  
4\. 加分題：如果朋友有什麼事情想要曝光的話，你可以扮演接頭人的角色接收其訊息  
5\. 超級加分題：如果朋友想將事情公諸於世的話，你可以作為中間人角色，確保人身安全的情況下，用以下機構媒體的公匙發送密文：  
    - [ICIJ.org]( "https://www.icij.org/leak/")  
    - [The Guardian]( "https://www.theguardian.com/pgp")  
    - [Wiki-Leaks 推薦列表]( "https://wikileaks.org/wiki/Whistleblowing_Links")  
  
教學暫時寫到這裡。如果有信息安全神人在以上教學的操作流程上發現有什麼危險的漏洞，請務必指出！  
  
\=====================================================  
其他跟訊息安全相關的資源：  
\=====================================================  
  
\- [InfoSec Bytes]( "https://www.youtube.com/channel/UCfET6btFpe1e0CRGTFOulNg"): 如果你英文可以的話，不妨看看這個 YouTube Channel 吧，裡面內容主要面向對象是需要保密安全的記者。  
\- [PRISM BREAK]( "https://prism-break.org/zh-TW/all/"): 對美帝棱鏡計劃不滿的人篩選出來替代主流軟件的軟件列表，當中很多玩具都對兲朝獨裁下的人民都挺有幫助  
\- [編程隨想]( "https://program-think.blogspot.com/"): 反賊圈中應該沒有人不認識他吧？ IT 安全功力深厚的猛人一位，別忘了使用 BT-Sync 同步備份他的 Blog 喔：B7P64IMWOCXWEYOXIMBX6HN5MHEULFS4V  
\- [F-Droid Guardian Project repo 保衛者計畫軟件庫]( "https://guardianproject.info/fdroid/"): 該 F-Droid 的軟件庫包含了很多訊息安全相關的軟件，包括 Shadowsocks 客戶端和 V2Ray 插件。已安裝 F-Droid 後，使用**非微信** QR Code 掃描器掃一掃左邊或者下面其中一個的 QR Code （右邊那枚是 TOR 鏈結）後再打開鏈結，F-Droid 應該會懂得自動加入 Guardian Project 的軟件庫。  
  
  
  
  
  
\=====================================================  
  
  
  
向品蔥請求：請求支持 Markdown 格式，BBCode 寫文章非常辛苦～

            
### 品葱用户 **V2EX的喵 
dsgzs** 评论于 2020-03-27
        
[

> gpg4win包含rsa和ecc，都防不住量子计算机，现在我们在等格基加密。

](https://pincong.rocks/article/item_id-319639#answer_list_319639 "https://pincong.rocks/article/item_id-319639#answer_list_319639")  
现在短期内还是没有问题的，虽然业界开始推后量子加密了，等可以破解rsa2048的机器出来还得有个几十年吧。
        


            
### 品葱用户 **solids** 评论于 2020-04-23
        
\-----BEGIN PGP SIGNED MESSAGE-----  
Hash: SHA512  
  
推荐使用Keyserver ，上传/分发密钥都比pastebin方便  
另外分发密钥时最好用16位描述  
0xab72ee8f7607f6d7  
\-----BEGIN PGP SIGNATURE-----  
  
iQI7BAEBCgAlHhwgKHVzZSBmb3IgcGluY29uZy5yb2NrcyBvbmx5KQUCXqEJIgAK  
CRCrcu6Pdgf2150TD/sHoBPk2mf9gL4pC5zNSGuS3OlhHmU0ZJabG9k8IxoNa8o+  
xMcXPtqtWRtwsD/rvymXyjMGRAfxgZtTiZuoH/tD4ysjk1PJ40xoILJld/NSwXLE  
AyfMoipHQJYqN5eLmJ7rMUI1xIZzbO3UQuuRNRlMXjT+aI+ANmRYQTSRGVL/okXL  
c79uAZbLj/v8rXu2PLAgszDCMPiiqL/KA17WIy2UKVc7grwVX/ZNvi2ASh4tL9O/  
4NXsR2PfqyiyZ8OHe4vrKW07ayb2cP2R8N3dl+J+aKEG1TZzP4u1mif3M5Tatpqg  
QLc4OXdyKIEBLy+HDjHrrH0OqbGxn4WEBHB86Wb5kGPxE1TrnjOOD+ScTA0sf3/G  
FVqx53dnbLUJ4OZL9jyCssFeMeHoYUpiZCvo+yL2wwiEf+/SM9OR9vyZCZaXnJP5  
RYsOdxD1NQfbQ+dqEev5KWyg96atBVW6bkhqnsVWXGZnW1MUvsXICw5BJp7e+fNy  
FUBZFiWcLlktiGxoja0uVh/4RmAOfV88OKN4JgPZRMCLfGrFQ0B46cslenPsrz3O  
j4DUrCH1f3yW4IlLuag1/3OwtgAAelWYkECa3YSDQElyiKeYjUE3oPfQn9Xl8YMy  
rcTxmLiQOFn2/emchs7H/1bSCiUK3+KY91JLex3I93Zjn3UKBvYPxFhiGZXarQ==  
\=6MOD  
\-----END PGP SIGNATURE-----
        


            
### 品葱用户 **dsgzs** 评论于 2020-03-28
        
gpg4win包含rsa和ecc，都防不住量子计算机，现在我们在等格基加密。
        


            
### 品葱用户 **Hker** 评论于 2020-03-28
        
可行性先不說，希望有需要的時候能發揮巨大作用，樓主寫得很詳細有心了。
        


            
### 品葱用户 **V2EX的喵** 评论于 2020-03-27
        
浏览了下你的文章，写的非常不错，因为我以前有点想发个类似的教程的，不过这个公钥的门槛却实高了很多，我估计很多非计算机专业甚至有些计算机专业的朋友都不太懂公私钥加密，楼主的那个图解还不错。  
  
有几点我想说下的就是：  
首先一定要保证自己private key（私钥）的安全性，你要是用国产手机存储或者PC里面有国产软件那么你的私钥肯定不安全，不过一般人的信息也没有那么高的价值就是，总之私钥一定要离线存储好。有条件可以使用pki智能卡之类的硬件私钥。  
  
其次由于加密文本的话生成的base64字符串要是在一个群里面出现太多甚至会触发核审的机制，不过这个就是未知的了，因为核审系统本身对我们而言是个黑箱。可能的话还是尽量避免传这么多的hex字符串。
        


            
### 品葱用户 **Ashley777 
V2EX的喵** 评论于 2020-03-27
        
[

> 浏览了下你的文章，写的非常不错，因为我以前有点想发个类似的教程的，不过这个公钥的门槛却实高了很多，我...

](https://pincong.rocks/article/item_id-319673#answer_list_319673 "https://pincong.rocks/article/item_id-319673#answer_list_319673")  
  
「淺談分享公匙和密文的途徑」 那一部份我提議把公匙/密文 放到還沒被牆的 pastebin 類網站托管，並在受審查通訊渠道裡面只提及網頁名字和 pastebin 的 id，甚至事先約定，定期上該 pastebin 查收更新，以減少密文在受監控渠道的流通，以儘量躲過自動審查。  
  
當然驚動牆並將 pastebin 牆掉就沒辦法啦～
        


            
### 品葱用户 **Ashley777 
V2EX的喵** 评论于 2020-03-27
        
[

> 现在短期内还是没有问题的，虽然业界开始推后量子加密了，等可以破解rsa2048的机器出来还得有个几十...

](https://pincong.rocks/article/item_id-319678#answer_list_319678 "https://pincong.rocks/article/item_id-319678#answer_list_319678")  
  
我也是在賭這幾十年，反正如果到時候土匪還未死的話，監控科技、力度和野蠻性肯定會變態得甚麼樣子的加密都變得毫無意義。
        


            
### 品葱用户 **范松忠** 评论于 2020-04-02
        
說的很好，我的敵國監控能力世界第一，不用懷疑，謝謝！
        


            
### 品葱用户 **timeend** 评论于 2020-04-14
        
感謝分享。  
Signal, wickr me都是很好的E2EE（端到端加密）即時通訊軟件。
        


            
### 品葱用户 **JohnSmith** 评论于 2020-04-15
        
这类方式最大的问题是特征太明显，有可能被记为重点关注对象（虽然现在没有证据表明这一点），说穿了就是没有几个可用的安全公共信道，pastebin只能说勉强堪用。这种信息交换方式只应该用于简单的握手，为下一步通讯做准备。可是如果要线下劝说周围人使用PGP，为什么不直接跳过这一步？
        


            
### 品葱用户 **岭南一匹狼** 评论于 2020-05-16
        
GPG/PGP 可以临时用一用，但是要注意它没有【前向安全性】  
前向安全性是指：如果你遭到了严刑拷打，交出了私钥/密钥/口令等一切机密信息，你之前发送过的消息仍然无法被解密  
相反，只要有私钥，GPG/PGP 的密文在任何时候都是可以被解密的
        


            
### 品葱用户 **song_huyi** 评论于 2020-05-20
        
kleopatra打开后报错讲GPG安装不支持，之后的都报错，这是怎么回事呢？
        






> [点击品葱原文参与讨论](https://pincong.rocks/article/id-16652__sort_key-agree_count__sort-DESC)

