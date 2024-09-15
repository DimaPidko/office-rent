import React from 'react'
import { useEffect, useState } from 'react'
import useOfficeService from '../../services/OfficeService'
import { Link } from 'react-router-dom'

interface OfficeObject {
	Id: number
	Name: string
}

const OfficeList: React.FC = () => {
	const [offices, setOffices] = useState<OfficeObject[]>([])

	const { getAllOffices } = useOfficeService()

	useEffect(() => {
		getAllOffices().then(data => setOffices(data))
	}, [])

	return (
		<>
			<h1>Office List</h1>
			<ul>
				{offices.map(office => {
					return (
						<li key={office.Id}>
							<Link to={`/office/${office.Id}`}>{office.Name}</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default OfficeList
