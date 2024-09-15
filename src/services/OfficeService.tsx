import { useHttp } from '../hooks/http.hook'

interface NewOfficeInfo {
	officeName: string
	officeCount: number
	officePrice: number
	timeFrom: string
	timeTo: string
	date: string
	officeServices: number[]
}

const useOfficeService = () => {
	const { request } = useHttp()

	const _apiBase = 'http://localhost:3308' // ваш API

	const createOfficeRent = async ({
		officeName,
		officeCount,
		officePrice,
		timeFrom,
		timeTo,
		date,
		officeServices,
	}: NewOfficeInfo) => {
		const office = await request(`${_apiBase}/offices`, 'POST', {
			name: officeName,
			count: officeCount,
			price: officePrice,
		})

		const officeOrder = await request(`${_apiBase}/orders`, 'POST', {
			officeId: office.id,
			timeFrom,
			timeTo,
			date,
		})

		await Promise.all(
			officeServices.map(serviceId =>
				request(`${_apiBase}/services/add`, 'POST', {
					orderId: officeOrder.id,
					serviceId,
				})
			)
		)

		return office
	}

	const getServices = async () => {
		return await request(`${_apiBase}/services`)
	}

	return {
		createOfficeRent,
		getServices,
	}
}

export default useOfficeService
