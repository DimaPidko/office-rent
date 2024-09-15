import React from 'react'
import CreateOffice from '../../components/CreateOffice/CreateOffice'
import OfficeList from '../../components/OfficeList/OfficeList'
import SearchOffices from '../../components/SearchOffice/SearchOffice'

const MainPage: React.FC = () => {
	return (
		<>
			<h1>Main Page</h1>
			<CreateOffice />
			<SearchOffices />
			<OfficeList />
		</>
	)
}

export default MainPage
