import React, { useState } from 'react'
import useOfficeService from '../../services/OfficeService'

const SearchOffices: React.FC = () => {
	const { searchOffice } = useOfficeService()

	const [offices, setOffices] = useState([])

	const handleSearch = async () => {
		const searchParams = {
			date: '2024-09-13',
			timeFrom: '12:00',
			timeTo: '15:00',
		}
		const availableOffices = await searchOffice(
			searchParams.date,
			searchParams.timeFrom,
			searchParams.timeTo
		)
		setOffices(availableOffices)
	}

	return (
		<div>
			<h1>Search for Available Offices</h1>
			<button onClick={handleSearch}>Search</button>
			<ul>
				{offices.map(office => (
					<li key={office.Id}>{office.Name}</li>
				))}
			</ul>
		</div>
	)
}

export default SearchOffices
