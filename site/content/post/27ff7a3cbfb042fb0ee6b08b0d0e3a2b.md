---
layout: default
Lastmod: 2025-11-13T19:33:23.559743+00:00
date: 2025-11-13T19:33:23.559567+00:00
title: "流氓软件惹不起的人：火绒揭秘，访问过‘红衣教主’周鸿祎微博的用户，不会被投放恶意软件"
author: "青小蛙"
tags: [推广,用户,虚拟机,检测,劫持]
---

原创 青小蛙 [小众软件](javascript:void(0);)

> 字数 1017，阅读大约需 6 分钟
> 
> 原标题：被流氓软件抛弃的7种用户！火绒曝光鲁大师流量劫持黑幕
> 
> 但青小蛙觉得，现在这个更好，红衣教主威武！

昨天，火绒安全发布了一篇名为《“捉迷藏”式收割：撕开鲁大师为首系列企业流量劫持黑幕！》的技术分析文章

原文链接：https://www.huorong.cn/document/tech/vir\_report/1858

![img](https://images.weserv.nl/?url=https%3A//mmbiz.qpic.cn/sz_mmbiz_png/4icbjwFqP3MdsmibA0tgiar5JB96TXzf5DfBbAOYZXQT9tBL1WQtVblkr5nnDnqibnSH47SwfEkvoSZpPiboAj1IH2g/640%3Fwx_fmt%3Dpng%26from%3Dappmsg)

文章非常非常有趣。是的，就是有趣。

火绒安全通过技术分析，展示了多家软件厂商，通过“捉迷藏”手法进行大规模流量劫持和隐蔽推广的方法，我们就直接进入主题吧。

![](https://images.weserv.nl/?url=https%3A//mmbiz.qpic.cn/sz_mmbiz_png/4icbjwFqP3MdsmibA0tgiar5JB96TXzf5DfNbwsiayvloDnF8icAXbibmkbUEmEPPFR5yXsLgfAGpv11iaxOmhbRHIic4Q/640%3Fwx_fmt%3Dpng%26from%3Dappmsg)

这些企业都做了什么？
----------

*   • **大规模劫持用户流量**：通过自家产品（如鲁大师等）植入推广模块，暗中控制用户设备，对用户进行广告弹窗、网页游戏推广等获利行为。
    
*   • **静默安装软件**：未经用户同意，自动下载安装各种第三方软件、浏览器插件及推广工具，从中赚取安装分成和推广佣金。
    
*   • **篡改电商链接**：如篡改京东购买链接，植入返利代码，将用户正常购物流量转化为企业收益。
    
*   • **锁定浏览器主页和搜索引擎**：频繁将用户浏览器主页、默认搜索引擎修改为指定推广页面，强制增加流量。
    
*   • **精准投放广告**：根据用户地域、设备信息、软件安装情况等，动态调整推广内容和投放对象，以提升转化效果。
    
*   • **技术逃避分析和查杀**：利用云控、数据加密、代码混淆、环境检测（如检测是否为技术人员、虚拟机、安装杀毒软件等），逃避安全厂商和用户的监控。
    
*   • **组件动态下载与隐藏**：推广组件并非随主程序一同安装，而是后续远程下载植入，且具备自我隐藏、冷却期与概率控制，避免被轻易发现。
    

![](https://images.weserv.nl/?url=https%3A//mmbiz.qpic.cn/sz_mmbiz_png/4icbjwFqP3MdsmibA0tgiar5JB96TXzf5DfEsUx4bbdg9HPiclIMu3UQqkJGRuMA1kLQtA64e6tIWoaxghkcHoXibKA/640%3Fwx_fmt%3Dpng%26from%3Dappmsg)

如何捉迷藏
-----

这是最有趣的事情，这些流氓软件会挑选用户来进行推广，主要排除以下条件的用户：

### **北京地区用户**，不推广

检测到用户地理位置为北京时，系统自动回避推广行为，规避高监管与技术分析集中区域。

### **检查到专业软件**，不推广

发现设备安装了开发、调试、逆向分析等专业工具（如IDA、OD、Wireshark等），认定为技术人员或高风险环境，停止推广防止被分析、抓包和曝光。

### **检查到虚拟环境或假用户**，不推广

通过检测虚拟机特征（MAC、显卡、电池等）、任务栏图标数量异常、浏览历史缺乏主流网站或游戏等，判断为分析环境或伪造用户，停止推广。

### **检测到专业用户（杀软、虚拟机、技术人员等）**，不推广

检查出设备有杀毒软件（如火绒、360、卡巴斯基等）、淘客插件、虚拟机、运维工具，或具备专业人员操作习惯，均不进行推广，主动避开安全圈和行业人士。

### **检查到高价值或强防护用户**，不推广

读取用户软件会员充值信息（及充值记录）、注册表弹窗过滤设置等，精准识别高价值会员或强防护用户，对此类人群全部取消推广，减少投诉和负面风险。

![](https://images.weserv.nl/?url=https%3A//mmbiz.qpic.cn/sz_mmbiz_png/4icbjwFqP3MdsmibA0tgiar5JB96TXzf5DfrYbHJUMnkG5Xiclick6qQVIWBfWe2WQtpLH6IPumic1z5xyLctricxay7g/640%3Fwx_fmt%3Dpng%26from%3Dappmsg)

### **检查到维权/投诉/技术风险用户**，不推广

监测用户访问技术论坛（如吾爱破解、看雪）、投诉维权平台（如12315）、流氓软件曝光资讯、热点人物微博及相关负面关键词，一旦发现即停止推广，主动控制舆情和风险。

### **访问过周鸿祎的微博**，不推广

值得注意的是，在劫持浏览器的过程中，会对用户是否访问过周鸿祎的微博进行检测，若检测结果为已访问，则不会进行推广。

![](https://images.weserv.nl/?url=https%3A//mmbiz.qpic.cn/sz_mmbiz_png/4icbjwFqP3MdsmibA0tgiar5JB96TXzf5Dfehq1d6G9pFsrsjy7wLprIB7oIBtHEyJ8rmffxtIheG1GR9oerG5JTQ/640%3Fwx_fmt%3Dpng%26from%3Dappmsg)

  

怎么样？你有没有被抛弃？

