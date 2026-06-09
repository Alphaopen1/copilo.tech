'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'copilo-lang'

export type Lang = 'fr' | 'en'

export function useLanguage(initial: Lang = 'fr') {
  const [lang, setLangState] = useState<Lang>(initial)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (stored === 'fr' || stored === 'en') {
        setLangState(stored)
      }
    } catch {
      // localStorage non disponible (SSR)
    }
    setReady(true)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // ignore
    }
  }, [])

  return { lang, setLang, ready }
}