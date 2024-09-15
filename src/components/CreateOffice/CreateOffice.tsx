import React, { useState, useEffect } from 'react'
import useOfficeService from '../../services/OfficeService'

const CreateOffice: React.FC = () => {
	const [officeName, setOfficeName] = useState<string>('')
	const [officeCount, setOfficeCount] = useState<string>('')
	const [officePrice, setOfficePrice] = useState<string>('')
	const [officeServices, setOfficeServices] = useState<number[]>([])
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')
	const [date, setDate] = useState<string>('')
	const [services, setServices] = useState<any[]>([])

	const { createOfficeRent, getServices } = useOfficeService()

	useEffect(() => {
		getServices().then(data => {
			console.log('Fetcheed services:', data)
			setServices(data)
		})
	}, [])

	const changeOfficeServices = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target
		const serviceId = parseInt(id, 10)

		if (checked) {
			setOfficeServices([...officeServices, serviceId])
		} else {
			setOfficeServices(officeServices.filter(service => service !== serviceId))
		}
	}

	const onCreateOffice = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await createOfficeRent({
				officeName,
				officeCount: parseInt(officeCount, 10),
				officePrice: parseInt(officePrice, 10),
				timeFrom,
				timeTo,
				date,
				officeServices,
			})
			console.log('Office created successfully')
		} catch (error) {
			console.error(`ERROR: ${error}`)
		}
	}

	return (
		<>
			<h1>Create office</h1>
			<form onSubmit={e => onCreateOffice(e)}>
				<input
					type='text'
					placeholder='Enter name...'
					onChange={e => setOfficeName(e.target.value)}
					value={officeName}
				/>
				<input
					type='number'
					placeholder='Enter max count person...'
					onChange={e => setOfficeCount(e.target.value)}
					value={officeCount}
				/>
				<input
					type='number'
					placeholder='Enter price of Office...'
					onChange={e => setOfficePrice(e.target.value)}
					value={officePrice}
				/>
				<input
					type='time'
					placeholder='Time from...'
					onChange={e => setTimeFrom(e.target.value)}
					value={timeFrom}
				/>
				<input
					type='time'
					placeholder='Time to...'
					onChange={e => setTimeTo(e.target.value)}
					value={timeTo}
				/>
				<input
					type='date'
					placeholder='Enter date...'
					onChange={e => setDate(e.target.value)}
					value={date}
				/>
				<div>
					{services.map(service => (
						<div key={service.Id?.toString()}>
							<input
								id={service.Id}
								type='checkbox'
								onChange={changeOfficeServices}
							/>
							<label htmlFor={service.Id}>{service.Name}</label>
						</div>
					))}
				</div>
				<button>Submit</button>
			</form>
		</>
	)
}

export default CreateOffice
