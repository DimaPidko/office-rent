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

	const getAllOffices = async () => {
		return await request(`${_apiBase}/get`)
	}

	const updateOffice = async (
		id: number,
		officeName: string,
		officeCount: number,
		officePrice: number
	) => {
		return await request(`${_apiBase}/offices/${id}`, 'PUT', {
			name: officeName,
			count: officeCount,
			price: officePrice,
		})
	}

	const deleteOffice = async (id: number) => {
		return await request(`${_apiBase}/offices/delete/${id}`, 'DELETE')
	}

	const searchOffice = async (
		date: string,
		timeFrom: string,
		timeTo: string
	) => {
		return request(`${_apiBase}/offices/search`, 'POST', {
			date,
			timeFrom,
			timeTo,
		})
	}

	return {
		createOfficeRent,
		getServices,
		getAllOffices,
		updateOffice,
		deleteOffice,
		searchOffice,
	}
}

export default useOfficeService
