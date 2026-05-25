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
    id: 'policy-talent',
    title: '海淀区高层次创新人才团队引进专项',
    category: '政策',
    tags: ['人才', '高管', '合规', '商业化', '政府事务', 'Pre-A'],
    value: '人才落户、办公补贴与团队奖励组合支持',
    requirements: ['核心成员符合高层次人才标准', '企业在海淀注册或拟迁入', '岗位职责清晰'],
    action: '先定义法规注册负责人和政府事务负责人的岗位画像，再发起人才预匹配。',
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

const companies = [
  {
    id: 'co-device',
    title: '华清影像设备有限公司',
    category: '企业',
    distance: '3.2km',
    tags: ['医学影像', '硬件配套', '医院渠道', '边缘部署'],
    value: '可提供影像设备接口、医院渠道和边缘盒子联合验证',
    requirements: ['算法可部署到端侧设备', '具备影像数据处理能力', '愿意联合试点'],
    action: '发起技术互补会，验证设备接口、推理延迟和联合 PoC 边界。',
  },
  {
    id: 'co-cloud',
    title: '北航云边智能实验室转化平台',
    category: '企业',
    distance: '4.8km',
    tags: ['边缘计算', '计算机视觉', '算法优化', '科研合作'],
    value: '可协助模型压缩、边缘推理优化和论文专利联合转化',
    requirements: ['拥有自研模型', '需要端侧性能优化', '可开放部分测试数据'],
    action: '准备模型结构、推理耗时和目标硬件参数，约 2 小时技术评审。',
  },
  {
    id: 'co-hospital',
    title: '海淀智慧临床创新联合体',
    category: '企业',
    distance: '5.0km',
    tags: ['临床合规', '医院试点', '医学影像', '伦理审查'],
    value: '连接临床科室、伦理预审和真实场景需求访谈',
    requirements: ['明确临床价值假设', '具备隐私合规方案', '可提供产品演示'],
    action: '先完成临床价值一页纸，再申请科室需求访谈。',
  },
]

const talents = [
  {
    id: 'talent-ra',
    title: '医疗器械注册法规负责人',
    category: '人才',
    tags: ['临床合规', '医疗器械', '注册检测', '质量体系'],
    value: '补齐注册路径、质量体系、检测和临床评价能力',
    requirements: ['5 年以上二/三类器械注册经验', '熟悉 NMPA 审评口径', '能搭建 QMS'],
    action: '优先寻找有 AI 辅助诊断或医学软件注册经验的候选人。',
  },
  {
    id: 'talent-bd',
    title: '政府事务与产业 BD 负责人',
    category: '人才',
    tags: ['政策', '园区', '商业化', '政府事务', '融资'],
    value: '提升政策申报、园区落地、生态伙伴和首批订单转化效率',
    requirements: ['熟悉中关村政策体系', '有园区和龙头企业资源', '能做项目制推进'],
    action: '用 30 天目标考核候选人：政策预审、园区入驻和 3 个伙伴会。',
  },
  {
    id: 'talent-supply',
    title: '硬件供应链与中试负责人',
    category: '人才',
    tags: ['硬件配套', '边缘部署', '中试', '供应链', '机器人'],
    value: '把算法产品推进到稳定样机、小批量交付和成本控制',
    requirements: ['有硬件量产经验', '熟悉 BOM 与测试流程', '能管理供应商'],
    action: '在联合 PoC 后引入兼职顾问，先建立样机测试和供应商清单。',
  },
]

const resourcePool = [...policies, ...parks, ...companies, ...talents]

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
      '核心高管人才补位',
    ],
  }
}

function scoreResource(profile, resource) {
  const allTags = [...profile.industryTags, ...profile.technologyTags, ...profile.weaknesses, ...profile.resourceNeeds].join(' ')
  const hits = resource.tags.filter((tag) => allTags.includes(tag))
  let score = 58 + hits.length * 9
  if (profile.stage.includes('Pre-A') && resource.tags.includes('Pre-A')) score += 8
  if (profile.weaknesses.some((weakness) => resource.tags.some((tag) => weakness.includes(tag)))) score += 8
  if (resource.category === '企业' && resource.distance) score += 4

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

function buildActionPlan(profile, matches) {
  const topPolicy = matches.find((item) => item.category === '政策')
  const topPark = matches.find((item) => item.category === '园区')
  const topCompany = matches.find((item) => item.category === '企业')
  const topTalent = matches.find((item) => item.category === '人才')

  return [
    {
      horizon: '未来 7 天',
      tasks: [
        `整理 BP、知识产权、团队社保和产品演示材料，用于 ${topPolicy?.title || '政策'} 预审。`,
        `向 ${topPark?.title || '目标园区'} 发起入驻咨询，确认免租、检测和绿色通道条件。`,
        `形成 1 页短板补位清单，明确 ${profile.weaknesses[0]} 的责任人和材料缺口。`,
      ],
    },
    {
      horizon: '未来 30 天',
      tasks: [
        `与 ${topCompany?.title || '生态伙伴'} 完成一次 PoC 会议，锁定接口、数据和试点边界。`,
        `启动 ${topTalent?.title || '关键人才'} 招募或顾问合作，先用项目制补齐能力。`,
        '完成政策申报包初稿，并把资源匹配结果转成 CRM 跟进列表。',
      ],
    },
    {
      horizon: '未来 90 天',
      tasks: [
        '完成首个场景验证或临床试点，沉淀可量化的算法、部署和客户价值指标。',
        '形成园区落地、政策申报、生态合作和核心人才的闭环进展报告。',
        '基于试点结果更新融资材料，面向硬科技基金和产业资本发起路演。',
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

  const matches = ['政策', '园区', '企业', '人才'].reduce((acc, category) => {
    acc[category] = scored.filter((item) => item.category === category).slice(0, 3)
    return acc
  }, {})

  const flatMatches = Object.values(matches).flat()

  res.json({
    profile,
    matches,
    actionPlan: buildActionPlan(profile, flatMatches),
    agents: [
      { name: '企业画像官', status: '已解析行业、技术壁垒和阶段短板' },
      { name: '机会发现官', status: '已完成政策、园区、企业、人才四向匹配' },
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
