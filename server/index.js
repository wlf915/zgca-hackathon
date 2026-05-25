import express from 'express'
import multer from 'multer'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const port = process.env.PORT || 4173

app.use(express.json({ limit: '10mb' }))

const policies = [
  {
    id: 'policy-eagle',
    title: '中关村雏鹰硬科技成长支持计划',
    category: '政策',
    tags: ['AI医疗', '人工智能', '硬科技', 'Pre-A', '研发补贴'],
    value: '最高 80 万元研发补贴与创业导师资源',
    requirements: ['企业成立不超过 5 年', '核心技术具备自主知识产权', '研发人员占比不低于 30%'],
    action: '补齐知识产权清单、研发费用明细和核心团队社保材料后提交预审。',
  },
  {
    id: 'policy-frontier',
    title: '中关村前沿技术场景验证券',
    category: '政策',
    tags: ['医学影像', '机器人', '边缘计算', '场景验证', '医院试点'],
    value: '支持试点采购、第三方检测和场景验证费用',
    requirements: ['已有可演示产品', '需要明确试点单位', '提交场景验证方案'],
    action: '将产品验证指标拆成临床、算法、部署三类，形成 1 页场景验证方案。',
  },
  {
    id: 'policy-rd',
    title: '海淀区科技企业研发投入补贴',
    category: '政策',
    tags: ['研发补贴', '人工智能', '硬科技', '知识产权', 'Pre-A'],
    value: '按研发投入、知识产权和技术先进性给予阶梯式补贴',
    requirements: ['企业在海淀注册或拟迁入', '研发费用台账清晰', '核心技术具备自主知识产权'],
    action: '整理研发费用辅助账、专利软著清单和未来 12 个月研发计划。',
  },
  {
    id: 'policy-sme',
    title: '专精特新种子企业培育计划',
    category: '政策',
    tags: ['硬科技', '医疗器械', '机器人', '知识产权', '产业化'],
    value: '梯度培育、融资路演、产业链对接与品牌背书',
    requirements: ['主营业务聚焦', '技术路线有壁垒', '具备一定营收或订单线索'],
    action: '梳理技术先进性、客户验证和未来 12 个月订单预测。',
  },
]

const parks = [
  {
    id: 'park-med',
    title: '中关村医疗器械创新园',
    category: '园区',
    tags: ['AI医疗', '医疗器械', '临床合规', '注册检测', '医院试点'],
    value: '提供注册检测辅导、临床资源对接和 6 个月免租窗口',
    requirements: ['产品属于医疗器械或数字医疗方向', '具备产品原型', '愿意落地海淀北部'],
    action: '预约园区合规顾问，确认二类或三类医疗器械注册路径。',
  },
  {
    id: 'park-ai',
    title: '中关村人工智能加速器',
    category: '园区',
    tags: ['人工智能', '计算机视觉', '大模型', '算法平台', 'GPU'],
    value: 'GPU 算力券、模型测评、算法企业集群和融资 Demo Day',
    requirements: ['AI 算法为核心能力', '有可量化模型指标', '团队包含算法负责人'],
    action: '准备模型指标、数据闭环和算力需求表，申请加速器技术面谈。',
  },
  {
    id: 'park-robot',
    title: '海淀智能硬件与机器人中试基地',
    category: '园区',
    tags: ['机器人', '边缘部署', '硬件配套', '供应链', '中试'],
    value: '小批量试产、可靠性测试、供应链导入和共享实验室',
    requirements: ['涉及硬件或端侧部署', '存在小批量试产需求', '有工程样机'],
    action: '提交 BOM、样机测试报告和未来 3 个月中试计划。',
  },
]

const fundingNavigator = [
  {
    id: 'fund-equity-seed',
    title: '中关村硬科技种子基金直通车',
    category: 'Funding Navigator',
    subtype: '基金',
    tags: ['基金', '硬科技', '人工智能', 'AI医疗', '医疗器械', 'Pre-A', '融资'],
    value: '建议申请 300 万至 800 万元种子轮/Pre-A 股权资金，用于模型研发、注册检测和首批试点。',
    requirements: ['技术壁垒可被验证', '已有产品原型或试点线索', '融资用途和股权结构清晰'],
    action: '准备 12 页融资 Deck、18 个月资金使用计划、核心技术壁垒证明和试点进展材料。',
  },
  {
    id: 'fund-vc-roadshow',
    title: '海淀硬科技创投路演通道',
    category: 'Funding Navigator',
    subtype: '创投',
    tags: ['创投', '融资', '商业化', '人工智能', 'Pre-A', '产业化', '投资人'],
    value: '对接硬科技 VC、产业资本和政府引导基金，适合需要快速验证融资反馈的早期企业。',
    requirements: ['融资金额和估值区间明确', '商业化验证可量化', '路演材料能在 5 分钟内讲清增长逻辑'],
    action: '将 BP 改成投资人版本，突出市场规模、标杆客户、收入路径、融资用途和退出可能性。',
  },
  {
    id: 'fund-competition-ai',
    title: '中关村创新创业大赛专项赛',
    category: 'Funding Navigator',
    subtype: '创业赛事',
    tags: ['创业赛事', 'AI医疗', '人工智能', '医学影像', '品牌背书', '融资', '场景验证'],
    value: '通过赛事获取奖金、媒体曝光、投资人闭门会和园区绿色通道，适合提升项目可信度。',
    requirements: ['项目创新性明确', '可现场演示产品或 Demo', '提交商业计划书、路演稿和团队介绍'],
    action: '打磨 5 分钟路演脚本，突出行业痛点、技术壁垒、落地场景、政策适配和融资诉求。',
  },
  {
    id: 'fund-interest-free-loan',
    title: '科技型小微企业无息周转贷款',
    category: 'Funding Navigator',
    subtype: '无息贷款',
    tags: ['无息贷款', '硬科技', '研发补贴', '现金流', '商业化', '知识产权', '订单'],
    value: '建议申请 50 万至 200 万元、6-12 个月无息周转资金，用于研发支出、试点交付和短期现金流。',
    requirements: ['企业信用记录良好', '有研发、订单或试点支出证明', '法定代表人和企业征信通过初筛'],
    action: '准备银行流水、纳税记录、订单或研发合同、知识产权证明和资金用途说明。',
  },
]

const resourcePool = [...policies, ...parks, ...fundingNavigator]

const keywordMap = [
  ['AI医疗', ['医疗', '影像', '临床', '诊断', '器械', '医院']],
  ['人工智能', ['人工智能', 'AI', '算法', '模型', '大模型']],
  ['计算机视觉', ['视觉', '图像', '视频', '识别', '检测']],
  ['边缘部署', ['边缘', '端侧', '嵌入式', '低延迟', '部署']],
  ['机器人', ['机器人', '机械臂', '具身', '自动化']],
  ['硬件配套', ['硬件', '设备', '传感器', 'BOM', '量产', '供应链']],
  ['临床合规', ['合规', '注册', 'NMPA', '临床', '伦理', '医疗器械']],
  ['商业化', ['销售', '客户', '订单', '渠道', '商业化', 'BD']],
  ['融资', ['融资', 'Pre-A', '天使', '投资']],
  ['基金', ['基金', '引导基金', '种子基金']],
  ['创投', ['创投', 'VC', '投资人', '路演']],
  ['创业赛事', ['创业赛事', '大赛', '比赛', '路演', '奖金']],
  ['无息贷款', ['无息贷款', '贷款', '周转', '现金流', '授信']],
  ['知识产权', ['专利', '软著', '知识产权', 'IP']],
]

function normalizeInput(body, file) {
  const fileText = file
    ? `文件名：${file.originalname}。系统已接收 BP 文件，黑客松演示版根据文件名和补充描述进行分析。`
    : ''
  return [body.companyName, body.website, body.description, fileText].filter(Boolean).join('\n')
}

function inferTags(text) {
  const source = text.toLowerCase()
  const tags = keywordMap
    .filter(([, words]) => words.some((word) => source.includes(word.toLowerCase())))
    .map(([tag]) => tag)

  if (tags.length === 0) {
    tags.push('人工智能', '硬科技', '商业化')
  }

  if (tags.includes('AI医疗') && !tags.includes('临床合规')) {
    tags.push('临床合规')
  }

  return [...new Set(tags)]
}

function inferStage(text) {
  const source = text.toLowerCase()
  if (source.includes('pre-a') || source.includes('pre a')) return 'Pre-A / 产品验证期'
  if (source.includes('a轮') || source.includes('series a')) return 'A 轮 / 规模化前期'
  if (source.includes('种子') || source.includes('天使')) return '天使轮 / 原型验证期'
  if (source.includes('营收') || source.includes('订单')) return '早期商业化 / 订单验证期'
  return 'Pre-A / 产品验证期'
}

function extractCompanyName(text) {
  const match = text.match(/([\u4e00-\u9fa5A-Za-z0-9]{2,20}(?:科技|智能|医疗|机器人|算法|有限公司))/)
  return match?.[1] || '星河智诊科技'
}

function buildProfile(text) {
  const tags = inferTags(text)
  const medical = tags.includes('AI医疗')
  const hardware = tags.includes('硬件配套') || tags.includes('边缘部署') || tags.includes('机器人')
  const commercial = tags.includes('商业化') || text.includes('客户') || text.includes('订单')

  const weaknesses = []
  if (medical) weaknesses.push('缺乏临床合规与医疗器械注册经验')
  if (hardware) weaknesses.push('缺少硬件中试、测试和供应链配套')
  if (!commercial) weaknesses.push('首批标杆客户和商业化路径不够清晰')
  weaknesses.push('政策申报材料尚未结构化，容易错过高价值窗口')

  return {
    companyName: extractCompanyName(text),
    stage: inferStage(text),
    industryTags: tags.slice(0, 5),
    technologyTags: tags.filter((tag) => ['人工智能', '计算机视觉', '边缘部署', '机器人', '硬件配套'].includes(tag)),
    coreBarriers: [
      tags.includes('计算机视觉') ? '垂直场景视觉算法与数据闭环' : '垂直行业数据和算法工程能力',
      hardware ? '端侧部署和工程化交付能力' : '快速产品化和模型迭代能力',
      medical ? '医疗场景理解和临床价值假设' : '场景需求理解和客户验证能力',
    ],
    weaknesses,
    resourceNeeds: [
      medical ? '临床试点与注册合规' : '场景验证与标杆客户',
      hardware ? '硬件配套与中试资源' : '算法测评与算力资源',
      '政策补贴与园区落地',
      '基金、创投、赛事和无息贷款',
    ],
  }
}

function scoreResource(profile, resource) {
  const allTags = [...profile.industryTags, ...profile.technologyTags, ...profile.weaknesses, ...profile.resourceNeeds].join(' ')
  const hits = resource.tags.filter((tag) => allTags.includes(tag))
  let score = 58 + hits.length * 9
  if (profile.stage.includes('Pre-A') && resource.tags.includes('Pre-A')) score += 8
  if (profile.weaknesses.some((weakness) => resource.tags.some((tag) => weakness.includes(tag)))) score += 8
  if (resource.category === 'Funding Navigator') score += 4

  return {
    ...resource,
    score: Math.min(score, 96),
    reasons: [
      hits.length ? `命中 ${hits.join('、')} 等关键标签。` : '与企业阶段和硬科技属性存在基础匹配。',
      `可直接回应「${profile.resourceNeeds[0]}」或「${profile.resourceNeeds[1]}」需求。`,
      resource.requirements.length ? `主要缺口：${resource.requirements[0]}。` : '当前缺口较少，可快速推进。',
    ],
  }
}

function selectMatches(scored, category) {
  const items = scored.filter((item) => item.category === category)

  if (category !== 'Funding Navigator') {
    return items.slice(0, 3)
  }

  const requiredSubtypes = ['基金', '创投', '创业赛事', '无息贷款']
  return requiredSubtypes
    .map((subtype) => items.find((item) => item.subtype === subtype))
    .filter(Boolean)
}

function buildActionPlan(profile, matches) {
  const topPolicy = matches.find((item) => item.category === '政策')
  const topPark = matches.find((item) => item.category === '园区')
  const topFunding = matches.find((item) => item.category === 'Funding Navigator')

  return [
    {
      horizon: '未来 7 天',
      tasks: [
        `整理 BP、知识产权、团队社保和产品演示材料，用于 ${topPolicy?.title || '政策'} 预审。`,
        `向 ${topPark?.title || '目标园区'} 发起入驻咨询，确认免租、检测和绿色通道条件。`,
        `形成融资材料缺口清单，明确 ${topFunding?.subtype || '资金'} 通道需要补齐的证明材料。`,
      ],
    },
    {
      horizon: '未来 30 天',
      tasks: [
        `完成 ${topFunding?.title || 'Funding Navigator'} 的首轮材料投递或路演预约。`,
        '同步推进政策预审、园区入驻和资金通道尽调，形成统一材料包。',
        '把政策、园区、基金、创投、赛事和贷款节点转成跟进看板。',
      ],
    },
    {
      horizon: '未来 90 天',
      tasks: [
        '完成首个场景验证或临床试点，沉淀可量化的算法、部署和客户价值指标。',
        '形成园区落地、政策申报和资金对接的闭环进展报告。',
        '基于试点结果更新融资材料，面向基金、创投和无息贷款通道发起下一轮推进。',
      ],
    },
  ]
}

app.post('/api/analyze', upload.single('bp'), (req, res) => {
  const text = normalizeInput(req.body, req.file)
  const profile = buildProfile(text)
  const scored = resourcePool
    .map((resource) => scoreResource(profile, resource))
    .sort((a, b) => b.score - a.score)

  const matches = ['政策', '园区', 'Funding Navigator'].reduce((acc, category) => {
    acc[category] = selectMatches(scored, category)
    return acc
  }, {})

  const flatMatches = Object.values(matches).flat()

  res.json({
    profile,
    matches,
    actionPlan: buildActionPlan(profile, flatMatches),
    agents: [
      { name: '企业画像官', status: '已解析行业、技术壁垒和阶段短板' },
      { name: '机会发现官', status: '已完成政策、园区和 Funding Navigator 匹配' },
      { name: '行动规划官', status: '已生成 7/30/90 天资源行动路径' },
    ],
    generatedAt: new Date().toISOString(),
  })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(port, () => {
  console.log(`GrowOS API running at http://localhost:${port}`)
})
