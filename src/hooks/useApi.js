import { useState, useCallback } from 'react'

/**
 * 범용 API 상태 훅
 * @param {Function} apiFunction - api.js에서 가져온 API 함수
 * @returns {{ data, loading, error, execute, reset }}
 */
export function useApi(apiFunction) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err) {
        const message = err.response?.data?.message ?? err.message ?? '오류가 발생했습니다.'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}
