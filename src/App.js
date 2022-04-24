import React from 'react'
import { Route,Routes } from 'react-router-dom'
import EmpForm from './pages/EmpForm'
import DataTable from './pages/DataTable'
import Navbar from './components/Navbar'


const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={ <EmpForm /> } />
				<Route path='/datatable' element={ <DataTable /> } />
			</Routes>
		</>
	)
}

export default App
