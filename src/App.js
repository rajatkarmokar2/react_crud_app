import React,{ useEffect,useState } from 'react'
import {
	Container,
	Row,
	Form,
	Button,
	Alert,
	Table,
	Col,
} from 'react-bootstrap'
import InputError from './components/InputError'
import { validateCombo } from './validation/loginRegisterValidation'


const App = () => {
	const [ validatenow,setValidateNow ] = useState( false )
	const [ submitoperaiton,setSubmitOperation ] = useState( true )//true - add, false - update
	const [ empdata,setEmpData ] = useState( {
		empcode: '',
		name: '',
		department: '',
		gender: '',
		dob: '',
		joiningdate: '',
		previousexp: '',
		salary: '',
		address: '',
		id: '',
		// update: false,
		records: [],
		showAlert: false,
		alertType: 'success',
		alertMsg: '',
	} )

	const [ empdataerror,setEmpDataError ] = useState( {
		empcodeerror: true,
		nameerror: true,
		departmenterror: true,
		gendererror: true,
		doberror: true,
		joiningdateerror: true,
		previousexperror: true,
		salaryerror: true,
		addresserror: true,
	} )

	const handleChange = ( e ) => {
		e.persist()
		const name = e.target.name
		const value = e.target.value
		console.log( name,' : ',value )
		setEmpData( ( prevState ) => { return { ...prevState,[ name ]: value,showAlert: false } } )
		checkValidity( name,value )
	}

	useEffect( () => {
		fetchAllRecords()
	},[] )

	// fetch All Records
	const fetchAllRecords = () => {
		const testdata = {
			id: new Date().valueOf(),
			empcode: '123',
			name: 'Rajat Karmokar',
			department: 'Admin',
			gender: 'male',
			dob: '2022-04-08',
			joiningdate: '2022-04-08',
			previousexp: 3,
			salary: '10000',
			address: 'mumbai',
		}
		setEmpData( prevState => { return { ...prevState,records: [ testdata ] } } )
	}

	// view single data to edit
	const onEditHandler = ( id ) => {
		console.log( id )
		setSubmitOperation( false )
		empdata.records.filter( record => {
			if ( record.id === id )
				setEmpData( prevState => {
					return {
						...prevState,
						id: id,
						empcode: record.empcode,
						name: record.name,
						department: record.department,
						gender: record.gender,
						dob: record.dob,
						joiningdate: record.joiningdate,
						previousexp: record.previousexp,
						salary: record.salary,
						address: record.address,
					}
				} )
		} )
	}

	// update record
	const onUpdateHandler = ( e ) => {
		e.preventDefault()
		if ( submitoperaiton ) return
		setValidateNow( true )
		checkValidity()
		const error = isEmpty( empdataerror )
		console.log( JSON.stringify( empdataerror ),error )
		if ( error === false )
			return setEmpData( prevState => { return { ...prevState,showAlert: true,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )

		const submitteddata = {
			id: empdata.id,
			empcode: empdata.empcode,
			name: empdata.name,
			department: empdata.department,
			gender: empdata.gender,
			dob: empdata.dob,
			joiningdate: empdata.joiningdate,
			previousexp: empdata.previousexp,
			salary: empdata.salary,
			address: empdata.address,
		}
		setEmpData( prevState => {
			return {
				...prevState,
				id: '',
				empcode: '',
				name: '',
				department: '',
				gender: '',
				dob: '',
				joiningdate: '',
				previousexp: '',
				salary: '',
				address: '',
				records: prevState.records.map( record =>
					( record.id === prevState.id && submitteddata ) || record )
			}
		} )
		setSubmitOperation( true )
		console.log( empdata )
	}

	// delete a record
	const deleteRecord = ( id ) => {
		console.log( id )
		setEmpData( prevState => {
			return {
				...prevState,
				records: prevState.records.filter( val => ( val.id !== id && val ) )
			}
		} )
	}

	const checkValidity = ( name,value ) => {
		let error
		if ( name === 'empcode' ) error = validateCombo( value,[ 'REQUIRED','ALPHANUMERIC','NOSPACE' ] )
		if ( name === 'name' ) error = validateCombo( value,[ 'REQUIRED','NOSPACE','NODIGIT' ] )
		if ( name === 'department' ) error = validateCombo( value,[ 'REQUIRED' ] )
		if ( name === 'gender' ) error = validateCombo( value,[ 'REQUIRED' ] )
		if ( name === 'dob' ) error = validateCombo( value,[ 'REQUIRED' ] )
		if ( name === 'joiningdate' ) error = validateCombo( value,[ 'REQUIRED' ] )
		if ( name === 'previousexp' ) error = validateCombo( value,[ 'REQUIRED','DIGIT' ] )
		if ( name === 'salary' ) error = validateCombo( value,[ 'REQUIRED','DIGIT' ] )
		if ( name === 'address' ) error = validateCombo( value,[ 'REQUIRED' ] )
		if ( name )
			setEmpDataError( prevState => ( {
				...prevState,
				[ `${name}error` ]: error
			} ) )
		if ( !name )
			return setEmpDataError( {
				empcodeerror: validateCombo( empdata.empcode,[ 'REQUIRED','ALPHANUMERIC','NOSPACE' ] ),
				nameerror: validateCombo( empdata.name,[ 'REQUIRED','NOSPACE','NODIGIT' ] ),
				departmenterror: validateCombo( empdata.department,[ 'REQUIRED' ] ),
				gendererror: validateCombo( empdata.gender,[ 'REQUIRED' ] ),
				doberror: validateCombo( empdata.dob,[ 'REQUIRED' ] ),
				joiningdateerror: validateCombo( empdata.joiningdate,[ 'REQUIRED' ] ),
				previousexperror: validateCombo( empdata.previousexp,[ 'REQUIRED','DIGIT' ] ),
				salaryerror: validateCombo( empdata.salary,[ 'REQUIRED','DIGIT' ] ),
				addresserror: validateCombo( empdata.address,[ 'REQUIRED' ] ),
			} )
	}

	function isEmpty ( obj ) {
		for ( var prop in obj ) {
			if ( obj.hasOwnProperty( prop ) ) {
				if ( obj[ prop ] ) return false
			}
		}
		return true
	}

	const onSubmitHandler = ( e ) => {
		e.preventDefault()
		if ( !submitoperaiton ) return
		setValidateNow( true )
		checkValidity()
		const error = isEmpty( empdataerror )
		if ( error === false )
			return setEmpData( prevState => { return { ...prevState,showAlert: true,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )

		const submitteddata = {
			id: new Date().valueOf(),
			empcode: empdata.empcode,
			name: empdata.name,
			department: empdata.department,
			gender: empdata.gender,
			dob: empdata.dob,
			joiningdate: empdata.joiningdate,
			previousexp: empdata.previousexp,
			salary: empdata.salary,
			address: empdata.address,
		}
		setEmpData( prevState => {
			return {
				...prevState,
				id: '',
				empcode: '',
				name: '',
				department: '',
				gender: '',
				dob: '',
				joiningdate: '',
				previousexp: '',
				salary: '',
				address: '',
				records: [ ...prevState.records,submitteddata ]
			}
		} )
		// setEmpData( prevState => {
		// 	return {
		// 		...prevState,
		// 	}
		// } )
	}

	return (
		<div>
			<Container>

				{ empdata.showAlert === true ? (
					<Alert
						variant={ empdata.alertType }
						onClose={ () => {
							setEmpData( {
								showAlert: false,
							} )
						} }
						dismissible>
						<Alert.Heading>{ empdata.alertMsg }</Alert.Heading>
					</Alert>
				) : null }

				{/* Insert Form */ }
				<Form noValidate
					onSubmit={ submitoperaiton && onSubmitHandler || onUpdateHandler }
					className='my-5'>

					<Form.Row>
						<Form.Group as={ Col } md='4' >
							<Form.Label>Emp Code</Form.Label>
							<Form.Control
								type='text'
								name='empcode'
								onChange={ handleChange }
								value={ empdata.empcode }
								placeholder='Emp Code'
							/>
							{ validatenow && <InputError message={ empdataerror.empcodeerror } /> }
						</Form.Group>
						<Form.Group as={ Col } md='4' >
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								onChange={ handleChange }
								value={ empdata.name }
							/>
							{ validatenow && <InputError message={ empdataerror.nameerror } /> }
						</Form.Group>
						<Form.Group as={ Col } md='4' >
							<Form.Label>Department</Form.Label>
							<select
								className='form-control'
								// as='select'
								type='select'
								placeholder='Department'
								name='department'
								onChange={ handleChange }
								value={ empdata.department }
							>
								<option></option>
								<option >Admin</option>
								<option >Technology</option>
								<option >Accounts</option>
							</select>
							{ validatenow && <InputError message={ empdataerror.departmenterror } /> }
						</Form.Group>
					</Form.Row>

					<Form.Group>
						<Form.Label className='mr-4 '>Gender :</Form.Label>
						<Form.Check
							className='mr-3 '
							inline
							type='radio'
							name='gender'
							label='Male'
							onChange={ handleChange }
							value='male'
							checked={ empdata.gender === 'male' ? true : false }
							// defaultChecked={empdata.gender.male}
							feedback='select a gender'
						/>
						<Form.Check
							className='mr-3 '
							inline
							type='radio'
							name='gender'
							label='Female'
							onChange={ handleChange }
							value='female'
							checked={ empdata.gender === 'female' ? true : false }
							// defaultChecked={empdata.gender.female}
							feedback='select a gender'
						/>
						{ validatenow && <InputError message={ empdataerror.gendererror } /> }
					</Form.Group>

					<Form.Row>
						<Form.Group as={ Col } md='3' >
							<Form.Label>Date of birth</Form.Label>
							<Form.Control
								type='date'
								placeholder='Date of birth'
								name='dob'
								onChange={ handleChange }
								value={ empdata.dob }
							/>
							{ validatenow && <InputError message={ empdataerror.doberror } /> }
						</Form.Group>
						<Form.Group as={ Col } md='3' >
							<Form.Label>Joining Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='Joining Date'
								name='joiningdate'
								onChange={ handleChange }
								value={ empdata.joiningdate }
							/>
							{ validatenow && <InputError message={ empdataerror.joiningdateerror } /> }
						</Form.Group>
						<Form.Group as={ Col } md='3' >
							<Form.Label>Previous Exp (years)</Form.Label>
							<Form.Control
								type='text'
								placeholder='Previous Exp'
								name='previousexp'
								onChange={ handleChange }
								value={ empdata.previousexp }
							/>
							{ validatenow && <InputError message={ empdataerror.previousexperror } /> }
						</Form.Group>
						<Form.Group as={ Col } md='3' >
							<Form.Label>Salary</Form.Label>
							<Form.Control type='text'
								placeholder='Salary'
								name='salary'
								onChange={ handleChange }
								value={ empdata.salary } />
							{ validatenow && <InputError message={ empdataerror.salaryerror } /> }
						</Form.Group>
					</Form.Row>

					<Form.Group >
						<Form.Label>Address</Form.Label>
						<Form.Control
							as='textarea'
							type='textarea'
							placeholder='Address'
							name='address'
							onChange={ handleChange }
							value={ empdata.address }
						/>
						{ validatenow && <InputError message={ empdataerror.addresserror } /> }
					</Form.Group>

					<Button type='submit'>{ submitoperaiton && 'Submit' || 'Update' } form</Button>
				</Form>

				{/* All Records */ }
				<Table striped bordered hover size='sm' responsive className='mb-5'>
					<thead>
						<tr>
							<th>empcode</th>
							<th>Name</th>
							<th>Department</th>
							<th>Gender</th>
							<th>DDB</th>
							<th>Joining Date</th>
							<th>Previous Exp (years)</th>
							<th>Salary</th>
							<th>Address</th>
							<th colSpan='2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{ empdata.records &&
							empdata.records.map( ( record,index ) => {
								return (
									<tr key={ `empdata${record.id}` }>
										<td>{ record.empcode }</td>
										<td>{ record.name }</td>
										<td>{ record.department }</td>
										<td>{ record.gender }</td>
										<td>{ record.dob }</td>
										<td>{ record.joiningdate }</td>
										<td>{ record.previousexp }</td>
										<td>{ record.salary }</td>
										<td>{ record.address }</td>
										<td>
											<Button
												variant='info'
												onClick={ () => onEditHandler( record.id ) }>
												Edit
											</Button>
										</td>
										<td>
											<Button
												variant='danger'
												onClick={ () => deleteRecord( record.id ) }>
												Delete
											</Button>
										</td>
									</tr>
								)
							} ) }
					</tbody>
				</Table>

			</Container>
		</div>
	)
}

export default App
