import { useState, useEffect, useRef } from 'react'
import { PROJECTS, LIVE, SRC } from './data.js'

function Chart({ s, on, small, ui }) {
  const d = s.data
  if (s.type === 'bars') return <div className="bars" style={{ height: small ? 70 : 110 }}>{d.map((x, i) => <i key={i} style={{ height: on ? x + '%' : 0, transitionDelay: i * 50 + 'ms' }} />)}</div>
  if (s.type === 'hbars') return <div>{d.map(([l, v]) => <ui.Hb key={l} l={l} t={v + '%'} w={v} s={on} />)}</div>
  if (s.type === 'line') {
    const pts = d.map((y, i) => `${i * (200 / (d.length - 1))},${60 - y * .55}`).join(' ')
    return <svg viewBox="0 0 200 64" className={'ln' + (on ? ' dr' : '')}><polyline points={pts} fill="none" stroke="var(--blue)" strokeWidth="2.5" pathLength="1" /></svg>
  }
  return <ui.Gauge on={on} value={s.value} />
}

export default function Project({ slug, ui }) {
  const idx = PROJECTS.findIndex(p => p.slug === slug)
  const p = PROJECTS[idx]
  const [a, setA] = useState(0)
  const [on, setOn] = useState(false)
  const box = useRef()
  useEffect(() => { setA(0) }, [slug])
  useEffect(() => { setOn(false); const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t) }, [a, slug])
  useEffect(() => {
    if (!p) return
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setA(+e.target.dataset.i) }), { rootMargin: '-45% 0px -45% 0px' })
    box.current.querySelectorAll('.note').forEach(n => o.observe(n))
    return () => o.disconnect()
  }, [slug])
  const go = i => {
    const n = Math.max(0, Math.min(p.slides.length - 1, i))
    box.current.querySelectorAll('.note')[n].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  useEffect(() => {
    const k = e => { if (e.key === 'ArrowRight') go(a + 1); if (e.key === 'ArrowLeft') go(a - 1) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  })
  if (!p) return <section><h2 className="D t in">Not found</h2><a href="#work">← Selected work</a></section>
  const s = p.slides[a], nx = PROJECTS[(idx + 1) % PROJECTS.length], n2 = String(idx + 1).padStart(2, '0')
  const live = LIVE[p.slug]
  return (
    <div className="pj">
      <div className="pjt"><a href="#work">← SELECTED WORK</a><span>SELECTED WORK {n2}/0{PROJECTS.length}</span><span>{p.type}</span></div>
      <div className="big D pt" aria-label={p.title}>{[...p.title].map((c, i) => <span key={i} style={{ animationDelay: .1 + i * .035 + 's' }}>{c === ' ' ? '\u00a0' : c}</span>)}</div>
      <ui.Rv cls="meta"><div><small>TYPE</small><b>{p.type}</b></div><div><small>SCREENS</small><b>0{p.slides.length}</b></div><div><small>BUILT WITH</small><b>{p.built}</b></div></ui.Rv>
      <ui.Rv cls="ovw"><small>OVERVIEW</small><p className="about">{p.overview}</p></ui.Rv>
      <ui.Rv cls="ctas">
        {live ? <a className="cta b" href={live} target="_blank" rel="noopener"><span className="D">Visit the live demo</span><i>↗</i></a> : <div className="cta b off"><span className="D">Live demo · coming soon</span><i>⏳</i></div>}
        <a className="cta" href={SRC[p.slug]} target="_blank" rel="noopener"><span className="D">Read the source</span><i>↗</i></a>
      </ui.Rv>
      <div className="cs" ref={box}>
        <div className="sticky">
          <div className="panel pstage">
            <div className="ph"><span>{s.fig}</span><span>{p.brand} / {p.type}</span></div>
            <div className="stage st2" key={a + slug}>
              <div className="lap"><b>{p.brand} · {s.title}</b>
                <div className="kp">{s.kpis.map(([l, v]) => <div key={l}><small>{l}</small><b>{v}</b></div>)}</div>
                <Chart s={s} on={on} ui={ui} /></div>
              <div className="ph2"><b>{p.brand}</b><Chart s={s} on={on} small ui={ui} /></div>
            </div>
            <div className="pfoot"><span>{s.cap}</span><span>SAMPLE DATA · 1440 × 702 · 390 × 844</span></div>
            <div className="wm D" key={s.word}>{s.word}</div>
          </div>
          <div className="thumbs"><span>0{a + 1}/0{p.slides.length}</span>{p.slides.map((x, i) => <button key={i} className={i === a ? 'th act' : 'th'} onClick={() => go(i)}><small>{i + 1}</small>{x.title}</button>)}<em>← → KEYS</em></div>
        </div>
        <div className="notes"><div className="nh">NOTES, SCROLL TO STEP THROUGH</div>
          {p.notes.map(([h, t], i) => <div key={i} data-i={i} className={'note' + (i === a ? ' act' : '')} onClick={() => go(i)}><span className="nb">{i + 1}</span><div><h3 className="D">{h}</h3><p>{t}</p></div></div>)}
        </div>
      </div>
      <a className="nxt" href={'#/p/' + nx.slug}><small>NEXT PROJECT</small><span className="D">{nx.title}</span><i>→</i></a>
    </div>
  )
}
