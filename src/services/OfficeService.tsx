import { useHttp } from '../hooks/http.hook'

interface NewOfficeInfo {
	officeName: string
	officeCount: string
	officeServices: Array<string>
	officePrice: string
}

const useOfficeService = () => {
	const { request } = useHttp()

	const _apiBase =
		'https://virtserver.swaggerhub.com/PIDKODIMA/rentOffices/1.0.0'

	const createOfficeRent = async ({
		officeName,
		officeCount,
		officeServices,
		officePrice,
	}: NewOfficeInfo) => {
		const res = await request(`${_apiBase}/officeCreate`, 'POST', {
			officeName,
			officeCount,
			officeServices,
			officePrice,
		})

		return res
	}

	return {
		createOfficeRent,
	}
}

export default useOfficeService
