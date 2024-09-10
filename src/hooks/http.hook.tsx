import { useCallback } from 'react'

export const useHttp = () => {
	const request = useCallback(
		async (
			url: RequestInfo | URL,
			method = 'GET',
			body: object | null = null,
			headers = { 'Content-Type': 'application/json' }
		) => {
			try {
				const response = await fetch(url, {
					method,
					body: JSON.stringify(body),
					headers,
				})

				if (!response.ok) {
					throw new Error(`Cold not fetch ${url}, status: ${response.status}`)
				}

				const data = await response.json()

				return data
			} catch (error) {
				throw new Error(`ERROR: ${error}`)
			}
		},
		[]
	)
	return { request }
}
