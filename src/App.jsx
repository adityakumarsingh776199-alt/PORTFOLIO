import { useState, useEffect, useRef } from 'react'
import Project from './Project.jsx'

const EMAIL = 'adityakumarsingh776199@gmail.com'
const TOOLS = ['Python', 'SQL', 'Pandas', 'Power BI', 'TensorFlow', 'Java', 'C', 'MS Office']
const H1 = 'Data scientist in the making. I turn messy data into models and dashboards that help people decide.'
const BARS = [42, 55, 48, 63, 70, 66, 78, 85, 74, 92, 88, 100]

function useSeen() {
  const r = useRef(null)
  const [s, set] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); o.disconnect() } }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' })
    o.observe(r.current)
    return () => o.disconnect()
  }, [])
  return [r, s]
}

function Rv({ as: T = 'div', cls = '', children, ...p }) {
  const [r, s] = useSeen()
  return <T ref={r} className={`rv ${s ? 'in' : ''} ${cls}`} {...p}>{typeof children === 'function' ? children(s) : children}</T>
}

const Hb = ({ l, t, w, s }) => (
  <div className="hb"><span>{l}<b>{t}</b></span><em><i style={{ width: s ? w + '%' : 0 }} /></em></div>
)

function Panel({ fig, name, mt, slug, children }) {
  return (
    <Rv cls="panel" style={mt ? { marginTop: 60 } : undefined} onClick={() => { location.hash = '/p/' + slug }}>
      {s => (<><div className="ph"><span>{fig}</span><span>{name}</span></div><div className="stage">{children(s)}</div></>)}
    </Rv>
  )
}

const Pf = ({ title, text, tech, slug }) => (
  <Rv cls="pf"><h3 className="D">{title}</h3><p>{text}</p><small>{tech}<br />Sample data<br /><a href={'#/p/' + slug}>CASE STUDY →</a></small></Rv>
)

function Sales() {
  return (
    <>
      <Panel slug="sales" fig="Fig. 01 — Sales at a glance" name="Sales Dashboard / Power BI style">
        {s => (<>
          <div className="lap"><b>SalesIQ · FY 2025–26</b>
            <div className="kp">
              <div><small>Revenue</small><b>₹4.82Cr</b></div><div><small>Orders</small><b>12.4K</b></div>
              <div><small>Avg order</small><b>₹3,890</b></div><div><small>Growth</small><b style={{ color: '#0a9d4a' }}>+18.2%</b></div>
            </div>
            <div className="bars">{BARS.map((x, i) => <i key={i} style={{ height: s ? x + '%' : 0, transitionDelay: i * 60 + 'ms' }} />)}</div>
          </div>
          <div className="ph2"><b>SalesIQ</b>
            <Hb l="North" t="38%" w={38} s={s} /><Hb l="West" t="27%" w={27} s={s} />
            <Hb l="South" t="21%" w={21} s={s} /><Hb l="East" t="14%" w={14} s={s} />
          </div>
        </>)}
      </Panel>
      <Pf slug="sales" title="Sales Dashboard" text="Interactive dashboard that turns raw sales records into revenue, region and trend insights. Built from my Power BI internship work." tech="Power BI · SQL · Python" />
    </>
  )
}

function House() {
  const [a, setA] = useState(1200), [b, setB] = useState(3), [g, setG] = useState(8)
  const price = ((a * 5200 + b * 180000 - g * 22000 + 900000) / 100000).toFixed(1)
  return (
    <>
      <Panel slug="house" mt fig="Fig. 01 — Live price estimator" name="House Price Prediction / Regression">
        {s => (<>
          <div className="lap"><b>Estimate a home</b>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 10 }}>
              <div>
                Area: <b>{a}</b> sqft<input type="range" min="400" max="4000" value={a} onChange={e => setA(+e.target.value)} />
                Bedrooms: <b>{b}</b><input type="range" min="1" max="6" value={b} onChange={e => setB(+e.target.value)} />
                Age: <b>{g}</b> yrs<input type="range" min="0" max="40" value={g} onChange={e => setG(+e.target.value)} />
              </div>
              <div><small>PREDICTED PRICE</small><div className="res">₹{price} L</div>
                <Hb l="Area" t="62%" w={62} s={s} /><Hb l="Bedrooms" t="21%" w={21} s={s} /><Hb l="Age" t="17%" w={17} s={s} />
              </div>
            </div>
          </div>
          <div className="ph2"><b>Model</b>
            <div className="res" style={{ marginTop: 14 }}>R² 0.91</div><small>Test score</small>
            <div className="res" style={{ marginTop: 14 }}>₹3.2L</div><small>RMSE</small>
          </div>
        </>)}
      </Panel>
      <Pf slug="house" title="House Price Prediction" text="Regression model that estimates a property’s price from area, rooms and age, with a live estimator and feature importance." tech="Python · Pandas · Scikit-learn" />
    </>
  )
}

function Gauge({ on, value = 78 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    let i = 0
    const q = setInterval(() => { setN(++i); if (i >= value) clearInterval(q) }, 22)
    return () => clearInterval(q)
  }, [on, value])
  return (
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg)" strokeWidth="12" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#e5214a" strokeWidth="12" strokeLinecap="round" strokeDasharray="301.6"
        strokeDashoffset={on ? 301.6 * (1 - value / 100) : 301.6} transform="rotate(-90 60 60)"
        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.2,.9,.2,1)' }} />
      <text x="60" y="66" textAnchor="middle" fontFamily="Anton" fontSize="30" fill="currentColor">{n}</text>
    </svg>
  )
}

function Churn() {
  return (
    <>
      <Panel slug="churn" mt fig="Fig. 01 — Who will leave?" name="Customer Churn / Classification">
        {s => (<>
          <div className="lap" style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20, alignItems: 'center' }}>
            <Gauge on={s} />
            <div><b>Customer #4821 · High risk</b>
              <Hb l="Month-to-month contract" t="+34%" w={80} s={s} />
              <Hb l="Low tenure" t="+22%" w={55} s={s} />
              <Hb l="High monthly charges" t="+14%" w={35} s={s} />
            </div>
          </div>
          <div className="ph2"><b>Metrics</b>
            <div className="res" style={{ marginTop: 14 }}>86%</div><small>Accuracy</small>
            <div className="res" style={{ marginTop: 14 }}>0.89</div><small>ROC-AUC</small>
          </div>
        </>)}
      </Panel>
      <Pf slug="churn" title="Customer Churn Prediction" text="Classification model that scores each customer’s churn risk and explains the top reasons, so teams can act before they leave." tech="Python · TensorFlow · Pandas" />
    </>
  )
}

function Header() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }) + ' IST')
    f(); const i = setInterval(f, 15000); return () => clearInterval(i)
  }, [])
  return (
    <header>
      <b>ADITYA KUMAR SINGH</b><span>Data Scientist,<br />Analytics &amp; ML</span><span>Jalandhar, Punjab<br />{t}</span>
      <nav><a href="#work">Work</a><a href="#info">Info</a><a href="#certs">Certificates</a><a href="#contact">Contact</a></nav>
    </header>
  )
}

function Hero() {
  return (
    <>
      <div className="hero">
        <h1>{H1.split(' ').map((w, i) => <span className="w" key={i}><i style={{ animationDelay: .5 + i * .05 + 's' }}>{w}</i></span>)}</h1>
        <div className="tbl">
          <div><b>STATUS</b><span><i className="dot" />OPEN FOR WORK</span></div>
          <div><b>STUDY</b><span>MCA, LPU, 2026–Present</span></div>
          <div><b>STACK</b><span>Python, SQL, Pandas, Power BI, TensorFlow</span></div>
        </div>
      </div>
      <div className="big D" aria-label="Aditya Kumar Singh">
        {[...'ADITYA KUMAR SINGH'].map((c, i) => <span key={i} style={{ animationDelay: .3 + i * .045 + 's' }}>{c === ' ' ? '\u00a0' : c}</span>)}
      </div>
      <div className="mq"><div>{[...TOOLS, ...TOOLS].map((x, i) => <span key={i}>{x} ✦</span>)}</div></div>
    </>
  )
}

function Info() {
  return (
    <section id="info">
      <Rv cls="sh"><span>02</span><span>About, experience, education, tools</span></Rv>
      <Rv as="h2" cls="D t"><span>Information</span></Rv>
      <Rv as="p" cls="about">I’m Aditya. I turn raw, messy data into models and dashboards people can act on: clean it, find the pattern, then build the thing that explains it. Right now I’m doing my MCA at LPU, with a BCA in AI and Data Analytics behind me.</Rv>
      <Rv cls="cols">
        <div><h4>EXPERIENCE</h4><small>Aug 2025</small><h5>Data Analytics Intern</h5><small>TechnoHacks Solutions Pvt. Ltd.</small><p>Built Power BI dashboards to turn raw business data into clear insights and reports.</p></div>
        <div><h4>EDUCATION</h4><small>2026–Present</small><h5 style={{ fontSize: 22 }}>MCA</h5><p>Lovely Professional University</p><small>2023–26</small><h5 style={{ fontSize: 22 }}>BCA, AI in Data Analytics</h5><p>LNCT University · 7.8 CGPA</p></div>
        <div><h4>TOOLS</h4><p><b>Languages</b><br />C, Java, Python, SQL</p><p><b>Data</b><br />Pandas, Power BI, MS Office</p><p><b>ML</b><br />TensorFlow</p></div>
      </Rv>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const [f, setF] = useState({ n: '', e: '', m: '' })
  const copy = () => { navigator.clipboard?.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const send = ev => {
    ev.preventDefault()
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry from ' + f.n)}&body=${encodeURIComponent(f.m + '\n\n' + f.e)}`
  }
  const set = k => ev => setF({ ...f, [k]: ev.target.value })
  return (
    <section id="contact">
      <Rv cls="sh"><span>04</span><span>Usually replies within a day</span></Rv>
      <Rv as="h2" cls="D t"><span>Let’s talk</span></Rv>
      <div className="mail"><span>{EMAIL}</span><button className="cp" onClick={copy}>{copied ? 'COPIED' : 'COPY'}</button></div>
      <form className="cf" onSubmit={send}>
        <input placeholder="Name" value={f.n} onChange={set('n')} />
        <input type="email" placeholder="Email" value={f.e} onChange={set('e')} />
        <textarea placeholder="What do you need built?" value={f.m} onChange={set('m')} />
        <button>SEND →</button>
        <div className="so">
          <a href="https://github.com/adityakumarsingh776199-alt" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="https://linkedin.com/in/aditya-kumar-singh-1a2934287/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="https://x.com/AdityaSingh2828" target="_blank" rel="noopener">X ↗</a>
        </div>
      </form>
    </section>
  )
}

function Loader({ onOut }) {
  const [n, setN] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(() => {
    let i = 0
    const q = setInterval(() => {
      i = Math.min(100, i + Math.ceil(Math.random() * 6)); setN(i)
      if (i >= 100) { clearInterval(q); setTimeout(() => { setOut(true); onOut() }, 400) }
    }, 40)
    return () => clearInterval(q)
  }, [])
  return (
    <div className={'ld' + (out ? ' out' : '')}>
      <div className="ldn D">{[...'ADITYA KUMAR SINGH'].map((c, i) => <span key={i} style={{ animationDelay: .1 + i * .05 + 's' }}>{c === ' ' ? '\u00a0' : c}</span>)}</div>
      <small>DATA SCIENTIST · PORTFOLIO 2026</small>
      <div className="ldc D">{n}</div>
      <div className="ldb" style={{ width: n + '%' }} />
    </div>
  )
}

function Cursor() {
  const d = useRef()
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    document.documentElement.classList.add('hc')
    let x = -100, y = -100, dx = -100, dy = -100, raf
    const mv = e => { x = e.clientX; y = e.clientY; d.current.dataset.s = e.target.closest('.panel,a,button,.cert') ? 'h' : '' }
    const loop = () => { dx += (x - dx) * .35; dy += (y - dy) * .35; d.current.style.transform = `translate(${dx}px,${dy}px)`; raf = requestAnimationFrame(loop) }
    addEventListener('mousemove', mv); loop()
    return () => { removeEventListener('mousemove', mv); cancelAnimationFrame(raf); document.documentElement.classList.remove('hc') }
  }, [])
  return <div className="cd" ref={d} />
}

function useRoute() {
  const g = () => (location.hash.startsWith('#/p/') ? location.hash.slice(4) : '')
  const [r, set] = useState(g)
  useEffect(() => { const f = () => set(g()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return r
}

export default function App() {
  const slug = useRoute()
  const [ready, setReady] = useState(!!slug)
  const [gone, setGone] = useState(!!slug)
  const [pg, setPg] = useState(0)
  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden' }, [ready])
  useEffect(() => {
    const f = () => setPg(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))
    addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    if (slug) { scrollTo(0, 0); return }
    const id = location.hash.slice(1)
    if (id && id[0] !== '/') setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60)
  }, [slug])
  const onOut = () => { setReady(true); setTimeout(() => setGone(true), 1200) }
  return (
    <div className={ready ? 'ready' : ''}>
      {!gone && <Loader onOut={onOut} />}
      <div className="pg" style={{ transform: `scaleX(${pg})` }} />
      <Header />
      {slug ? <Project slug={slug} ui={{ Rv, Hb, Gauge }} /> : (<>
        <Hero />
        <section id="work">
          <Rv cls="sh"><span>01</span><span>3 pinned projects</span></Rv>
          <Rv as="h2" cls="D t"><span>Selected Work</span></Rv>
          <Sales /><House /><Churn />
        </section>
        <Info />
        <section id="certs">
          <Rv cls="sh"><span>03</span><span>1 certificate, 2025</span></Rv>
          <Rv as="h2" cls="D t"><span>Certificates</span></Rv>
          <Rv cls="cert"><span className="D">2025</span><small>AUG</small><span>Data Analytics Internship</span><small>TechnoHacks ↗</small></Rv>
        </section>
        <Contact />
      </>)}
      <footer>© 2026 Aditya Kumar Singh · Jalandhar, Punjab</footer>
      <Cursor />
    </div>
  )
}
