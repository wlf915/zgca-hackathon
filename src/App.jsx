import { useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  FileUp,
  HandCoins,
  Landmark,
  Loader2,
  MapPinned,
  Search,
  Sparkles,
} from 'lucide-react'
import './App.css'

const sampleDescription =
  '星河智诊科技是一家 Pre-A 阶段的 AI 医疗创业公司，面向基层医院提供医学影像辅助诊断系统。团队有计算机视觉算法、边缘部署和医院试点经验，当前希望寻找中关村政策补贴、适合落地的医疗器械园区，以及基金、创投、创业赛事和无息贷款等融资通道。'

const categories = [
  { name: '政策', icon: Landmark },
  { name: '园区', icon: MapPinned },
  { name: 'Funding Navigator', icon: HandCoins },
]

function App() {
  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState(sampleDescription)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('政策')

  const activeMatches = useMemo(() => result?.matches?.[activeTab] || [], [result, activeTab])

  async function analyzeCompany(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('companyName', companyName)
    formData.append('website', website)
    formData.append('description', description)
    if (file) formData.append('bp', file)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('分析接口返回异常')
      const data = await response.json()
      setResult(data)
      setActiveTab('政策')
    } catch (err) {
      setError(err.message || '无法连接 GrowOS API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="eyebrow">GrowOS Hackathon Demo</p>
          <h1>资源自动发现与行动系统</h1>
        </div>
        <div className="mode-pill">Match & Action</div>
      </header>

      <section className="workspace">
        <form className="input-panel" onSubmit={analyzeCompany}>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Input</p>
              <h2>拖入 BP 或描述企业</h2>
            </div>
            <Search size={22} />
          </div>

          <label>
            公司名称
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="例如：星河智诊科技"
            />
          </label>

          <label>
            官网链接
            <input
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              placeholder="https://example.com"
            />
          </label>

          <label>
            团队 / BP 摘要
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={9}
              placeholder="粘贴 BP 摘要、团队介绍、技术方向、当前需求..."
            />
          </label>

          <label className="upload-box">
            <FileUp size={22} />
            <span>{file ? file.name : '上传 BP 文件，演示版会读取文件名并结合文本分析'}</span>
            <input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
            {loading ? '智能体分析中' : '开始发现资源'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <section className="result-panel">
          {!result ? (
            <EmptyState />
          ) : (
            <>
              <div className="agent-strip">
                {result.agents.map((agent) => (
                  <div className="agent-item" key={agent.name}>
                    <CheckCircle2 size={18} />
                    <strong>{agent.name}</strong>
                    <span>{agent.status}</span>
                  </div>
                ))}
              </div>

              <ProfileCard profile={result.profile} />

              <div className="match-section">
                <div className="section-title">
                  <p className="eyebrow">Resource Match</p>
                  <h2>政策 · 园区 · Funding Navigator</h2>
                </div>
                <div className="tabs">
                  {categories.map(({ name, icon: Icon }) => (
                    <button
                      className={activeTab === name ? 'tab active' : 'tab'}
                      key={name}
                      onClick={() => setActiveTab(name)}
                      type="button"
                    >
                      <Icon size={17} />
                      {name}
                    </button>
                  ))}
                </div>
                <div className="match-grid">
                  {activeMatches.map((item) => (
                    <ResourceCard item={item} key={item.id} />
                  ))}
                </div>
              </div>

              <ActionPlan plans={result.actionPlan} />
            </>
          )}
        </section>
      </section>
    </main>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <Building2 size={42} />
      <h2>等待企业输入</h2>
      <p>提交后将生成企业画像、政策园区匹配、Funding Navigator 和 7/30/90 天行动路线。</p>
    </div>
  )
}

function ProfileCard({ profile }) {
  return (
    <section className="profile-card">
      <div className="profile-head">
        <div>
          <p className="eyebrow">Agent 1 - Who am I</p>
          <h2>{profile.companyName}</h2>
          <p>{profile.stage}</p>
        </div>
        <div className="score-ring">92</div>
      </div>

      <div className="tag-row">
        {profile.industryTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="profile-grid">
        <InfoBlock title="技术壁垒" items={profile.coreBarriers} />
        <InfoBlock title="阶段短板" items={profile.weaknesses} />
        <InfoBlock title="资源需求" items={profile.resourceNeeds} />
      </div>
    </section>
  )
}

function InfoBlock({ title, items }) {
  return (
    <div className="info-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function ResourceCard({ item }) {
  return (
    <article className="resource-card">
      <div className="resource-top">
        <div>
          <p className="eyebrow">{item.category}{item.subtype ? ` · ${item.subtype}` : ''}</p>
          <h3>{item.title}</h3>
        </div>
        <strong>{item.score}</strong>
      </div>
      <p className="resource-value">{item.value}</p>
      <ul className="reason-list">
        {item.reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
      <div className="next-action">
        <ClipboardList size={16} />
        <span>{item.action}</span>
      </div>
    </article>
  )
}

function ActionPlan({ plans }) {
  return (
    <section className="action-plan">
      <div className="section-title">
        <p className="eyebrow">Agent 3 - Action</p>
        <h2>行动路线</h2>
      </div>
      <div className="timeline">
        {plans.map((plan) => (
          <div className="timeline-item" key={plan.horizon}>
            <h3>{plan.horizon}</h3>
            <ul>
              {plan.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
