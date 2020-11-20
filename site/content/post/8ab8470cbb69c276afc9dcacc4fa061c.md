---
layout: default
Lastmod: 2020-05-30T22:52:22.980907+00:00
date: 2019-09-28T00:00:00.000Z
title: "【向Cloudflare致敬】免费安全可靠的Cloudflare WARP VPN"
author: "KonaisPC"
tags: [科学上网,vpn,GFW,翻墙,CloudFlare]
---

Cloudflare近日正式推出了其基于wireguard的WARP VPN。  
  
请见loveyou521大神关于[wireguard](https://pincong.rocks/article/5489 "https://pincong.rocks/article/5489")的讲解。  
  
目前我只是尝试了免费的WARP，虽然免费版的速度还是很慢，但感觉算是能用吧，可以作为备用翻墙手段存起来。不知道付费版的WARP+速度会不会好一点。  
  
有葱友们尝试过吗？  
  
PS: 一则伤心的故事，邮箱被赵弹塞满，已废。/(ㄒoㄒ)/  
  

> ☰  
> Cloudflare’s free mobile VPN is now available in its 1.1.1.1 app  
> There’s also a paid tier  
>   
> By Jay Peters on September 26, 2019 2:44 pm  
>    
>   
> Image: Cloudflare  
> Cloudflare today released the free VPN add-on, called Warp, for its 1.1.1.1 DNS resolver mobile app for all users, following the initial announcement back in April. Cloudflare is also launching a paid version, Warp Plus, that uses Cloudflare’s Argo technology, which promises additional speed and security.  
>   
>   
> Cloudflare’s goal for Warp is to make a mobile VPN that not only makes browsing more secure, but also faster. And, since it’s a VPN for your phone, it should make any internet traffic from your phone more secure, too. However, you can’t use Warp to spoof your location — you’ll need to use another VPN if you want to watch your favorite show that’s not on the US version of Netflix.  
>   
> THERE WERE APPROXIMATELY 2 MILLION PEOPLE ON THE WARP WAITLIST  
> Cloudflare says there were “approximately two million people” on the waitlist for Warp. The company adds that it wanted to launch Warp in July, but the release took longer than expected. “It turned out that building a next generation service to secure consumer mobile connections without slowing them down or burning battery was… harder than we originally thought,” writes CEO Matthew Prince in a blog post.  
>   
> In my own testing of the free version of Warp, I haven’t felt any noticeable changes to my internet speeds or battery life. According to Cloudflare, that free version has no bandwidth caps or “limitations,” and I haven’t noticed any particular slowdowns. That said, if you want the additional speed and security benefits of Warp Plus, you’ll have to pay $4.99 a month in the US. Cloudflare says the price will vary by region.  
>   
>   
> If you were on the waitlist, Cloudflare says it will give you 10GB of Warp Plus, but some commenters on the announcement blog and on Reddit haven’t seen that show up yet. If you haven’t, Cloudfare is advising you to send a bug report in the app by tapping on the little insect icon on the top of the screen. If you recently switched phones, though, you might be out of luck — Cloudflare says your waitlist number was tied to your individual device.  
>   
> RELATED  
>   
> Firefox is testing a VPN, and you can try it right now  
> Cloudflare is adding a free VPN to its 1.1.1.1 app  
> Next Up In Policy  
> Police raid ‘bulletproof’ hosting company run out of former NATO bunker  
> Elizabeth Warren wants to hire an army of nerds to defeat Google’s lobbyists  
> More and more countries are mounting disinformation campaigns online  
> To use Alexa, you have to trust Amazon  
> YouTube will remove politicians’ content if it breaks rules, but there are some exceptions  
> Amazon pushes Alexa privacy with new delete options  
>   
> COMMENTS  
> One advantage of CloudFlare is that, while they may not be inherently trustworthy, they already run a ridiculous amount of the internet, so you are likely already trusting them without knowing it.  
>   
> By neilowen on 09.26.19 2:56pm  
>   
> I don’t understand all this very well but will this keep my ISP from monitoring and monetizing my browsing history? I would prefer for both AT&T and Spectrum to eat a bag of Ds.  
>   
> By Tal Rico on 09.26.19 2:58pm  
>   
> It will do that in Warp mode, but not in 1.1.1.1 mode.  
>   
> Warp’s help pages are pretty confusing but this blog post is good: https://blog.cloudflare.com/1111-warp-better-vpn/  
>   
> By Danyal on 09.26.19 3:44pm  
>   
> Yes.  
>   
> A VPN (what Warp is) encrypts your connection between 2 points: your device and the VPN server. Your ISP is able to see that single connection taking place but is unable to tell what’s being transmitted through it. For your ISP it’s one big lump of data moving through that single connection. Thus, they’re unable to see any of your activity since Cloudflare’s servers are the ones actually connecting to the services you’re trying to reach and then routing that data through that encrypted tunnel.  
>   
> By MaDBoOmAh on 09.27.19 10:24am  
>   
> I got the free 10gb from being on the waitlist, but my only option is Warp+. I’m not sure if I am locked out of the base Warp or if this is just really shitty UX.  
>   
> By zduboss on 09.26.19 3:03pm  
>   
> I think it is a UI and a branding issue. basic functionality appears to be 1.1.1.1 which uses a VPN profile as part of the DNS over HTTPS. It is unclear if any other aspects of the VPN come into play with that, as the vpn portion appears to based on Wireguard.  
>   
> Perhaps it gives basic vpn, just without location optimized connectivity/routing (seemingly what Warp+ offers).  
>   
> Default behavior via the UI gives you 1.1.1.1 functionality over Wireguard (maybe?).  
> Enabling "Warp" turns on Warp+ (yet the button implies just Warp). So who knows.  
>   
> By theVergeOf on 09.26.19 3:43pm  
>   
> You can change between the two options dude. Just check the settings page.  
>   
> By ashrafmorenos on 09.26.19 5:24pm  
>   
> People say not to trust free VPN apps since they’ll spy on you to make money. How is this any different? Doesn’t the adage still apply, "If you’re not paying for the product, you are the product."  
>   
> By gadgetgormand on 09.26.19 3:11pm  
>   
> I wouldn’t trust the free service. You’re routing all your internet traffic through someone’s server and you’re not paying them for it. They have to make money somehow. I would guess they’re selling that data for marketing purposes. They may remove personal identifiers before selling the data but, who knows.  
>   
> By bata23 on 09.26.19 3:15pm  
>   
> Honestly, wouldn’t "trust" the paid service either and this isn’t a knock on Cloudflare. The goals of this VPN are security and speed, not privacy. So for the "I want a VPN that doesn’t log/doesn’t retain logs" set, this isn’t going to be your VPN of choice. But I imagine there is probably some security features in play that’ll be appealing to a lot of users (something like notice specific fingerprints/third party domains being called via ad networks or just random javascript that are known bad actors, etc.: blocked on Cloudflare’s end for you).  
>   
> By whlr on 09.26.19 3:18pm  
>   
> https://blog.cloudflare.com/1111-warp-better-vpn/  
>   
> The bottom of this article explains how they make money.  
>   
> By arcaninsanium on 09.26.19 3:46pm  
>   
> A little bit off-topic: Does anyone know how to make an animation like in the title? Is there some Adobe program like Premiere (or similar) needed? Thanks for your help!  
>   
> By David179 on 09.26.19 3:41pm  
>   
> The website it has been rendered from (https://1.1.1.1) is actually open source and the logo appears to be animated programmatically there. See initOneDotLogosAnimated: https://github.com/cloudflare/1.1.1.1/blob/master/source/pages/init.js#L25  
>   
> By Danyal on 09.26.19 4:01pm  
>   
> I’d like to use this but live outside the US. Usually not a problem, but content providers are dicks.  
>   
> The NFL sold the GamePass rights to a shit company called DAZN for Canada. It’s a horrible service that runs in 480p most of the time, but somehow figured out how to be militant about geolocating. 1.1.1.1 renders it useless.  
>   
> This is mostly irrelevant but it is "Consuming Content in Canada" writ small.  
>   
> By StoicRomance on 09.26.19 3:50pm  
>   
> I bought 3 years of NordVPN for less than $3/month and I can use that anywhere, desktop or mobile. I don’t use VPN when I’m off home WiFi unless I connect to a public WiFi and need to access something more confidential.  
>   
> By jdmp10 on 09.26.19 4:57pm  
>   
> Congratulations!  
>   
> By baRRy boRRis on 09.26.19 6:44pm  
>   
> This is very lazy reporting. There is data limits on warp which you then mention in the paragraph after saying there’s no limits. One job guys. 10GB limit and extra 1GB for referrals. That is a hard limit for the free warp. Without warp it’s just secure DNS without limits not actual data VPN.  
>   
> By Jazstar on 09.26.19 5:15pm  
>   
> Warp and Warp Plus are not the same thing  
>   
> By dissss on 09.26.19 10:44pm  
>   
> You get 10GB free (i think if you were on the waitlist) and 1GB for referrals on their paid tier (Warp Plus). When you run out you drop to the base tier (Warp) which has no data caps currently.  
>   
> By gameaddict24 on 09.27.19 10:13am  
>   
> Alternatives:  
> \- Use the Tor browser if you only care about privacy but not necessarily fast speeds.  
> \- Get a free ProtonVPN account. https://account.protonvpn.com/signup  
>   
> By JanSolo on 09.26.19 6:46pm  
>   
> This app slows down my internet connection tremendously. Even in Warp. I wonder why.  
>   
> By Megazine on 09.27.19 4:50am  
>   
> View All Comments  
>   
> Back to top ↑  
> Terms of Use / Privacy Policy  
>   
> 2019 Vox Media, Inc. All Rights Reserved

            
### 品葱用户 **Smtsmt** 评论于 2019-09-29
        
在哪里能下载到？
        


            
### 品葱用户 **KonaisPC 
Smtsmt** 评论于 2019-09-28
        
https://1.1.1.1 这个网站直接下载。
        


            
### 品葱用户 **羊城暗夜** 评论于 2019-09-28
        
顶
        


            
### 品葱用户 **kale1** 评论于 2019-09-29
        
google play可以安裝. 開了可以有限度翻牆, 上telegram, whatsapp可以
        


            
### 品葱用户 **临时用户** 评论于 2019-09-29
        
Google和苹果市场搜索warp即可 试了一下 速度还可以 居然能达到2M/s （免费版）
        


            
### 品葱用户 **波云诡谲** 评论于 2019-09-28
        
邮箱被赵丹塞满？
        


            
### 品葱用户 **zlzsuwdss** 评论于 2019-09-29
        
为什么只能在手机上用?能在桌面系统(Linux/Windows)上用吗?
        


            
### 品葱用户 **Smtsmt** 评论于 2019-09-29
        
在墙内用不上
        


            
### 品葱用户 **外星海底漫遊 
zlzsuwdss** 评论于 2019-09-30
        
還沒推出
        


            
### 品葱用户 **路过一下** 评论于 2019-10-15
        
1.1.1.1. + warp 满足基本功能，速度可靠，Cloudfare 看起来也不会被收买，适合推荐给墙内未翻墙人士，之后可考虑自搭V2Ray或更高级链接
        


            
### 品葱用户 **无天** 评论于 2019-10-14
        
你们都在墙内吗？
        


            
### 品葱用户 **mekhashshepheh** 评论于 2019-10-14
        
这东西本来就不是给翻墙用的，关键是数据加密，好像不能完全隐藏ip  
我听说这东西国庆节前后就被墙了啊，复活这么快的吗，，，  
而且这东西dssq我怕会影响原来拿cf拯救被墙vps的用户
        


            
### 品葱用户 **swertq33 
路过一下** 评论于 2019-10-25
        
这个公司和百毒合作的，还是不要用
        


            
### 品葱用户 **币圈奇葩8964** 评论于 2020-05-10
        
不建议拿这玩意上品葱，会暴露IP的，，，  
经过我币圈人研究，这个Cloudflare Warp在连接使用Cloudflare加速的网站时会暴露真实IP，，，  
不信的话，去这里看看：  
[https://pincong.rocks/cdn-cgi/trace](https://pincong.rocks/cdn-cgi/trace "https://pincong.rocks/cdn-cgi/trace")  
或者是任何启用了Cloudflare加速的网站：  

```
https://<域名>/cdn-cgi/trace
```
        


            
### 品葱用户 **霏艺Faye 
币圈奇葩8964** 评论于 2020-05-10
        
[

> 不建议拿这玩意上品葱，会暴露IP的，，，经过我币圈人研究，这个Cloudflare Warp在连接使...

](https://pincong.rocks/article/item_id-373778# "https://pincong.rocks/article/item_id-373778#")  
没有明白你的意思。。。  
  
我看过了boringtun的代码，我觉得这个上品葱是安全的。。。
        


            
### 品葱用户 **币圈奇葩8964** 评论于 2020-05-10
        
说明一下各项是什么意思：  
fl=Cloudflare机房编号  
h=访问域名时HTTP的HOST字段，一般就是你访问的域名本身，或者IP地址  
ip=你连接互联网时使用的IP  
ts=时间戳，是从[1970年1月1日0点0分0秒UTC时间所过去的秒数]( "https://www.epochconverter.com/")  
visit\_scheme=访问时使用的协议，一般为http或者https  
uag=你的User-Agent，包含了你使用的操作系统和浏览器版本  
colo=Cloudflare机房所在地，使用[IATA机场编码]( "https://zh.wikipedia.org/zh-cn/%E5%9B%BD%E9%99%85%E8%88%AA%E7%A9%BA%E8%BF%90%E8%BE%93%E5%8D%8F%E4%BC%9A%E6%9C%BA%E5%9C%BA%E4%BB%A3%E7%A0%81")  
http=你使用的HTTP版本号，一般为http/2，有的浏览器比较旧就是spdy/3.1或者3，更旧的话就是http/1.1，请升级浏览器  
loc=你的IP对应的位置  
tls=TLS协议版本，必须使用HTTPS才会存在，一般为TLSv1.3，代表最新的TLS 1.3版本，如果是1.2甚至更低，建议升级浏览器  
sni=访问域名时，TLS协议的SNI字段，plaintext代表明文，encrypted代表已加密  
warp=你是否使用Cloudflare Warp，有on和plus（代表你使用的Warp+），否则就是off
        


            
### 品葱用户 **币圈奇葩8964 
霏艺Faye** 评论于 2020-05-11
        
[

> 没有明白你的意思。。。我看过了boringtun的代码，我觉得这个上品葱是安全的。。。

](https://pincong.rocks/article/item_id-373794# "https://pincong.rocks/article/item_id-373794#")  
比如你人在天朝，Cloudflare会记录你的天朝IP，，，
        


            
### 品葱用户 **霏艺Faye 
币圈奇葩8964** 评论于 2020-05-10
        
[

> 比如你人在天朝，Cloudflare会记录你的天朝IP，，，

](https://pincong.rocks/article/item_id-373803# "https://pincong.rocks/article/item_id-373803#")  
这又何妨？中国7亿网民，有几个人有公网IP？  
cf记录的ip，是公网ip  
我们在天朝都是被nat过的。。。  
  
根本不知道这个ip连到品葱的人是谁  
比如中国的ISP和CF配合起来  
  
这里牵涉到的公司和人太多了。。。  
而且按你的说法，CF就是个蜜罐。。。  
实际情况，如果是蜜罐，直接停掉大陆业务，外包给百度云就好了  
【参考Uber把大陆地区卖给了滴滴，KFC把中国业务卖给了阿里巴巴】  
  
很多问题，不应该自己吓自己
        


            
### 品葱用户 **币圈奇葩8964 
霏艺Faye** 评论于 2020-05-11
        
[

> 这又何妨？中国7亿网民，有几个人有公网IP？cf记录的ip，是公网ip我们在天朝都是被nat过的。。...

](https://pincong.rocks/article/item_id-373810# "https://pincong.rocks/article/item_id-373810#")  
有点naive了，，，  
被nat过了照样找得到，关键是速度太慢，成本太高，对小鱼小虾不会动用这么麻烦的手法，，，  
所以才有手机号实名制，成本真的低，人人被出道，，，
        


            
### 品葱用户 **霏艺Faye 
币圈奇葩8964** 评论于 2020-05-10
        
[

> 有点naive了，，，被nat过了照样找得到，关键是速度太慢，成本太高，，，所以才有手机号实名制，，...

](https://pincong.rocks/article/item_id-373819# "https://pincong.rocks/article/item_id-373819#")  
对啊，nat以后可以找到，但是成本非常高！  
  
所以，你也说了小鱼小虾没关系。。。  
然后你在这里吓唬小鱼小虾。。。  
  
小隐于林，大隐于市~  
我觉得用boringtun的人越多，大人物混在小鱼小虾里才越安全  
  
而且因为是udp的nat，成本比tcp应该更高才对。。。  
udp不需要握手，tcp需要握手，nat自然简单很多了  
记录udp的nat本身就是一个很蛋疼的事情，要不然也没有内网穿透了。。。
        


            
### 品葱用户 **霏艺Faye 
币圈奇葩8964** 评论于 2020-05-10
        
[

> 有点naive了，，，被nat过了照样找得到，关键是速度太慢，成本太高，对小鱼小虾不会动用这么麻烦的...

](https://pincong.rocks/article/item_id-373819# "https://pincong.rocks/article/item_id-373819#")  
  
  
WARP的源码是开源的  
叫boringtun，GitHub上就可以搜索到，Rust编写  
  
Libra的源码也是开源的【Facebook的数字货币】  
GitHub上也可以搜索到，也是Rust编写的  
  
火狐的servo内核，也是Rust编写的  
  
你有兴趣学习Rust么？  
  
或者 Lantern V2ray 迷雾通 ，这些翻墙软件，都是Go语言实现的  
你有兴趣学习Go语言么？  
  
我对自己使用的软件，都会去读读源码，确保是不是安全  
而且很多东西都是自己改开源项目来完成定制
        


            
### 品葱用户 **币圈奇葩8964 
霏艺Faye** 评论于 2020-05-11
        
[

> 对啊，nat以后可以找到，但是成本非常高！所以，你也说了小鱼小虾没关系。。。然后你在这里吓唬小鱼小虾...

](https://pincong.rocks/article/item_id-373824# "https://pincong.rocks/article/item_id-373824#")  
大人物倒是可以warp+tor，双保险，，，  
墙只能看到你用warp，，，
        


            
### 品葱用户 **币圈奇葩8964 
霏艺Faye** 评论于 2020-05-11
        
[

> WARP的源码是开源的叫boringtun，GitHub上就可以搜索到，Rust编写Libra的源码...

](https://pincong.rocks/article/item_id-373832# "https://pincong.rocks/article/item_id-373832#")  
安全不仅仅是一方面，而这里的短板不是rust编程语言，而是cloudflare会不会泄漏IP日志（目前应该不会），，，  
而且大佬也是从小鱼小虾开始的，从第一天就做好安全保护才是坠吼的，，，
        


            
### 品葱用户 **霏艺Faye 
币圈奇葩8964** 评论于 2020-05-11
        
以我的观点，还不如教他们原理  
从根本上，知道什么是危险，什么是安全  
学会独立思考，单兵作战  
而不是依附他人
        


            
### 品葱用户 **币圈奇葩8964 
霏艺Faye** 评论于 2020-05-16
        
[

> 以我的观点，还不如教他们原理从根本上，知道什么是危险，什么是安全学会独立思考，单兵作战而不是依附他人...

](https://pincong.rocks/article/item_id-374866# "https://pincong.rocks/article/item_id-374866#")  
这事ao的，，，  
去中心化才是王道，，，
        


            
### 品葱用户 **Hi2019** 评论于 2019-10-15
        
稳定机场可看Netflix，注册送32G，支持V2,ssr  
通过我的推广链接/邀请码注册,我们双方都将获得 20GB 流量奖励  
注册链接加邀请码:https://daydayupedu.top/register?aff=64082
        


            
### 品葱用户 **lonelydot** 评论于 2020-05-15
        
~已删除~
        






> [点击品葱原文参与讨论](https://pincong.rocks/article/5646)

