---
layout: default
Lastmod: 2025-10-24T22:27:55.792556+00:00
date: 2025-10-24T22:27:55.789935+00:00
title: "我国成功研制出新型芯片，特定任务中算力超越顶级 GPU 千倍，这一突破有何意义？未来应用前景如何？"
author: ""
tags: [芯片,矩阵,GPU,计算,模拟计算]
---


    
### 知乎用户 huyoust​​ 发表
    
看了下，这个问题下面好像都没有真正懂[模拟计算芯片](https://zhida.zhihu.com/search?content_id=753204334&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97%E8%8A%AF%E7%89%87&zhida_source=entity)（不是说的射频，模拟运放那种模拟芯片，后面都是）的人来科普一下。针对这篇论文，要么想当然夸大，要么冷嘲热讽，都是凑热点的。模拟芯片和忆阻器研究还是冷门。搜了下知乎，两年前有另外一个问题，清华的，回答还多点，感兴趣的可以看看。全球首颗，突破性进展，两年过去，不知道现在如何了。有人说，人家都流片了，应用指日可待，怎么说呢，很多时候，可能就是为了这碟醋包的这顿饺子。

[我国研制出全球首颗支持片上学习忆阻器存算一体芯片，具有哪些积极意义？](https://www.zhihu.com/question/625451082?share_code=YBC2AAaOUFnt&utm_psn=1964811011841300036)

* * *

以前对[脉冲神经网络](https://zhida.zhihu.com/search?content_id=753204334&content_type=Answer&match_order=1&q=%E8%84%89%E5%86%B2%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C&zhida_source=entity)（SNN）感兴趣，也做过一些脑机接口相关研究，因此关注过模拟芯片。电路原理中有模电与数电之分，实际上芯片也有数字芯片与模拟芯片。模拟芯片算不上什么新鲜东西，只不过既然历史选择了数字芯片与冯诺依曼架构，肯定是在每一个当前阶段，数字芯片在各方面都更好，未来就不好说了。

北大这篇论文中使用的技术应该是属于忆阻器的路线，用的是金属氧化物忆阻器路线。忆阻器路线能效高、面积小、计算与存储融合，但是精度低、噪声大、难以训练、器件一致性差。看介绍，北大这个芯片的主要贡献应该是针对大规模的矩阵求逆这一操作，通过硬件架构设计提高了模拟计算的精度，感兴趣的直接看论文就行，是 Open access 的。至于计算速度的比较，特定任务中算力超越顶级 GPU 千倍，这种针对特殊任务进行特殊定制的结果比较其实没太大意义，属于是写论文的常规操作。

* * *

忆阻器阵列芯片
-------

忆阻器阵列（Memristor Array）是模拟计算芯片中非常重要的一条技术路线，它以存算一体（in-memory computing）为核心思想，通过忆阻器的可变电导实现矩阵乘法等核心计算。核心思想是**用电导表示神经网络权重，用电流叠加实现矩阵乘法**，直接在存储阵列中进行乘加运算，极大减少数据搬移带来的能耗。

技术流派主要分为：**氧化物忆阻器（OxRAM）**：工艺兼容好，但一致性问题严重；**相变忆阻器（PCM）**：成熟度高，但功耗和寿命受限；**有机 / 硫化物忆阻器**：新材料路线，探索性强但稳定性差。其**优势**在于能效高、面积小、计算与存储融合； **劣势**在于精度低、噪声大、难以训练、器件一致性差。因此，目前忆阻器阵列主要用于**类脑计算加速器的推理阶段**，而非高精度的训练或通用计算。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-5467ab8786024b7df86923377dc7ee0e_r.jpg%3Fsource%3D1def8aca)

HP 实验室在 2008 年正式提出了忆阻器（memristor）的物理实现，被认为是该领域的开创者。它使用 **TiO₂（氧化钛）薄膜**，通过电场驱动氧空位的迁移改变电导，实现可重写的存储和模拟权重。HP 的核心思想是利用忆阻器阵列直接执行矩阵运算，将乘法映射为电导、将加法通过电流叠加完成。这为后来的 “模拟神经网络加速芯片” 奠定了基础。不过，HP 的路线在规模化和稳定性上遇到瓶颈，器件一致性差、写入噪声大、老化问题严重，因此未能形成商业化产品。

IBM 在忆阻计算方向选择了基于 **GST（Ge₂Sb₂Te₅）相变材料** 的路线。其原理是通过电流脉冲加热材料，使其在晶态（低电阻）与非晶态（高电阻）之间可逆转变，从而表示不同的权重。IBM 的优势在于器件成熟度高（PCM 已广泛用于存储领域），并且它通过模拟多级电导实现高精度模拟计算。[IBM Zurich](https://link.zhihu.com/?target=https%3A//research.ibm.com/projects/neuromorphic-devices-and-systems) 实验室已经利用 PCM 阵列成功演示了神经网络推理任务（如 MNIST 分类），并在 _Nature_ 上发表了多篇论文。缺点是相变材料的写入功耗较高、寿命有限（约 10⁶ 次写入），因此更适合低频更新的推理任务而非频繁训练。

![](https://images.weserv.nl/?url=https%3A//pica.zhimg.com/v2-da254e8e703c2cecdc11e9fba808417f_r.jpg%3Fsource%3D1def8aca)

美国多所高校探索的另一方向是 **金属氧化物忆阻器阵列（如 HfO₂、Ta₂O₅ 等）**，特点是制造工艺可兼容 CMOS。这些器件依靠金属离子的迁移形成和断裂导电细丝（filament），从而改变电阻。  
代表性成果包括：Stanford 的 **NeuroSim 模拟器**，用于建模大规模忆阻阵列性能；UC Berkeley 的 **RRAM crossbar 加速器**，在硬件上实现矩阵乘法能效比数字芯片高数十倍。不足之处是随机性强、非线性严重，需要复杂的补偿与校准机制。

清华大学微电子所与中科院微电子所近年来在忆阻器方向成果显著。例如：清华的 **Tianjic 芯片**（虽是混合架构，但其中部分计算模块基于忆阻原理）；中科院研发的 **氧化铪忆阻器阵列** 已实现 128×128 规模矩阵乘法。这些研究集中在**阵列规模化、误差校正和算法协同优化**方向，逐步缩小与国外差距。

[神经形态计算芯片](https://zhida.zhihu.com/search?content_id=753204334&content_type=Answer&match_order=1&q=%E7%A5%9E%E7%BB%8F%E5%BD%A2%E6%80%81%E8%AE%A1%E7%AE%97%E8%8A%AF%E7%89%87&zhida_source=entity)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

这是一种事件驱动类型的模拟芯片，针对 SNN 设计，完全模仿人类的神经元的行为，用类脑突触电路（电流积分 + 放电）实现神经动态。主要代表为 **IBM TrueNorth** 与 **Intel Loihi**，感兴趣的可以搜一下相关的报道，当年刚出来的时候也是非常火。个人感觉，SNN 从理念上看，应该是未来的智能形态与载体，可惜的是，算法上好像一直突破不了。

### IBM **TrueNorth**

IBM 从 2008 年起启动 **SyNAPSE 项目**，目标是打造一种模仿人脑神经结构的芯片，不再依赖传统的冯 · 诺依曼体系（即 “存储 - 计算分离” 的数字逻辑架构）。TrueNorth 是这一计划的结晶，于 **2014 年** 正式发表。TrueNorth 不以 “CPU + 存储” 方式组织，而是仿照大脑的 **“神经元 + 突触网络”**。整块芯片包含 **4096 个神经核（neurosynaptic core）**，每个核心内部又包含 256 个神经元单元和约 256×256 个 “突触连接”。总计超过 **100 万个神经元** 和 **2.56 亿个突触**。

这些神经元不是通过时钟触发的逻辑电路，而是事件驱动的。当输入脉冲到达时，神经元的内部电荷积分到某个阈值后产生脉冲输出，这就是脉冲神经网络（Spiking Neural Network, SNN）的基本行为。整个 TrueNorth 芯片在执行复杂模式识别任务时功耗仅 **70 毫瓦左右**，而传统 GPU 同类任务往往需要数十瓦。TrueNorth 证明了 “非冯 · 诺依曼架构” 在硬件层面是可行的，也第一次实现了一个**超大规模、事件驱动的类脑网络芯片**。但它的权重是固定的，不能在线学习，只能离线训练后导入参数，因此更像**类脑推理芯片**。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-992ff401c13bb718e58ccbc3222e0267_r.jpg%3Fsource%3D1def8aca)

[TrueNorth: Design and Tool Flow of a 65 mW 1 Million Neuron Programmable Neurosynaptic Chip](https://link.zhihu.com/?target=https%3A//redwood.berkeley.edu/wp-content/uploads/2021/08/Akopyan2015.pdf)

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-c9022d920c489a53e2f10716102c9948_r.jpg%3Fsource%3D1def8aca)

### Intel **Loihi**

在 TrueNorth 之后，Intel 研究团队进一步推进神经形态架构，于 2017 年推出第一代 Loihi。它的核心目标是：不仅能模拟神经元放电，还能在硬件层面支持突触可塑性（learning on chip），让芯片自己学习。Loihi 同样采用神经元网络架构，但更注重神经元之间的可编程性。整块芯片包含 128 个神经核，每个核心内有若干个神经元单元与突触交互矩阵，总计约 13 万个神经元。和 TrueNorth 不同，Loihi 的神经元模型是完全可配置的：可以设置膜电位衰减常数、发放阈值、重置电平等参数，甚至支持不同的神经动力学模型。

Loihi 内置了一套专用的学习引擎，能够支持多种局部学习规则（包括 STDP：Spike-Timing-Dependent Plasticity，即基于脉冲时间差的权值调节）。这意味着它不依赖外部 CPU 训练，而能像生物神经元一样根据输入脉冲序列实时自适应学习。

Loihi 并非完全模拟电路，而是数字电路实现的事件驱动系统。神经元之间通过 “脉冲包”（spike packet）通信，芯片内部通过异步网络路由事件（类似神经元间突触信号的非同步传递）。这种架构天然具备高并行性与极低功耗，在识别、控制、强化学习等任务上能量效率远高于 GPU。

Intel 之后又发布了 Loihi 2（2021 年），支持更复杂的学习机制、更高密度的神经元，以及与传统数字系统更友好的接口。Loihi 还被应用在多种研究场景中，如机器人实时控制、边缘 AI 推理、稀疏编码与事件相机信号处理。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-20efc0b1605feac2b6fa9de818a7d49e_r.jpg%3Fsource%3D1def8aca)

[Neuromorphic Computing and Engineering, Next Wave of AI Capabilities](https://link.zhihu.com/?target=https%3A//www.intel.com/content/www/us/en/research/neuromorphic-computing.html)

**[光学计算芯片](https://zhida.zhihu.com/search?content_id=753204334&content_type=Answer&match_order=1&q=%E5%85%89%E5%AD%A6%E8%AE%A1%E7%AE%97%E8%8A%AF%E7%89%87&zhida_source=entity)**
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

传统电子芯片（无论是 CPU、GPU 还是模拟阵列）都存在一个根本瓶颈，能耗和带宽。电子在导线上运动会产生焦耳热，而随着芯片尺寸缩小、频率提高，电互连功耗成了极限。光学计算的核心理念就是：既然光传播几乎无损、无寄生电容、速度接近极限，那为什么不让光直接去算？

MIT 的光学计算研究可以追溯到 2016 – 2018 年，核心人物包括 Marin Soljačić、Dirk Englund 等教授团队。他们提出并在实验上验证了 “光学干涉阵列实现神经网络矩阵乘法” 的可行性。关键元件是马赫 - 曾德干涉仪（Mach–Zehnder Interferometer，简称 MZI）。MZI 通过改变波导中的相移，就能控制输出光的相位与强度，这相当于一个“可调权重”。多个 MZI 以网格方式排列，就形成一个光学矩阵乘法单元。输入信号以光的形式进入波导阵列，经过干涉、叠加、分束等过程，输出即是矩阵乘法结果的光强分布。

这项研究证明了光学网络可以在一瞬间完成大规模并行矩阵计算，速度远超电子电路，且几乎不产生热量。这一思想后来直接孵化出了两家创业公司：Lightmatter 和 Lightelligence。

Lightmatter 成立于 2017 年，Lightmatter 的核心产品叫做 Envise，可以理解为一种光电混合 AI 加速芯片。其中，矩阵乘法部分在光学干涉阵列中完成，而非线性激活、控制和存储则由传统电子电路承担。这是一种光学算子 + 电子控制的混合架构。

![](https://images.weserv.nl/?url=https%3A//pica.zhimg.com/v2-98bb96cf52cd5eb9fdaf972d8c97bdad_r.jpg%3Fsource%3D1def8aca)

Lightelligence 同样诞生于 MIT，Lightelligence 的研究更偏向 “用光实现完整逻辑与推理”。他们的目标不只是做光学乘法器，而是构建一个通用的光学计算平台。Lightelligence 在 2019 年展示了首款原型芯片 Comet，实现了在光域内的矩阵乘法与神经网络推理。后来又发布了更成熟的芯片 HERMES，这是一种全光神经网络处理器，可以直接在光域完成推理任务。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-8f61234aec4a49687fb300dab1c3b62a_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 小胡小胡 发表
    
惊呆了，[天顶星科技](https://zhida.zhihu.com/search?content_id=753177838&content_type=Answer&match_order=1&q=%E5%A4%A9%E9%A1%B6%E6%98%9F%E7%A7%91%E6%8A%80&zhida_source=entity)。

它解决了模拟计算一个世纪以来的精度难题，让一种速度极快、能耗极低的计算方式变得实用。

* * *

我们现在用的电脑和 GPU 都属于[数字计算](https://zhida.zhihu.com/search?content_id=753177838&content_type=Answer&match_order=1&q=%E6%95%B0%E5%AD%97%E8%AE%A1%E7%AE%97&zhida_source=entity)，用 0 和 1 来运算，非常精确，但处理某些复杂的数学问题时，又慢又费电。还有一种叫模拟计算的方法，它直接利用电路的物理特性来得出结果，速度飞快，能耗也低，但一直以来的致命缺点就是算不准。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-162210b41e2cc8c0b64c506e63342635_r.jpg%3Fsource%3D1def8aca)

**北大团队这次的成果，就是让模拟计算也能算得和数字计算一样准。**

* * *

他们的方法很巧妙，是一个在模拟电路内部完成的[迭代校正过程](https://zhida.zhihu.com/search?content_id=753177838&content_type=Answer&match_order=1&q=%E8%BF%AD%E4%BB%A3%E6%A0%A1%E6%AD%A3%E8%BF%87%E7%A8%8B&zhida_source=entity)。一个低精度模拟电路会快速算出一个大概的结果。接着另一个高精度模拟电路会精确算出这个大概结果和正确答案之间的误差是多少。这个误差会被用来指导第一步的电路进行修正，算出一个更准的结果。

这个过程重复几次，答案就变得非常精确了：实验里解一个 16x16 的矩阵，10 次迭代后，**相对误差低到了千万分之一，达到了 32 位浮点数字计算的精度水平**。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-967d7b5089d576fdd95abea0140bdc11_r.jpg%3Fsource%3D1def8aca)

这个成果带来的性能提升是巨大的。在处理特定问题时，评估结果显示：

**计算吞吐量，是顶级 GPU 的 1000 倍以上。**

**能源效率，是顶级 GPU 的 100 倍以上。**

这不是一点点的改进，如果再通用一些，堪比天顶星科技了...

* * *

论文里也展示了它在 [6G 通信](https://zhida.zhihu.com/search?content_id=753177838&content_type=Answer&match_order=1&q=6G%E9%80%9A%E4%BF%A1&zhida_source=entity)中的[大规模 MIMO 信号检测](https://zhida.zhihu.com/search?content_id=753177838&content_type=Answer&match_order=1&q=%E5%A4%A7%E8%A7%84%E6%A8%A1MIMO%E4%BF%A1%E5%8F%B7%E6%A3%80%E6%B5%8B&zhida_source=entity)应用。这个任务是基站处理信号的一大算力瓶颈。他们用这个芯片，只迭代了 3 次，性能就完全赶上了高精度数字处理器的水平，证明了这项技术的实用价值。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-962b6ada46c531c4a41c9cea4f0ef57f_r.jpg%3Fsource%3D1def8aca)

* * *

不过要注意，这不意味着我们家里的电脑马上要换代了。

**这种芯片非常擅长特定的高密度数学运算，但在处理上网、打游戏这些通用任务上，还是数字计算机的天下。**

这项工作为后摩尔时代提供了一个全新的计算思路：它证明了在芯片工艺快到物理极限时，通过改变计算的根本原理，我们依然能实现算力的巨大飞跃。

* * *

资料来源：

论文原文：[https://doi.org/10.1038/s41928-025-01477-0](https://link.zhihu.com/?target=https%3A//doi.org/10.1038/s41928-025-01477-0)

补充材料：[https://static-content.springer.com/esm/art%3A10.1038%2Fs41928-025-01477-0/MediaObjects/41928\_2025\_1477\_MOESM1\_ESM.pdf](https://link.zhihu.com/?target=https%3A//static-content.springer.com/esm/art%253A10.1038%252Fs41928-025-01477-0/MediaObjects/41928_2025_1477_MOESM1_ESM.pdf)
    
    
    
    
### 知乎用户  歪睿老哥​​​ 发表
    
抱歉，我得泼点冷水。

先给这个 “千倍算力” 的论文热度降降温。

作为常年跟芯片设计和量产打交道的老哥，

我看到这种 “顶刊发论文，算力超 GPU 千倍” 的新闻，第一反应不是激动，而是习惯性地找出里面的工程坑点。

从 “实验室成果” 到“颠覆产业”？我觉得还差的远。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-2630a6dbaa63215afbe505cc380e803b_r.jpg%3Fsource%3D1def8aca)

首先要理解 “千倍算力” 这个数字是怎么测出来的。

研究团队称，在求解大规模 MIMO 信号检测等特定关键科学问题时，计算吞吐量和能效比能达到顶级数字处理器（GPU）的百倍到千倍 。

这里的 “特定任务” 是“大规模矩阵求解”（比如 MIMO 信号检测和矩阵求逆）。

这是典型的、矩阵密集型的线性代数运算，是 AIMC（[模拟内存计算](https://zhida.zhihu.com/search?content_id=753212258&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E5%86%85%E5%AD%98%E8%AE%A1%E7%AE%97&zhida_source=entity)）架构最擅长的领域。

为什么 GPU 被吊打？

因为在处理大规模矩阵运算时，GPU 核心需要不断地将数据（模型权重、KV 缓存等）在 DRAM（内存）和 SRAM（缓存）之间来回搬运。

这个过程就是著名的 “[冯 · 诺依曼瓶颈](https://zhida.zhihu.com/search?content_id=753212258&content_type=Answer&match_order=1&q=%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC%E7%93%B6%E9%A2%88&zhida_source=entity)” 或 “内存墙”。数据传输消耗了巨大的时间和能源。

北大这个芯片是基于[阻变存储器](https://zhida.zhihu.com/search?content_id=753212258&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)（RRAM）的模拟内存计算架构。

它直接把运算（欧姆定律的乘法和基尔霍夫定律的加法）嵌入到了存储单元里面。

电流电压电导电流 (I)\= 电压 (V)× 电导 (G)\\text{电流} (I) = \\text{电压} (V) \\times \\text{电导} (G)

其中，电导 GG 是电阻 RR 的倒数 (G\=1/RG = 1/R)。

模拟计算利用了一个被称为**[交叉阵列](https://zhida.zhihu.com/search?content_id=753212258&content_type=Answer&match_order=1&q=%E4%BA%A4%E5%8F%89%E9%98%B5%E5%88%97&zhida_source=entity)（Crossbar Array）**的结构来实现运算 。

存储数据（权重 A）：

交叉阵列中的每一个存储单元（例如一个 RRAM 单元）的电导值 (GG) 被精确调控，用来代表神经网络中的一个权重参数（即矩阵 A\\mathbf{A} 中的元素 AijA\_{ij}）

输入数据（向量 x）： 当需要进行计算时，输入向量 x\\mathbf{x} 中的每一个元素 xjx\_j 被编码成一个相应的电压信号 (VjV\_j)，加到阵列的某一列上 。

乘法实现： 根据欧姆定律，输入电压 VjV\_j 流经存储单元 GijG\_{ij} 时，会在该单元上产生一个电流信号 (IijI\_{ij})：

Iij\=Vj×GijI\_{ij} = V\_j \\times G\_{ij}

这个电流 IijI\_{ij} 就物理地完成了矩阵乘法中的乘法操作 (Aij×xjA\_{ij} \\times x\_j) 。

通过模拟量实现的乘法，这就是基本上所有模拟运算的实际情况。

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-8a1b3a234132dc236d702acaad615697_r.jpg%3Fsource%3D1def8aca)

最终计算的结果可以通过 ADC 进行采样变成数字信号。

运算和存储融为一体，直接避开了数据搬运的能耗和延迟。

模拟芯片打赢了一个被 “内存墙” 卡死的数字芯片，是架构上的胜利，但这个胜利是有前提的。

你的通用性在哪里？

能跑复杂的控制流吗？

能高效地处理非线性激活函数吗？

如果不能，它就只是一个昂贵的、高能效的协处理器，

离 “GPU 杀手” 还差得远。

所以，“千倍算力” 是建立在只比拼线性代数运算密集度的基础上的。

**模拟计算之所以被数字计算淘汰，核心原因就在于精度低和不稳定。**

这个新型芯片，他们实现了 24 位定点精度，这比传统模拟计算提高了五个数量级。

这才是这个设计从实验室走向工厂要面对的最大的 “地雷”。

RRAM 器件的噩梦： RRAM（阻变存储器）是 AIMC 的基石，它通过存储单元的电导值来表示权重 。

想要实现 24 位精度，意味着对电导值的调节和保持必须达到极高的精细度。

这就难以避免模拟器件的先天缺陷：

在实际的芯片制造过程中，

RRAM 单元会面临器件之间的差异性（Variation）、噪声（Noise），以及最重要的电导漂移（Drift）。

温度一高，电导值就开始跑，精度瞬间崩塌。

24 位精度对工艺提出了很强的要求。

想象一下控制一个物理变量 2 的 24 次方分之一的误差。

一个晶圆上只要有一小部分单元出现漂移或差异，整个矩阵的计算结果就会失效。

想把这种对环境和器件要求极高的学术成果变成可以大规模出货、成本可控、长期稳定的商业产品。

良率简直是噩梦。

看看国际上的头部玩家，比如 IBM 和 TetraMem。

他们搞 RRAM 或 PCM 的 AIMC，现在商业化主要集中在低精度的 AI 推理加速，比如 8 位或 4 位，因为这个精度容忍度高，工程上更容易落地。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/80/v2-c380743dc51d76869a2f64eb3d11d6e6_1440w.webp%3Fsource%3D1def8aca)

北大直接跳到 24 位，是科学壮举，但商业上是高风险操作。

学术论文证明了可能性，但工程学需要证明稳定性、可重复性和成本效益。

假设我们奇迹般地解决了 24 位精度的量产难题，下一步呢？

芯片卖得好不好，不是看硬件多硬核，而是看软件生态有多好。。

这款模拟芯片需要一套全新的编译工具、算法库和编程范式。

谁来开发？

谁来维护？

又有多少人愿意为了一个在特定任务中才能实现 “千倍” 算力的芯片，去重写他们基于 Python/CUDA/C++ 的整个 AI 训练和部署流程？

尽管团队提到它能加速二阶优化算法和赋能 6G 通信，但这都需要算法和应用层进行深度定制和适配。

通用 AI 开发者不会去碰它。

未来的应用前景在哪里？

在我看来，短期内它最大的价值将是：

**定制化专用加速器： 在特殊专用领域或大型通信公司内部，为 6G 基站和大规模雷达信号处理等极度专业、对能效要求苛刻的场景，提供高性能的硬件卡 。**

它的成功将极大地推动全球 AIMC 领域对高精度、高稳定性的追求。

但它本身，大概率会以高价值、低产量、定制化产品的身份存在很长一段时间。

不要期待它很快能进数据中心去挑战 GPU，那不是一个维度的竞争。

这篇论文的科学价值是毋庸置疑的，毕竟是[《自然 · 电子学》](https://zhida.zhihu.com/search?content_id=753212258&content_type=Answer&match_order=1&q=%E3%80%8A%E8%87%AA%E7%84%B6%C2%B7%E7%94%B5%E5%AD%90%E5%AD%A6%E3%80%8B&zhida_source=entity)上的文章，首次把模拟计算的精度拉到了 24 位定点精度，也是不小的挑战。

但是，伟大的科研突破。但从实验室的《自然》封面，到货架上的商业化产品，中间隔着无数个良率、漂移、成本和生态的 “工程黑洞”。

先做出一个能稳定运行一年的商业化 Demo 再说吧。
    
    
    
    
### 知乎用户 太极​ 发表
    
这个芯片本质上是利用[欧姆定律](https://zhida.zhihu.com/search?content_id=753255555&content_type=Answer&match_order=1&q=%E6%AC%A7%E5%A7%86%E5%AE%9A%E5%BE%8B&zhida_source=entity)，用大自然的力量取代复杂的数字运算。在计算矩阵的时候，不再一点点抠数字，而是用电流汇合充当加法，电流乘电阻（电压）充当乘法，最后只观察输出即可得到矩阵运算的结果。

举个类似的例子，同样是计算一个酒瓶子的容积，现在的 GPU 会用算法一点点模拟不规则体积，暴力运算得到结果，而[忆阻器芯片](https://zhida.zhihu.com/search?content_id=753255555&content_type=Answer&match_order=1&q=%E5%BF%86%E9%98%BB%E5%99%A8%E8%8A%AF%E7%89%87&zhida_source=entity)是直接把瓶子灌满水，然后倒进量筒里观察体积。

这样做的好处是效率极高，电流传导速度可以认为是光速，模拟运算几乎没有延迟，大部分时间开销都出在 IO 和数字运算上，因此在计算复杂矩阵时可以指数级提高效率。

当然，缺点就是模拟运算带来的精度问题和误差积累。[数字电路](https://zhida.zhihu.com/search?content_id=753255555&content_type=Answer&match_order=1&q=%E6%95%B0%E5%AD%97%E7%94%B5%E8%B7%AF&zhida_source=entity)之所以兴盛，最重要的原因就是容差率极高，1 就是 1，0 就是 0，只要传输过程中没有产生 50％的误差就可以还原。而[模拟电路](https://zhida.zhihu.com/search?content_id=753255555&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E7%94%B5%E8%B7%AF&zhida_source=entity)借用了自然之力，就要考虑如何准确地探测结果（电流、电压等），还要尽量消除上一级电路引入的误差。因此在有限的精度下，模拟芯片很难做出很大的规模。

忆阻器芯片的概念其实很早就有了，相关的理论也已不少。这次科研团队的突破，某种程度上其实意味着我国在精确测量和电子元件精密制造方面取得了重大突破。
    
    
    
    
### 知乎用户 安小强​​ 发表
    
Update: 2025.10.24 12:33

另一些看到的误区：

1\. 是不是马上就能用到大模型的推理、训练上？  
当下真不能啊，只能说未来有这个希望。  
这个芯片最适合的矩阵运算是[矩阵求逆](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=%E7%9F%A9%E9%98%B5%E6%B1%82%E9%80%86&zhida_source=entity)，当前的训练优化器（比如 Adam 等）是一阶，用不上；二阶的优化器用得上，但主流的训练不用二阶复杂度太高。还有训练需要频繁更新权重，RRAM 的写入速度和耐久性是物理硬伤。  
那推理行不行呢？矩阵乘法确实有优化，所以说有希望。但配套的软件 [cuda](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=cuda&zhida_source=entity) 啥的都没有，从零开发工程量巨大。同时这个芯片也不支持 [layernorm](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=layernorm&zhida_source=entity)、softmax、[relu](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=relu&zhida_source=entity) 等非线性操作，所以要么和 CPU、GPU 一起混着用，要么还得改进。

2\. 且听龙吟？吟吟吟嘤嘤嘤赢麻了？  
这还是科研圈的事，这确实是一个优秀的科研成果，但不代表马上就能落地生产赶英超美了。  
每一个芯片研究想要落地，良率、一致性、可靠性都要经得起考验，尤其是落地 ai 领域，编译器、驱动、算子库没个三五年都下不来，怎么跟 CPU/GPU 协同工作？数据怎么搬运？真涉及那些巨头利益 Nvidia、高通这些巨头会坐视不管？  
这个研究能先在 6G 通信这种专用领域 3~5 年落地就很棒了，这是论文验证最充分的场景。后面再谈 AI 通用加速。一步一步来，别着急。

* * *

Update：2025.10.23 19:43

因为身在大模型行业，十分关注芯片进展。很关注这个问题，把每一位答主（大家都很优秀，看得出来知识储备很棒）的回答都看了一遍，部分答案有一些误区：

1\. "特定任务中算力超越顶级 GPU 千倍，这种针对特殊任务进行特殊定制的结果比较其实没太大意义，属于是写论文的常规操作。"  
这篇的特定任务就是矩阵方程求解，这是线性代数的基础运算，信号处理、科学计算、二阶优化等各个领域都用得到，尤其是大模型推理 / 训练。  
GPU 和 TPU 本身也是定制芯片，按这个逻辑所有加速器都没意义了...... 论文对比条件也比较公平：相同 fp32 精度，对比 h100 和专门的 [ASIC](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=ASIC&zhida_source=entity)，千倍优势来自 O(N³) vs O(1) 的复杂度差异。

2\. "24 位精度对工艺要求极高，需要控制物理变量 2 的 24 次方分之一的误差"  
这是最大的误区：论文器件只有 3-bit 精度，通过迭代精炼算法达到 24-bit 系统精度（"m = 3...only 3 bits need to be written per device"）。  
这恰恰是这个研究的核心创新：低精度器件加算法补偿。收敛条件有数学保证（补充材料 Note 2），不需要控制什么 2 的 24 次方分之一误差。

3\. 关于商业化  
工程化问题确实存在，但芯片已在 40nm 商业代工厂制造并测试，不是纸面设计。短期不会替代 GPU，但在 6G 基站、科学计算等特定场景作为协处理器有实际价值。

* * *

以下是原回答：

是未来 AI 算力的一种新可能性。

这个芯片解决什么问题？
-----------

LLM 的核心就是海量的矩阵乘加运算。无论是训练还是推理，绝大部分算力都耗在这里。

这项研究用模拟计算，直接利用物理定律完成矩阵运算，理论上速度极快，功耗极低。**在以前它的问题一直是精度太差，误差会累积，没法用在需要高精度的大模型上**。

北大团队用一个全模拟的迭代精炼框架解决了这个问题。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-8001068340fab1f030e8898b5ce90ed5_r.jpg%3Fsource%3D1def8aca)

* * *

具体怎么做的？
-------

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-111773ac2c1ae0c6c8dc92b2e97ac521_r.jpg%3Fsource%3D1def8aca)

上图是整个方案的核心，它包含两个[模拟电路](https://zhida.zhihu.com/search?content_id=753186046&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E7%94%B5%E8%B7%AF&zhida_source=entity)部分：

1.  低精度求逆：快速给出一个粗略的解。
2.  高精度乘法：精确计算出这个粗略解和真实解之间的误差。

这个误差作为新的输入，再送回第一步的电路去修正，循环往复。

实验证明：只需几次迭代，就能把解的精度从约 2-3 bit 提升到 24 bit 定点数的水平，这对于 AI 应用已经足够。

* * *

这种技术擅长什么，又不擅长什么？
----------------

**它的核心优势是处理大规模、高密度的矩阵运算，尤其适合作为 AI 推理的专用加速器。**

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-6e4da37e9891dc028f95380c175739a4_r.jpg%3Fsource%3D1def8aca)

对于大模型推理，这颗芯片的优势是压倒性的。

当前服务一个千亿模型成本和延迟都很高，但如果用这种模拟芯片加速，可以将推理成本和功耗降低一到两个数量级。

* * *

它那么厉害，能否替代 CPU 和 GPU？
---------------------

局限性很明显：擅长矩阵运算，但无法进行通用计算、不能处理复杂的逻辑控制流（不能取代 CPU）。

最重要的限制还是生态。目前没有 CUDA for analog computing。要让它真正落地，需要从头构建一整套全新的软件栈、编译器和编程模型，这是不小的工程挑战。

不过，**它距离真实的应用也没有那么远，团队专门测试了一个非常贴近实际应用的 6G 通信信号检测任务**，证明了它的高性能和高精度：

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-d69e92ba4f0fcc08882e01d5fbf0368f_r.jpg%3Fsource%3D1def8aca)

花已盛开，期待结果。
    
    
    
    
### 知乎用户 稊方​ 发表
    
这种[专用芯片](https://zhida.zhihu.com/search?content_id=753181594&content_type=Answer&match_order=1&q=%E4%B8%93%E7%94%A8%E8%8A%AF%E7%89%87&zhida_source=entity)不是常见的通用芯片，举个简单的例子，类似于交换机上的芯片，那玩意拿来当 CPU 用那个性能就是妥妥的垃圾，但在交换机上凭借指令优化或[专用指令集](https://zhida.zhihu.com/search?content_id=753181594&content_type=Answer&match_order=1&q=%E4%B8%93%E7%94%A8%E6%8C%87%E4%BB%A4%E9%9B%86&zhida_source=entity)就做到了既比常见的高性能 CPU 好用，还能耗低。

当然坏处也很明显，就是只能在网络设备之类专用场景下用。
    
    
    
    
### 知乎用户 慕邴​ 发表
    
举个简单的例子：计算 1999\*1999

普通芯片就像书呆子，列算式一板一眼的算：1999\*1999=3996001。

新芯片：1999\*_1999≈2000\*2000=4000000_

然后迭代：2000\*_2000 不如 (2000-1)\*2000 更接近正确答案，于是 2000\*2000-2000=3998000_

_然后再迭代：19992000 不如 1999\*(2000-1) 更接近正确答案，于是 1999\*2000-1999=3996001_

_1999\*1999 口算很难算吧，但第二个方法 2000 乘 2000 再减 2000 再减 1999 口算也能算出来，是不是更简单快捷。_
    
    
    
    
### 知乎用户 Star 发表
    
速读了一遍，大概是使用模拟计算方法在 [16\*16 矩阵逆](https://zhida.zhihu.com/search?content_id=753190701&content_type=Answer&match_order=1&q=16%2A16%E7%9F%A9%E9%98%B5%E9%80%86&zhida_source=entity)达到 24bit 的精度。主要贡献应该是这种模拟计算方法，而不是某种完全新的硬件，问题似乎有些误导。
    
    
    
    
### 知乎用户 pumpkineater 发表
    
作者也在做基于[阻变存储器](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)（RRAM）的[模拟存内计算](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E5%AD%98%E5%86%85%E8%AE%A1%E7%AE%97&zhida_source=entity)（A-CIM），导师上周让作者好好看看这篇文章，了解一下现在流行的 benchmark 和讲故事的技巧。当然，作者也是刚入行的小萌新，希望大家不吝批评指正。

这一突破有何意义？最直接的意义是提出了一种有潜力的[矩阵方程](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=%E7%9F%A9%E9%98%B5%E6%96%B9%E7%A8%8B&zhida_source=entity)的 A-CIM 加速方案，未来将吸引更多牛组关注，把指标卷上去（最重要的是容量、耐久度和均一性）。于作者而言，这篇文章展示了一种新颖、合理且有意义的 A-CIM 工作负载，可以施加于我们组做的新器件上。

未来应用前景如何？目前很难说未来的矩阵方程都会以这种方式求解，但是 RRAM 将走进消费级电子产品是一定的。

接下来是作者的私货时间：

大多数网友关注 “我国突破模拟计算世纪难题”、“算力超越顶级 GPU 千倍” 这些关键词，认为这又是一次“放卫星”，这是完全错误的。在 CIM 这个圈子里，所有人都会说自己超越[冯诺依曼架构](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=%E5%86%AF%E8%AF%BA%E4%BE%9D%E6%9B%BC%E6%9E%B6%E6%9E%84&zhida_source=entity)、突破[存储墙](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=%E5%AD%98%E5%82%A8%E5%A2%99&zhida_source=entity)、解决 xx 难题（通常在背景介绍里），然后相比之前工作算力提升多少倍（通常在最后的表格中）。前一句话是这个圈子里所有人的美好愿望，后一句话中不提升个百十倍都不好意思发文章。各位可以看电路领域各个顶会（[ISSCC](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=ISSCC&zhida_source=entity)、[VLSI](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=VLSI&zhida_source=entity)），不同作者（清华、北大、中科院、台湾清华、首尔大学、佐治亚理工）都是这么干的。何况这篇文章发表在 [Nature 子刊](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=Nature%E5%AD%90%E5%88%8A&zhida_source=entity)上，要给很多 “外行” 看，不方便跟同为 A-CIM 的工作比，只能找个大家都知道的 GPU 了。

为什么大家的数字都如此诱人？其一，大家都只针对一个特定的任务，比如这篇文章针对矩阵方程求解。任务越固定，指标越容易提升。GPU 相比 CPU 更针对大规模并行计算，所以更擅长图像渲染等任务。GPU 好歹也是一种比较特化的通用处理器，而这个加速器只针对一个任务，那么结构可以大大简化，器件、外围电路都为一个任务负责，自然指标好看。其二，所谓算力实际上主要指两个指标：TOPS/W（单位功耗单位时间能进行的操作数）和 TOPS/mm2（单位面积单位时间能进行的操作数），注意这个归一化的问题。英伟达的 GPU 晶圆面积至少在几十 mm 乘几十 mm，而本文中的存储阵列（其外围由 [FPGA](https://zhida.zhihu.com/search?content_id=753327059&content_type=Answer&match_order=1&q=FPGA&zhida_source=entity) 支持，不计入计算）容量为 1Mb（在 40nm 工艺下），面积不超过 0.1mm 乘 0.1mm。英伟达的 GPU 功耗至少在百瓦级别，而本文中的功耗应当不超过毫瓦量级。如果提升至同一面积水平和功耗水平会怎么样呢？这就留下想象的空间了。但实际上由于 RRAM 大规模制造的成本、寿命、均一性问题，对不起做不到。你说我吹牛皮，我说我在进行科学探究，要是能工业生产我怎么不直接开公司，并且本来这两个指标也是公认的。其三，A-CIM 框架确实有其可取之处，这么多聪明人花这么多钱也没在骗大家。

作者本人觉得这篇文章很有价值，在于它提供的思路。首先是利用运放负反馈的快速求逆，是非常巧妙的想法。其次是算法数据流上的创新，平衡高精度与低精度的快速收敛算法和将多位操作数拆分，克服了 A-CIM 的痛点。我相信未来这篇文章会被不少人引用，这些想法会进入不少工作中。这就是它的价值。

总而言之，纳税人的钱没有被浪费，北京大学的团队产出的是高质量的工作。现有的算力格局没有被颠覆，RRAM 作为一种新器件会逐步走进我们的生活，存内计算可能在一些低功耗的边缘端设备首先得到应用。最后祝国家繁荣昌盛。
    
    
    
    
### 知乎用户 毒鸡汤刀削面 发表
    
想起个笑话

面试官：你简历上写着说你[心算速度](https://zhida.zhihu.com/search?content_id=753196799&content_type=Answer&match_order=1&q=%E5%BF%83%E7%AE%97%E9%80%9F%E5%BA%A6&zhida_source=entity)很快，那我问问你，13 乘以 19 是多少？ ”

我脱口而出：45！

面试官：这也差太远了吧。 ”

我：你就说快不快吧！
    
    
    
    
### 知乎用户 Label Knight 发表
    
近 10 年以来，能超越同代 [GPU](https://zhida.zhihu.com/search?content_id=753241719&content_type=Answer&match_order=1&q=GPU&zhida_source=entity) 两个数量级的[芯片](https://zhida.zhihu.com/search?content_id=753241719&content_type=Answer&match_order=1&q=%E8%8A%AF%E7%89%87&zhida_source=entity)，没有一百种，也有 80 种了，但是没有一个能撼动 GPU 的地位，十年后也许可以，但是五年以内看不到希望。

大家都有光明的未来。
    
    
    
    
### 知乎用户 斯蒂芬 发表
    
作为不懂技术的人，我一看到特定，千倍这种描述语，逻辑告诉我，那就是没有任何前景和意义。

抬杠的兄弟，你可以现在开始练打飞机手速，过几年后也可以这样报道：[特定任务](https://zhida.zhihu.com/search?content_id=753281387&content_type=Answer&match_order=1&q=%E7%89%B9%E5%AE%9A%E4%BB%BB%E5%8A%A1&zhida_source=entity)中的手速第一人，超越国外先进水平千倍。
    
    
    
    
### 知乎用户 maomaobear 发表
    
以下内容基于发明人的 B 站讲座。

很有意义。

简单说，还原了计算的本质。

现在计算机是建立在[二进制](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E4%BA%8C%E8%BF%9B%E5%88%B6&zhida_source=entity)，[逻辑与或非](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E9%80%BB%E8%BE%91%E4%B8%8E%E6%88%96%E9%9D%9E&zhida_source=entity)基础上的。

这条路走到现在，进步越来越难，越来越贵。

2nm 就很贵了，未来 1nm 可能更贵。

现在优化软件，也有极限。

怎么办？

把原始二进制推倒

考虑一下，如果大家都退回到机械时代，甚至手工时代。

你用算盘计算 10+100

算盘推两个算盘珠，就可以了。

二进制要先把 10 转换成 101，100 转换成二进制数。再通过与或非的电路，最后输出。

为什么不直接搞一个[电子算盘](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E7%94%B5%E5%AD%90%E7%AE%97%E7%9B%98&zhida_source=entity)，数算盘珠呢？

模拟计算，就是把常用计算构建了一些电路，直接数算盘珠，抛弃了计算机原理。

这个发明，是针对 [AI 计算量](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=AI%E8%AE%A1%E7%AE%97%E9%87%8F&zhida_source=entity)大的计算，构建专门电路，去数这个算盘珠。

它创新的地方是，通过迭代和构建自己的设计，让数算盘珠出来的数，精度是可以用的。

然后，同样的制造水平，这个电子数算盘珠的电子算盘，比传统二进制计算机快 1000 倍，能效高 100 倍。

这个东西不是通用计算机，就是个针对专门计算构建的专门电路。差别在于原理和现在电子计算机原理的基础不同。

它不是二进制，逻辑门，布尔函数，[图灵机](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E5%9B%BE%E7%81%B5%E6%9C%BA&zhida_source=entity)这些基础构建的。

更像一个专用算盘的电子化。

用途就是做一些专门计算的时候，同样工艺制造水平，算的更快，能耗更低。

它不可能替代现在的计算机。

未来可能针对一类计算做成一个器件（不是芯片），放到一个设备或者系统里面，输入要计算的内容输出结果。计算速度比 gpu 和 cpu 快很多倍。相当于一个特种计算加速器。

类比的话，相当于 90 年代的 VCD 解压卡，只对 VCD 的 MPEG 解码有效，让你能在电脑上看 VCD。

这个东西构建一个电路，可能只对 AI 的矩阵算法有效，用来算 AI 的某个算法。

现在这个器件能制造的水平还很原始。和同样原始制造水平的[集成电路](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E9%9B%86%E6%88%90%E7%94%B5%E8%B7%AF&zhida_source=entity)比。快 1000 倍。不是真和量产品比快 1000 倍。

属于很有前途，可以探索的产品。

真搞好了，可以对很多特定计算构建器件和电路，加速这些领域的计算。

这个东西，已经被国外一家创业公司盗用还拿到了 3500 万美元的风险投资。

中国企业[华为](https://zhida.zhihu.com/search?content_id=753260741&content_type=Answer&match_order=1&q=%E5%8D%8E%E4%B8%BA&zhida_source=entity)去谈了，创始人不想说华为坏话。只说华为很有意思。

目前这个东西还在实验室阶段，真正造出来有市场竞争力，可能用的器件，还需要很长的过程。

也许制造工艺一直原始，无法无现代芯片竞争，就像真算盘被计算器淘汰一样。

也许工艺能制造足够强的器件，那就不止算力 1000 倍了，也许是 10000 倍。

花小钱探索一下这条路是值得的。
    
    
    
    
### 知乎用户 exzzx 发表
    
现在我国芯片产业最大的问题，不是没有顶级的理论设计，而是没有制造出来的能力。

芯片竞争，无论 cpu 还是 gpu，一切的一切都要看国内[光刻机](https://zhida.zhihu.com/search?content_id=753193843&content_type=Answer&match_order=1&q=%E5%85%89%E5%88%BB%E6%9C%BA&zhida_source=entity)研究的突破
    
    
    
    
### 知乎用户 残荷寒鸦 发表
    
[模拟存算比](https://zhida.zhihu.com/search?content_id=753292923&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E5%AD%98%E7%AE%97%E6%AF%94&zhida_source=entity) GPU 好千倍是学术界很早公认的事实。特别是矩阵相乘，纯纯就是利用大自然的力量（[欧姆定律](https://zhida.zhihu.com/search?content_id=753292923&content_type=Answer&match_order=1&q=%E6%AC%A7%E5%A7%86%E5%AE%9A%E5%BE%8B&zhida_source=entity)）

但是头疼的就是精度还有寿命问题。

精度在于噪声还有写入不平衡，有很多种方法在解决，一种是提出写入的算法，很有名的就是 [tiki-taka 算法](https://zhida.zhihu.com/search?content_id=753292923&content_type=Answer&match_order=1&q=tiki-taka%E7%AE%97%E6%B3%95&zhida_source=entity)（非常好名字，爱来自瓜迪奥拉）简单说来就是设几个辅助矩阵还有一个真正要写入的矩阵，可以通过一些操作在辅助矩阵里面解决噪声 / 漂移的问题。还有就是先把权值梯度矩阵存在数字域，到达一定大小后发送脉冲写入模拟域，这样也可以减少较小权值写入不均衡问题。（如果感兴趣可以用 IBM 的 aihwkit 模拟器拿来玩一玩，反正基本上 API 都写好了，训模型就把线性层换一下，优化器换成 AnalogAdam/AnalogSGD）（不过其实这种写入自带噪声甚至可以解决部分过拟合的问题，是不是有点神奇）

寿命问题就更头疼了，目前的[忆阻器](https://zhida.zhihu.com/search?content_id=753292923&content_type=Answer&match_order=1&q=%E5%BF%86%E9%98%BB%E5%99%A8&zhida_source=entity)支持写入的次数并不多。对于比较小的模型也就只能训练个几十次吧… 这得要在材料上突破，或者在系统 / 算法上面突破。大家可以期待我们的工作，且听科吟（bushi）。

总而言之，这个还是实验室在玩的产品，我个人觉得如果材料不突破估计短期只会成为刷论文的好方向，毕竟那么多人做 AI，这些冷门领域还是没那么多人关心的…
    
    
    
    
### 知乎用户 Nil-9​​ 发表
    
谢邀，本来上班就烦

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-d7071ce3ff4779d46a05e27a777f0df8_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 武陵客 发表
    
现在的大规模运存只有 [DRAM](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=DRAM&zhida_source=entity)，了解计算机架构的都知道，DRAM 实际上是个外设，[CPU](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=CPU&zhida_source=entity) 对 DRAM 的访问速度很慢但访问带宽大，两者之间的速度鸿沟称为[内存墙](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=%E5%86%85%E5%AD%98%E5%A2%99&zhida_source=entity)。

解决这个问题现在的主要路线是加大 [cache](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=cache&zhida_source=entity)，利用[局部性原理](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=%E5%B1%80%E9%83%A8%E6%80%A7%E5%8E%9F%E7%90%86&zhida_source=entity)，经常要用到的数据提前从 DRAM 搬运到 cache 上，普通应用差不多解决了内存墙问题，能对付过去。

但大模型时代就不同了，一个核心的计算，两个矩阵的乘法 [GEMM](https://zhida.zhihu.com/search?content_id=753240610&content_type=Answer&match_order=1&q=GEMM&zhida_source=entity)，矩阵 A 的行和矩阵 B 的列提取到 cache 上，进行逐个浮点数乘法后相加。

矩阵 A 还好，一行的地址是连续的，提前从 DRAM 发个命令就全部拿到了。

矩阵 B 就很麻烦，一列数据根本不连续，从第一行取这列数据，要访问 DRAM 一次，第二行再一次，每次都耗时很久，所以不加优化的话，一次 GEMM 的时间开销巨大。

北大老师的新材料解决的就是这个问题，具体细节我不掌握，但方向很有意思。
    
    
    
    
### 知乎用户 NULL 发表
    
看了基础逻辑

1\. [低精度求逆](https://zhida.zhihu.com/search?content_id=753263684&content_type=Answer&match_order=1&q=%E4%BD%8E%E7%B2%BE%E5%BA%A6%E6%B1%82%E9%80%86&zhida_source=entity)：快速给出一个粗略的解。

2\. [高精度乘法](https://zhida.zhihu.com/search?content_id=753263684&content_type=Answer&match_order=1&q=%E9%AB%98%E7%B2%BE%E5%BA%A6%E4%B9%98%E6%B3%95&zhida_source=entity)：精确计算出这个粗略解和真实解之间的误差。

尼玛，难不成我算一个 64\*_64 模拟低精度矩阵旁边再放高精度数字 64\*_64 芯片数字芯片来校准吗？

既然都已经用高精度芯片计算出来 fp32 高精度的 “真实解”，闲的慌再等着给低精度[模拟芯片](https://zhida.zhihu.com/search?content_id=753263684&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E8%8A%AF%E7%89%87&zhida_source=entity)迭代几次，算一个 24bit 精度结果来？

这不是模拟计算芯片吧？这就模拟器件的**动态校准算模块**…… 模拟芯片众所周知不稳定性需要非常频繁的来校准，

如果算一次就校准一次的话这真是废物了，不如直接直接拿旁边高精度数字芯片计算得了

* * *

我之所以说一次计算一次校准，是因为我遇到过类似的问题；不同分布的数据，校准过程不一样；比如用高斯分布 64\*64 的输入，校准好了；那么下一次输入是泊松分布的，计算出来误差就非常大，只能再校准；  
就是一个最简单类比的逻辑，**一次校准类似于一次小模型的训练**，输入应该是猫图片，就用猫图片校准过后，只能再次计算 “猫类图片” 才能准确；如果输入是狗的图片，上次校准就失败了，必须从新来校准；

但是，真实场景矩阵都是特殊分布的数据，切片 / 块之后，根本就不知道是猫还是狗或者是其他，需要一次一校准很正常；

除非你已经知道数据分布了，**只能计算特定数据分布**，如果加了这个约束条件，这根本就不是计算芯片的突破，这是**变了一个戏法，**告诉你这个**芯片做 “1+1” 非常快，**但是**只能计算”1+1“**， 大大的黑人问号 ···· **干脆这个芯片恒等输出 2 算了**；
    
    
    
    
### 知乎用户 烙印 发表
    
我再次重申，凡是某大学，某科学院，搞出来的东西，极大概率，屁用没有。

看都不用看。

前景无限趋近于零蛋！
    
    
    
    
### 知乎用户 Peppermutton 发表
    
教你一个看这种报道小技巧，[16 位矩阵求逆](https://zhida.zhihu.com/search?content_id=753218114&content_type=Answer&match_order=1&q=16%E4%BD%8D%E7%9F%A9%E9%98%B5%E6%B1%82%E9%80%86&zhida_source=entity)说了精度，到 128 就只提速度了，这意味着\_\_\_\_\_\_\_\_\_
    
    
    
    
### 知乎用户 迪迪二哈​ 发表
    
这确实是芯片领域一次重要的技术突破，但它离真正取代 GPU 又还有多长的路要走呢？虽然是外行人，但兴趣使然平日关注较多，所以也来唠几句。

可能也会有和我一样的外行人一开始并不明白这项技术到底是什么？简单来说，就是一种基于[忆阻器](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=%E5%BF%86%E9%98%BB%E5%99%A8&zhida_source=entity)的模拟计算芯片，它的创新之处在于采用了[存算一体架构](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=%E5%AD%98%E7%AE%97%E4%B8%80%E4%BD%93%E6%9E%B6%E6%9E%84&zhida_source=entity)，完全颠覆了传统芯片的设计思路。

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-d36d2bcdb66a7e7d338d7dc90bd0bcf8_r.jpg%3Fsource%3D1def8aca)

想象一下传统计算机就像个图书馆，数据存放在书架上，需要计算时把书搬到阅览室，算完再搬回去。这个过程耗时耗能。而新型芯片则像是个智能书架，数据在原地就能完成计算，彻底避免了来回搬运的消耗。这种架构特别适合处理矩阵乘法这类人工智能的核心运算。在特定任务上实现千倍算力提升确实可能，但这更像是田径赛中的撑杆跳冠军去比游泳，它可以在特定赛道上表现出色，但并不意味着在所有领域都能胜出。

### 那这项技术突破的真正意义在哪里？

不得不提的就是，这是我们在芯片架构创新上的一次漂亮突围。当大家都在传统架构上追赶时，我们选择了一条差异化的技术路线。这种另辟蹊径的思维本身就值得肯定，它证明了中国科研人员不仅会跟随，更有能力引领创新。

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-5854000386ec092c1397c70c31a83401_r.jpg%3Fsource%3D1def8aca)

而且它为解决[内存墙](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=%E5%86%85%E5%AD%98%E5%A2%99&zhida_source=entity)的问题提供了新思路。传统芯片的性能瓶颈越来越明显，而存算一体架构从原理上规避了这个问题。虽然这项技术还处于早期，但它为整个行业指明了可能的发展方向。**能够在这样的顶刊发表成果**，**说明我们的研究质量已经达到了国际一流水平。**这种基础研究的积累，比单纯制造出几款芯片更有长远价值。

但是，我们必须清醒地认识到这项技术面临的挑战。模拟计算的精度目前还难以达到传统数字计算的水平。虽然论文中提到了 24 位精度的突破，但在实际应用中，温度变化、器件老化等因素都可能导致计算误差。对于需要高精度的应用场景，这可能是致命伤。现在的 AI 开发完全建立在 [CUDA](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=CUDA&zhida_source=entity) 等传统架构之上。要让开发者转向全新的计算架构，需要重建整个软件生态。这就像要让所有人都从 Windows 换到一个全新的操作系统，就算技术再好，没有应用也是白搭。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-39c2d102912b32fbc7addf632c1d1f9c_r.jpg%3Fsource%3D1def8aca)

实验室成功也只是第一步，要实现规模化量产并保证长期稳定性，还需要攻克材料、工艺、封装等一系列工程难题。历史上很多实验室的突破性技术都倒在了产业化这条路上。

短期内，这款芯片最可能的应用场景是特定领域的协处理器。在[边缘计算](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=%E8%BE%B9%E7%BC%98%E8%AE%A1%E7%AE%97&zhida_source=entity)场景中，比如自动驾驶的**实时感知**、**工业质检**等对能效要求极高的领域，它可以作为专用加速器发挥优势。在科研领域，比如**气候模拟**、**蛋白质折叠**等需要大量矩阵运算的场景，它可以提供强大的算力支持。在通信领域，特别是 **6G 时代的大规模 MIMO 信号**处理，它的架构优势能够充分发挥。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-bbdd9707b73057752f1277f87ad0bcbc_r.jpg%3Fsource%3D1def8aca)

但要说取代 GPU，至少在可预见的未来还不现实。更可能的发展路径是形成[异构计算](https://zhida.zhihu.com/search?content_id=753309544&content_type=Answer&match_order=1&q=%E5%BC%82%E6%9E%84%E8%AE%A1%E7%AE%97&zhida_source=entity)的格局，也就是不同的芯片各司其职，在各自擅长的领域发挥作用。

这项突破的意义不在于马上改变世界，而在于它为我们打开了一扇新的大门。它证明了在传统技术路线之外，还存在其他可能的选择。芯片技术的发展从来都不是一蹴而就的。这项成果是中国芯片产业长期投入的一个缩影，它可能不会立即产生商业效益，但每一步扎实的积累，都在为未来的突破奠定基础。

我们普通人能做的也只有给予科研人员更多时间和空间，期待他们在解决工程难题后，能够真正将这项技术推向实用，为中国芯片产业开辟新的可能性。
    
    
    
    
### 知乎用户 游民 发表
    
这是[模电芯片](https://zhida.zhihu.com/search?content_id=753282616&content_type=Answer&match_order=1&q=%E6%A8%A1%E7%94%B5%E8%8A%AF%E7%89%87&zhida_source=entity)，特定用途用的，GPU 是[数电芯片](https://zhida.zhihu.com/search?content_id=753282616&content_type=Answer&match_order=1&q=%E6%95%B0%E7%94%B5%E8%8A%AF%E7%89%87&zhida_source=entity)，怎么能拿到一块比呢？

当年模电考试要了我的命了，大家算的答案都不一样，你还千万不能抄，一样了反而是抄袭的证据，老师批卷他自己都承认有的时候是凭感觉。

我觉得这个事最大的受害者是北大那些做研究的人，什么事一到国内赢媒嘴里就变味了。
    
    
    
    
### 知乎用户 满嘴仁义 发表
    
吹牛放卫星的东西都要去评价。2024 年，有个这新闻，北京某公司研制出新能源车和电池可以供电动车 100 年行驶。然后就没有然后了
    
    
    
    
### 知乎用户 李天才 发表
    
看到这个标题我就想笑，写文章的人知道 1000 倍是多大吗?

这种事情的概率，大概相当于从一个年薪 6 万块的小编，突然变成了年薪 6000 万了....
    
    
    
    
### 知乎用户  摆渡 发表
    
这个不是忽悠 请看几年前[金涌院士](https://zhida.zhihu.com/search?content_id=753224174&content_type=Answer&match_order=1&q=%E9%87%91%E6%B6%8C%E9%99%A2%E5%A3%AB&zhida_source=entity)科普视频

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-295cd8c647a081b3aa6345ab5c0079aa.jpg%3Fsource%3D25ab7b06)
    
    
    
    
### 知乎用户 子介​ 发表
    
所有高赞答案都在咬文嚼字拽术语，谁能看得懂？我来用几句大白话，给大家讲透彻，讲明白。

我国这次成功研制的[新型芯片](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=%E6%96%B0%E5%9E%8B%E8%8A%AF%E7%89%87&zhida_source=entity)，用大白话讲就是 “给计算机装了新的‘数学脑子’”，专门解决那些需要疯狂算数的复杂任务。它的厉害之处主要体现在三个方面：

这芯片到底能干啥？

超高速解数学题，比如手机信号检测、[自动驾驶](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6&zhida_source=entity)汽车实时分析周围环境、[AI 训练](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=AI%E8%AE%AD%E7%BB%83&zhida_source=entity)大模型时调整参数这些需要大量计算的场景，它都能比现有顶级 [GPU](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=GPU&zhida_source=entity) 快千倍。举个具体例子：传统 GPU 算一个 128×128 的矩阵方程要一天，这芯片 1 分钟就能搞定。

。。。

省电到离谱，因为直接用物理规律（比如电压变化）代替传统二进制计算，能耗只有 GPU 的 1/100。相当于用一根蜡烛的热量就能完成原本需要烧锅炉的工作。

。。。

突破 “卡脖子” 技术，过去这类高精度计算芯片全靠国外垄断，现在咱们自己搞定了核心架构，相当于在算力战争中造出了“新式武器”。

。。。

为啥说这是革命性突破？

解决了传统芯片的硬伤：现在电脑 / 手机的 CPU/GPU 就像 “翻译官”，得把数字转成 0 和 1 再计算，费时费电。而新芯片直接拿电压当数字用，省去了翻译步骤（类似用秤直接称重，不用一个个数豆子）。

。。。

精度突破：过去模拟计算误差大，新芯片通过 “物理定律 + 算法纠错”，把精度提升到小数点后 7 位（相当于用弹簧秤称出 0.0000001 克的误差）。

。。。

专攻 “最难任务”：AI 训练中最耗能的环节（比如调整神经网络参数）原本像用菜刀雕冰雕，现在直接召唤 “算力闪电”。

。。。

未来能用在哪里？

[6G 通信基站](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=6G%E9%80%9A%E4%BF%A1%E5%9F%BA%E7%AB%99&zhida_source=entity)，让手机信号处理速度飙升，未来下载 1 部电影可能只要眨眼时间，基站耗电量直接砍半。

。。。

自动驾驶，汽车摄像头和雷达的数据处理速度提升，遇到突发情况反应更快，比如突然窜出的行人能提前精准刹停。

。。。

[AI 医疗](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=AI%E5%8C%BB%E7%96%97&zhida_source=entity)，训练 AI 诊断疾病时，原本需要几周的模型训练缩短到几小时，医生能更快获得精准诊断建议。

。。。

[智能家居](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85&zhida_source=entity)，未来冰箱、空调可能自带 “微型计算脑”，直接分析你的生活习惯自动调节，不用联网等云端回复。

。。。

[科学计算](https://zhida.zhihu.com/search?content_id=753284074&content_type=Answer&match_order=1&q=%E7%A7%91%E5%AD%A6%E8%AE%A1%E7%AE%97&zhida_source=entity)，气候预测、核聚变模拟等需要万亿次计算的领域，研究周期可能从几个月压缩到几天。

。。。

对普通人有啥影响？

手机更省电：玩一天游戏不再烫手，续航翻倍。

。。。

网购更智能：推荐系统秒懂你的喜好，再也不用刷 100 页才看到想买的。

。。。

AI 更有效率、更精准、更人性化、更逻辑化

。。。

看病更高效：AI 辅助诊断缩短等待时间，疑难杂症早发现。

。。。

隐私更安全：数据在本地设备处理，不用上传云端防泄露。

。。。

未来挑战

量产难度：现在还在实验室阶段，要造出能大规模生产的芯片还需 3-5 年。

。。。

生态建设：得重新设计软件系统，就像从马车时代突然切换到高铁，配套要跟上。

。。。

应用场景：初期可能先用在基站、超算中心等专业领域，消费级产品还得等等，我估计得 5 年以后。

。。。

最后

简单说来就是：

这芯片相当于给中国算力产业装了 “涡轮增压”，虽然现在看着像实验室里的 “黑科技”，但未来可能彻底改变我们生活——从手机到电网，从看病到交通，甚至到生活中的每一个方面，每一个领域，每一个角落，处处都可能因它变快、变省电、变智能、变得更高效、更精准、变得更人性化！！
    
    
    
    
### 知乎用户 柳清侯 发表
    
让我们来看看广大抖友怎么说吧：

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-3fd4e967b1153baeae28007d69150076_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-7a22837a27fceadf84c01c0b0abf1952_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-05d57c16bc064a6f8759f2ac9244f490_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-e7719a5cfde171db9f67ef0cd94fefdc_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 稗田椎菜  发表
    
[memristor](https://zhida.zhihu.com/search?content_id=753342278&content_type=Answer&match_order=1&q=memristor&zhida_source=entity) 是學界已經水了很久論文的東西，這次鑑定為一樣是在水論文。

如果我換個名字，管它叫 ReRAM 或者直接叫「[鈣鈦礦](https://zhida.zhihu.com/search?content_id=753342278&content_type=Answer&match_order=1&q=%E9%88%A3%E9%88%A6%E7%A4%A6&zhida_source=entity)」，很多人應該就知道這是什麼東西了。
    
    
    
    
### 知乎用户 知来者之可追 发表
    
要是真有用，业界早就炸了，屁用没用的玩意儿，距离实用差个十万八千里，整天整这一套，吹牛不上税是吧？

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-c29847ff61969188f986e7c6dec9a62e_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 落叶乔木 发表
    
“**这项突破的意义远不止于一篇顶刊论文**，它的应用前景广阔，可赋能[多元计算场景](https://zhida.zhihu.com/search?content_id=753305462&content_type=Answer&match_order=1&q=%E5%A4%9A%E5%85%83%E8%AE%A1%E7%AE%97%E5%9C%BA%E6%99%AF&zhida_source=entity)，有望重塑[算力格局](https://zhida.zhihu.com/search?content_id=753305462&content_type=Answer&match_order=1&q=%E7%AE%97%E5%8A%9B%E6%A0%BC%E5%B1%80&zhida_source=entity)。”

与这些科技领域鸿儒相比，我这样的布衣白丁，只会感觉这些技术听起来很牛 。

如果我们的科技成果不能尽快的转化为生产力 ，尽快推广到民用领域，造福民生。

那么... ...，
    
    
    
    
### 知乎用户 校尉不摸金​ 发表
    
传统芯片工作方式就像点钞机一样，一张一张的点，算出来总金额

新型芯片就像高精度的称，称出来的重量再除以每张钞票的重量算出总金额。

缺点: 只能适用于特定几种高度规范的钞票
    
    
    
    
### 知乎用户 火狐狸 发表
    
回答：添丁行科技！

评论：别问我，我不懂！

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-1f27d7c5e7de07675f5cac101ba947c4_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-70b54c85affc6c394665f596e3a1dae5_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 佳一索 发表
    
标题越放火箭

实际就越…
    
    
    
    
### 知乎用户  小牛爱吃 BBQ 发表
    
作为论文，确实是一个好的研究点。但是应用领域比较窄，工程上还有一大堆问题，拿来跟数字电路 GPU 对比就很扯，写作味儿太冲。

另外，求求学新闻的以后不要当编辑，找点专业领域的本科生来干都行，别见到什么就震惊。张雪峰说的真是一点没错。
    
    
    
    
### 知乎用户 低温沸腾只为赢麻 发表
    
华为不愧是民族的希望，科技的领路人，遥遥领先
    
    
    
    
### 知乎用户 吾牧之​​ 发表
    
芯片这玩意，是中国全产业链上唯一缺乏的一块

这个我倒是知道

换句话说，属于能够被人家卡脖子的产业

这些年虽然有很多的项目，有很多的投资，但是到目前来看，收效还不知道

现在又要到了和美国人谈判的时候了，放出这种新闻，实际上是增加和美国人谈判的筹码

既然是谈判筹码，那也不能全是虚张声势

因为筹码如果都是假的，人家就更加的看不起你了

这个和当年的光刻厂事件不大一样

2023 年的 10 月份，当时也传出了中国要建设什么光刻厂之类的新闻

说什么力大砖飞，还说什么放大设备，到时候各种型号的芯片都能够生产出来，只需要捡就行了，云云

当时还放出来了什么工厂的草图

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-a56a52c27b63cd36500efbc510996791_r.jpg%3Fsource%3D1def8aca)

弄得神乎其神，大家听得一愣一愣的

当时很多人高兴的不得了，都大呼问题解决了

部分人还要提头担保

然而到了后来，这个事情，就没了下文——闹了半天是大家都搞错了

光刻厂的技术还在研发之中，实践大概要等到至少二十年之后

主机与上面这个圆环状的，被大家认为是光刻厂的东西

实际上，根本就不是什么光刻厂，主要媒体还出来辟谣

“对此，中国电子工程设计院有限公司（下称中国电子院）9 月 18 日发声，称该项目并非网传的国产光刻机工厂，而是北京高能同步辐射光源项目（HEPS）。”

“中国电子院解释称，HEPS 可以看成是一个超精密、超高速、具有强大穿透力的巨型 X 光机，它产生的小光束可以穿透物质、深入内部进行立体扫描，从分子、原子的尺度多维度地观察微观世界，HEPS 是进行科学实验的大科学装置，并不是网传的光刻机工厂。”

絮絮叨叨说了一大堆，根本就看不懂说的是什么

但是至少把一件事情说明白了，光刻厂的事情，还停留在理论层面

估计到了今天，理论也没论证出来一个所以然

因为要是真的论证出来个所以然，估计早就上了新闻了

至于什么

“我国成功研制出新型芯片，特定任务中算力超越顶级 GPU 千倍”

这个倒是有好多媒体在这里说这个事情

![](https://images.weserv.nl/?url=https%3A//pica.zhimg.com/v2-2bb78f143dfe11e46ce2b55739f08fdf_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-1a4fefe693d5e73ab1280689dfe89bed_r.jpg%3Fsource%3D1def8aca)

尤其是山西晚报，还把消息来源给提供了

原来是来自于人民日报的微信公众号，看来不能不信了

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-1ce7aa88899d5fa505f4cf6da42c7a59_r.jpg%3Fsource%3D1def8aca)

在这篇报道里面，还提供了相关的论文

足以见得，还是高水平媒体更讲规矩

相关论文于 10 月 13 日刊发于《自然 · 电子学》期刊

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-c0a26a6f8c4b02cf5ea4febe59930947_r.jpg%3Fsource%3D1def8aca)

这些高精尖的玩意，看着就费劲，而且我也看不懂

看得懂的可以去看看

不愧是中央一级媒体，连他们的课题组都找到了

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-d79af0df5267d6457831653be79539fd_r.jpg%3Fsource%3D1def8aca)

看样子都年轻的不得了

倒是挺符合上面的人才培养要求，年轻没有什么不可以

当然了，单靠他们怕是也不行，得有个指导老师什么的

指导老师就是这位仁兄，孙仲先生

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-2862d0984e06a7b2befa76c7851a028e_r.jpg%3Fsource%3D1def8aca)

他这个名字起的倒是挺有古风的，是不是还有个哥哥？

至于什么特定任务中，算力超越顶级 GPU 千倍，在报道中是这么说的

**当问题规模扩大至 128×128 时，计算吞吐量更达到顶级数字处理器的 1000 倍以上，传统 GPU 干一天的活，这款芯片一分钟就能搞定。**

每个字都认识，但是连在一块就不知所云了

懂得的人可以谈谈看法

比较而言，光刻厂这玩意，属于三无网文

但是这个新型芯片，有权威媒体背书，有科研论文，甚至具体完成这个工作的人的照片都有

而且是在和美国人谈判之前两天放出的消息

那么我觉得你就不能把这个事情当做一个笑谈看了

至少是有相当的可能性，至少是能够作为一个对荷兰人以及荷兰人背后的美国人施压的牌来打

所以，我觉得，也不能单纯的讥笑为吹牛

应该是确有其事

至于什么

“当问题规模扩大至 128×128 时，计算吞吐量更达到顶级数字处理器的 1000 倍以上，传统 GPU 干一天的活，这款芯片一分钟就能搞定。”

首先，我对这玩意一窍不通，根本就不知道他在说什么

其次，我从常识上感觉不可能

怎么可能会取得这个水平的突破，我是不怎么相信的

当然了，我也不懂这个事情，可能科技的进步，确实就是这么快吧

这个事情，要是真的，大家看看英伟达的股票就晓得了

但凡是有三分真，今晚上英伟达的股票，怕是就得跳水了

因为对于英伟达来说，这个算是一个利空了

不，不只是英伟达，相关的欧美企业的股票，都会受挫

不，不对，不是今晚

我们这些人，缺乏相关信息渠道，直到今天才知道这个事情

人家那个论文可是 10 月 13 日发表的

如果确有可能应该是在 10 月 13 日前后，股价有一个巨大的波动

所以我们得挑出来那几天英伟达的股票看看

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-2bea2ccdc636f8b0fada73c8b96b56a2_r.jpg%3Fsource%3D1def8aca)

英伟达的股票确实是在 10 月 10 日有一个重挫

但是那一段时期，纳斯达克也跌了

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-4ab5a80d6fa30cb3ac11f06a78e23f4b_r.jpg%3Fsource%3D1def8aca)

所以现在的事情，就分外的复杂了

到底是因为特朗普的大嘴巴而下挫

还是因为新技术的出现下挫

现在还是一个暧昧不明的状态

那么我们就得持续关注英伟达股价了

如果在未来的半个月，持续被抛售，那么十之八九，可能是有上几分真的

如果股价没什么变化

那么也不能说是假的

但是可能就短期而言，暂时对英伟达不构成什么挑战

同时我们也得关注，资本方面和国资方面，对于这个孙仲先生的新成果有什么反应没有

现在缺乏投资渠道

这种非常具有潜力的技术进展

在资本市场上，绝对会是宠儿

如果真的有相当的真实性，且在十年内有商业应用的呃可能性

那么用不了多久，孙先生和资本方面的合作的新闻，就会被我们看到

至于技术论证是不是可能，这个事情，超过我们一般人的能力

同时，既然这篇论文，已经刊登在外国的刊物上了

那么至少，乍一看，是完全不存在什么硬伤的

我们与其在这里研究它，不如看看市场反应了

假如这个东西是真的，那么中国的好多问题都能够解决

我之前就说过了，中国很有可能是下轮康德拉季耶夫长波周期的科技引领国

能够实现这种科技进步，也是理所当然的

只能够更加的证明经济周期规律的正确性

对于我们普通人来说，这个东西，距离我们的生活还是很遥远的

但是早早晚晚还是会能够改善我们的生活的

总之了，我希望他是真的，持一种谨慎乐观的态度

正如我前面所说，这个事情和光刻厂的事情完全不同

光刻厂只是某些人在那里讲，这个东西有权威媒体背书

光刻厂的研发人员很低调，这个东西的研发者把自己的照片都放出来了（跟着他混的学生的照片都能够看到，但凡是假的，傻瓜才敢提供）

光刻厂那玩意，到底是连个论文也没有

人家这个还能够提出高水平的期刊

对了，这里需要再考虑一个问题

这篇论文刊登的那个期刊，到底是一个什么水平的期刊

《自然 · 电子学》

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/80/v2-23585ea052899cb090380af3f9fc5d86_1440w.webp%3Fsource%3D1def8aca)

“《Nature Electronics》(《自然电子》) 是一本由 Springer Nature 出版的 Engineering-Electrical and Electronic Engineering 学术刊物，该刊是国际一流期刊，主要刊载 Engineering-Electrical and Electronic Engineering 相关领域研究成果与实践，旨在打造一种学术水平高、可读性强、具有全球影响力的学术期刊。本刊已入选 SCIE 来源期刊。该刊创刊于 2018 年，出版周期 12 issues per year。2023 年发布的影响因子为 33.7。”

这么一看，似乎还是很可靠的一个刊物

有权威刊物背书，有权威媒体刊物背书，而且在和美国人谈判前两天放出

并且相关人员，开开心心地放出来了自己的照片

那么从各种角度来看

这个事情，怕是有相当的可靠性吧？

毕竟，如果这个事情要不是真的，上面这些背书的人，都不会很好看

背书，这玩意，直接关系到背书者自己的信用

而且涉及到和美国人的谈判问题，终究不能够是假的

否则甚至会影响很多事情

岂能是空穴来风，毫无理由呢？

所以，似乎这个事情，还算是靠谱的

但是，什么超过最顶尖的 GPU 的算力千倍，这个事情，我还是不是太信

因为蒸汽机当年刚发明的时候，都没有这个效果

这玩意，要是能够有这个力量，岂不是成了一个工业革命的产物了？

虽然我盼望着中国走大运，但是这么个程度的好运气，那我可真是有点不敢信了

这要是真的，那可真是证明了，中国国运旺盛，马上要成为新时代的应许之国了。

希望是真的吧。

哈哈
    
    
    
    
### 知乎用户 网名我让 AI 起 发表
    
肥猪赛大象，

就是鼻子短。

全社杀一头，

足够吃半年。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-185c7960d39e0ebd5c11aa7b4423367a_r.jpg%3Fsource%3D1def8aca)

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-f0c82b2245b5bc91422e7407208f7a18_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 生活经济学 发表
    
我老婆的同事，问她为什么工资这么低？老婆说因为你以前买的是外国车，大部分钱被外国人赚走了，国内企业员工没赚到这笔钱，所以学校就没招到更多学生。以后买 [byd](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=byd&zhida_source=entity) 等国货吧，这样国内企业员工就有钱让他们的孩子来我们学校了，我们的收入才会增加。其他行业也是同理的，当你在抱怨国内企业工资低的时候，想想你都把钱花去哪了？自己所在公司赚的是谁的钱？

近几年欧美企业在中国疯狂裁员。[apple](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=apple&zhida_source=entity) 把供应链转出国了，[intel](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=intel&zhida_source=entity)，[微软](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=%E5%BE%AE%E8%BD%AF&zhida_source=entity)，[埃森哲](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=%E5%9F%83%E6%A3%AE%E5%93%B2&zhida_source=entity)，[ibm](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=ibm&zhida_source=entity)，[德国宝马](https://zhida.zhihu.com/search?content_id=753284115&content_type=Answer&match_order=1&q=%E5%BE%B7%E5%9B%BD%E5%AE%9D%E9%A9%AC&zhida_source=entity)等也在中国疯狂裁员。导致部分中国人失业。

相对的 byd 等国内企业，从 50 万员工，增长到 100 万员工了。

这就说明，买国货，国内企业会增加招聘，员工会继续在国内消费，带动更多中国人生活变好。买外国货和合资货，欧美企业照样在中国裁员，外国员工和股东会拿着从中国赚到的钱回他们国家消费，改善外国人的生活。

支持国货，更多中国人的生活会更好。买欧美 iphone 和汽车的钱，大多变成了欧美人的福利，外企拿着从中国赚到的钱去东南亚建厂，替换掉中国的工厂。
    
    
    
    
### 知乎用户 chedan​ 发表
    
特定两个字用的实在精彩！

特定情况下我的大脑计算速度也很快。

比如零乘以不论阁下给出的多么复杂的数。

我都能很快的告诉阁下结果。

速度堪比目前最快的计算芯片。

不信阁下可以试试！
    
    
    
    
### 知乎用户 无害社畜 发表
    
普通人认为的重点：超越顶级 GPU **千倍；**

实际上的重点：**特定**任务中。
    
    
    
    
### 知乎用户 柬慈父 发表
    
你有几个头？提头来见

且听龙吟，又是龙吟？
    
    
    
    
### 知乎用户 CoreSeeker 发表
    
这宣传写的太离谱了.....**“世纪突破”**hhhh

客观来说，这个工作解决了[模拟存算](https://zhida.zhihu.com/search?content_id=753299763&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E5%AD%98%E7%AE%97&zhida_source=entity)解决[矩阵求逆](https://zhida.zhihu.com/search?content_id=753299763&content_type=Answer&match_order=1&q=%E7%9F%A9%E9%98%B5%E6%B1%82%E9%80%86&zhida_source=entity)的精度问题。之前模拟存算就被用来做矩阵乘法计算 y = Ax ，这些就被用来加速一些 AI 计算了。但是经过一些外围电路设计，可以一步实现矩阵求逆 x = A^{-1}b ，当然是理论上可以实现。

之前实现的可以说，基本都是电路仿真级别的，有人测试过（甚至都不用测试），模拟器件和电路的特性根本达不到矩阵求逆计算的精度需求。这里就想着多次计算，用传统的矩阵计算计算前向计算过程，用他们设计的小阵列来做矩阵求逆操作，然后按照下面的图，反复迭代几次，精度就能更高一些了。

这篇文章的验证的规模很小（只有 8\*8 的小阵列矩阵），所提的可扩展方法也有一定的限度。矩阵求逆那部分不能做的太大了。甚至，片上都没有 [AD/DA](https://zhida.zhihu.com/search?content_id=753299763&content_type=Answer&match_order=1&q=AD%2FDA&zhida_source=entity) 这部分。

这篇文章是面向解决**矩阵求逆**精度问题的一次重要的尝试，然而所提的[位切片技术](https://zhida.zhihu.com/search?content_id=753299763&content_type=Answer&match_order=1&q=%E4%BD%8D%E5%88%87%E7%89%87%E6%8A%80%E6%9C%AF&zhida_source=entity)，迭代方法等不适用于通用 AI 推理等计算场景，会引起功耗，延迟等问题。

本身也存在原型验证比较简单，核心求逆电路难以大规模集成，性能评估较为理想这些问题把。

anyway, 从学术上是一个不错的故事。什么替代英伟达？阿这。。。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-e4793ee4dab93cba61d34d0463348a0b_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 伊芸 发表
    
现在[北大](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E5%8C%97%E5%A4%A7&zhida_source=entity)清华普遍延毕，天才中的天才没有个 5-8 年是毕不了业的。基本上不发[顶刊](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E9%A1%B6%E5%88%8A&zhida_source=entity)中的顶刊是没希望的。但是反过来，也可以基本可以拍着胸脯说，北大清华的[材料学](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E6%9D%90%E6%96%99%E5%AD%A6&zhida_source=entity)研究，根本没眼看。人人都发顶刊的话，基本上都是这种，这个行业所谓的重大突破，但是整个实验室有传承么？不可能的，自己也知道是为了混毕业，同一个师门的早就看出了没希望。没有一个人愿意接下去做，别说中试和产业化了，就是沿着这个项目再发顶刊的人都没了。芯片研究说难不难，但是目前来看，整个市场弥漫着这种虚无的气质，投资者肯定需要的是这种虚无缥缈杳无音讯的研究，热炒一波是梦率就好了。当前高校对博士毕业的要求普遍 “唯论文”，尤其是 “顶刊”（Nature、Science、Cell 及其子刊，或领域内公认的顶级期刊）。很多学校明确要求至少一篇 [CNS 子刊](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=CNS%E5%AD%90%E5%88%8A&zhida_source=entity)或两篇领域顶刊才能毕业。科研选题越来越倾向于 “短平快”、“热点追踪”、“技术堆叠”，而不是真正有原创性、长期价值的问题。学生不是不想做有传承的课题，而是不敢——风险太高，延毕代价太大。

**数量繁荣，质量空心化**。

很多课题组是 “项目驱动” 的，一个博士做一个方向，发完论文就走人，下一个学生换个热点。实验室没有长期积累的技术平台、数据体系或理论框架。

不少 PI（课题组长）自己也困在 “申请基金 - 发论文 - 再申请” 的循环里，不敢让学生做风险高的长期课题，怕出不来成果，影响实验室生存。

**芯片是系统工程，不是单点突破**：材料只是其中一环。即使某个实验室宣称 “突破了某种新型半导体材料”，离[光刻](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E5%85%89%E5%88%BB&zhida_source=entity)、[掺杂](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E6%8E%BA%E6%9D%82&zhida_source=entity)、[封装](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E5%B0%81%E8%A3%85&zhida_source=entity)、[良率控制](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=%E8%89%AF%E7%8E%87%E6%8E%A7%E5%88%B6&zhida_source=entity)、[EDA 工具链](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=EDA%E5%B7%A5%E5%85%B7%E9%93%BE&zhida_source=entity)等全套工艺还有十万八千里。

**资本热衷 “故事” 而非“进度”**：投资者喜欢听 “弯道超车”、“颠覆性创新” 的故事，但对长期投入、缓慢迭代缺乏耐心。于是催生了一批“[PPT 芯片公司](https://zhida.zhihu.com/search?content_id=753283903&content_type=Answer&match_order=1&q=PPT%E8%8A%AF%E7%89%87%E5%85%AC%E5%8F%B8&zhida_source=entity)”，靠概念融资，实际进展缓慢。

**科研与产业脱节严重**：高校研究往往在理想条件下做出样品，而产业需要的是在复杂环境中稳定、低成本、可量产的技术。两者之间存在巨大的 “死亡之谷”。

所以，不是北大的学生不够聪明，不是清华的设备不够先进，而是**我们正在用一场 “论文军备竞赛”，消耗着最宝贵的智力资源**。

真正的进步，不在于又发了几篇 Nature，而在于有没有人愿意接下那个做了十年还没出成果的项目。
    
    
    
    
### 知乎用户 3rrr 发表
    
懒得喷了。真厉害
    
    
    
    
### 知乎用户 道左 发表
    
我成功研制出无电电车。

在特定任务中速度超越特斯特电车顶配千倍。

我研制成功的东西叫做自行车。
    
    
    
    
### 知乎用户 pink 发表
    
对于计算 iPhone 17 从不同高度、不同角度掉到地上有几个坑、屏幕碎成几块这一特定问题，我设计的模拟计算机（买个手机扔一下）秒杀一切 CPU GPU。这一突破有何意义？
    
    
    
    
### 知乎用户 lew salace 发表
    
看明白了吧，不论是哪个产业，这基本就是中国今天的玩法：

我融入全球体系，大家一起玩儿，我靠硬实力慢慢超过你。你不带我玩，我也有掀桌子的能力，早点儿超度你也不是不行。
    
    
    
    
### 知乎用户 听风 发表
    
学校搞的东西一律认为是骗钱的，尤其什么院士带队
    
    
    
    
### 知乎用户 噼哩 发表
    
属于正常的牛逼技术突破。

目前的芯片都已经对很多计算从架构上都进行了特定优化，例如大名鼎鼎的 [cuda 计算](https://zhida.zhihu.com/search?content_id=753257693&content_type=Answer&match_order=1&q=cuda%E8%AE%A1%E7%AE%97&zhida_source=entity)就依靠专门设计的硬件加速。

这个也是硬件加速的一种。

应用前景呢，目前没什么应用前景，落地还需要很多工作。

我国实验室里这种技术积累一大堆。全世界也是一大堆。
    
    
    
    
### 知乎用户 123leq1 发表
    
**DeepSeek 同款，赢就完了。**
    
    
    
    
### 知乎用户 猜猜猜 发表
    
又开始吹了
    
    
    
    
### 知乎用户 黄博论学术​ 发表
    
现在的 GPU 应该指的都是 GPGPU，全称是 general purpose GPU，跟他比 [Specific purpose](https://zhida.zhihu.com/search?content_id=753275581&content_type=Answer&match_order=1&q=Specific+purpose&zhida_source=entity) 好像不太 fair。
    
    
    
    
### 知乎用户 avantasia 发表
    
天天都有科技突破，大赢特赢
    
    
    
    
### 知乎用户  Mercer​​ 发表
    
这不就是低配版的 “[量子计算](https://zhida.zhihu.com/search?content_id=753322707&content_type=Answer&match_order=1&q=%E9%87%8F%E5%AD%90%E8%AE%A1%E7%AE%97&zhida_source=entity)”？牛，应用前景交给专业人士
    
    
    
    
### 知乎用户 地摊文学家 发表
    
这个就是[存算一体芯片](https://zhida.zhihu.com/search?content_id=753275584&content_type=Answer&match_order=1&q=%E5%AD%98%E7%AE%97%E4%B8%80%E4%BD%93%E8%8A%AF%E7%89%87&zhida_source=entity)，端侧 AI 部署的未来方向。

如果[忆阻器](https://zhida.zhihu.com/search?content_id=753275584&content_type=Answer&match_order=1&q=%E5%BF%86%E9%98%BB%E5%99%A8&zhida_source=entity)可以在未来做成纳米级别的尺寸，并解决稳定性问题，那么就可以将数千亿的忆阻器刻在芯片上，就像今天纳米级工艺的晶体管芯片一样，这些忆阻器完全可以装的下当前几百 B 参数量的 AI 大模型，然后进行超低功耗的[片上推理](https://zhida.zhihu.com/search?content_id=753275584&content_type=Answer&match_order=1&q=%E7%89%87%E4%B8%8A%E6%8E%A8%E7%90%86&zhida_source=entity)，芯片还可以堆叠成 3D 形状，每一层负责不同的功能，比如底层是大模型权重本身，其他层则是训练过程中的中间变量，那么就可以对这个大模型进行超低功耗的片上训练，功耗预估在几十 W 左右，与大脑一个数量级。由此，甚至还可以直接在片上部署持续学习算法，让智能体不再依靠云端算力，只靠端侧算力就能在环境中交替进行训练和推理，就像人一样。
    
    
    
    
### 知乎用户 欢乐马 发表
    
每天都是世界第一，然后各种系统都是外国的，每天都是芯片突破然后你的手机都是[高通](https://zhida.zhihu.com/search?content_id=753336234&content_type=Answer&match_order=1&q=%E9%AB%98%E9%80%9A&zhida_source=entity)，天机，[三星芯片](https://zhida.zhihu.com/search?content_id=753336234&content_type=Answer&match_order=1&q=%E4%B8%89%E6%98%9F%E8%8A%AF%E7%89%87&zhida_source=entity)，每天都是不被卡脖子然后各种基础表格软件老美的，更别提机床系统，画图系统，运算系统了
    
    
    
    
### 知乎用户 恩外 发表
    
看标题就不用看内容了，一个字都不信，因为我懂技术，也懂国人。
    
    
    
    
### 知乎用户 何静 发表
    
我以前日本同事给我打电话。电话接通后，他说。你就说中文。事实上。我好久没有进行日语通话。很想说说日语的。

日本朋友打电话也没有什么特别的事情。他就问了我一些关于[大数据](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E5%A4%A7%E6%95%B0%E6%8D%AE&zhida_source=entity)技术和云技术的技术细节。

因为我们以前有一个约定。在对方擅长的领域遇到麻烦。随时随地可以打电话摇对方。

我在日本和日本团队一起干活的时候。因为各自的技能点和的核心能力不一样，我们常常给对方讲课。

我当时就讲给我的日本工程师朋友们讲些人工智能、大数据和[云计算](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E4%BA%91%E8%AE%A1%E7%AE%97&zhida_source=entity)的东西给他们听。

行文此处。… 我随带说一下我自己在背景——

我是一家科技公司创始人。圈内们都说静总团队是个 ABC————A 是指人工智能。B 是指 Big Data（大数据）。是指 Cloud（云计算）

这算是团队的技能树。公司这几年在国内主要做解决方案的。目前主要做[混合云](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E6%B7%B7%E5%90%88%E4%BA%91&zhida_source=entity)与[私有云](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E7%A7%81%E6%9C%89%E4%BA%91&zhida_source=entity)解决方案。国内很多上市公司都是我甲方爸爸。

好。这以上就是我的背景。

—————————————————

好，现在回到我和朋友通电话的情节。

我认认真真回答了他的问题。对面响起一阵掌声。我才知道朋友开始了免提。只是刚才通话时时候对面超算安静。一点感觉不到对方开免提——又被日本人

的优点感动

我说。你开了免提。

朋友说。我让我团队听听你讲课。

我条件反射地说。你团队中文基础真好啊。

要知道。我刚才全程中文。而且都是技术问题。即便是一个中国人在消化这，些内容时候都需要一点时间。

朋友笑。哈哈我給他们每人发了一个翻译耳机。啊哈，不得不赞的日本工程师的优良品质。

处理完朋友技术方面的事情。

他突然认认真真地问我，要不要和他们一起搞芯片。他说她和他的同学想创业搞 AI 芯片方向的创业。他问我要不要和他们一起玩。

我问他。怎么突然想到要搞芯片创业。

他说日本制造业对低功耗、实时处理的 AI 芯片需求旺盛。我和他，我们可联合开发用于工业机器人的[边缘 AI 芯片](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E8%BE%B9%E7%BC%98AI%E8%8A%AF%E7%89%87&zhida_source=entity)。

—————————————————

我来浅浅地科普一下什么是——用于工业机器人的边缘 AI 芯片。？

什么是——用于工业机器人的边缘 AI 芯片。？好的，这是一个关于 “用于工业机器人的边缘 AI 芯片” 的详细解释。一句话概括用于工业机器人的边缘 AI 芯片，是一种专门部署在工业机器人本体或附近，用于进行实时人工智能计算的处理器。它让机器人能够“独立思考”，在数据产生的源头（即边缘）即时处理信息并做出智能决策，而无需依赖云端。详细分解为了更深入地理解，我们可以从以下几个核心概念入手：1. 什么是“边缘”？在传统的云计算模型中，机器人会将通过摄像头、激光雷达、力矩传感器等收集到的大量数据，通过网络发送到遥远的云端数据中心进行处理，然后再等待云端返回指令。“边缘” 指的是数据产生的物理现场，在这里就是工业机器人本身或其所在的工厂车间。边缘计算就是将计算能力从云端下沉到这些现场。2. 什么是“边缘 AI”？边缘 AI 就是将人工智能算法直接在边缘设备上运行，而不是在云端。对于工业机器人来说，这意味着：实时性： 处理数据、做出决策的延迟极低（毫秒级）。例如，一个进行精密装配的机器人，需要瞬间识别零件位置的微小偏差并立即调整动作，云端通信的延迟是无法满足的。可靠性： 不依赖于网络连接。即使工厂网络中断，机器人依然可以依靠本地的 AI 芯片正常工作，保证了生产线的连续性和稳定性。数据安全与隐私： 敏感的生产数据（如产品设计、工艺流程）在本地处理，无需上传至云端，降低了数据泄露的风险。带宽效率： 无需将海量的实时视频、传感器数据全部上传，只需上传处理后的结果或关键摘要，大大节省了网络带宽。

—————————————————

科普完毕。

说回日本朋友的芯片创业。

得知朋友要开始创业了。我也很开心。

我问。你们拉到投资了吗？

她说不用拉投资。政府补贴足够了。

我故意贱兮兮地说。这个事情很烧钱的。实现量产，但企业投资意愿低，依赖政府补贴可能难以为继。

他说我爸会给我钱。

我心想。妈耶。原来是个日本富二代，大哥您藏得可真深啊。

只是转念一想。我自己在日本团队干活的时候也没有和人家说自己在国内的真实情况。

—————————————————

我问他您需要我为您做什么。

工程师朋友说，您来提供 AI 算法优化。

既然都说到这里了。我来交待一个背景——我当时在日本的时候。我和日本工程师一起合作过一个医疗影像等场景的专用芯片设计。我当时就是负责算法优化的——我们当时做医疗影像 AI：与日本医院合作开发 CT/MRI 影像的自动诊断系统，我负责 AI 模型压缩技术，适配日本本土医疗数据规范。。

—————————————————

正聊业务呢。日本朋友突然神神秘秘地说。我们还可以切入日本高潜力的 AI 与半导体市场，还可借助日本工程师的精密制造经验，反哺您自身技术的产业化落地。

朋友说到这里一下子就特别开心。

那么。我日本朋友所指的—反哺我自身技术的产业化落地是指我的什么自身技术呢？

这里又还有一个故事呢。我简单給大家讲讲吧。

—————————————————

我有很多日本朋友。我很喜欢他们。

他们对我也很好。

日本人是非常慕强的。他若觉得您牛逼，真的可以給你跪。

我在日本生活过。和日本工程师一起干过活。

那个公司在日本挺有名的。一堆超算大牛。我能进日本那个团队。也是国内一个大佬的推荐。而我因为欠这个大佬一个人情。才去的日本。

我先科普一个关于日本的背景——当前日本工业软件水平在特定制造领域（如汽车电子、精密加工）具备专业软件优势，但在基础软件平台、云计算等新兴领域仍存在明显短板。

，再来说说我自己的背景。我是一家科技公司创始人。圈内们都说静总团队是个 ABC————A 是指人工智能。B 是指 Big Data（大数据）。是指 Cloud（云计算）。

此处科普一个冷知识——我团队在 A、B、C 三大核心领域的布局，正是当今全球科技产业（特别是日本）发展的基石。

当时很多日本工程师特别喜欢听我讲互联网方面的技术。特别是 “” 如何开发一个 app”这种。

虽然我是一个软件工程师。互联网那点东西，相对来我这样的软件架构师来说。简单得像一。闭着眼睛讲啊。

日本团队非常喜欢我。我也乐意见缝插针給他们几讲讲课。我还給他们讲大数据和云计算。

和他们说一些案例（都是我自己的项目）他们特别开心。还拉了一群日本教授来听我讲课。

当时的气氛真的是太好了。

反正已经说了这么多了。就再说一些。我再说一个我自己的背景。我公司这几年在国内主要做解决方案的。目前主要做混合云与私有云解决方案。国内很多上市公司都是我甲方爸爸。

（）但我没有和我日本小伙伴们说我在国内的事情。）

有一次。我顶头上司看我如此懂云计算。他就随口说很多日本大企业仍倾向于私有云部署。

我当场和他说。您去把这个单子接了。我们挣点零花钱。

他很惊讶就说可以吗。。我说完全没有问题的。我可以在国内找人提供[云原生技术](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E4%BA%91%E5%8E%9F%E7%94%9F%E6%8A%80%E6%9C%AF&zhida_source=entity)和平台（我当时说的在国内找人。指的就是自己团队拉），我说。你们日本工程师负责在客户本地数据中心进行定制化部署、运维和保障，满足其合规要求就好。

我当时的顶头上司差一点就给我跪了。

他说。我一早知道你不简单。不是一个单纯的工程师。我就一直傻笑。

再说一个背景。日本很多企业虽然厉害。但

很多日本的传统企业都有着笨重的系统，因为他们互联网技术物联网技术大数据技术云技术实在不行。

有一次，就有一个教授朋友问我。云技术能不能把日本传统企业这种笨重的系统，重构为[微服务架构](https://zhida.zhihu.com/search?content_id=753321483&content_type=Answer&match_order=1&q=%E5%BE%AE%E6%9C%8D%E5%8A%A1%E6%9E%B6%E6%9E%84&zhida_source=entity)的云原生应用。

我说可以啊。当时的内心就是妈耶。我在国内就是做这个的啊。

于是。我当场就給他们在黑板上画流程图。就像我在国内给自己团队开会一样。要怎么搞。需要什么模块。模块怎么样。

那些日本工程师小哥哥当场就给我跪了。我也差一点哭了。

话说。我在国内的时候也常常去企业給人讲课。

但台下的反应多半都是——啊。握。嗯。

但我必须讲下去啊毕竟拿了人家的钱。

后来。我们还聊到——日本工程师 + 中国工程师”的组合肯定是 “王炸” 之处。这话是什么意思呢？

什么这个王炸组合——结合了 “把事情做对” 的深度和 “做对的事情” 的速度与广度。

请注意。这不仅是 “质量” 与“速度”的结合，更是 “从 1 到 100 的极致坚守” 与 “从 0 到 1 的野蛮生长” 的创造性融合。如果能克服合作中的障碍，这个组合完全有能力在高端制造、新能源、人工智能等未来核心科技领域，打造出具备全球统治力的产品和解决方案。

然后所有的人都很开心。那天是真的开心啊。

—————————————————

我再交待一个背景。我们以前一起做项目的时候常常说到一个非常有意思的观点。什么观点呢？那就是——中国工程师和日本工程师的组合简直就是一个——王炸组合。

实话实说。这种王炸组合是非常厉害的。

比如我们刚才聊到的——云计算与 AI 基础设施共建。

而我的工作就是——提供混合云解决方案：为日本企业提供安全合规的混合云架构，例如借鉴甲骨文与软银的主权云模式\]，确保数据本地化存储。

—————————————————

我来简单科普了一下好了。

也就是说。当我们说——中国工程师和日本工程师在一起是王炸组合时。我们究竟在我说什么？

说的就是——

—————————————————

————————————

—————————————————
    
    
    
    
### 知乎用户 朋友一生一起走 发表
    
没有任何意义，这东西完全没有实用价值。中国从事芯片行业的也有几百万人了吧，还没有[英伟达](https://zhida.zhihu.com/search?content_id=753330389&content_type=Answer&match_order=1&q=%E8%8B%B1%E4%BC%9F%E8%BE%BE&zhida_source=entity)台积电几百个人厉害，跟中国航天一样丢人丢到全世界了
    
    
    
    
### 知乎用户 卜佬智 发表
    
等我能在市场上买到这玩意，并且验证了它再说吧。还在实验室里的东西说个 j8。
    
    
    
    
### 知乎用户 Andy 发表
    
特定任务中算力超越 GPU 千倍？

这宣传口径很军子学的吧？

我中国话说的比马斯克好千倍。某些地方比刘亦菲突出千倍。

我骄傲了吗？
    
    
    
    
### 知乎用户 凛教主看看我 发表
    
举个不太恰当的例子吧

现在要在一张纸上打很多孔，现有的 gpu 就是普通打孔机，只能老老实实一个一个打，但是我们发明了一种特别的打孔机可以把纸对折很多次，打一个孔就行。虽然效率提升很多，但只能用于这个特殊的打孔任务中，也算是一个挺有意义的创新吧。
    
    
    
    
### 知乎用户 Grrrrr 发表
    
速胜论爱好者将信息输入颅内二极管导致[单向电流](https://zhida.zhihu.com/search?content_id=753304424&content_type=Answer&match_order=1&q=%E5%8D%95%E5%90%91%E7%94%B5%E6%B5%81&zhida_source=entity)熔断神经后秒变速败论爱好者
    
    
    
    
### 知乎用户 沈陶亮 发表
    
我觉得这种不负责任的新闻应该少发！说这是假新闻也不为过。

新闻本身给一般用户的理解是，中国研究出来算力芯片，比英伟达强 1000 倍。以后显卡和算力卡都可以用国产货了，中国 yyds，中国赢麻了。

而实际上是，只是创新了一种算法，在特定的计算比英伟达的芯片强，在实际场景中的应用非常有限。这甚至不是赢家方面的创新，而是软件。
    
    
    
    
### 知乎用户 一朵小红花 发表
    
最近三十年，大国所有吹嘘的某某领域突破的东西，几乎全部都是圈钱的玩意。

只能说钱太多，花不完，根本花不完。
    
    
    
    
### 知乎用户 善良正直的中国人 发表
    
补贴好骗，一起发财
    
    
    
    
### 知乎用户 乘风破浪 发表
    
对老百姓屁用没有，官老爷写汇报材料有点用。
    
    
    
    
### 知乎用户 言德琴里音 发表
    
看到这个消息，我想起了前几个月盛传的另一项重大科研突破，\[[光刻厂](https://zhida.zhihu.com/search?content_id=753327618&content_type=Answer&match_order=1&q=%E5%85%89%E5%88%BB%E5%8E%82&zhida_source=entity)\]，最近不知道为啥没消息了，
    
    
    
    
### 知乎用户 anthonyll 发表
    
学术论文的突破往往是在非常特定、狭窄的条件下取得的，就像在实验室里点亮了一颗小灯泡。这本身是好事。但研究者或机构为了吸引眼球，在新闻稿里把 “点亮一颗小灯泡” 说成是 “找到了照亮整个城市的革命性方法”。他们隐藏了所有限制条件，比如这颗灯泡耗电巨大、寿命极短、成本天价。如果相关部门基于这些虚假的“热点” 制定了错误的[产业政策](https://zhida.zhihu.com/search?content_id=753296478&content_type=Answer&match_order=1&q=%E4%BA%A7%E4%B8%9A%E6%94%BF%E7%AD%96&zhida_source=entity)，可能会导致国家在关键技术的发展方向上走弯路，浪费了宝贵资源和时间。
    
    
    
    
### 知乎用户 曾哥说留学​ 发表
    
人有多大胆，芯有多大产。

两年前还领先 3000 倍，现在只领先 1000 倍了，

这怎么还退步了呢，要被追赶上了呀。

![](https://images.weserv.nl/?url=https%3A//pica.zhimg.com/v2-a06c627c5af2a21e1493f91cbd990498_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 娜娜 Luna​​ 发表
    
中国新型芯片破局：一天变一分钟的 “静默革命”

当全球芯片竞赛还在纳米尺度上焦灼，中国科学家换了一条跑道，把[模拟计算](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97&zhida_source=entity)这个 “老树” 开出了“新花”。

近日，北京大学传来消息，孙仲研究员团队成功研制出基于[阻变存储器](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)的高精度、可扩展模拟矩阵计算芯片，在求解特定问题时计算吞吐量与能效较当前顶级 GPU 提升百倍至千倍。

传统 GPU 需要一天完成的计算，这款芯片仅需一分钟就能搞定。这则本应轰动科技界的消息，却在外界相对静默的氛围中诞生——而它的深远意义，远不止于技术参数上的突破。

\---

01 模拟计算的 “复活”：从“算不准” 到算得精

在数字计算一统天下的时代，北京大学团队选择了一条返璞归真的道路——复兴模拟计算。

什么是模拟计算？孙仲研究员用了一个生动的比喻：“现在的所有芯片都是数字计算，数据都需要先转换成 0 和 1 的符号串。而模拟计算则无需这层‘转译’，它是一种类比计算，可以直接用连续的物理量（如电压、电流）来类比数学上的数字”。

模拟计算机在计算机发展早期（上世纪 30-60 年代）曾被广泛应用，但随着计算任务日益复杂，其精度瓶颈凸显，逐渐被数字计算取代。孙仲指出，此次研究的核心正是要解决模拟计算 “算不准” 这一痛点。

研究团队基于迭代算法，结合了模拟低精度矩阵求逆和模拟高精度矩阵—向量乘法运算，开发了一种全模拟矩阵运算的高精度矩阵方程求解方案。

先快速算出矩阵方程的 “近似解”，再用“位切片” 方法，实现迭代细化。

实验结果令人振奋：团队成功实现 16×16 矩阵的 24 比特定点数精度求逆，矩阵方程求解经过 10 次迭代后，相对误差可低至 10⁻⁷量级。这种精度，已经足以与数字计算相媲美。

02 突破[冯 · 诺依曼瓶颈](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC%E7%93%B6%E9%A2%88&zhida_source=entity)：一场架构革命

当今的 CPU 和 GPU 都采用冯 · 诺依曼结构，将计算和存储功能分开。这种架构的最大瓶颈在于所谓的 “冯 · 诺依曼瓶颈”——数据需要在处理器和存储器之间来回移动，限制了计算速度并增加了能耗。

北大团队的模拟计算芯片采用了[存算一体架构](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E5%AD%98%E7%AE%97%E4%B8%80%E4%BD%93%E6%9E%B6%E6%9E%84&zhida_source=entity)，取消了 “将数据转化为二进制数字流” 这一过程，同时不必进行“过程性数据存储”，将数据计算过程与数据存储合而为一，实现了算力解放。

这种突破带来的效果是惊人的：

· 在求解 32×32 矩阵求逆问题时，其算力已超越高端 GPU 的单核性能

· 当问题规模扩大至 128×128 时，计算吞吐量达到顶级数字处理器的 1000 倍以上

· 在相同精度下能效比传统数字处理器提升超 100 倍

这种性能提升并非简单的线性增长，而是架构革命带来的指数级飞跃。

03 全球背景下的中国芯片突围

在北大大突破的同时，中国其他芯片领域也传来捷报。

武汉大学项目团队宣布攻克[北斗高精度芯片](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E5%8C%97%E6%96%97%E9%AB%98%E7%B2%BE%E5%BA%A6%E8%8A%AF%E7%89%87&zhida_source=entity)技术，成功研制出北斗高精度定位 SoC 芯片，其功耗低至 90mW（国际先进水平为 200mW），静态监测精度达 2-3 毫米（国际先进水平为 5 毫米），核心性能领先国际。

而在南京，南京大学物理学院缪峰和梁世军教授团队也提出了一种高精度模拟计算方案，设计并验证了一款基于标准 CMOS 工艺的[模拟存内计算芯片](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E5%AD%98%E5%86%85%E8%AE%A1%E7%AE%97%E8%8A%AF%E7%89%87&zhida_source=entity)。该芯片在并行向量矩阵乘法运算中实现了仅 0.101% 的均方根误差，创下了模拟向量 - 矩阵乘法运算精度的最高纪录。

这些突破正值全球技术竞争日趋激烈之时。从美国哥伦比亚大学和康奈尔大学联合研制的新型三维光电子芯片，到韩国 UNIST 研究所开发的超紧凑半导体，全球芯片竞争已进入白热化阶段。

04 新型芯片的应用前景：超越数字计算的局限

北大团队的模拟计算芯片并非意在完全取代现有的 CPU 和 GPU，而是作为强大的补充。

孙仲强调：“CPU 作为通用‘总指挥’因其成熟与经济性而难以被淘汰。GPU 则专注于加速矩阵乘法计算。我们的模拟计算芯片，旨在更高效地处理 AI 等领域最耗能的矩阵逆运算，是对现有算力体系的有力补充”。

这种芯片的未来应用场景极为广阔：

· 机器人领域：需要实时处理大量传感器数据，低延迟、高能效的模拟计算可大幅提升响应速度

· 人工智能训练：矩阵逆运算是许多 AI 二阶训练的核心，模拟计算可显著加速训练过程

· 大规模 MIMO 系统：在 5G/[6G 通信](https://zhida.zhihu.com/search?content_id=753279654&content_type=Answer&match_order=1&q=6G%E9%80%9A%E4%BF%A1&zhida_source=entity)中，信号检测需要大量矩阵运算，模拟计算可提高效率

· 边缘计算：高能效特性使得在资源受限的边缘设备上实现复杂计算成为可能

在下一代 6G 通信系统中，该芯片可赋能基站以超低功耗实时处理大规模天线信号，提升网络容量与能效。对于快速发展的 AI 领域，这项技术有望加速大规模模型训练中的二阶优化算法，显著提升训练效率。

05 静默革命背后的深远意义

北大模拟计算芯片的突破，其意义远不止于技术参数上的提升。它代表着计算范式的转变——当数字计算逼近物理极限时，人类必须寻找新的计算路径。

这也反映出中国科技发展的战略转变——从跟随者到引领者的蜕变。当其他团队仍在已有架构上优化时，中国科学家选择了回归第一性原理，从物理规律出发重构计算模式。

孙仲团队的研究特色在于专注于更具挑战性的矩阵方程求解（AI 二阶训练的核心）。矩阵求逆操作要求的计算精度极高，时间复杂度达到了立方级。

而模拟计算凭借物理规律直接运算的方式，具有低功耗、低延迟、高能效、高并行的天然优势。

这项成果标志着我国在突破模拟计算这一世纪难题上取得了重大进展，为后摩尔时代的计算范式变革开辟了全新路径。

\---

这道曾经无解的物理难题，被中国团队用数学的精确一步步拆解，终在芯片的微观世界里找到了答案。北大的实验室里，那一分钟对比一天的算力飞跃，不过是中国芯片产业 “静默革命” 的一个开端。

参考文献

1\. 北京大学团队研制新型芯片，计算吞吐量与能效超顶级 GPU 百倍至千倍。《中国电子报》. 2025-10-21.

2\. 武汉大学团队攻克北斗高精度芯片技术。《工人日报》. 2025-10-21.

3\. 南京大学团队实现迄今最高计算精度的模拟存算一体芯片。中国科学院自动化研究所图书馆. 2025-10-21.

4\. Chinese Scientists Developed a Novel Chip, Crossing a Century-Old Hurdle. TrendForce. 2025-10-21.

5\. 突破模拟计算世纪难题！北京大学团队成功研制新型芯片。爱集微. 2025-10-23.

以上信息均整理自公开的新闻报道和研究论文，旨在传递科技进展信息，不代表个人观点。
    
    
    
    
### 知乎用户 lauv 发表
    
截至 2025 年 10 月 24 日，我国在信息领域算得上成果的只有在疫情期间的二维码，其他的都是吹泡泡
-----------------------------------------------------
    
    
    
    
### 知乎用户 刘先森 发表
    
还得是咱们，所以进步才能这么大！！！

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-62a9119a1f54b7567c30cbaff1064a5b_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 丙焱 发表
    
Ok，ok 能赢能赢。龙吟龙淫
    
    
    
    
### 知乎用户  iDamon 发表
    
容先去学下忆阻器这些年来的发展情况

但是大概看了内容

大概确定是

就是这个科研成果毋庸置疑

待确定的是

这个科研成果使用范围到底有多到

而 100% 能确定的是

这 TM 必然是新闻学魅力时刻
    
    
    
    
### 知乎用户 暴富 ing 发表
    
每天都是这种赢麻了的宣传
    
    
    
    
### 知乎用户 臧大为 发表
    
这玩意看上去像[忆阻器](https://zhida.zhihu.com/search?content_id=753257534&content_type=Answer&match_order=1&q=%E5%BF%86%E9%98%BB%E5%99%A8&zhida_source=entity)。如果能具备实用能力，这个超 GPU 千倍绝对不是开玩笑。
    
    
    
    
### 知乎用户 风雪山神​ 发表
    
评论区褒贬都有吧。

我认为这个当前阶段属于初始开发阶段，后面还有很长的路。

但是它开创一个新的发展方向和新思路。

未来发展空间多大不好说。
    
    
    
    
### 知乎用户 Anonymous 发表
    
首先，要保证这消息是真的
    
    
    
    
### 知乎用户 李耘锋 发表
    
行内人士的回答比较多技术名词，找 D 老师打听了一下，用外行能听得懂的话总结，这是一种非常有开创性，市场定位明确，技术可落地生产环境的特定芯片，和以往意义不明的实验型新型芯片有本质区别。

它的主要应用领域是 [llm 大模型运算](https://zhida.zhihu.com/search?content_id=753299341&content_type=Answer&match_order=1&q=llm%E5%A4%A7%E6%A8%A1%E5%9E%8B%E8%BF%90%E7%AE%97&zhida_source=entity)，优越的加速性能足以改变产业格局，是配合 [gpu](https://zhida.zhihu.com/search?content_id=753299341&content_type=Answer&match_order=1&q=gpu&zhida_source=entity) 的加速神器，但由于通用运算不行，没法完全取代 gpu，另外它能极大降低电力的消耗，降低基础电力设施依赖，理想状况下，走向大规模推广要五年时间。

远水解不了近渴，但在[中美谈判](https://zhida.zhihu.com/search?content_id=753299341&content_type=Answer&match_order=1&q=%E4%B8%AD%E7%BE%8E%E8%B0%88%E5%88%A4&zhida_source=entity)的关键时间点，爆出这个新闻，也是一张强有力的底牌。如果美国不开放高端芯片，只会逼我们全力在新技术上弯道超车，增加了美国解禁芯片的可能性。

解禁高端芯片，利好我们 AI 产业。不解禁，利好我们芯片产业。感谢辛苦耕耘的科研人员，将难题抛给了和世界逆行的国家。
    
    
    
    
### 知乎用户 德州的牛仔很忙 发表
    
吹吧，

遥遥领先，宇宙第一，种花有为，为所欲为！
    
    
    
    
### 知乎用户 忘形​ 发表
    
这种计算方式有点类似人脑的[模糊计算](https://zhida.zhihu.com/search?content_id=753241394&content_type=Answer&match_order=1&q=%E6%A8%A1%E7%B3%8A%E8%AE%A1%E7%AE%97&zhida_source=entity)。
    
    
    
    
### 知乎用户 EndlessWaltz 发表
    
[memristor](https://zhida.zhihu.com/search?content_id=753316172&content_type=Answer&match_order=1&q=memristor&zhida_source=entity) is dead。做过相关科研的同学都知道模型参数根本上不去，被大模型打得找不着北。
    
    
    
    
### 知乎用户 冲啊冲啊啊啊啊 发表
    
警惕新型大跃进
    
    
    
    
### 知乎用户 我都想笑了 发表
    
[英伟达](https://zhida.zhihu.com/search?content_id=753332635&content_type=Answer&match_order=1&q=%E8%8B%B1%E4%BC%9F%E8%BE%BE&zhida_source=entity)吓尿了，马上倒戈卸甲以礼来降
    
    
    
    
### 知乎用户 云梦阿斯兰 发表
    
特定任务。到底是什么任务呢？在全面遥遥领先赢学的指导下，高考我在交卷速度上远超所有清北的同学，先不讨论有没有意义，你就先说赢没赢？！
    
    
    
    
### 知乎用户 懒惰的码农​​ 发表
    
是科幻还是科学？

还得拭目以待！
    
    
    
    
### 知乎用户 明年夏天 007 发表
    
狼来了多次了 你还信

看看脑科去吧
    
    
    
    
### 知乎用户 仰泳的鱼 发表
    
滑伪三年的 PPT 还没消化完呢，又来新的，补贴真好骗呀！

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-235fbf72cf086655cc606c3a862810c6_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 不朽肌肉体 发表
    
知乎提问：我国成功研制出新型芯片，特定任务中[算力](https://zhida.zhihu.com/search?content_id=753262033&content_type=Answer&match_order=1&q=%E7%AE%97%E5%8A%9B&zhida_source=entity)超越顶级 GPU 千倍，这一突破有何意义？未来应用前景如何？

我回答：我预判一下：又有人要阴阳怪气了：赢！又赢了！赢麻了！大赢特赢！这就是中式赢学！这里就是中国！区区清华！[北大](https://zhida.zhihu.com/search?content_id=753262033&content_type=Answer&match_order=1&q=%E5%8C%97%E5%A4%A7&zhida_source=entity)一般！清华北大不如外国大！清华北大不如米国大！虚张声势！画饼充饥！望梅止渴！瞒天过海！中式心理战！宣传战！

我总结：不急！时间会证明一切！历史会歌颂真英雄！
    
    
    
    
### 知乎用户 mOckobeJct 发表
    
北京朝阳区大屯派出所[田爱良](https://zhida.zhihu.com/search?content_id=753305197&content_type=Answer&match_order=1&q=%E7%94%B0%E7%88%B1%E8%89%AF&zhida_source=entity)滥用职权颠倒黑白，对我进行非人的践踏侮辱，下毒手害死我爸爸 ​​​。人类在哪啊
    
    
    
    
### 知乎用户 这个手刹不太灵 发表
    
又要骗国家的钱了
    
    
    
    
### 知乎用户 不存在 发表
    
在论文发表前几天，作者这边已经有一个专门的讲座了。非常值得一听。

[https://www.bilibili.com/video/BV18yHGz4E2L](https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/BV18yHGz4E2L)

![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-2f59c56e75bf53e0a2cb5984fece76a6_r.jpg%3Fsource%3D1def8aca)

实在是巧妙，俺这个只有高中数理知识的人居然能看懂这里，就是依据简单的[欧姆定律](https://zhida.zhihu.com/search?content_id=753250132&content_type=Answer&match_order=1&q=%E6%AC%A7%E5%A7%86%E5%AE%9A%E5%BE%8B&zhida_source=entity)通过设计电路来直接计算矩阵，是直接出结果啊，实在太牛逼了。

看完后，俺只觉得，这东西之后若能落地商业化的话，绝对是颠覆性的东西。

这是和过去 80 年以来[冯诺依曼](https://zhida.zhihu.com/search?content_id=753250132&content_type=Answer&match_order=1&q=%E5%86%AF%E8%AF%BA%E4%BE%9D%E6%9B%BC&zhida_source=entity)的计算机架构完全不同的东西。

上千倍的计算效率提升，那就是革命性的东西。

但凡关注过 PC 领域，这些年大家都常说，[摩尔定律](https://zhida.zhihu.com/search?content_id=753250132&content_type=Answer&match_order=1&q=%E6%91%A9%E5%B0%94%E5%AE%9A%E5%BE%8B&zhida_source=entity)失效了，芯片设计到头了，达到物理极限了。

是的，是这样的。怎么办？

这就是未来，比 “[量子计算](https://zhida.zhihu.com/search?content_id=753250132&content_type=Answer&match_order=1&q=%E9%87%8F%E5%AD%90%E8%AE%A1%E7%AE%97&zhida_source=entity)” 更切实际的未来。
    
    
    
    
### 知乎用户 御弟 发表
    
不用看，百分之一万在骗傻子
    
    
    
    
### 知乎用户 代表正义消灭你 发表
    
卧槽。又遥遥领先了？什么时候拯救电诈园区同胞呀
    
    
    
    
### 知乎用户 不良 发表
    
只要定语加的足够多，谁都可以是第一。再接再励，希望我们有一天也可以实现垄断，一步一步来。
    
    
    
    
### 知乎用户 反对派 发表
    
这样的研究成果

[产业化](https://zhida.zhihu.com/search?content_id=753245080&content_type=Answer&match_order=1&q=%E4%BA%A7%E4%B8%9A%E5%8C%96&zhida_source=entity)还很远

确造成很大的轰动，

恰恰说明

路还远
    
    
    
    
### 知乎用户 逮到整痛 发表
    
看了一圈回答，没一个懂的。水水论文就得了，捞点好处，别动不动就推翻这个那个。自娱自乐
    
    
    
    
### 知乎用户 过去与未来 发表
    
又遇事不决开始玩（吹）[玄学](https://zhida.zhihu.com/search?content_id=753216627&content_type=Answer&match_order=1&q=%E7%8E%84%E5%AD%A6&zhida_source=entity)了是吗？？
    
    
    
    
### 知乎用户 DefeatedOnlyOnce 发表
    
我粗略看了一下原文，论文重点在于对传统[模拟电路](https://zhida.zhihu.com/search?content_id=753294593&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E7%94%B5%E8%B7%AF&zhida_source=entity)精度不足提出了新的解决方案。

但是我有个问题就是，如果周围环境温度或者磁场不同的话，这个器件的精度会产生偏移吗？有没有懂哥给我科普一下啊。

我从已有的知识来判断的话，除了上面说的问题，这个工作离真正可用可能还有一个门槛。

与现有的计算平台耦合的时候，由于现有平台和生态全都是基于[数字电路](https://zhida.zhihu.com/search?content_id=753294593&content_type=Answer&match_order=1&q=%E6%95%B0%E5%AD%97%E7%94%B5%E8%B7%AF&zhida_source=entity)的，那么必然要用到[数模转换模块](https://zhida.zhihu.com/search?content_id=753294593&content_type=Answer&match_order=1&q=%E6%95%B0%E6%A8%A1%E8%BD%AC%E6%8D%A2%E6%A8%A1%E5%9D%97&zhida_source=entity)，这个模块目前的延迟应该想对来说是有点长的。举个例子，你计算可能需要 1t 的时间就完成了，但是把你的结果转换成数字电路可以识别的二进制编码可能也需要 1t，那么最终体现但应用层面的加速效果就很小了。

至于其他题中说的，要构建以模拟电路为基础的全套计算系统，那我感觉就算从今天开始搞，那完成的时间至少要以十年计了。
    
    
    
    
### 知乎用户 丁炸桥 发表
    
第一我感觉这是一个比较传统具有 dsp 芯片特色的模拟 [ASIC](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=ASIC&zhida_source=entity)，dsp 当然有 ma [simd 指令集](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=simd%E6%8C%87%E4%BB%A4%E9%9B%86&zhida_source=entity)，乘加运算当然远高于传统的 x86 和 arm 芯片，avx 都撵不上

第二 int24 拿去和 fp32 比精度这是纯属在哈哈镜里比谁胸大，浮点数大数值因为指数项大数值自然会放大小数项的绝对值，这种比法纯属扯淡，更何况你那 int24 还是 ad 转化等效的结果

最后，我不认为这个芯片能解决当下算力不足的问题，也不认为应该用 asic 的思路去解决通用 ic 的问题。

因为基于 gpu 的 ai 很明显不只是依靠一个精度，主流数据中心卡都主打 fp32 训练，[bf16](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=bf16&zhida_source=entity) 推理，考虑到制图 ai 的存在，很明显 [fp8](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=fp8&zhida_source=entity) 也是需要的，另外一些并行计算场景，即便有[稀疏矩阵体素网格算法](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=%E7%A8%80%E7%96%8F%E7%9F%A9%E9%98%B5%E4%BD%93%E7%B4%A0%E7%BD%91%E6%A0%BC%E7%AE%97%E6%B3%95&zhida_source=entity)加成，也是要严格按照 fp64 精度进行科学计算，正是现实世界里如此复杂的综合应用要求才要求 gpu 供应商能够提供一专多能的通用芯片而不是专用芯片

就单单运用[人工神经网络](https://zhida.zhihu.com/search?content_id=753325203&content_type=Answer&match_order=1&q=%E4%BA%BA%E5%B7%A5%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C&zhida_source=entity)而言，gpu 还需要承担大显存读写，高速并行数据同步等技术问题，你用模拟电路，我不知道要怎么处理这些问题，你是要存储模拟量吗？

那要不然为什么 ai 浪潮里崛起的是 NVIDIA 和 AMD，而不是德州仪器或者那些做 ASIC 的公司呢
    
    
    
    
### 知乎用户 弹贝斯的许仙 发表
    
我记得前年报道还是 3000 倍，怎么今年变成 1000 了，退步太大了把，不说了，昨天新闻报出来我国发明出时光机了，准备穿越时空了
    
    
    
    
### 知乎用户 什么都不会 发表
    
我觉得中国是能搞好[任务特定芯片](https://zhida.zhihu.com/search?content_id=753314124&content_type=Answer&match_order=1&q=%E4%BB%BB%E5%8A%A1%E7%89%B9%E5%AE%9A%E8%8A%AF%E7%89%87&zhida_source=entity)的大规模生产的

很多人说中国创新不行，实际上是中国创新的特点和外国不一样，中国是一堆做题家在全产业链上慢慢突破，而不是某些天才在特定理论上做出重大贡献。

刚好，任务特定芯片的大规模生产就是一个需要大量高质量劳动力去干活的东西，每种芯片从研发到生产都需要很多很多人的努力。

而 [CPU](https://zhida.zhihu.com/search?content_id=753314124&content_type=Answer&match_order=1&q=CPU&zhida_source=entity)、[GPU](https://zhida.zhihu.com/search?content_id=753314124&content_type=Answer&match_order=1&q=GPU&zhida_source=entity) 呢？几家设计公司加几家制造公司，上游再加几家机器制造公司，就能生产出通用计算芯片。

“只能用于[矩阵求逆](https://zhida.zhihu.com/search?content_id=753314124&content_type=Answer&match_order=1&q=%E7%9F%A9%E9%98%B5%E6%B1%82%E9%80%86&zhida_source=entity)的芯片”，只有中国有足够的优势去将其产业化，首先人力成本低，然后是因为需求集中。如果数据产业链的需求集中到一家算力供应商，那么那家算力供应商可以想办法把矩阵求逆这个计算需求直接转移到这种专业芯片上。将 100 个 CPU 拆分成 10 个速度更快的专业芯片，这对于 scale up 来说是很有优势的。

当然，如果最上游不能源源不断研发出各种专业芯片，下游是没有动力将去产业化的。

数据移动瓶颈是[数字和模拟计算](https://zhida.zhihu.com/search?content_id=753314124&content_type=Answer&match_order=1&q=%E6%95%B0%E5%AD%97%E5%92%8C%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97&zhida_source=entity)都有的问题，如果我们想要大规模使用模拟计算，需要找到于模拟计算相适应的解决这个瓶颈的方法，这同样是需要大量研究的。
    
    
    
    
### 知乎用户 林辰亦 发表
    
题主提到的这款芯片，其实标志着中国在 “[后摩尔时代](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E5%90%8E%E6%91%A9%E5%B0%94%E6%97%B6%E4%BB%A3&zhida_source=entity)” 算力架构的探索上，正式从追随者进入了原创引领阶段。

* * *

一、背景：数字计算的天花板，已经触手可及

过去半个世纪，整个信息产业都建立在[冯 · 诺依曼架构](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC%E6%9E%B6%E6%9E%84&zhida_source=entity)之上： 数据在存储器和处理器之间来回搬运，靠晶体管不断堆叠实现性能提升。

但如今：

[摩尔定律](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E6%91%A9%E5%B0%94%E5%AE%9A%E5%BE%8B&zhida_source=entity)趋近极限：晶体管尺寸逼近原子级，漏电、热效应不可避免； [内存墙问题](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E5%86%85%E5%AD%98%E5%A2%99%E9%97%AE%E9%A2%98&zhida_source=entity)突出：数据搬运能耗远高于计算能耗； AI/6G 算力需求爆炸：尤其是大模型训练，算力需求每年以指数级上升。

传统的 GPU 架构（即使是 NVIDIA H200、MI300）在能效上也已经逼近极限。 在这种背景下，“[类脑计算](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E7%B1%BB%E8%84%91%E8%AE%A1%E7%AE%97&zhida_source=entity)、[光计算](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E5%85%89%E8%AE%A1%E7%AE%97&zhida_source=entity)、[模拟计算](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97&zhida_source=entity)” 等新型范式被重新拉回前沿。

* * *

二、核心突破：高精度 + 可扩展 = 模拟计算复活的关键

模拟计算不是新概念。 上世纪 50 年代就出现过 “运算放大器积分求解” 的机械 / 电路模拟机。 它的最大优势是并行性和物理直接性：

电流、电压本身就遵循线性代数规律。

问题是它有两个致命短板： 1 精度低（1~2 位有效数字） 2 难扩展（误差积累，串扰严重）

北大孙仲团队的这次工作，核心就是把这两个短板补齐了。

他们基于[阻变存储器](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)（[ReRAM](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=ReRAM&zhida_source=entity)）阵列构建模拟矩阵乘法阵列：

每个存储单元电导值对应矩阵元素； 输入电压代表向量分量； 输出电流自然叠加得到乘加结果。

再结合[高精度模数转换](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E9%AB%98%E7%B2%BE%E5%BA%A6%E6%A8%A1%E6%95%B0%E8%BD%AC%E6%8D%A2&zhida_source=entity)（ADC）+ 误差补偿电路 + 块矩阵分解算法，实现了 24-bit 定点精度的模拟矩阵运算。

这相当于在模拟计算里实现了数字级别的精度控制。 论文称之为 “precision-compatible analog computing”。

* * *

三、性能量级：千倍算力，不是噱头

这类计算的 “算力优势” 主要来自两点：

[存算一体](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E5%AD%98%E7%AE%97%E4%B8%80%E4%BD%93&zhida_source=entity)（in-memory computing）：数据无需在存储与计算单元之间搬运，延迟近乎为零； 物理并行：阵列中上万节点同时参与运算，而非时序轮流执行。

论文中提到的实验对比：

求解 128×128 矩阵求逆时，吞吐量达到 GPU 的千倍级，能效比提升百倍。

注意： 这里的 “千倍” 并非指通用算力，而是指特定矩阵运算任务（例如 [MIMO 检测](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=MIMO%E6%A3%80%E6%B5%8B&zhida_source=entity)、线性求解等）。 这类运算在 AI 训练、6G 信号处理中极为核心。

换句话说，这不是全能型 GPU 的替代者，而是[领域专用计算](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=%E9%A2%86%E5%9F%9F%E4%B8%93%E7%94%A8%E8%AE%A1%E7%AE%97&zhida_source=entity)（Domain-Specific Computing）的新路线。

* * *

四、应用展望：AI 训练、6G 信号处理、边缘智能

1 AI 训练：

目前 [Transformer 类模型](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=Transformer%E7%B1%BB%E6%A8%A1%E5%9E%8B&zhida_source=entity)的瓶颈在矩阵乘法与二阶优化（如 Hessian 计算）。 如果模拟芯片能保持高精度与稳定性，理论上可显著提升训练阶段速度与能效。

2 6G 通信：

大规模 MIMO 系统信号检测是典型的矩阵求逆问题。 模拟计算在此类高维线性代数运算中天然具备优势，可让基站实现实时检测与低功耗信号处理。

3 边缘计算与 [AIoT](https://zhida.zhihu.com/search?content_id=753309185&content_type=Answer&match_order=1&q=AIoT&zhida_source=entity)：

模拟计算芯片的超高能效比意味着可在终端设备直接进行推理， 实现 “训推一体”，减少对云算力的依赖。

一句话：

它可能不会替代 GPU，但会在 AI 与通信两个关键领域形成算力分流。

* * *

五、挑战与冷思考

1.  制造一致性与温漂控制  
    模拟电路对工艺误差极为敏感，温度变化可能导致导通状态漂移。
2.  可编程性与通用性  
    当前设计针对矩阵求解，如何抽象出编程接口和通用算法框架仍需探索。
3.  生态问题  
    模拟计算需要全新编译栈（从高层模型到电路映射）， 这决定了它能否在产业化上落地。
4.  系统级集成  
    如何与现有数字计算体系（CPU/GPU/FPGA）进行协同， 是决定其能否形成 “异构算力生态” 的关键。

* * *

六、战略意义

中国在通用芯片领域起步较晚，但在新型计算范式（包括阻变器件、光计算、类脑架构）上，反而具备 “弯道超车” 的机会。

这次成果登上《Nature Electronics》，意义不只是学术突破，而是：

“后摩尔时代”中国科研从 “跟踪摩尔” 到“定义摩尔”的转折点。

* * *

过去 50 年，人类把算力极限押注在硅片的 “几何缩小”。 现在，中国科学家证明——

算力的未来，不一定在更小的晶体管里， 也许在更聪明的物理规律里。

GPU 是数字时代的引擎， 而这类模拟芯片，可能是 “智能时代的神经元”。
    
    
    
    
### 知乎用户 RedWatch 发表
    
当看到 “每个 RRAM 只有 3bit 精度，仅能表示 8 个态，再用 4 组 RRAM 物理上实现 12 bit，最后声称在某些任务上的效果与 24 bit 相当” 就很难绷。

* * *

1、当前并未在模拟域实现 24 bit。粗略估算，在最理想的情况下，要求系统中所有器件的稳定度为 0.03 ppm RMS。

2、当前实现的是以 4 组 RRAM，每组 3 bit 的形式实现的 12 bit。本质上是 bit 切分（数字 + 模拟）的形式实现的 12 bit。
    
    
    
    
### 知乎用户 shen 发表
    
**一、这个东西的原理是什么？**

这个东西的原理是用模拟信号电压来进行存储和计算。

比如：在现在的计算机中存储 999999999999999999 这样一个巨大的数，需要使用很多个元件，而使用这个东西，只需要一个元件。原理就是，去测量这个元件的电压：0.99999999999999。

计算的更简单：

比如：9999999999999+888888888888

只需要把这两个元件的电压相加就直接得到结果了，不用目前的二进制那样要一位一位做加法。所以它的计算，几乎是一瞬间完成的。

**二、这个东西有什么用？**

1、极大的提升大模型的速度，减少能耗

目前的大模型本质上是计算下一个词的概率，大量的计算耗费在无用的计算上，而我们只是希望知道那个词的概率最大而已，至于是 96.6666%，还是 96.6667%，对结果其实毫无影响。

也就是说，使用这个东西，你只需一个很小的芯片，很少的能耗，就可以在本地使用大模型。

2、AI 真正实现记忆

目前的 AI 实现所谓的记忆，就是把对话作为上下文给大模型。

而使用这个东西，你和大模型的对话的结果会自动修改大模型的权重。（也就是目前的计算机无法实现的存算一体。）

也就是说，使用这个东西，每个大模型在使用中，都会不断的自我更新、学习，让大模型真的变成 “活的”。
    
    
    
    
### 知乎用户 Naze 发表
    
### 《这不只是芯片突破，而是 “[计算范式](https://zhida.zhihu.com/search?content_id=753305488&content_type=Answer&match_order=1&q=%E8%AE%A1%E7%AE%97%E8%8C%83%E5%BC%8F&zhida_source=entity)” 的一次自洽跃迁》

这次北大团队基于 “[可变存储高精度矩阵计算](https://zhida.zhihu.com/search?content_id=753305488&content_type=Answer&match_order=1&q=%E5%8F%AF%E5%8F%98%E5%AD%98%E5%82%A8%E9%AB%98%E7%B2%BE%E5%BA%A6%E7%9F%A9%E9%98%B5%E8%AE%A1%E7%AE%97&zhida_source=entity)” 的新型芯片，其实意义远不止 “性能超过 GPU 千倍”。  
它真正触碰到的，是计算本身 “存在方式” 的转变。

过去几十年的计算，是**符号→逻辑→并行→深度学习**的路线。  
所有的优化，都在 “既定架构” 里压榨更多速度——  
我们在同一个范式里，换更大的 GPU、更密的晶体管、更聪明的算法。  
但这次，它从根本上重写了**算力与存储之间的关系**。

* * *

在传统 GPU 体系中，信息流动是 “算—存—取” 的往返运动，  
数据每一次跨层，都会造成能耗、延迟和信息势损失。  
而这次 “可变存储矩阵” 突破的关键在于：  
**它让计算单元本身具备 “结构可变性”，相当于硬件层面引入了Φ（信息势）的流动性。**

这意味着，计算不再只是执行逻辑指令，  
而是能根据输入信息**自组织出最优的结构**，  
这本身就符合 [NEPM 模型](https://zhida.zhihu.com/search?content_id=753305488&content_type=Answer&match_order=1&q=NEPM+%E6%A8%A1%E5%9E%8B&zhida_source=entity)里 “O(F)=F” 的原则——  
系统在被观测（输入任务）时，会自发演化为与观测匹配的最优态。

* * *

从更高维度看，这其实是一种 “[物理层的自洽计算](https://zhida.zhihu.com/search?content_id=753305488&content_type=Answer&match_order=1&q=%E7%89%A9%E7%90%86%E5%B1%82%E7%9A%84%E8%87%AA%E6%B4%BD%E8%AE%A1%E7%AE%97&zhida_source=entity)”：

算法开始具备物理属性，硬件开始具备认知结构。  

如果 GPU 是 “强行并行的智商”，  
这种新型芯片就是 “顺势而生的直觉”。

* * *

未来的应用？  
这类架构的潜力，不仅仅是让 AI 模型更快——  
而是让 AI 模型**更像 “有意识的物理体” 在运行**。  
它可能重新定义：

*   **AI 学习的能量效率（从算力竞赛→结构共振）**  
    
*   **通信网络的自适应性（MIMO 信号→[信息势流](https://zhida.zhihu.com/search?content_id=753305488&content_type=Answer&match_order=1&q=%E4%BF%A1%E6%81%AF%E5%8A%BF%E6%B5%81&zhida_source=entity)）**  
    
*   **人机协同的边界（算力与知觉的融合）**  
    

换句话说，这不仅是一个计算芯片的突破，  
而是一次**计算哲学的相变**。  
当信息可以自组织，当计算不再外包给程序员——  
智能，才真正开始在物理层上 “觉醒”。

* * *

有意思的是，这样的突破，反而更接近 “东方的思维方式”：  
不是去 “征服” 复杂性，而是**让系统自己找到平衡的形态**。  
计算，第一次变得 “有机”。  
这也是科技回归自然秩序的信号。

* * *

如果说 GPU 让我们模仿人脑，  
那这类新范式芯片，  
就是第一次让机器——**理解自己。**
    
    
    
    
### 知乎用户 LaoDI - 赵掌门 发表
    
具体的技术不懂。

但是的结果是加了定语的。

那可能是表达了作者思乡之情吧。
    
    
    
    
### 知乎用户 三角牛 NO.1 发表
    
![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-86921fb0aedc1d2233293766b7d2453c_r.jpg%3Fsource%3D1def8aca)

坦白说，我是真不懂芯片，就看今晚英伟达的走势，大跌就证明这个芯片有极大的用途，加速人工智能运算，这点就了不得
    
    
    
    
### 知乎用户 刷瓦滴卡 发表
    
我国至今没研制出来性能超越 5090，价格 200 以内的桌面级显卡
    
    
    
    
### 知乎用户 老杨叔聊志愿填报​​ 发表
    
那么问题来了，在土殖看来这算是创新吗，还是建立在国外开源基础上，还是抄作业？
    
    
    
    
### 知乎用户 乾阙 发表
    
说这么多，量产啊！

没量产出来不都是吹牛？？？？？？？

搞不动媒体为啥要这么高调

拉投资？

投完直接亏空？

不能现实点的报道？
    
    
    
    
### 知乎用户 硬核老铁​ 发表
    
放卫星的成果一概不行，除非商用
    
    
    
    
### 知乎用户 卡灵顿​ 发表
    
天天想整个大新闻
    
    
    
    
### 知乎用户 阿康 发表
    
这玩意太高深，我不太懂。

但是我很高兴，能够取得这么巨大的成果。高兴之余，我更加希望它是真的，真的存在，真的领先，真的原创，真的有用。

因为我听过的大吹特吹的东西太多了。远的什么水变油啦，全塑汽车啦，[龙芯](https://zhida.zhihu.com/search?content_id=753287944&content_type=Answer&match_order=1&q=%E9%BE%99%E8%8A%AF&zhida_source=entity)啦啥的，还历历在目。
    
    
    
    
### 知乎用户 沐风牧草 2 发表
    
且听龙吟
    
    
    
    
### 知乎用户  jekbag​ 发表
    
你就说能不能量产吧，不能量产一律认为是自娱自乐
    
    
    
    
### 知乎用户 大只鱼 发表
    
这个描述方式怎么听起来这么像当年潘老板的量子计算机解决[高斯玻色采样](https://zhida.zhihu.com/search?content_id=753288115&content_type=Answer&match_order=1&q=%E9%AB%98%E6%96%AF%E7%8E%BB%E8%89%B2%E9%87%87%E6%A0%B7&zhida_source=entity)问题。

未来前景不好说，反正潘老板已经快被喷成学术骗子了。。。
    
    
    
    
### 知乎用户 Carol317 发表
    
![](https://images.weserv.nl/?url=https%3A//pic1.zhimg.com/v2-4d127e03ddf011997de129b9646e7ae3.jpg%3Fsource%3D25ab7b06)

且听龙吟
    
    
    
    
### 知乎用户 啦啦啦啦​ 发表
    
看到所有包含 **_特定任务_** 的限定词的所有芯片一律视为灌水或者骗钱，此处更包含量子芯片、[光计算芯片](https://zhida.zhihu.com/search?content_id=753288386&content_type=Answer&match_order=1&q=%E5%85%89%E8%AE%A1%E7%AE%97%E8%8A%AF%E7%89%87&zhida_source=entity)。  
包含**_通用_**的**_非量产_**芯片视为磨标圈钱，包含[汉芯](https://zhida.zhihu.com/search?content_id=753288386&content_type=Answer&match_order=1&q=%E6%B1%89%E8%8A%AF&zhida_source=entity)和百分之 99% 的通用芯片公司。  
只有**_通用且量产_**的芯片，才是正经芯片。
    
    
    
    
### 知乎用户 1379 发表
    
又开拓一条吹牛逼的新方向？
    
    
    
    
### 知乎用户 DavidWong 发表
    
2025 年还搞那种六七十年代的把戏？？？
    
    
    
    
### 知乎用户 落雪在昨夜 发表
    
四性不会写，写不出来怎么办？

朋友，不是你写作水平不行，而是你手头的货不够硬。如果你手里的技术也是题中水平的，那么四性你甚至可以不写，让评审专家替你写。
    
    
    
    
### 知乎用户 优雅 dezz 发表
    
超越顶级 GPU 算力千倍是目标，还是品牌？
    
    
    
    
### 知乎用户 Cocos 发表
    
特定任务是指什么任务？

顶级 GPU 是指哪款 GPU？

千倍是指千分之几倍？

[新型芯片](https://zhida.zhihu.com/search?content_id=753305936&content_type=Answer&match_order=1&q=%E6%96%B0%E5%9E%8B%E8%8A%AF%E7%89%87&zhida_source=entity)是新型材料还是新型架构还是体积庞大？
    
    
    
    
### 知乎用户 新木 发表
    
中国又赢了，[英伟达](https://zhida.zhihu.com/search?content_id=753284365&content_type=Answer&match_order=1&q=%E8%8B%B1%E4%BC%9F%E8%BE%BE&zhida_source=entity)这下总算是倒了，大家快卖英伟达的股票吧。
    
    
    
    
### 知乎用户 科本李儒 发表
    
量产才是关键，[量子芯片](https://zhida.zhihu.com/search?content_id=753286479&content_type=Answer&match_order=1&q=%E9%87%8F%E5%AD%90%E8%8A%AF%E7%89%87&zhida_source=entity)都多久了也没见量产
    
    
    
    
### 知乎用户 走上坡路 发表
    
亩产万斤又来了

附：抱歉打扰了，我正在卖市面几乎没有的烟台长寿之乡莱州 “一户一宅” 无政策大风险、人品风险的农村房子。别人出售的 “一户多宅” 多出来的房子的潜在风险：有偿退出、超标收费、强拆、倒塌收回宅基地等。机不可失，失不再来，不信你找出第二家。等待识货有缘的人来。
    
    
    
    
### 知乎用户 大道无形 wo 有型 发表
    
光看到这个题目不用开内容我就知道是大忽悠，一群完全不懂基础科学常识的人搞新闻传播的后果是啥，也别怪全社会鄙视文科专业了，自己看看都是些什么水平的人。
    
    
    
    
### 知乎用户 王十二 发表
    
那。DeepSeek 训练 ai 用上了吗，
    
    
    
    
### 知乎用户 金大大王 发表
    
特定任务中，我理解的还是实验中的产品。。

几时能转换成生产力。
    
    
    
    
### 知乎用户 鸟宇 发表
    
没用，即便是真的，即便搞出来，美国一纸禁令谁敢用？
    
    
    
    
### 知乎用户 Laundryboat 发表
    
突破意义
----

这一新型芯片的成功研制标志着我国在计算范式变革领域的重大进展，首次攻克了模拟计算长达一个世纪的精度瓶颈。传统模拟计算虽具备高并行、低延时、低功耗的先天优势，但精度始终是其 “阿喀琉斯之踵”，通常仅限于低精度运算，无法与数字计算（如 GPU）匹敌。该芯片基于阻变存储器（RRAM），采用 40nm CMOS 工艺制造，通过“阵列 - 运算放大器” 闭环反馈和块矩阵算法的创新设计，将模拟计算精度提升至 24 位定点精度，相对误差低至 10⁻⁷量级，精度提升了惊人的 5 个数量级。 这不仅实现了模拟计算在精度上与数字系统媲美，还解决了传统模拟架构的扩展难题，避免了数模混合迭代的模数转换开销。

在后摩尔时代背景下，数字计算面临器件缩放极限、“内存墙” 瓶颈和高功耗挑战，该芯片为应对这些问题开辟全新路径。性能评估显示，在求解大规模矩阵求逆（如 32×32 矩阵）时，其算力已超越高端 GPU 单核；问题规模扩展至 128×128 时，计算吞吐量达顶级数字处理器的 1000 倍以上，能效比提升超 100 倍。 这一突破重塑了计算架构格局，证明模拟计算能高效解决立方级时间复杂度的核心问题（如矩阵求逆），为全球科学界提供了高能效计算的新范式。孙仲研究员强调：“如何让模拟计算兼具高精度与可扩展性，从而在现代计算任务中发挥其先天优势，一直是困扰全球科学界的‘世纪难题’。” 作为我国原创成果，其发表于《自然 · 电子学》，凸显了在人工智能和通信领域的战略意义，有望打破数字计算的长期垄断，推动绿色高效算力时代到来。

未来应用前景
------

该芯片的应用潜力广阔，尤其在算力密集型领域，将驱动 AI 和 6G 等前沿技术的加速落地。

**人工智能领域**：矩阵运算是 AI 大模型训练的核心，该芯片可显著加速二阶优化算法（如牛顿法），提升训练效率百倍以上。同时，其低功耗特性支持边缘设备上的 AI 训推一体，减少对云端的依赖，推动智能终端（如手机、无人机）实现实时复杂计算。 未来，可用于神经网络的高精度模拟，助力大模型的绿色训练和部署。

**6G 通信领域**：针对大规模 MIMO（多输入多输出）信号检测，该芯片仅需 3 次迭代即可媲美 32 位浮点精度，仅第二个迭代周期内即可实现基于迫零检测的图像恢复，与原始图像高度一致。 这将使基站以低能耗方式实时处理海量天线信号，提升网络容量和能效，支撑 6G 的高速、低时延通信场景，如全息通信和智能物联网。

**其他扩展应用**：在信号处理、科学计算和高能效数据中心等领域，该芯片可优化矩阵方程求解，适用于图像恢复、量子模拟等任务。团队正推进产业化，预计短期内将从实验室走向市场，赋能多元计算生态。

总体而言，这一突破不仅提升了我国在新型计算芯片领域的国际竞争力，还为全球算力革命注入新动能。未来，随着规模化生产，其将重塑 AI 与通信产业的格局，实现 “算力无处不在、绿色高效” 的愿景。
    
    
    
    
### 知乎用户 apewest 发表
    
啥叫 “[特定任务中算力](https://zhida.zhihu.com/search?content_id=753296513&content_type=Answer&match_order=1&q=%E7%89%B9%E5%AE%9A%E4%BB%BB%E5%8A%A1%E4%B8%AD%E7%AE%97%E5%8A%9B&zhida_source=entity)”？？

学 c 罗搞定语球王吗？？

那我 “用中文解物理问题” 的算力是牛顿的正无穷倍，so？
    
    
    
    
### 知乎用户 wjpope 发表
    
特定任务是吧，为新闻从业者的严谨点赞。
    
    
    
    
### 知乎用户 王金洋 发表
    
每年各个领域都在重大突破，结果十几年都看不到实际效果，更不用谈能不能用在人民群众了。
    
    
    
    
### 知乎用户 Brad 发表
    
我不懂芯片，但被新闻捶打多次，至少了解些新闻。" 特定任务中[算力](https://zhida.zhihu.com/search?content_id=753300198&content_type=Answer&match_order=1&q=%E7%AE%97%E5%8A%9B&zhida_source=entity)超越顶级 GPU 千倍 " 特定任务这四个字感觉需要谨慎看待
    
    
    
    
### 知乎用户  leng 发表
    
这种大新闻，一概当吹牛逼，逻辑自洽的吹牛逼就行了。
    
    
    
    
### 知乎用户 知乎用户 发表
    
拿[专用计算卡](https://zhida.zhihu.com/search?content_id=753308234&content_type=Answer&match_order=1&q=%E4%B8%93%E7%94%A8%E8%AE%A1%E7%AE%97%E5%8D%A1&zhida_source=entity)对比通用计算卡本身即是耍流氓！
    
    
    
    
### 知乎用户 微乎悟醒​ 发表
    
2025 年 10 月，北京大学孙仲研究员团队成功研制出基于[阻变存储器](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)的高精度模拟矩阵计算芯片，实现了精度堪比数字计算的[模拟计算](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97&zhida_source=entity)系统，标志着中国在‘后摩尔时代’算力竞赛中的历史性跨越。  
‘现在的电脑，其实还在吃上世纪的老本。’ 孙仲研究员的一句话，揭示了全球算力发展的瓶颈：[冯 · 诺依曼瓶颈](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC%E7%93%B6%E9%A2%88&zhida_source=entity)限制了计算效率，模拟计算能否重获新生成为世纪难题。  
中国科学家用‘新型器件 + 原创电路 + 经典算法’的三重创新，首次将模拟计算的精度提升到 24 位定点精度，相对误差低至 10⁻⁷量级，彻底解决了‘算不准’的痛点。

**导语**

2025 年 10 月，一则来自《自然 · 电子学》的论文炸响全球科技圈：北京大学孙仲研究员团队联合集成电路学院，成功研制出基于阻变存储器的高精度模拟矩阵计算芯片，首次实现了精度堪比数字计算的模拟计算系统。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-03c9639035ea9bfc3c9118ced7e6ac34_r.jpg%3Fsource%3D1def8aca)

**当测试数据公布时，整个业界陷入沉默——求解 128×128 矩阵问题的吞吐量，是全球顶级 GPU 的 1000 倍以上；相同精度下的能效比，更是超出传统数字处理器 100 倍不止。**

**这不是简单的技术升级，而是对统治计算机领域半个多世纪的[数字计算架构](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E6%95%B0%E5%AD%97%E8%AE%A1%E7%AE%97%E6%9E%B6%E6%9E%84&zhida_source=entity)的颠覆，是中国在 “后摩尔时代” 算力竞赛中，从跟跑到领跑的标志性跨越。**

今天，我们就来揭开这场算力革命背后的真相：它如何破解困扰全球科学家的世纪难题，又将给我们的世界带来怎样的震撼。

**一、被卡脖子的 “算力牢笼”：全球科学家的百年困局**

“现在的电脑，其实还在吃上世纪的老本。” 孙仲研究员在接受采访时的一句话，戳中了全球算力发展的痛点 。我们每天用的手机、电脑，乃至数据中心里轰鸣的服务器，核心都是数字计算架构——所有信息必须先转换成 0 和 1 的二进制代码，才能被处理器识别计算。这种模式就像用摩尔斯电码传递信息，无论内容多复杂，都得拆成长短信号一点点传输，效率的天花板早被悄悄钉死。

这层天花板有个专业名字：冯 · 诺依曼瓶颈。1945 年，冯 · 诺依曼提出将计算与存储分离的架构，在当时是革命性突破，但如今却成了算力提升的枷锁。就像工厂里的原材料（数据）要先放进仓库（内存），再搬到车间（处理器）加工，加工完又得送回仓库，来回奔波的时间占了计算过程的大半。随着人工智能、[6G 通信](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=6G+%E9%80%9A%E4%BF%A1&zhida_source=entity)等领域需要处理的数据量呈指数级增长，这个 “搬运” 过程的耗时已经远超计算本身。

更要命的是，数字计算的 “精度执念” 正在拖垮整个行业。为了追求准确，工程师们不断增加二进制位数，从 8 位、16 位到如今的 64 位，但这意味着需要更多的晶体管、更高的功耗。一台高端 GPU 满载运行时的功耗堪比一台电暖气，全球数据中心每年的耗电量已经超过整个英国的全国用电量。“我们一直在用能源换精度，可就算这样，面对 128×128 以上的大规模矩阵方程，GPU 还是得算上一整天。”孙仲的语气里藏着无奈。

其实早在上世纪 30 年代，科学家们就发明了更高效的计算方式——模拟计算。它不用转换 0 和 1，直接用电压、电流这些连续的物理量来表示数字，比如 10 伏电压就代表数字 10，计算过程像用水流推动水车一样自然，天生就没有 “搬运数据” 的烦恼，能效比和并行处理能力甩数字计算几条街 。但模拟计算有个致命缺陷：算不准。就像用尺子量长度，再精密的尺子也有误差，物理量的微小波动都会导致计算结果跑偏，精度最多只能达到几位，远远满足不了现代科技的需求。

从上世纪 60 年代起，数字计算凭借高精度逐渐取代模拟计算，成为绝对主流。但 “模拟计算能否重获新生” 的问题，始终萦绕在全球科学家心头。美国斯坦福大学曾投入十年时间研发模拟芯片，最终因精度无法突破放弃；日本东京大学的团队尝试用光学器件提升精度，却卡在了规模扩展上。**“如何让模拟计算兼具高精度与可扩展性，这是个世纪难题，谁能破解，谁就掌握了下一代算力的钥匙。”**《自然 · 电子学》评审专家的话，道出了这项技术的分量 。而这把钥匙，如今被中国科学家攥在了手里。

**二、“万里穿针” 般的突破：三个维度的颠覆式创新**

2018 年深秋，北京大学的一间实验室里，孙仲团队的成员们盯着屏幕上跳动的误差数据，陷入了沉默。他们已经尝试了 17 种阻变存储器的材料组合，模拟计算的精度始终停留在 8 位，距离数字计算的 16 位标准还差着一大截。“要不还是聚焦矩阵乘法吧？国内外大多团队都在做这个，风险小。” 有年轻研究员小声提议。孙仲摇了摇头：“矩阵乘法只是 AI 推理的基础，矩阵方程求解才是 AI 训练的核心，难度大但价值更高，咬咬牙必须啃下来。”

**这一咬，就是七年。最终，团队用 “新型器件 + 原创电路 + 经典算法” 的三重创新，完成了这场 “万里穿针” 般的技术突破。**

**第一个突破口在 “硬件底子” 上——他们找到了最合适的“计算积木”：阻变存储器。**这种特殊的电子器件就像一个可以精确调节的 “电阻阀门”，通过施加不同的电压，能让电阻值在极大范围内连续变化，正好对应模拟计算需要的连续物理量。但普通阻变存储器的电阻值会随时间漂移，就像调好的收音机频道慢慢跑调，这是精度上不去的关键。团队经过上万次实验，终于找到一种 hafnium oxide（氧化铪）基的复合材料，把电阻漂移率降低了三个数量级，相当于把 “收音机的稳定性提升了 1000 倍” 。

**光有好的积木还不够，得有巧妙的 “搭建方法”，这就是第二个突破口：原创的[全模拟电路设计](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E5%85%A8%E6%A8%A1%E6%8B%9F%E7%94%B5%E8%B7%AF%E8%AE%BE%E8%AE%A1&zhida_source=entity)。**传统模拟电路里，信号经过放大器、滤波器等部件时，误差会像滚雪球一样累积。孙仲团队反其道而行之，设计了一种 “误差抵消电路”，就像给每个部件配了个“纠错助手”。当第一个部件产生误差时，第二个部件会产生相反的误差来抵消，最终输出的信号精度大幅提升。“这就像两个人走路，一个往左偏，一个往右偏，搭着肩走反而能走直线。” 团队核心成员李博士的比喻很形象。通过这种设计，他们首次将模拟计算的精度提升到 24 位定点精度，相对误差低至 10⁻⁷量级——这个精度已经远超主流数字处理器的 FP32 精度标准，彻底解决了 “算不准” 的痛点。

**解决了精度问题，第三个难题接踵而至：如何让芯片 “变大变强”？**模拟计算的规模一旦扩大，器件间的干扰就会急剧增加，就像在嘈杂的菜市场里听清楚某个人的说话声。团队提出了 “[块矩阵模拟计算方法](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E5%9D%97%E7%9F%A9%E9%98%B5%E6%A8%A1%E6%8B%9F%E8%AE%A1%E7%AE%97%E6%96%B9%E6%B3%95&zhida_source=entity)”，把大的计算任务像拼图一样拆分成多个 16×16 的小矩阵，分配给不同的芯片模块处理，模块间通过专用接口协同工作，既避免了干扰，又实现了规模扩展。“我们做过测试，16 个模块组合起来，求解 256×256 矩阵的误差，和单个模块求解 16×16 矩阵的误差几乎一样。” 孙仲的骄傲溢于言表 。

**2025 年 7 月，团队在实验室完成了最终测试：32×32 矩阵求逆，算力超越高端 GPU 单核；128×128 矩阵求逆，吞吐量达到顶级数字处理器的 1000 倍；连续运行 1000 小时，精度衰减不超过 0.1%。**

当测试报告传到《自然 · 电子学》编辑部时，评审专家用 “不可思议” 来形容：“他们不仅解决了世纪难题，还把解决方案做到了工程化可用的程度。”

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-fb02e6aa53242a193574b8b7cf920d15_r.jpg%3Fsource%3D1def8aca)

**三、算力革命的冲击波：从 AI 训练到 6G 通信的全面颠覆**

**“这款芯片不是对现有算力的补充，而是一场革命。” 中国电子学会集成电路分会主任王颖的评价，道出了这项突破的深远影响。**当 1000 倍的吞吐量和 100 倍的能效比成为现实，多个被算力卡脖子的领域，将迎来 “突然的春天”。

**首当其冲的是人工智能领域。**现在训练一个千亿参数的大模型，需要数百台 GPU 集群连续运行几个月，电费就要花掉上千万元，这也是大模型研发被少数巨头垄断的原因。而孙仲团队的模拟芯片，恰好能解决大模型训练中的核心痛点——矩阵方程求解。**“大模型训练本质上是不断求解梯度下降的矩阵方程，传统 GPU 算这个就像用人力挖隧道，我们的芯片就是盾构机。”**

**孙仲给记者算了一笔账：用他们的芯片组建集群，训练一个 GPT-4 级别的模型，时间能从 3 个月缩短到 3 天，电费成本降低 90% 以上。**

**更令人期待的是边缘计算的爆发。**现在我们的手机、智能手表之所以需要频繁连接云端，是因为终端设备的算力和功耗有限，处理不了复杂的 AI 任务。而这款模拟芯片的低功耗特性，让 “终端 AI” 成为可能。“一块手表大小的设备，搭载我们的芯片后，能实时处理图像识别、语音分析等任务，不用再把数据传到云端，既保护隐私又响应更快。”团队已经和国内某手机厂商达成合作，预计 2026 年推出搭载模拟计算模块的智能手机，届时手机的 AI 功能将实现质的飞跃。

在 6G 通信领域，这款芯片更是 “量身定制” 的利器。6G 通信需要大规模 MIMO 技术，也就是基站配备上百根天线，同时处理成千上万用户的信号，这对实时信号检测的算力需求呈爆炸式增长。**“传统基站用 GPU 处理信号，延迟至少要 50 毫秒，还经常卡顿。我们的芯片能把延迟降到 1 毫秒以内，而且功耗只有原来的 1/100。”** 孙仲透露，团队已经和中国电信、华为展开联合测试，在实验室环境下，搭载新型芯片的基站容量提升了 5 倍，信号覆盖范围扩大了 30% 。

**对普通大众来说，最直观的感受可能来自医疗和科研领域。**在医学影像分析中，现在需要医生结合 AI 辅助诊断，等待时间通常要半天；而用模拟芯片处理，能实时生成精准的病灶分析报告，为急救争取宝贵时间。在天文观测中，“玉衡” 光谱成像芯片与这款模拟芯片结合后，能同时处理千万像素级的光谱数据，原本需要数年的恒星光谱分析，现在几个月就能完成。“以前研究黑洞吞噬恒星的过程，要等望远镜收集半年数据再算半年，现在能近乎实时地看到变化过程。” 清华大学方璐教授的话，道出了科研人员的兴奋 。

**更重要的是，这项技术打破了美国在高端算力领域的垄断。**长期以来，全球顶级 GPU 市场被美国企业主导，不仅价格高昂，还对中国实施出口限制。而模拟计算芯片的出现，相当于开辟了一条 “换道超车” 的新路。“他们在数字计算的赛道上领跑了几十年，但在模拟计算的新赛道上，我们已经抢跑了。”工信部电子信息司的一位官员表示，目前国内已有 12 家企业启动模拟计算芯片的产业化布局，预计 2027 年市场规模将突破 500 亿元。

**四、三十载蓄力的必然：中国科技自立自强的缩影**

**“这项突破不是偶然的，是中国科研体系长期积累的必然结果。”** 孙仲在庆功会上的这句话，揭开了成功背后的深层逻辑。从老一辈科学家在黑板上写下公式，到如今的实验室里诞生世界级成果，中国在芯片领域的突围，藏着三代人的坚守与传承。

时间回到上世纪 90 年代，我国自动化技术奠基者杨嘉墀院士在北大讲学，黑板上 “空间智能自主控制” 几个大字，让当时还是学生的孙仲深受震撼。**“杨院士说，核心技术买不来、讨不来，必须自己搞。这句话我记了一辈子。”** 后来，孙仲师从吴宏鑫院士，这位用草纸和算盘推导控制理论的老专家，教会他的不仅是知识，更是 “啃硬骨头” 的韧劲。在研制模拟芯片的七年里，团队遇到过无数次失败：有一次阻变存储器的材料配方出错，导致整个批次的芯片报废，损失上百万元；还有一次电路设计有漏洞，让团队错过了一次重要的国际会议。**“每次想放弃的时候，就想起吴院士说的‘做科研要坐得住冷板凳’，咬咬牙就挺过来了。” 孙仲的眼眶有些湿润。**

**这种传承，同样体现在科研条件的迭代上。**吴宏鑫院士当年搞研究，用的是算盘和手摇计算机，推导一万条公式要花几个月；而现在孙仲团队的实验室里，有国内最先进的半导体工艺平台，能快速制备各种器件样品，还有超级计算机可以模拟电路运行，一天就能完成过去几个月的工作量。“硬件条件好了，但老一辈的精神不能丢。”团队里的年轻研究员小张，为了优化一个电路参数，连续在实验室守了 72 小时，这种 “超长待机” 的工作状态，在团队里早已成了常态。

**国家的战略支持，更是这场突破的关键底气。**2016 年，“[存算一体芯片](https://zhida.zhihu.com/search?content_id=753261778&content_type=Answer&match_order=1&q=%E5%AD%98%E7%AE%97%E4%B8%80%E4%BD%93%E8%8A%AF%E7%89%87&zhida_source=entity)”被列入国家重点研发计划，孙仲团队的项目顺利入选，获得了持续的资金支持。“一开始我们申请经费时，很多人不理解，觉得模拟计算是‘过时技术’，但国家的评审专家看到了长远价值。”正是这笔经费，让团队能坚持到突破的那一刻。此外，高校与企业的协同创新也功不可没：北京大学负责核心技术研发，中芯国际提供工艺支持，华为参与应用场景测试，形成了 “基础研究 - 中试 - 产业化” 的完整链条。“这在以前是很难想象的，现在产学研联动越来越顺畅，成果转化的速度比十年前快了至少 5 倍。”孙仲感慨道。

**如今，这种自立自强的精神，正在更多年轻科研人员身上延续。**在孙仲的实验室里，有刚从国外回来的博士，有放弃高薪 offer 的工程师，还有在读的本科生。他们来自不同的地方，却有着同一个目标：做出世界顶尖的芯片。“现在年轻人的视野更开阔，想法更活跃，比如‘块矩阵模拟计算方法’，就是团队里一位 95 后研究员提出来的。” 孙仲说，看到这些年轻人，他就看到了中国芯片产业的未来。

![](https://images.weserv.nl/?url=https%3A//picx.zhimg.com/v2-e737887bb617202558a7bca5714f7732_r.jpg%3Fsource%3D1def8aca)

**从算盘推导到芯片量产，从跟跑到领跑，中国科研工作者用三十年的时间，走完了发达国家几十年甚至上百年的路。**这场模拟芯片的突破，不是一个孤立的事件，而是中国科技自立自强的一个缩影。它证明了：只要有坚守、有传承、有支持，我们就能破解一个又一个 “世纪难题”，在全球科技竞争中占据一席之地。

**权威信息来源**

1\. 人民日报：《突破瓶颈! 我国成功研制新型芯片》（2025 年 10 月 23 日）

2\. 极目新闻：《北大、清华，芯片研究有重要突破!》（2025 年 10 月 20 日）

3\. 中国科技网：《创新故事丨 “万里穿针” 耀太空——中国空间交会对接技术演进纪实》（2025 年 9 月 15 日）

4.《自然 · 电子学》期刊论文：基于阻变存储器的高精度可扩展模拟矩阵计算芯片研究（2025 年 10 月 13 日）

5\. 光明网：《科学》发布 2024 年十大科学突破（2024 年 12 月 16 日）

**互动提问**

这款能让算力提升千倍的模拟芯片，即将在 AI 手机、6G 基站、医疗设备等领域落地。你最期待它首先应用在哪个场景？会给你的生活带来哪些改变？欢迎在评论区分享你的想法！
    
    
    
    
### 知乎用户 Chopstick 发表
    
“特定任务”
    
    
    
    
### 知乎用户  邦布住了 发表
    
且听龙吟
    
    
    
    
### 知乎用户  mayawdl 发表
    
龙芯二代！
    
    
    
    
### 知乎用户 ICorrect 发表
    
请继续麻痹自己
    
    
    
    
### 知乎用户 路边的陌生人 发表
    
现在的商业欺诈广告太多了，加上以前芯骗旧事，等产品商品化出来再说吧，贾老板拿 PPT 造车在中国真不是第一个，他只是将抽象具体化而已。
    
    
    
    
### 知乎用户 电销卡之神 发表
    
一、先搞懂关键：这颗芯片到底突破了什么？​

很多人看到 “算力超顶级 GPU 千倍” 会先懵 —— 是所有任务都能碾压吗？答案是**特定任务精准突破**，但这恰恰是最关键的创新。​

传统 GPU、CPU 都困在 “[冯诺依曼瓶颈](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E5%86%AF%E8%AF%BA%E4%BE%9D%E6%9B%BC%E7%93%B6%E9%A2%88&zhida_source=entity)” 里：数据要在存储单元和计算单元之间来回搬运，就像快递员送文件，路上花的时间比处理文件还多，既慢又费电。北大团队的芯片直接把 “办公室” 和 “仓库” 合二为一，用[阻变存储器](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E9%98%BB%E5%8F%98%E5%AD%98%E5%82%A8%E5%99%A8&zhida_source=entity)（RRAM）做计算单元，数据存在哪就直接在哪运算，彻底省掉了数据搬运的成本。​

更绝的是解决了模拟计算的 “老毛病”：以前模拟芯片精度低，算个复杂账都容易错，这次直接做到 24 位定点精度，和高端数字芯片站在了同一水平线。打个比方，相当于用算盘算出了超级计算机的精度，还比它快一千倍 —— 这就是 “存算一体 + 高精度模拟” 的双重革命。​

二、对中国芯片产业：从 “破卡脖子” 到 “定规则” 的转折​

这颗芯片的意义，早超出了单一产品的范畴：​

1.  **架构话语权的逆袭​**

过去我们总在追赶欧美成熟的数字芯片架构，现在直接在 “[后摩尔时代](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E5%90%8E%E6%91%A9%E5%B0%94%E6%97%B6%E4%BB%A3&zhida_source=entity)” 赛道上领跑。[《自然・电子学》](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E3%80%8A%E8%87%AA%E7%84%B6%E3%83%BB%E7%94%B5%E5%AD%90%E5%AD%A6%E3%80%8B&zhida_source=entity)的发表不是偶然 ——2024 年全球 AI 芯片专利中国占比超 45%，意味着未来制定算力规则时，我们不再是旁观者。​

1.  **产业生态的 “强链接”​**

它不是实验室里的 “孤品”：[中芯国际](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E4%B8%AD%E8%8A%AF%E5%9B%BD%E9%99%85&zhida_source=entity)的 5 纳米工艺良率已达 92%，[上海微电子](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=%E4%B8%8A%E6%B5%B7%E5%BE%AE%E7%94%B5%E5%AD%90&zhida_source=entity)的设备进展能支撑量产，华为海思还启动了适配测试。这说明从基础研究到产业应用，中国芯片的 “断点” 正在被打通。​

1.  **绕开 [EUV](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=EUV&zhida_source=entity) 的 “非对称竞争”​**

不需要最先进的光刻机也能做高端芯片 —— 这种基于新型存储材料的架构，给了我们另一条突围路径，就像别人在升级燃油车引擎，我们直接造出了电动车核心电机。​

三、未来能用上的场景：从自动驾驶到癌症筛查​

算力的革命最终要落地到生活里，这颗芯片的应用场景已经很清晰：​

*   **自动驾驶：10 倍速的 “决策大脑”​**

自动驾驶最怕 “反应慢”—— 遇到突发情况，传感器数据要先传到计算单元，再出决策，差 0.1 秒就是事故。用这颗芯片，雷达、摄像头的数据能直接在存储单元里处理，决策响应速度提升 10 倍，相当于给车装了 “超级神经”。​

*   **医疗诊断：让 CT 片 “自己说话”​**

现在 AI 分析 CT 片要传云端算力，未来终端设备装这颗芯片，能实时识别早期肺癌病灶，甚至快速处理基因测序数据 —— 上海某医院试点显示，这能把诊断时间从几小时压缩到几分钟。​

*   **[6G 通信](https://zhida.zhihu.com/search?content_id=753296634&content_type=Answer&match_order=1&q=6G+%E9%80%9A%E4%BF%A1&zhida_source=entity)：同时处理百万路信号​**

6G 基站需要应对海量设备连接，传统芯片会 “堵车”。这颗芯片的矩阵计算能力，能实时优化百万个天线的信号，让未来的车联网、工业物联网真正 “无延迟”。​

四、冷静看：优势之外的挑战​

当然不能盲目乐观，这颗芯片还有需要突破的坎：​

*   **任务局限性**：目前擅长矩阵运算等 AI 核心任务，但通用计算能力仍不如 CPU，未来需要和传统芯片 “分工协作”；​

*   **量产成本**：阻变存储器的大规模制造良率还在提升，中芯国际的量产线预计三年内才能实现成本可控；​

*   **软件适配**：现有 AI 算法多基于数字芯片设计，需要重构软件生态才能发挥其最大价值。​

最后说句实在的​

这颗芯片不是 “突然爆发”，而是十年磨一剑的结果 —— 从 2015 年开始布局存算一体，到 2025 年突破精度瓶颈，背后是上千次器件实验和算法迭代。它证明中国芯片不止能 “追着跑”，更能 “领着走”，而真正的算力革命，才刚刚开始。
    
    
    
    
### 知乎用户 万般无我 发表
    
我就直白说吧，国内的什么高科技都诞生于商业公司，来自于国外的开源成果和商业模式
    
    
    
    
### 知乎用户 水木 发表
    
《特定任务中》

学小米是吧，整小字模式。
    
    
    
    
### 知乎用户 晓文和晓武 发表
    
意义就是很强，领先全世界。

应用前景不清楚，实践是检验真理的唯一标准。吹牛皮无法建设社会主义。
    
    
    
    
### 知乎用户 一米阳光​ 发表
    
过了一段时间，没有按时间排序了，再过一段时间，不能新增回答了，最后，成知识荒原了
    
    
    
    
### 知乎用户  Vale 发表
    
学新闻学的

![](https://images.weserv.nl/?url=https%3A//pica.zhimg.com/v2-384e18b6404aa40b3c27275487413a39_r.jpg%3Fsource%3D1def8aca)
    
    
    
    
### 知乎用户 幕布转 发表
    
我其实更想知道谁会出来统合[高端芯片技术](https://zhida.zhihu.com/search?content_id=753312684&content_type=Answer&match_order=1&q=%E9%AB%98%E7%AB%AF%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF&zhida_source=entity)，光刻机作为当今供应链最复杂的单品，没有一个声望和实力都牛逼的出来整合落地又怎么给这些高端技术买单呢？

马斯克肯定不行，他要得太多了，[上海微电子](https://zhida.zhihu.com/search?content_id=753312684&content_type=Answer&match_order=1&q=%E4%B8%8A%E6%B5%B7%E5%BE%AE%E7%94%B5%E5%AD%90&zhida_source=entity)地方色彩太浓，华为又太独。
    
    
    
    
### 知乎用户 野猪骑士李成梁 发表
    
实物上市后再来吹行吗？
    
    
    
    
### 知乎用户 刘立言 发表
    
从国人和消费者的角度回答。

消灭资本暴政，技术属于人民。
    
    
    
    
### 知乎用户 John 发表
    
神经网络算法的[模拟电路实现](https://zhida.zhihu.com/search?content_id=753269816&content_type=Answer&match_order=1&q=%E6%A8%A1%E6%8B%9F%E7%94%B5%E8%B7%AF%E5%AE%9E%E7%8E%B0&zhida_source=entity)。工程学的进步非理论突破
    
    
    
    
### 知乎用户  Ikira 发表
    
有没有省流？
    
    
    
    
### 知乎用户 星河 发表
    
提问的好像都是一个种类，践行种。
    
    
    
    
### 知乎用户 落 樱​ 发表
    
666，大约金不叫我
    
    
    
    
### 知乎用户 苏州小工头 发表
    
特定任务？该不会是装个隔热棉在 100 度高温下一期测试吧
    
    
    
    
### 知乎用户 卡卡 发表
    
看到这种标题，下意识的想法就是：这八成又是在吹牛。我也不知道我是从什么时候变成这样的。
    
    
    
    
### 知乎用户 hotland​ 发表
    
这种芯片存粹垃圾，就一点，没法和现有的大容量存储适配就决定了没啥鸟用
    
    
    
    
### 知乎用户 夜的第七章 发表
    
按照 higo 的逻辑，小米三年不可能造出来一辆好车，也不可能造出来芯片，总结就是 higo 认为中国不可能有飞跃式的科技进步
    
    
    
    
### 知乎用户  Edwina 发表
    
当有一个人开始吹牛逼后，其他人发现不吹牛逼就跟不上趟，这就是某司的恶
    
    
    
    
### 知乎用户  kvi1695 发表
    
是骡子是马得拉到市场上给消费者溜溜才知道
    
    
    
    
### 知乎用户 买只番茄减肥吃 发表
    
你的路不让我走，我便开一条新路，或者干脆是传送门了。

新能源如此，某种场景下的芯片也是如此。而这种[算法芯片](https://zhida.zhihu.com/search?content_id=753326594&content_type=Answer&match_order=1&q=%E7%AE%97%E6%B3%95%E8%8A%AF%E7%89%87&zhida_source=entity)，太适合 [AI 时代](https://zhida.zhihu.com/search?content_id=753326594&content_type=Answer&match_order=1&q=AI%E6%97%B6%E4%BB%A3&zhida_source=entity)了。

没有什么天佑中国，只是因为这个民族神话里讲的都是愚公移山，大禹治水，后羿射日，精卫填海，女娲补天，夸父追日的故事
    
    
    
    
### 知乎用户  yyzg 发表
    
不是通用计算，意义不大
    
    
    
    
### 知乎用户 牧马人 发表
    
优秀就优秀在特定任务
    
    
    
    
### 知乎用户 喵西奥尔 发表
    
这是一个技术方案，但并不是一个落地项目。简单来说，我们找到了一个方式，一个可走的路线。但是还没走呢。

条条大路通罗马，这不是唯一的方法。
    
    
    
    
### 知乎用户 点点滴滴 发表
    
我想了解下，八小时工作制能够贯彻下去了吗？
    
    
    
    
### 知乎用户 konton 发表
    
家里的玩具车能跑了，于是媒体得出结论：汽车产业和工业已经建立起来了，已经形成了突破。
    
    
    
    
### 知乎用户 过于庸俗了 发表
    
没有任何意义，毫无前景

这就和北朝鲜的奇幻大楼一样，能看不能住
    
    
    
    
### 知乎用户 喵喵大叔 发表
    
不是不信，但靠吹是没有任何意义的，量产实测才有意义。
    
    
    
    
### 知乎用户 conflux​ 发表
    
有没有人跟我一样，看到这个东西，首先想到的是[大模型专用芯片](https://zhida.zhihu.com/search?content_id=753321559&content_type=Answer&match_order=1&q=%E5%A4%A7%E6%A8%A1%E5%9E%8B%E4%B8%93%E7%94%A8%E8%8A%AF%E7%89%87&zhida_source=entity)。

求业内大佬解释，这路可行吧？
    
    
    
    
### 知乎用户 想不出名字​ 发表
    
如果如题所说，工作很 nb。但是没上正刊只上了子刊，这就很尴尬。

特别是对顶刊崇拜的领导，更为尴尬。
    
    
    
    
### 知乎用户 西铁城 发表
    
特定任务 = 我算加减法的速度在不保证对错的情况下比高斯快千倍。
    
    
    
    
### 知乎用户 与凌​ 发表
    
如果这个问题只有计算机术语，说明有成功的部分，如果加上了我国，那就说明这是一个政治任务
    
    
    
    
### 知乎用户  hurong 发表
    
人有多大胆，地有多大产嘛。

直接干脆说[超光速](https://zhida.zhihu.com/search?content_id=753331635&content_type=Answer&match_order=1&q=%E8%B6%85%E5%85%89%E9%80%9F&zhida_source=entity)不好吗？
    
    
    
    
### 知乎用户 融擎汉 发表
    
加定语了就知道有坑了
    
    
    
    
### 知乎用户 知乎用户 byao 努力 发表
    
天天新闻夺眼球，有本事你商用量产
    
    
    
    
### 知乎用户 雨秸 发表
    
遥遥领先，远超美帝国主义等西方欧美势力几百年，且听龙吟，咱妈牛逼
    
    
    
    
### 知乎用户  Nicky 发表
    
且听龙吟，遥遥领先
    
    
    
    
### 知乎用户 吉良吉影 发表
    
日经内容了，习惯就好，真要是业界领先了，通常都会比较低调，比如稀土和电池，整天吹嘘取得巨大突破，遥遥领先的，通常都是骗补贴的
    
    
    
    
### 知乎用户 帆 1237 发表
    
就说把 50 系显卡价格砍下来多少就可以了，其他不用说
    
    
    
    
### 知乎用户 妮黑猫 发表
    
再过几年，东大的科研成果就只用中文写，然后只在国内发表。

谁想了解最前沿的科研成果，先学习中文。

英语这么低效率的语言是时候慢慢退出历史舞台了。
    
    
    
    
### 知乎用户 离婚登记处赵主任 发表
    
赢了✌️ 英伟达要暴跌
    
    
    

