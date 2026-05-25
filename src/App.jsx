import { useMemo, useState } from 'react'
import {
  ArrowDown,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  CircleDot,
  Cpu,
  Globe2,
  Landmark,
  Layers,
  Moon,
  Loader2,
  MonitorCheck,
  ReceiptText,
  Sparkles,
  Sun,
  UploadCloud,
  Zap,
} from 'lucide-react'
import './App.css'

const featureTags = ['BP 解析', '企业画像', '政策推荐', '投资人匹配', '成长规划']

const stages = [
  { label: '政策窗口', value: '匹配 3 项可申报机会', icon: Landmark },
  { label: '资本路径', value: '筛选早期 / 产业资本', icon: BriefcaseBusiness },
  { label: '材料缺口', value: '提示资质、合同、财务证明', icon: ReceiptText },
  { label: '增长节奏', value: '拆成 30 / 90 / 180 天动作', icon: Sparkles },
]

const defaultRoadmap = [
  {
    horizon: '30 天',
    title: '完成申报与融资准备',
    tasks: ['整理 BP 结构化信息和政策申报材料', '完成政策优先级排序', '打磨投资人版 Deck', '建立首批 20 位投资人沟通名单'],
  },
  {
    horizon: '90 天',
    title: '形成政策和资本双线进展',
    tasks: ['提交 2-3 项高匹配政策申报', '完成 8-12 场投资人会议', '补齐关键经营数据和客户案例', '锁定可落地园区或产业合作方'],
  },
  {
    horizon: '180 天',
    title: '进入增长验证阶段',
    tasks: ['争取完成一项政策资金到账或资质认定', '形成明确融资条款或产业资本合作', '建立月度经营指标看板', '推进标杆客户复制和区域扩张'],
  },
]

const subscriptionPlans = [
  {
    name: '免费计划',
    price: '¥0',
    audience: '适合快速体验企德地图的 BP 解析和基础推荐能力',
    features: ['每月 1 份 BP 智能解析', '企业结构化画像', '基础政策推荐', '基础成长路线建议'],
  },
  {
    name: '订阅计划',
    price: '¥199 / 年',
    audience: '适合需要持续追踪政策、投资人和成长路线的创业团队',
    features: ['首月免费体验', '每月 10 份 BP / 项目材料解析', '政策动态监控与提醒', '投资人画像与沟通建议', '30/90/180 天路线追踪'],
    highlighted: true,
  },
  {
    name: '定制报价',
    price: '定制报价',
    audience: '面向园区、孵化器、投资机构和企业服务平台的专属服务',
    features: ['批量企业画像建档', '政策库与投资人库定制', '专属顾问服务', '多账号协同工作台', 'API / 私有化部署支持'],
  },
]

const demoBps = [
  {
    id: 'med-ai',
    name: '星河智诊',
    fileName: '星河智诊_AI医疗影像_BP.pdf',
    summary: '面向基层医院的 AI 医学影像辅助诊断系统，已完成 3 家医院试点，计划融资用于注册检测和渠道扩张。',
    analysis: {
      company: '星河智诊',
      field: 'AI 医疗影像辅助诊断',
      plan: '先从基层医院胸部影像筛查切入，形成试点数据和注册路径，再扩展到多病种影像模型。',
      patents: '2 项算法发明专利申请中，4 项软件著作权已规划',
      scale: '18 人团队，3 家医院试点，预计 12 个月覆盖 30 家基层医疗机构',
      strengths: ['基层医疗场景刚需明确', '算法团队具备影像模型经验', '试点医院可形成示范案例'],
    },
    profile: [
      ['企业阶段', 'Pre-A / 医疗 AI'],
      ['核心赛道', 'AI 医疗影像'],
      ['融资诉求', '1200 万 - 1800 万'],
      ['政策适配', '医疗器械 / 高新技术'],
      ['技术壁垒', '影像算法 + 临床数据闭环'],
      ['客户验证', '3 家基层医院试点'],
      ['申报抓手', '注册检测、示范应用、软著专利'],
      ['资金用途', '注册检测、渠道扩张、算法迭代'],
    ],
    policies: [
      {
        title: '医疗器械成果转化支持资金',
        amount: '预计 100 万 - 200 万',
        url: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202602/t20260202_4484642.html',
        conditions: ['产品具备医疗器械注册路径', '已有医院试点或临床合作', '研发费用和检测费用可追溯'],
        reason: 'BP 中已有基层医院试点和影像算法能力，适合优先申请成果转化与注册检测补贴。',
        materials: ['注册路径说明', '医院试点协议', '检测费用预算', '算法性能报告'],
      },
      {
        title: '北京市高新技术企业培育补贴',
        amount: '预计 30 万 - 80 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202411/t20241126_3949975.html',
        conditions: ['研发人员占比达标', '拥有软著或专利', '主营收入与技术产品相关'],
        reason: '团队技术人员占比较高，已有算法系统和医院场景，符合高新培育方向。',
        materials: ['知识产权证明', '研发人员名单', '财务报表', '产品说明书'],
      },
      {
        title: '中关村前沿技术试点示范项目',
        amount: '预计 80 万 - 150 万',
        url: 'https://www.ncsti.gov.cn/zcfg/zcwj/201903/t20190321_13420.html',
        conditions: ['技术具备创新性', '有真实应用场景', '可形成示范案例'],
        reason: '基层医疗场景具有明确公共价值，适合包装成 AI 医疗示范应用。',
        materials: ['试点医院证明', '示范应用方案', '项目预算书', '数据合规说明'],
      },
    ],
    investors: [
      {
        name: '启明创投',
        ticket: '单笔 800 万 - 2000 万',
        focus: '医疗科技、AI 应用、早期硬科技',
        history: '过往投资覆盖医疗 AI、创新器械和数字医疗服务平台。',
        advice: '重点呈现医院试点转化率、注册路径、算法准确率和商业化回款模型。',
        contact: 'healthcare@qimingvc.com',
        website: 'https://www.qimingvc.com/',
      },
      {
        name: '红杉中国种子基金',
        ticket: '单笔 500 万 - 1500 万',
        focus: 'AI 原生应用、医疗效率工具',
        history: '关注用 AI 改造高价值行业工作流的早期团队。',
        advice: '建议用医生工作流前后对比，说明产品节省时间和提升诊断一致性的能力。',
        contact: 'seed@hongshan.com',
        website: 'https://www.hongshan.com/',
      },
      {
        name: '北极光创投',
        ticket: '单笔 1000 万 - 3000 万',
        focus: '生命科学、AI 技术商业化',
        history: '偏好技术壁垒清晰、临床价值明确、具备长期平台潜力的公司。',
        advice: '沟通时突出核心算法壁垒、数据来源合规性和后续多病种扩展路线。',
        contact: 'bp@nlightvc.com',
        website: 'https://www.nlightvc.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '补齐医疗合规材料', tasks: ['明确器械分类和注册路径', '整理医院试点数据', '准备算法性能报告', '锁定 2 项医疗专项政策'] },
      { horizon: '90 天', title: '推进试点和政策申报', tasks: ['提交成果转化资金申请', '新增 2 家试点医院', '完成投资人版医疗合规 Deck', '启动核心专利申请'] },
      { horizon: '180 天', title: '进入融资与注册检测阶段', tasks: ['完成注册检测预算和时间表', '争取政策资金批复', '形成 Pre-A 融资条款', '建立渠道合作样板'] },
    ],
  },
  {
    id: 'robot',
    name: '云臂机器人',
    fileName: '云臂机器人_柔性协作机械臂_BP.pdf',
    summary: '柔性协作机械臂公司，服务 3C 装配和精密检测场景，已有小批量交付和核心控制算法。',
    analysis: {
      company: '云臂机器人',
      field: '柔性协作机械臂与工业自动化',
      plan: '聚焦 3C 精密装配和检测产线，用标准机械臂本体加场景算法包提升交付效率。',
      patents: '3 项控制算法专利，1 项结构设计专利，2 项软著',
      scale: '26 人团队，已完成 12 台小批量交付，目标 18 个月交付 120 台',
      strengths: ['已有真实订单和验收材料', '场景聚焦便于复制', '具备供应链降本空间'],
    },
    profile: [
      ['企业阶段', 'A 轮前 / 智能制造'],
      ['核心赛道', '协作机器人'],
      ['融资诉求', '2000 万 - 3000 万'],
      ['政策适配', '智能制造 / 专精特新'],
      ['技术壁垒', '柔性控制算法 + 本体设计'],
      ['客户验证', '12 台小批量交付'],
      ['申报抓手', '首台套、专精特新、产线示范'],
      ['资金用途', '供应链、产能建设、量产良率'],
    ],
    policies: [
      {
        title: '智能制造装备首台套支持',
        amount: '预计 150 万 - 300 万',
        url: 'https://www.ncsti.gov.cn/zcfg/zcwj/201903/t20190321_13420.html',
        conditions: ['装备具有自主知识产权', '完成首批客户验证', '具备产业化量产计划'],
        reason: 'BP 显示已有小批量交付和控制算法，适合按首台套装备方向申报。',
        materials: ['客户验收报告', '装备技术说明', '知识产权清单', '量产计划书'],
      },
      {
        title: '专精特新中小企业认定',
        amount: '预计 50 万 - 100 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202604/t20260424_4609408.html',
        conditions: ['长期聚焦细分制造场景', '核心零部件或算法自主可控', '收入增长稳定'],
        reason: '公司聚焦 3C 精密装配场景，产品边界清晰，适合以专精特新作为资质抓手。',
        materials: ['主营收入证明', '客户案例', '研发投入台账', '核心团队简历'],
      },
      {
        title: '高端装备产业化补贴',
        amount: '预计 80 万 - 200 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202405/W020240530752218741457.pdf',
        conditions: ['有明确产线或供应链投入', '产品进入交付阶段', '能带动本地产业链协同'],
        reason: '融资用途包含供应链和产能建设，可与高端装备产业化资金匹配。',
        materials: ['产能建设方案', '供应商合同', '订单证明', '资金使用计划'],
      },
    ],
    investors: [
      {
        name: '顺为资本',
        ticket: '单笔 1500 万 - 4000 万',
        focus: '智能硬件、机器人、先进制造',
        history: '长期关注硬件产品化、供应链能力和规模化销售效率。',
        advice: '突出 BOM 成本下降曲线、客户复购、交付周期和量产良率。',
        contact: 'bp@shunwei.com',
        website: 'https://www.shunwei.com/',
      },
      {
        name: '高瓴创投',
        ticket: '单笔 2000 万 - 5000 万',
        focus: '先进制造、产业自动化、机器人',
        history: '偏好有行业纵深、客户价值明确、长期市场空间大的智能制造企业。',
        advice: '建议准备重点客户案例，讲清替代人工和提升产线效率的量化指标。',
        contact: 'venture@hillhousecap.com',
        website: 'https://www.hillhouseinvestment.com/',
      },
      {
        name: '达晨财智',
        ticket: '单笔 1000 万 - 3000 万',
        focus: '硬科技、装备制造、产业升级',
        history: '投资过多家制造业升级与工业自动化相关企业。',
        advice: '沟通时强调订单确定性、政策资质、地方落地和产业资本协同价值。',
        contact: 'contact@fortunevc.com',
        website: 'https://www.fortunevc.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '打磨首台套申报基础', tasks: ['整理客户验收材料', '完成装备技术白皮书', '梳理供应链成本结构', '确定政策申报优先级'] },
      { horizon: '90 天', title: '强化交付和融资证据', tasks: ['完成 2 个标杆客户复盘', '提交首台套或产业化政策', '约见 10 家先进制造投资人', '更新量产资金计划'] },
      { horizon: '180 天', title: '扩大订单和产能', tasks: ['完成小批量稳定交付', '争取政策批复或资质认定', '推进 A 轮融资', '建立本地产业园落地方案'] },
    ],
  },
  {
    id: 'carbon',
    name: '绿算科技',
    fileName: '绿算科技_企业碳管理SaaS_BP.pdf',
    summary: '为制造企业提供碳盘查、碳足迹核算和 ESG 报告自动化工具，已服务 20 家付费客户。',
    analysis: {
      company: '绿算科技',
      field: '企业碳管理 SaaS',
      plan: '从制造业碳盘查工具切入，逐步扩展到碳足迹、供应链碳数据和 ESG 自动报告。',
      patents: '1 项数据处理专利申请中，5 项软件著作权',
      scale: '14 人团队，20 家付费客户，年化收入约 260 万',
      strengths: ['客户付费验证较早', '政策趋势明确', 'SaaS 交付边际成本较低'],
    },
    profile: [
      ['企业阶段', '天使+ / SaaS'],
      ['核心赛道', '双碳管理软件'],
      ['融资诉求', '600 万 - 1000 万'],
      ['政策适配', '绿色低碳 / 数字化转型'],
      ['技术壁垒', '碳数据模型 + 自动报告流程'],
      ['客户验证', '20 家制造业付费客户'],
      ['申报抓手', '绿色低碳服务、数字化服务商'],
      ['资金用途', '产品模块、渠道伙伴、行业模板'],
    ],
    policies: [
      {
        title: '绿色低碳技术服务补贴',
        amount: '预计 40 万 - 100 万',
        url: 'https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcjd/202505/t20250522_4095649.html',
        conditions: ['服务对象属于实体产业', '具备碳核算或减排方法论', '有付费客户案例'],
        reason: 'BP 中已有制造业付费客户，产品直接服务企业低碳转型。',
        materials: ['客户服务合同', '碳核算方法说明', '产品截图', '减排效果案例'],
      },
      {
        title: '中小企业数字化转型服务商入库',
        amount: '预计 30 万 - 80 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202507/t20250729_4161230.html',
        conditions: ['具备 SaaS 产品交付能力', '服务中小企业数字化', '有可复制实施流程'],
        reason: '企业碳管理具备软件化交付特点，适合进入数字化服务商目录。',
        materials: ['服务商申请表', '产品功能说明', '客户名单', '实施流程文档'],
      },
      {
        title: '科技型中小企业研发补贴',
        amount: '预计 20 万 - 50 万',
        url: 'https://beijing.chinatax.gov.cn/bjswj/sszc/zcjd/202404/fe5436e8d5304d4a86da854ba03e17d8/files/f9bc3557fc6844218bebce6fbdcdac37.pdf',
        conditions: ['研发项目明确', '研发费用可归集', '软件著作权或算法模块可证明'],
        reason: '产品仍在进行行业模型和自动报告能力迭代，可用研发补贴覆盖开发成本。',
        materials: ['软著证明', '研发费用台账', '版本迭代记录', '人员社保证明'],
      },
    ],
    investors: [
      {
        name: '源码资本',
        ticket: '单笔 600 万 - 1800 万',
        focus: '企业服务、产业数字化、SaaS',
        history: '关注能切入真实企业流程并持续扩张客单价的 SaaS 公司。',
        advice: '重点展示客户留存、续费率、实施成本和从碳盘查扩展到 ESG 的路径。',
        contact: 'contact@sourcecodecap.com',
        website: 'https://www.sourcecodecap.com/',
      },
      {
        name: '经纬创投',
        ticket: '单笔 800 万 - 2000 万',
        focus: '企业服务、效率工具、行业软件',
        history: '投资过多家 SaaS、垂直行业软件和数字化服务公司。',
        advice: '建议用客户漏斗和 ARR 增长数据说明商业化质量。',
        contact: 'bp@matrixpartners.com.cn',
        website: 'https://www.matrixpartners.com.cn/',
      },
      {
        name: '线性资本',
        ticket: '单笔 500 万 - 1500 万',
        focus: '数据智能、AI 应用、企业软件',
        history: '偏好数据驱动、产品体验强、可规模化交付的技术团队。',
        advice: '沟通时突出碳数据自动化采集能力和 AI 报告生成壁垒。',
        contact: 'hello@linear.vc',
        website: 'https://linear.vc/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '强化 SaaS 商业化指标', tasks: ['整理 ARR、续费率和客单价', '准备 3 个标杆客户案例', '申请数字化服务商入库', '完善产品演示脚本'] },
      { horizon: '90 天', title: '政策入库与融资推进', tasks: ['提交绿色低碳服务补贴', '完成 10 家投资人沟通', '推出 ESG 报告模块', '建立渠道伙伴合作清单'] },
      { horizon: '180 天', title: '扩大行业复制', tasks: ['形成制造业客户模板', '提升 ARR 增长稳定性', '争取政策资金到账', '完成下一轮融资或战略合作'] },
    ],
  },
  {
    id: 'chip',
    name: '凌芯微电子',
    fileName: '凌芯微电子_边缘AI芯片_BP.pdf',
    summary: '边缘 AI 推理芯片设计公司，面向工业相机和智能终端，已完成 MPW 流片和客户样片测试。',
    analysis: {
      company: '凌芯微电子',
      field: '边缘 AI 推理芯片',
      plan: '面向工业相机和智能终端提供低功耗推理芯片，先完成样片验证，再推进小批量量产。',
      patents: '4 项芯片架构和算子加速相关专利申请中',
      scale: '22 人团队，完成 MPW 流片，5 家客户进入样片测试',
      strengths: ['技术壁垒和资金门槛较高', '国产替代叙事明确', '客户测试信号已出现'],
    },
    profile: [
      ['企业阶段', 'Pre-A / 芯片设计'],
      ['核心赛道', '边缘 AI 芯片'],
      ['融资诉求', '3000 万 - 5000 万'],
      ['政策适配', '集成电路 / 硬科技'],
      ['技术壁垒', '低功耗推理架构 + 算子加速'],
      ['客户验证', 'MPW 流片，5 家样片测试'],
      ['申报抓手', '集成电路专项、首购首用'],
      ['资金用途', '流片、EDA、样片验证、量产准备'],
    ],
    policies: [
      {
        title: '集成电路设计企业研发支持',
        amount: '预计 200 万 - 500 万',
        url: 'https://www.beijing.gov.cn/zhengce/zfwj/zfwj/szfwj/201905/t20190523_72690.html',
        conditions: ['企业主营为芯片设计', '已发生流片或 EDA 费用', '具备自主 IP 或架构设计'],
        reason: 'BP 中明确 MPW 流片和边缘 AI 架构，适合申请集成电路专项研发资金。',
        materials: ['流片合同与发票', '芯片架构说明', 'EDA 费用证明', 'IP 权属材料'],
      },
      {
        title: '硬科技企业股权投资引导基金',
        amount: '预计 500 万 - 1000 万',
        url: 'https://www.ncsti.gov.cn/zcfg/zcwj/201903/t20190321_13420.html',
        conditions: ['技术壁垒高', '融资用途明确', '具有产业客户验证'],
        reason: '芯片项目资金需求大、技术门槛高，可争取政府引导基金参与本轮融资。',
        materials: ['融资计划书', '客户测试报告', '资金使用计划', '团队技术背景证明'],
      },
      {
        title: '北京市首购首用示范项目',
        amount: '预计 100 万 - 300 万',
        url: 'https://www.beijing.gov.cn/zhengce/zfwj/zfwj/szfwj/201905/t20190523_72690.html',
        conditions: ['产品进入样片或小批量阶段', '有本地客户试用', '具备示范替代价值'],
        reason: '工业相机和智能终端客户测试可包装为首购首用场景。',
        materials: ['样片测试报告', '客户试用协议', '产品替代价值说明', '示范项目方案'],
      },
    ],
    investors: [
      {
        name: '深创投',
        ticket: '单笔 3000 万 - 8000 万',
        focus: '半导体、硬科技、先进制造',
        history: '长期投资集成电路、设备材料和硬科技产业链项目。',
        advice: '重点说明流片进展、客户验证、量产风险和资金使用节点。',
        contact: 'semiconductor@szvc.com.cn',
        website: 'https://www.szvc.com.cn/',
      },
      {
        name: '元禾璞华',
        ticket: '单笔 3000 万 - 7000 万',
        focus: '半导体设计、芯片 IP、国产替代',
        history: '专注半导体产业链，对芯片设计公司技术路线判断经验丰富。',
        advice: '建议准备架构对标、功耗性能指标和目标客户导入计划。',
        contact: 'bp@puhua-capital.com',
        website: 'https://www.puhua-capital.com/',
      },
      {
        name: '华登国际',
        ticket: '单笔 4000 万 - 1 亿',
        focus: '集成电路、AI 芯片、工业智能',
        history: '在半导体和智能硬件领域有长期投资布局。',
        advice: '沟通时突出团队流片经验、供应链可控性和未来产品矩阵。',
        contact: 'contact@waldenintl.com',
        website: 'https://www.waldenintl.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '整理芯片专项材料', tasks: ['汇总流片与 EDA 费用', '完善架构和性能对标文档', '整理客户样片反馈', '确定集成电路专项申报路径'] },
      { horizon: '90 天', title: '推进政策和融资双线', tasks: ['提交研发支持或引导基金材料', '完成 8 家半导体投资人会议', '明确下一次流片预算', '补齐供应链合作证明'] },
      { horizon: '180 天', title: '进入样片验证和融资交割', tasks: ['完成关键客户测试报告', '争取专项资金或基金跟投', '推动 Pre-A 融资交割', '制定量产前风险清单'] },
    ],
  },
]

function App() {
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeBpId, setActiveBpId] = useState(demoBps[0].id)
  const [theme, setTheme] = useState('light')
  const [hasResult, setHasResult] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [thinkingBp, setThinkingBp] = useState(null)
  const activeBp = demoBps.find((bp) => bp.id === activeBpId) || demoBps[0]

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${(index * 19) % 100}%`,
        top: `${(index * 37) % 100}%`,
      })),
    [],
  )

  function handleFiles(files) {
    const file = files?.[0]
    if (!file) return
    setFileName(file.name)
    setIsAnalyzing(true)
    setHasResult(true)
    setThinkingBp({
      name: file.name.replace(/\.pdf$/i, ''),
      analysis: {
        company: '您的企业',
        plan: 'AI 正在分析商业计划书内容...',
        patents: '分析中',
        strengths: ['AI 正在提取核心竞争优势'],
      },
      policies: activeBp.policies,
      investors: activeBp.investors,
    })
    setShowThinking(true)
  }

  function loadDemoBp(bp) {
    setActiveBpId(bp.id)
    setFileName(bp.fileName)
    setIsAnalyzing(true)
    setThinkingBp(bp)
    setShowThinking(true)
    setHasResult(true)
  }

  function handleThinkingDone() {
    setShowThinking(false)
    setIsAnalyzing(false)
    window.setTimeout(() => {
      const shell = document.querySelector('.mission-shell')
      const target = document.getElementById('thinking')
      if (shell && target) {
        shell.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
      }
    }, 120)
  }

  return (
    <main className={`mission-shell ${theme === 'light' ? 'light-theme' : ''}`}>
      <Ambient particles={particles} />
      <section className="snap-window hero-window">
        <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        {showThinking && thinkingBp && <ThinkingOverlay bp={thinkingBp} onDone={handleThinkingDone} />}
        <div className="hero-content">
          <div className="section-kicker">
            <CircleDot size={13} />
            企德地图
          </div>
          <h1 className="hero-title">
            <span>创业不迷路</span>
            <span>企德来带路</span>
          </h1>
          <p className="hero-subtitle">上传 BP 商业计划书，AI 自动解析企业画像，推荐政策、投资人和成长路线。</p>
          <UploadPortal fileName={fileName} isAnalyzing={isAnalyzing} onFiles={handleFiles} />
          <DemoBpPicker activeBpId={activeBpId} demoBps={demoBps} onSelect={loadDemoBp} />
          <div className="feature-tags">
            {featureTags.map((tag) => (
              <span key={tag}>
                <Zap size={13} />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a className="scroll-cue" href="#thinking">
          向下探索 <ArrowDown size={16} />
        </a>
      </section>

      {hasResult && <>

      <section className="snap-window processing-window" id="thinking">
        <WindowTitle eyebrow="BP 智能解析" title="企业结构化画像" />
        <div className="analysis-layout">
          <EnterpriseAnalysis bp={activeBp} />
          <div className="stage-stack">
            {stages.map(({ label, value, icon: Icon }) => (
              <article className="stage-card" key={label}>
                <Icon size={19} />
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              </article>
            ))}
          </div>
          <div className="profile-cloud">
            {activeBp.profile.map(([label, value]) => (
              <div className="profile-bubble" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-window universe-window">
        <WindowTitle eyebrow="政策匹配引擎" title="政策推荐" />
        <div className="recommendation-grid policy-grid">
          {activeBp.policies.map((policy) => (
            <article className="recommendation-card" key={policy.title}>
              <div className="card-orb"><Landmark size={25} /></div>
              <span className="card-label">预期资金收益</span>
              <h3>{policy.title}</h3>
              <strong className="funding-value">{policy.amount}</strong>
              <InfoList title="符合条件" items={policy.conditions} />
              <p>{policy.reason}</p>
              <InfoList title="下一步申报材料" items={policy.materials} />
              <a className="resource-link" href={policy.url} target="_blank" rel="noreferrer">
                查看政策入口
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="snap-window dashboard-window">
        <WindowTitle eyebrow="资本连接" title="投资人推荐" />
        <div className="recommendation-grid investor-grid">
          {activeBp.investors.map((investor) => (
            <article className="recommendation-card" key={investor.name}>
              <div className="card-orb"><BriefcaseBusiness size={25} /></div>
              <span className="card-label">投资偏好</span>
              <h3>{investor.name}</h3>
              <strong className="investor-ticket">{investor.ticket}</strong>
              <strong className="funding-value">{investor.focus}</strong>
              <p>{investor.history}</p>
              <InfoList title="沟通建议" items={[investor.advice]} />
              <div className="contact-line">联系方式：{investor.contact}</div>
              <a className="resource-link" href={investor.website} target="_blank" rel="noreferrer">
                进入投资机构官网
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="snap-window cta-window">
        <div className="earth-horizon" />
        <div className="roadmap-panel">
          <WindowTitle eyebrow="成长路线规划" title="30 / 90 / 180 天行动建议" />
          <div className="roadmap-summary">
            <div>
              <span>当前优先级</span>
              <strong>政策申报 + 融资沟通双线推进</strong>
            </div>
            <div>
              <span>关键里程碑</span>
              <strong>180 天内完成资金、资质、客户三类验证</strong>
            </div>
            <div>
              <span>AI 风险提示</span>
              <strong>材料完整度和融资叙事一致性是主要瓶颈</strong>
            </div>
          </div>
          <div className="roadmap-grid">
            {(activeBp.roadmap || defaultRoadmap).map((phase) => (
              <article className="roadmap-card" key={phase.horizon}>
                <span>{phase.horizon}</span>
                <h3>{phase.title}</h3>
                <InfoList title="行动建议" items={phase.tasks} />
              </article>
            ))}
          </div>
          <div className="roadmap-footer">
            <MonitorCheck size={20} />
            <span>系统会持续追踪材料准备、政策窗口、投资人反馈和关键经营指标，并在下一轮更新路线图。</span>
          </div>
        </div>
      </section>

      <section className="snap-window subscription-window">
        <WindowTitle eyebrow="商业化模式" title="企德地图订阅模式" />
        <div className="subscription-grid">
          {subscriptionPlans.map((plan) => (
            <article className={plan.highlighted ? 'subscription-card highlighted' : 'subscription-card'} key={plan.name}>
              <div className="subscription-icon">
                {plan.highlighted ? <Layers size={26} /> : <ReceiptText size={26} />}
              </div>
              <span>{plan.name}</span>
              <strong>{plan.price}</strong>
              <p>{plan.audience}</p>
              <InfoList title="包含能力" items={plan.features} />
            </article>
          ))}
        </div>
        <form className="subscribe-form">
          <label htmlFor="subscribe-email">输入邮箱，开通首月免费体验</label>
          <div>
            <input id="subscribe-email" type="email" placeholder="yourname@company.com" />
            <button type="button">申请体验</button>
          </div>
        </form>
        <div className="subscription-note">
          <Sparkles size={18} />
          <span>个人和企业用户可先免费体验一个月；机构客户可预约专属政策库、投资人库和企业服务工作台。</span>
        </div>
      </section>

      </>}
    </main>
  )
}

function ThinkingOverlay({ bp, onDone }) {
  const steps = [
    {
      title: '读取商业计划书结构',
      items: [
        `识别企业「${bp.analysis.company}」基本信息框架`,
        '提取企业阶段、赛道与定位标签',
        '解析融资诉求与核心商业计划',
      ],
    },
    {
      title: '解析企业核心竞争壁垒',
      items: [
        bp.analysis.plan.length > 36 ? bp.analysis.plan.slice(0, 36) + '…' : bp.analysis.plan,
        `知识产权：${bp.analysis.patents}`,
        bp.analysis.strengths[0] || '竞争优势分析完成',
      ],
    },
    {
      title: '匹配政策与资本数据库',
      items: [
        `政策库扫描完成，命中 ${bp.policies.length} 项适配机会`,
        `投资机构画像匹配，推荐 ${bp.investors.length} 家机构`,
        '申报材料缺口与时间窗口已标注',
      ],
    },
    {
      title: '生成成长路线规划',
      items: [
        '30 / 90 / 180 天分阶段行动建议已生成',
        '资料缺口清单与风险提示已完成',
        '优先级排序完成，完整报告就绪',
      ],
    },
  ]

  return (
    <div className="thinking-overlay">
      <div className="thinking-panel">
        <div className="thinking-header">
          <BrainCircuit size={17} />
          <span>AI 深度解析</span>
          <span>·</span>
          <span className="thinking-model-badge">正在调用 GPT-5.5</span>
          <span>·</span>
          <span className="thinking-header-target">{bp.name}</span>
          <Loader2 className="spin thinking-header-spin" size={14} />
        </div>
        <div className="thinking-title">Thinking...</div>
        <div className="thinking-steps">
          {steps.map((step, i) => (
            <div
              className="thinking-step"
              key={step.title}
              style={{ animationDelay: `${i * 1.6 + 0.3}s` }}
            >
              <h3 className="thinking-step-title">{step.title}</h3>
              <ul className="thinking-step-items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="thinking-done" style={{ animationDelay: '7.2s' }} onClick={onDone}>
          <Sparkles size={13} />
          分析完成 · 点击查看完整报告
        </button>
      </div>
    </div>
  )
}

function EnterpriseAnalysis({ bp }) {
  const details = [
    ['企业名称', bp.analysis.company],
    ['细分领域', bp.analysis.field],
    ['商业计划', bp.analysis.plan],
    ['专利与知识产权', bp.analysis.patents],
    ['团队与规模', bp.analysis.scale],
  ]

  return (
    <article className="enterprise-panel">
      <div className="enterprise-head">
        <div>
          <span>AI 企业信息分析</span>
          <h3>{bp.analysis.company}</h3>
        </div>
        <BrainCircuit size={38} />
      </div>
      <div className="enterprise-details">
        {details.map(([label, value]) => (
          <div className="detail-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <InfoList title="核心判断" items={bp.analysis.strengths} />
    </article>
  )
}

function DemoBpPicker({ activeBpId, demoBps, onSelect }) {
  return (
    <div className="demo-picker">
      <span>预置 BP</span>
      <div className="demo-buttons">
        {demoBps.map((bp) => (
          <button
            className={activeBpId === bp.id ? 'demo-button active' : 'demo-button'}
            key={bp.id}
            onClick={() => onSelect(bp)}
            type="button"
          >
            <strong>{bp.name}</strong>
            <small>{bp.summary}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function Header({ theme, onToggleTheme }) {
  return (
    <header className="mission-header">
      <div className="brand">
        <Cpu size={19} />
        <span>企德地图</span>
      </div>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? '白色模式' : '黑色模式'}
        </button>
        <div className="header-status">
          <Binary size={16} />
          企业资源智能匹配系统
        </div>
      </div>
    </header>
  )
}

function UploadPortal({ fileName, isAnalyzing, onFiles }) {
  return (
    <label
      className={`upload-portal ${isAnalyzing ? 'is-analyzing' : ''}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        onFiles(event.dataTransfer.files)
      }}
    >
      <input id="file-input" type="file" accept="application/pdf,.pdf" onChange={(event) => onFiles(event.target.files)} />
      <div className="upload-icon">
        {isAnalyzing ? <Loader2 className="spin" size={34} /> : <UploadCloud size={38} />}
      </div>
      <div>
        <strong>{isAnalyzing ? '正在解析 BP 商业计划书' : fileName || '拖入 BP / PDF 到分析入口'}</strong>
        <span>{fileName ? 'AI 将提取企业阶段、赛道、融资诉求和政策适配信息' : '点击上传，或将 PDF 文件拖到这里'}</span>
      </div>
      <div className="portal-scan" />
    </label>
  )
}

function InfoList({ title, items }) {
  return (
    <div className="info-list">
      <span>{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function WindowTitle({ eyebrow, title }) {
  return (
    <div className="window-title">
      <div className="section-kicker">
        <Globe2 size={14} />
        {eyebrow}
      </div>
      <h2>{title}</h2>
    </div>
  )
}

function Ambient({ particles }) {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="mouse-light" />
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="grid-plane" />
      <div className="light-trail trail-one" />
      <div className="light-trail trail-two" />
      {particles.map((particle) => (
        <span
          className="particle"
          style={{ left: particle.left, top: particle.top }}
          key={particle.id}
        />
      ))}
    </div>
  )
}

export default App
