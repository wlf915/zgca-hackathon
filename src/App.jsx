import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ArrowDown,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  CircleDot,
  Cpu,
  DatabaseZap,
  FileText,
  Gauge,
  Globe2,
  Landmark,
  Loader2,
  MapPinned,
  Network,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  Zap,
} from 'lucide-react'
import './App.css'

const featureTags = ['AI Analysis', 'Policy Matching', 'Talent Discovery', 'Enterprise Connections', 'Smart Recommendations']

const stages = [
  { label: 'PDF Input', icon: FileText },
  { label: 'Document Parsing', icon: ScanLine },
  { label: 'Knowledge Extraction', icon: DatabaseZap },
  { label: 'Reasoning Engine', icon: BrainCircuit },
  { label: 'Intelligent Recommendation', icon: Sparkles },
]

const metrics = [
  ['Policy Match', '89%'],
  ['Related Companies', '12'],
  ['Available Talent', '45'],
  ['Recommended Parks', '6'],
]

const opportunityCards = [
  { title: 'Government Policies', icon: Landmark, meta: '42 active signals', copy: 'Subsidies, pilot programs, approvals, and compliance windows mapped to your document.' },
  { title: 'Enterprise Partners', icon: BriefcaseBusiness, meta: '12 high-fit links', copy: 'Commercial pathways surfaced through industry graph proximity and procurement intent.' },
  { title: 'Talent Matching', icon: Users, meta: '45 candidates', copy: 'Technical, operating, and research talent aligned to execution gaps.' },
  { title: 'Industrial Parks', icon: MapPinned, meta: '6 launch zones', copy: 'Regional landing zones ranked by incentive strength and infrastructure fit.' },
]

const dashboardStats = [
  { label: 'Policy Match Success', value: '92%', icon: ShieldCheck },
  { label: 'Talent Fit', value: '87%', icon: Users },
  { label: 'Enterprise Match', value: '95%', icon: Network },
  { label: 'Response Speed', value: '<1s', icon: Zap },
]

function App() {
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const shellRef = useRef(null)
  const frameRef = useRef(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 19) % 100}%`,
        top: `${(index * 37) % 100}%`,
        delay: `${(index % 9) * 0.45}s`,
        duration: `${7 + (index % 6)}s`,
      })),
    [],
  )

  useEffect(() => {
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  function handleMouseMove(event) {
    if (frameRef.current) return

    const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`
    const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`

    frameRef.current = window.requestAnimationFrame(() => {
      shellRef.current?.style.setProperty('--mouse-x', x)
      shellRef.current?.style.setProperty('--mouse-y', y)
      frameRef.current = null
    })
  }

  function handleFiles(files) {
    const file = files?.[0]
    if (!file) return
    setFileName(file.name)
    setIsAnalyzing(true)
    window.setTimeout(() => setIsAnalyzing(false), 2100)
  }

  return (
    <main
      ref={shellRef}
      className="mission-shell"
      onMouseMove={handleMouseMove}
    >
      <Ambient particles={particles} />
      <section className="snap-window hero-window">
        <Header />
        <div className="hero-content">
          <div className="section-kicker">
            <CircleDot size={13} />
            AI Mission Control
          </div>
          <h1>Transform Documents into Intelligence</h1>
          <p className="hero-subtitle">Upload your PDF. Let AI analyze, understand, and discover opportunities.</p>
          <UploadPortal fileName={fileName} isAnalyzing={isAnalyzing} onFiles={handleFiles} />
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
          Scroll to explore <ArrowDown size={16} />
        </a>
      </section>

      <section className="snap-window processing-window" id="thinking">
        <WindowTitle eyebrow="Neural pipeline" title="AI Thinking Engine" />
        <div className="processing-grid">
          <div className="neural-core" aria-label="Animated neural network">
            <div className="core-ring ring-one" />
            <div className="core-ring ring-two" />
            <div className="core-ring ring-three" />
            {Array.from({ length: 14 }, (_, index) => (
              <span className={`node node-${index + 1}`} key={index} />
            ))}
            <BrainCircuit className="core-icon" size={72} />
          </div>
          <div className="stage-stack">
            {stages.map(({ label, icon: Icon }, index) => (
              <article className="stage-card" style={{ '--delay': `${index * 0.16}s` }} key={label}>
                <Icon size={19} />
                <span>{label}</span>
              </article>
            ))}
          </div>
          <div className="metric-cloud">
            {metrics.map(([label, value], index) => (
              <article className="floating-metric" style={{ '--delay': `${index * 0.35}s` }} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-window universe-window">
        <WindowTitle eyebrow="Recommendation graph" title="AI Opportunity Space" />
        <div className="orbit-stage">
          <div className="orbit-line orbit-a" />
          <div className="orbit-line orbit-b" />
          <div className="connection-line" />
          {opportunityCards.map(({ title, icon: Icon, meta, copy }, index) => (
            <article className={`opportunity-card card-${index + 1}`} key={title}>
              <div className="card-orb">
                <Icon size={28} />
              </div>
              <span>{meta}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="snap-window dashboard-window">
        <WindowTitle eyebrow="Live intelligence" title="Real-time Intelligence Center" />
        <div className="dashboard">
          <div className="stat-grid">
            {dashboardStats.map(({ label, value, icon: Icon }) => (
              <article className="stat-card" key={label}>
                <Icon size={22} />
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="chart-panel">
            <div className="chart-header">
              <span>Opportunity Velocity</span>
              <Activity size={18} />
            </div>
            <div className="bars">
              {[55, 72, 64, 88, 76, 94, 82, 97].map((height, index) => (
                <span style={{ '--height': `${height}%`, '--delay': `${index * 0.1}s` }} key={index} />
              ))}
            </div>
          </div>
          <div className="relationship-panel">
            <Network size={26} />
            <span className="relation-node node-main">AI Core</span>
            <span className="relation-node node-policy">Policy</span>
            <span className="relation-node node-talent">Talent</span>
            <span className="relation-node node-market">Market</span>
            <span className="relation-node node-zone">Parks</span>
          </div>
          <div className="heat-panel">
            <div className="chart-header">
              <span>Regional Signal Heat</span>
              <Gauge size={18} />
            </div>
            <div className="heat-map">
              {Array.from({ length: 36 }, (_, index) => (
                <span style={{ '--level': `${0.25 + ((index * 17) % 75) / 100}` }} key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="snap-window cta-window">
        <div className="earth-horizon" />
        <div className="cta-panel">
          <div className="section-kicker">
            <Rocket size={15} />
            Launch sequence ready
          </div>
          <h2>The Future Starts with Understanding</h2>
          <button className="launch-button" type="button" onClick={() => document.querySelector('#file-input')?.click()}>
            <Rocket size={20} />
            Launch AI Analysis
          </button>
        </div>
      </section>
    </main>
  )
}

function Header() {
  return (
    <header className="mission-header">
      <div className="brand">
        <Cpu size={19} />
        <span>GrowOS Command</span>
      </div>
      <div className="header-status">
        <Binary size={16} />
        Live Intelligence Layer
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
        <strong>{isAnalyzing ? 'Analyzing document stream' : fileName || 'Drag PDF into portal'}</strong>
        <span>{fileName ? 'Secure PDF linked to AI reasoning engine' : 'Click to upload or drop a PDF file'}</span>
      </div>
      <div className="portal-scan" />
    </label>
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
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
          key={particle.id}
        />
      ))}
    </div>
  )
}

export default App
