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
				const options: RequestInit = {
					method,
					headers,
				}

				if (method !== 'GET' && body) {
					options.body = JSON.stringify(body)
				}

				const response = await fetch(url, options)

				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
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
