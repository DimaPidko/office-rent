import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from '../../App'
import OfficePage from '../../pages/OfficePage/OfficePage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<App />} />
				<Route path={'/office/:id'} element={<OfficePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
