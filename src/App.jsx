import { useMemo, useState } from 'react'
import {
  ArrowDown,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
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
    price: '¥899 / 年',
    audience: '适合需要持续追踪政策、投资人和成长路线的创业团队',
    features: ['首月免费体验', '每月 10 份 BP / 项目材料解析', '政策动态监控与提醒', '投资人画像与沟通建议', '30/90/180 天路线追踪', '政策申报协助（每月 1 次）', '投资人联系协助（每月 2 次）'],
    highlighted: true,
  },
  {
    name: '定制报价',
    price: '定制报价',
    audience: '为有融资或政策需求的成长型企业提供一对一定制咨询与全程陪伴服务',
    features: ['约线下一对一定制咨询', '政策全程代填代报', '定制资本沟通渠道', '专属顾问全程陪伴', '多账号协同 & API 支持'],
  },
]

const demoBps = [
  {
    id: 'competition',
    category: '创赛 / 大创',
    name: '智农感知',
    fileName: '智农感知_农业IoT病虫害识别_BP.pdf',
    summary: '全国大学生创新创业大赛一等奖项目，基于低功耗物联网与边缘 AI 的农业病虫害早期预警系统。',
    analysis: {
      company: '智农感知',
      field: '农业物联网与边缘 AI 病虫害识别',
      plan: '以大创获奖为背书，通过与农业合作社和地方农技站合作完成产品验证，进而转化为商业化公司。',
      patents: '1 项传感器组网专利申请中，2 项软件著作权已申请',
      scale: '7 人核心团队（含 2 名硕士生、1 名指导教师），完成 2 块试验田部署',
      strengths: ['国家级竞赛背书，转化基础扎实', '农业场景痛点清晰，传感器成本低', '指导教师具备农业遥感背景'],
    },
    profile: [
      ['企业阶段', '种子期 / 大创转化'],
      ['核心赛道', '农业 IoT + 边缘 AI'],
      ['融资诉求', '100 万 - 200 万'],
      ['政策适配', '大学生创业 / 农业科技'],
      ['技术壁垒', '低功耗传感组网 + 边缘推理'],
      ['客户验证', '2 块合作社试验田'],
      ['申报抓手', '大创扶持、农业示范、科技型小微'],
      ['资金用途', '产品化、量产、渠道拓展'],
    ],
    policies: [
      {
        title: '大学生创业扶持专项资金',
        amount: '预计 10 万 - 30 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202411/t20241126_3949975.html',
        conditions: ['团队主要成员为在校或应届大学生', '项目已获省级以上竞赛奖项', '有明确商业化意向'],
        reason: '项目获全国大创一等奖，符合大学生创业扶持各项条件，可优先申请种子资金。',
        materials: ['竞赛获奖证书', '团队成员学籍证明', '商业计划书', '指导教师推荐函'],
      },
      {
        title: '农业科技示范推广补贴',
        amount: '预计 20 万 - 60 万',
        url: 'https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcjd/202505/t20250522_4095649.html',
        conditions: ['产品面向农业生产场景', '有真实农业合作方或试验田', '具备病虫害识别技术能力'],
        reason: '合作社试验田部署可包装为农业科技示范场景，适合申请推广补贴。',
        materials: ['合作社合作协议', '试验田照片与数据', '产品功能说明', '技术路线报告'],
      },
      {
        title: '科技型小微企业研发补贴',
        amount: '预计 10 万 - 30 万',
        url: 'https://beijing.chinatax.gov.cn/bjswj/sszc/zcjd/202404/fe5436e8d5304d4a86da854ba03e17d8/files/f9bc3557fc6844218bebce6fbdcdac37.pdf',
        conditions: ['注册为科技型小微企业', '有明确研发费用', '软著或专利可证明技术能力'],
        reason: '团队完成工商注册后即可申请科技型小微认定，叠加研发补贴覆盖前期成本。',
        materials: ['营业执照', '软著证明', '研发费用台账', '研发人员名单'],
      },
    ],
    investors: [
      {
        name: '梅花创投',
        ticket: '单笔 100 万 - 500 万',
        focus: '农业科技、物联网、早期硬件',
        history: '关注早期农业数字化和物联网赛道，投资过多家农业 AI 初创项目。',
        advice: '重点呈现试验田数据、病虫害识别准确率和合作社复购意愿，以及团队指导教师的技术背书。',
        contact: 'bp@meihuavc.com',
        website: 'https://www.meihuavc.com/',
      },
      {
        name: '联想之星',
        ticket: '单笔 50 万 - 300 万',
        focus: '科技创业、大学生创业、物联网',
        history: '持续关注高校科技成果转化和大学生创业，有完善的早期孵化体系。',
        advice: '建议准备清晰的商业化路径，说明如何从试验田扩展到规模化农业渠道及团队转化能力。',
        contact: 'contact@legendstar.com.cn',
        website: 'https://www.legendstar.com.cn/',
      },
      {
        name: '峰瑞资本',
        ticket: '单笔 100 万 - 600 万',
        focus: '农业科技、硬科技、早期创业',
        history: '投资过多家以高校为背景的硬科技初创，关注技术壁垒和场景落地节奏。',
        advice: '沟通时突出低功耗传感器的成本优势和边缘 AI 数据闭环能力，以及规模化量产路径。',
        contact: 'bp@freesvc.com',
        website: 'https://www.freesvc.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '完成注册与政策申报准备', tasks: ['完成公司注册和银行账户开立', '整理竞赛获奖材料和试验田数据', '确定大创扶持资金申报路径', '制作投资人版 Deck'] },
      { horizon: '90 天', title: '推进产品化与渠道验证', tasks: ['完成传感器量产版本 V1.0', '新增 2-3 家合作社试点', '提交农业科技示范补贴材料', '完成 5 家早期投资人沟通'] },
      { horizon: '180 天', title: '形成商业化闭环', tasks: ['争取首批政策资金落地', '建立农技站渠道合作', '完成种子轮融资', '将试验田数据包装为可复制商业案例'] },
    ],
  },
  {
    id: 'lab',
    category: '科研实验室',
    name: '绿晨新材料',
    fileName: '绿晨新材料_可降解高分子材料_BP.pdf',
    summary: '清华大学化工系实验室孵化，开发出具有自主知识产权的生物基可降解高分子材料，已获 3 项授权专利。',
    analysis: {
      company: '绿晨新材料',
      field: '生物基可降解高分子材料',
      plan: '依托实验室专利，与包装和农膜厂商合作开展小批量试产，逐步实现技术成果产业化。',
      patents: '3 项发明专利已授权，2 项专利申请中，5 项软著',
      scale: '12 人团队（含 1 名教授、3 名博士生），完成中试线搭建，已有 2 家厂商试用',
      strengths: ['专利壁垒高，核心配方受严格保护', '绿色材料政策顺风', '教授团队具备丰富材料研发经验'],
    },
    profile: [
      ['企业阶段', '天使期 / 科技成果转化'],
      ['核心赛道', '可降解高分子材料'],
      ['融资诉求', '500 万 - 1000 万'],
      ['政策适配', '绿色低碳 / 科技成果转化'],
      ['技术壁垒', '专利配方 + 中试工艺'],
      ['客户验证', '2 家包装厂商试用中'],
      ['申报抓手', '科技成果转化、绿色低碳补贴'],
      ['资金用途', '中试放大、检测认证、市场开拓'],
    ],
    policies: [
      {
        title: '高校科技成果转化专项资金',
        amount: '预计 100 万 - 300 万',
        url: 'https://www.ncsti.gov.cn/zcfg/zcwj/201903/t20190321_13420.html',
        conditions: ['技术来源于高校实验室', '已完成中试或小批量验证', '有明确产业化计划'],
        reason: '技术来源清华大学实验室，已完成中试线搭建，符合科技成果转化主要条件。',
        materials: ['专利证书', '实验室技术转让协议', '中试报告', '产业化计划书'],
      },
      {
        title: '绿色低碳材料技术推广补贴',
        amount: '预计 80 万 - 200 万',
        url: 'https://kfqgw.beijing.gov.cn/zwgkkfq/2024zcjd/202505/t20250522_4095649.html',
        conditions: ['材料具备生物降解性能', '有检测报告或认证', '面向实体产业客户'],
        reason: '可降解材料直接服务双碳目标，试用客户可作为推广场景证明。',
        materials: ['降解性能检测报告', '客户试用合同', '材料技术说明', '碳减排测算'],
      },
      {
        title: '北京市高新技术企业培育补贴',
        amount: '预计 30 万 - 80 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202411/t20241126_3949975.html',
        conditions: ['拥有自主知识产权', '研发人员占比达标', '主营业务与技术相关'],
        reason: '团队拥有多项授权专利，博士研发团队占比高，适合申请高新技术企业培育。',
        materials: ['专利证书', '研发人员学历证明', '营业执照', '财务报表'],
      },
    ],
    investors: [
      {
        name: '深创投',
        ticket: '单笔 500 万 - 2000 万',
        focus: '新材料、绿色科技、硬科技成果转化',
        history: '持续布局新材料和绿色低碳赛道，对高校成果转化项目有丰富投资经验。',
        advice: '重点呈现专利壁垒和中试工艺成熟度，以及客户试用进展和替代传统材料的性价比测算。',
        contact: 'materials@szvc.com.cn',
        website: 'https://www.szvc.com.cn/',
      },
      {
        name: '中科创星',
        ticket: '单笔 300 万 - 1500 万',
        focus: '科技成果转化、硬科技、新材料',
        history: '专注高校和科研院所科技成果转化，在材料和化工领域投资经验丰富。',
        advice: '建议准备详细的技术路线图和产业化成本结构，说明中试放大后的量产可行性。',
        contact: 'bp@msvc.com.cn',
        website: 'https://www.msvc.com.cn/',
      },
      {
        name: '国科嘉和',
        ticket: '单笔 500 万 - 3000 万',
        focus: '科技成果转化、绿色材料、产业链投资',
        history: '国家级科技成果转化基金背景，重点支持高校科研转化和绿色制造项目。',
        advice: '沟通时突出专利授权状态、中试数据和客户试用效果，以及教授团队的行业影响力。',
        contact: 'contact@guokejiahe.com',
        website: 'https://www.guokejiahe.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '完善知识产权与转化手续', tasks: ['确认专利独家授权协议', '完成技术转让合同签署', '提交科技成果转化资金申请', '整理中试数据和客户试用报告'] },
      { horizon: '90 天', title: '推进中试放大与客户导入', tasks: ['完成中试产能提升至 5 吨/月', '新增 2-3 家包装或农膜客户', '提交绿色低碳材料补贴', '完成天使轮投资人路演'] },
      { horizon: '180 天', title: '形成量产与认证突破', tasks: ['取得降解材料相关资质认证', '争取政策资金到账', '完成天使轮融资', '建立第一批规模化供货合同'] },
    ],
  },
  {
    id: 'startup',
    category: '初创企业',
    name: '链图科技',
    fileName: '链图科技_供应链可视化SaaS_BP.pdf',
    summary: '为制造业和贸易企业提供供应链全链路可视化 SaaS，已有 15 家付费客户，年化收入 180 万元。',
    analysis: {
      company: '链图科技',
      field: '供应链可视化与风险预警 SaaS',
      plan: '从制造业采购端切入，以供应链可视化为核心能力，逐步扩展到风险预警和供应商评估。',
      patents: '2 项数据处理算法专利申请中，6 项软件著作权',
      scale: '22 人团队，15 家付费客户，ARR 约 180 万，净收入留存率 115%',
      strengths: ['SaaS 留存率高，客户续费意愿强', '供应链可视化需求受地缘政治影响持续放大', '产品交付轻量，实施周期短'],
    },
    profile: [
      ['企业阶段', 'Pre-A / B2B SaaS'],
      ['核心赛道', '供应链可视化 SaaS'],
      ['融资诉求', '800 万 - 1500 万'],
      ['政策适配', '数字化转型 / 工业互联网'],
      ['技术壁垒', '多源数据融合 + 风险预警模型'],
      ['客户验证', '15 家付费客户，ARR 180 万'],
      ['申报抓手', '数字化服务商、工业互联网平台'],
      ['资金用途', '产品迭代、销售团队、行业模板'],
    ],
    policies: [
      {
        title: '中小企业数字化转型服务商入库',
        amount: '预计 30 万 - 80 万',
        url: 'https://jxj.beijing.gov.cn/zwgk/2024zcwj/202507/t20250729_4161230.html',
        conditions: ['具备 SaaS 产品交付能力', '服务中小制造业数字化', '有可复制实施流程'],
        reason: '供应链可视化 SaaS 属于典型数字化转型工具，付费客户案例可支撑服务商申报。',
        materials: ['服务商申请表', '产品功能说明', '客户合同列表', '实施流程文档'],
      },
      {
        title: '工业互联网平台培育资金',
        amount: '预计 50 万 - 150 万',
        url: 'https://www.ncsti.gov.cn/zcfg/zcwj/201903/t20190321_13420.html',
        conditions: ['平台连接工业场景', '有制造业客户数据', '具备数据安全能力'],
        reason: '供应链平台连接制造业上下游，符合工业互联网平台培育方向。',
        materials: ['平台架构说明', '客户数据规模', '数据安全方案', '平台功能截图'],
      },
      {
        title: '科技型中小企业研发补贴',
        amount: '预计 20 万 - 50 万',
        url: 'https://beijing.chinatax.gov.cn/bjswj/sszc/zcjd/202404/fe5436e8d5304d4a86da854ba03e17d8/files/f9bc3557fc6844218bebce6fbdcdac37.pdf',
        conditions: ['研发费用可归集', '有软著或专利', '年收入未超限额'],
        reason: '产品持续迭代风险预警模块，研发投入可作为补贴依据。',
        materials: ['软著证明', '研发费用台账', '版本迭代记录', '研发人员社保'],
      },
    ],
    investors: [
      {
        name: '源码资本',
        ticket: '单笔 600 万 - 2000 万',
        focus: '企业服务、供应链科技、SaaS',
        history: '投资过多家 B2B SaaS 和供应链科技公司，关注 NRR 和客户扩张路径。',
        advice: '重点展示净收入留存率、客户 LTV/CAC 比和从单模块扩展到全链路的产品路线图。',
        contact: 'contact@sourcecodecap.com',
        website: 'https://www.sourcecodecap.com/',
      },
      {
        name: '红点中国',
        ticket: '单笔 500 万 - 2000 万',
        focus: '企业软件、SaaS、供应链',
        history: '在企业服务和 SaaS 领域有深厚布局，关注产品黏性和规模化销售效率。',
        advice: '建议用标杆客户案例展示供应链可视化的具体价值，量化交货准时率提升和库存成本下降。',
        contact: 'china@redpoint.com',
        website: 'https://www.redpoint.com/',
      },
      {
        name: '光速中国',
        ticket: '单笔 800 万 - 3000 万',
        focus: '企业服务、B2B SaaS、数字化',
        history: '长期关注企业数字化转型赛道，投资过多家供应链和工业软件公司。',
        advice: '沟通时突出 ARR 增长节奏、销售效率和行业复制速度，以及产品与 ERP/WMS 的集成能力。',
        contact: 'bp@lsvp.com',
        website: 'https://www.lsvp.com/',
      },
    ],
    roadmap: [
      { horizon: '30 天', title: '强化商业化指标与政策申报', tasks: ['整理 ARR、NRR 和客户留存数据', '申请数字化服务商入库', '准备 3 个标杆客户案例', '制作 Pre-A 投资人版本 Deck'] },
      { horizon: '90 天', title: '推进融资与产品扩展', tasks: ['完成 10 家 Pre-A 投资人会议', '上线风险预警模块', '新增 5 家付费客户', '提交工业互联网平台培育材料'] },
      { horizon: '180 天', title: '扩大销售与完成融资', tasks: ['ARR 突破 400 万', '形成行业标准化实施包', '完成 Pre-A 融资', '建立渠道合作伙伴网络'] },
    ],
  },
]

function App() {
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeBpId, setActiveBpId] = useState(null)
  const [theme, setTheme] = useState('light')
  const [hasResult, setHasResult] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [thinkingBp, setThinkingBp] = useState(null)
  const [modal, setModal] = useState(null)
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
          <p className="hero-subtitle">上传 BP，AI 解析企业画像，精准推荐政策、投资人与成长路线。</p>
          <div className="partner-stats">
            <div className="partner-stat-block">
              <strong>31</strong>
              <span>所高校合作</span>
            </div>
            <div className="partner-stat-divider" />
            <div className="partner-stat-block">
              <strong>120+</strong>
              <span>家投资机构</span>
            </div>
            <div className="partner-stat-divider" />
            <div className="partner-stat-block">
              <strong>北京市政府</strong>
              <span>战略合作单位</span>
            </div>
          </div>
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
        <ServiceBanner
          icon={ReceiptText}
          title="一站式政策填报服务"
          description="专业团队代整理申报材料、跟进审批进度，全程陪跑提升申报通过率"
          cta="预约填报服务"
          onCta={() => setModal({ title: '预约填报服务', subtitle: '请留下联系方式，我们将在 1 个工作日内与您确认申报方向与所需材料，协助完成政策申报全流程。' })}
        />
      </section>

      <section className="snap-window dashboard-window">
        <WindowTitle eyebrow="资本连接" title="投资人推荐" />
        <div className="recommendation-grid investor-grid">
          {activeBp.investors.map((investor) => (
            <article className="recommendation-card" key={investor.name}>
              <div className="card-orb"><BriefcaseBusiness size={25} /></div>
              <div className="card-label-row">
                <span className="card-label">投资偏好</span>
                <span className="partner-badge"><CheckCircle2 size={11} />合作机构</span>
              </div>
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
        <ServiceBanner
          icon={BriefcaseBusiness}
          title="投资人直达对接服务"
          description="根据 BP 精准触达匹配机构，协助沟通预约和初筛，提升融资效率"
          cta="预约对接服务"
          onCta={() => setModal({ title: '预约投资人对接服务', subtitle: '请留下联系方式，专属顾问将为您精准匹配投资机构，协助沟通预约与初筛，提升融资成功率。' })}
        />
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
          <ServiceBanner
            icon={Sparkles}
            title="全程陪伴与落地支持"
            description="专属顾问跟进每个关键节点，协助材料准备、政策申报和投资人沟通，助你按节奏推进"
            cta="了解陪伴服务"
            onCta={() => setModal({ title: '了解全程陪伴服务', subtitle: '请留下联系方式，我们将为您详细介绍陪伴服务内容，并制定个性化支持方案，按节奏推进成长目标。' })}
          />
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
        <SubscribeForm />
        <div className="subscription-note">
          <Sparkles size={18} />
          <span>个人和企业用户可先免费体验一个月；机构客户可预约专属政策库、投资人库和企业服务工作台。</span>
        </div>
      </section>

      </>}
      {modal && <ServiceModal service={modal} onClose={() => setModal(null)} />}
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
            <span className="demo-button-category">{bp.category}</span>
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
        <Cpu size={22} />
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

function ServiceBanner({ icon: Icon, title, description, cta, onCta }) {
  return (
    <div className="service-banner">
      <div className="service-banner-icon">
        <Icon size={20} />
      </div>
      <div className="service-banner-body">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <button className="service-banner-cta" type="button" onClick={onCta}>{cta}</button>
    </div>
  )
}

function ServiceModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '', company: '', note: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}>✕</button>
        {submitted ? (
          <div className="modal-success">
            <CheckCircle2 size={44} />
            <strong>预约已提交</strong>
            <p>感谢您的信任，我们将在 1 个工作日内与您联系，请保持手机畅通。</p>
            <button className="modal-submit" type="button" onClick={onClose}>关闭</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <strong>{service.title}</strong>
              <p>{service.subtitle}</p>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>姓名</label>
                <input required placeholder="请输入您的姓名" value={form.name} onChange={set('name')} />
              </div>
              <div className="modal-field">
                <label>联系方式</label>
                <input required placeholder="手机号或邮箱" value={form.contact} onChange={set('contact')} />
              </div>
              <div className="modal-field">
                <label>企业 / 项目名称</label>
                <input placeholder="选填" value={form.company} onChange={set('company')} />
              </div>
              <div className="modal-field">
                <label>备注</label>
                <textarea placeholder="您的具体需求或问题（选填）" value={form.note} onChange={set('note')} />
              </div>
              <button className="modal-submit" type="submit">提交预约</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function SubscribeForm() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true) }}>
      <label htmlFor="subscribe-email">输入邮箱，开通首月免费体验</label>
      {subscribed ? (
        <div className="subscribe-success">
          <CheckCircle2 size={18} />
          <span>邮箱已登记，我们将尽快与您联系！</span>
        </div>
      ) : (
        <div>
          <input id="subscribe-email" type="email" placeholder="yourname@company.com" required />
          <button type="submit">申请体验</button>
        </div>
      )}
    </form>
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
