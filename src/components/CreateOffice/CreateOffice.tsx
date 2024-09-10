import React, { useState } from 'react'

import useOfficeService from '../../services/OfficeService'

interface ServicePrice {
	projector: number
	wifi: number
	music: number
}

const CreateOffice: React.FC = () => {
	const [officeName, setOfficeName] = useState<string>('')
	const [officeCount, setOfficeCount] = useState<string>('')
	const [officePrice, setOfficePrice] = useState<string>('')
	const [officeServices, setOfficeServices] = useState<
		Array<keyof ServicePrice>
	>([])

	const { createOfficeRent } = useOfficeService()

	const servicesPrice: ServicePrice = {
		projector: 500,
		wifi: 300,
		music: 700,
	}

	const changeOfficeServices = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target

		if (checked) {
			setOfficeServices([...officeServices, id as keyof ServicePrice])
		} else {
			setOfficeServices(officeServices.filter(service => service !== id))
		}
	}

	const showCheckedServices = (arr: Array<keyof ServicePrice>) => {
		if (arr.length === 0) return null

		return (
			<>
				{arr.map(service => (
					<div key={service}>
						<h2>{service}</h2>
						<h3>Price: {servicesPrice[service]} UAH</h3>
					</div>
				))}
			</>
		)
	}

	const onCreateOffice = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			createOfficeRent({
				officeName,
				officeCount,
				officeServices,
				officePrice,
			}).then(data => console.log(data))
		} catch (error) {
			throw new Error(`ERROR: ${error}`)
		}
	}

	return (
		<>
			<h1>Create office</h1>
			<form action='createOffice' onSubmit={e => onCreateOffice(e)}>
				<input
					type='text'
					placeholder='Enter name...'
					onChange={e => setOfficeName(e.target.value)}
					value={officeName}
				/>
				<input
					type='text'
					placeholder='Enter max count person...'
					onChange={e => setOfficeCount(e.target.value)}
					value={officeCount}
				/>
				<input
					type='text'
					placeholder='Enter price of Office...'
					onChange={e => setOfficePrice(e.target.value)}
					value={officePrice}
				/>
				<div>
					<input
						id='projector'
						type='checkbox'
						onChange={e => changeOfficeServices(e)}
					/>
					<label htmlFor='projector'>Projector</label>

					<input
						id='wifi'
						type='checkbox'
						onChange={e => changeOfficeServices(e)}
					/>
					<label htmlFor='wifi'>Wi-Fi</label>

					<input
						id='music'
						type='checkbox'
						onChange={e => changeOfficeServices(e)}
					/>
					<label htmlFor='music'>Music</label>
				</div>
				<button>Submit</button>
			</form>
			{showCheckedServices(officeServices)}
		</>
	)
}

export default CreateOffice
