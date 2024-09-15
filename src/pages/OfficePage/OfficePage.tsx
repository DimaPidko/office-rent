import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useOfficeService from '../../services/OfficeService'

interface Office {
	Id: number
	Name: string
	Count: number
	Price: number
}

const OfficePage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { getAllOffices, updateOffice, deleteOffice } = useOfficeService()

	const [office, setOffice] = useState<Office | null>(null)
	const [name, setName] = useState('')
	const [count, setCount] = useState<number>(0)
	const [price, setPrice] = useState<number>(0)

	useEffect(() => {
		getAllOffices().then(data => {
			const currentOffice = data.find(
				(office: Office) => office.Id === Number(id)
			)
			if (currentOffice) {
				setOffice(currentOffice)
				setName(currentOffice.Name)
				setCount(currentOffice.Count)
				setPrice(currentOffice.Price)
			}
		})
	}, [id])

	const handleUpdate = async () => {
		if (office) {
			await updateOffice(office.Id, name, count, price)
			alert('Office updated successfully')
		}
	}

	const handleDelete = async () => {
		if (office) {
			await deleteOffice(office.Id)
			alert('Office delete successfully')
		}
	}

	if (!office) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>Edit Office</h1>
			<div>
				<label>
					Name:
					<input value={name} onChange={e => setName(e.target.value)} />
				</label>
			</div>
			<div>
				<label>
					Count:
					<input
						type='number'
						value={count}
						onChange={e => setCount(Number(e.target.value))}
					/>
				</label>
			</div>
			<div>
				<label>
					Price:
					<input
						type='number'
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
					/>
				</label>
			</div>
			<button onClick={handleUpdate}>Update Office</button>
			<button onClick={handleDelete}>Delete Office</button>
		</div>
	)
}

export default OfficePage
