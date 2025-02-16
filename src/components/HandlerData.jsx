'use client'

import { DATA_COOKIES_KEY } from '@/constants'
import { deletePersistedDataFromCookies } from '@/utils/cookies'
import { useEffect } from 'react'

const HandlerData = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    deletePersistedDataFromCookies(DATA_COOKIES_KEY)
  }, [])
  return null
}

export default HandlerData
