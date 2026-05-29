'use client'
import { useMemo, useState } from 'react'
import { DEPARTEMENTS, computeTarif, type SimInput } from '@/lib/tarifs-cpam-2025'

const field: React.CSSProperties = {
  width: '100%', padding: '13px 14px', borderRadius: 12,
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#f0f4ff', fontFamily: "'Barlow', sans-serif", fontSize: 16, outline: 'none',
  boxSizing: 'border-box',
}
const label: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'rgba(0,207,255,0.75)', marginBottom: 8, display: 'block',
}

function Toggle({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
      padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
      background: checked ? 'rgba(29,92,255,0.14)' : 'rgba(255,255,255,0.03)',
      border: '1px solid ' + (checked ? 'rgba(29,92,255,0.45)' : 'rgba(255,255,255,0.1)'),
      color: checked ? '#f0f4ff' : 'rgba(180,200,255,0.6)', transition: 'all 0.15s',
      fontFamily: "'Barlow', sans-serif", fontSize: 15,
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        background: checked ? 'linear-gradient(135deg,#1d5cff,#00cfff)' : 'transparent',
        border: checked ? 'none' : '1.5px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        )}
      </span>
      {children}
    </button>
  )
}

export default function Simulator() {
  const [deptCode, setDeptCode] = useState('06')
  const [km, setKm] = useState(12)
  const [grandeVille, setGrandeVille] = useState(false)
  const [hospVide, setHospVide] = useState(false)
  const [nuitWeekendFerie, setNuit] = useState(false)
  const [patients, setPatients] = useState(1)
  const [tpmr, setTpmr] = useState(false)
  const [peagesEur, setPeages] = useState(0)

  const input: SimInput = { deptCode, km, grandeVille, hospVide, nuitWeekendFerie, patients, tpmr, peagesEur }
  const result = useMemo(() => computeTarif(input), [deptCode, km, grandeVille, hospVide, nuitWeekendFerie, patients, tpmr, peagesEur])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 24 }}>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Département */}
        <div>
          <label style={label}>Département de l&apos;ADS</label>
          <select aria-label="Département de l'ADS" value={deptCode} onChange={e => setDeptCode(e.target.value)} style={{ ...field, appearance: 'none' }}>
            {DEPARTEMENTS.map(d => (
              <option key={d.code} value={d.code} style={{ background: '#0a1424' }}>{d.code} — {d.name} ({d.km.toFixed(2)} €/km)</option>
            ))}
          </select>
        </div>

        {/* Distance + patients */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={label}>Distance en charge (km)</label>
            <input aria-label="Distance en charge en kilomètres" type="number" min={0} step={1} value={km}
              onChange={e => setKm(Math.max(0, Number(e.target.value) || 0))} style={field} />
          </div>
          <div>
            <label style={label}>Patients (partagé)</label>
            <select aria-label="Nombre de patients (transport partagé)" value={patients} onChange={e => setPatients(Number(e.target.value))} style={{ ...field, appearance: 'none' }}>
              {[1, 2, 3, 4].map(n => <option key={n} value={n} style={{ background: '#0a1424' }}>{n} patient{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>

        {/* Péages */}
        <div>
          <label style={label}>Frais de péage (€)</label>
          <input aria-label="Frais de péage en euros" type="number" min={0} step={0.1} value={peagesEur}
            onChange={e => setPeages(Math.max(0, Number(e.target.value) || 0))} style={field} />
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gap: 10 }}>
          <Toggle checked={grandeVille} onChange={setGrandeVille}>Prise en charge / dépose en grande ville (Paris, Lyon, Nice…)</Toggle>
          <Toggle checked={hospVide} onChange={setHospVide}>Hospitalisation avec aller ou retour à vide</Toggle>
          <Toggle checked={nuitWeekendFerie} onChange={setNuit}>Nuit (20h–8h) / week-end / jour férié</Toggle>
          <Toggle checked={tpmr} onChange={setTpmr}>Véhicule TPMR équipé (+30 €)</Toggle>
        </div>
      </div>

      {/* Résultat */}
      <div style={{
        borderRadius: 18, padding: '24px 26px',
        background: 'linear-gradient(175deg, rgba(29,92,255,0.10), rgba(0,207,255,0.04))',
        border: '1px solid rgba(29,92,255,0.3)',
      }}>
        <div style={{ ...label, color: 'rgba(0,207,255,0.8)' }}>// Détail du tarif</div>
        <div style={{ display: 'grid', gap: 8, marginBottom: 18 }}>
          {result.lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(220,232,255,0.85)' }}>
              <span>{l.label}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", color: l.amount < 0 ? '#34d399' : '#f0f4ff', whiteSpace: 'nowrap' }}>
                {l.amount < 0 ? '−' : ''}{Math.abs(l.amount).toFixed(2)} €
              </span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#f0f4ff' }}>
            Total estimé
          </span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#00cfff', lineHeight: 1 }}>
            {result.total.toFixed(2)} €
          </span>
        </div>
        {patients > 1 && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(180,200,255,0.45)', marginTop: 10 }}>
            Facture par patient (transport partagé). Une facture distincte est établie pour chaque patient.
          </p>
        )}

        {/* CTA Telegram vocal */}
        <a href="https://t.me/Copilo_TaxiBot?start=simulateur" target="_blank" rel="noopener noreferrer"
          className="btn-primary"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 22,
            padding: '15px 22px', borderRadius: 14, textDecoration: 'none', color: '#fff',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
          🎙️ Teste-le à la voix sur Telegram →
        </a>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(180,200,255,0.4)', marginTop: 8, textAlign: 'center' }}>
          Dis ta course à Copilo, il calcule et crée la course dans ton agenda.
        </p>
      </div>

      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(180,200,255,0.4)', lineHeight: 1.6 }}>
        Estimation indicative selon la convention-cadre nationale du 13 mai 2025 (annexe tarifaire CNAM).
        Tarif kilométrique par département, facturé à partir du 5ᵉ km. Le tarif réel peut varier selon les accords locaux.
      </p>
    </div>
  )
}
