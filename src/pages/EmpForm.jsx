import React,{ useContext,useEffect,useState } from 'react'
import axios from '../api/baseUrl'
import { Row,Col,Form,Table,Alert,Button,Container } from 'react-bootstrap'
import InputError from '../components/InputError'
import { validateCombo } from '../validation/loginRegisterValidation.js'
import { empdatacontext } from '../context/EmpDataContext'
import { useNavigate } from 'react-router-dom'


const formerror = {
    empcodeerror: '',
    nameerror: '',
    departmenterror: '',
    gendererror: '',
    doberror: '',
    joiningdateerror: '',
    previousexperror: '',
    salaryerror: '',
    addresserror: '',
}

const EmpForm = () => {
    const navigate = useNavigate()

    const [ showalert,setShowAlert ] = useState( false )

    const [ validatenow,setValidateNow ] = useState( false )

    const { empdata,setEmpData } = useContext( empdatacontext )

    const [ empdataerror,setEmpDataError ] = useState( formerror )



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
            setEmpDataError( {
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
    function isObjectEmpty ( obj ) {
        Object.entries( obj ).map( val => {
            if ( val[ 1 ] ) {
                console.log( val[ 0 ],' : ',val[ 1 ] );
                return true
            }
        } )
        // for ( var prop in obj ) {
        //     if ( obj.hasOwnProperty( prop ) ) {
        //         if ( obj[ prop ] ) return false
        //     }
        // }
        // return true
    }

    const resetFrom = () => {
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
            }
        } )
    }

    const resetFormError = () => {
        setEmpDataError( formerror )
    }

    const handleChange = ( e ) => {
        e.persist()
        const name = e.target.name
        const value = e.target.value
        if(empdata.update) setValidateNow(true)
        // console.log( `%c${name} : ${value}`,'background:linear-gradient(skyblue,darkblue);color:white;padding:10px;border-radius:30px' )
        setEmpData( ( prevState ) => { return { ...prevState,[ name ]: value } } )
        setShowAlert( false )
        checkValidity( name,value )
    }

    const onUpdateHandler = async ( e ) => {
        e.preventDefault()
        await checkValidity()
        const error = isObjectEmpty( empdataerror )
        console.log( JSON.stringify( empdataerror ),error )
        if ( error === false ) {
            setShowAlert( true )
            return setEmpData( prevState => { return { ...prevState,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )
        }


        const updatteddata = {
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

        try {
            const res = await axios.patch( `/tasks/${empdata._id}`,updatteddata )
            setEmpData( prevState => { return { ...prevState,update: false } } )
            navigate( '/datatable' )
            resetFrom()
            resetFormError()
            console.log( res )
        } catch ( error ) {
            console.log( error )
        }
    }

    const onSubmitHandler = async ( e ) => {
        e.preventDefault()
        await checkValidity()
        setValidateNow( true )
        const error = isObjectEmpty( empdataerror )
        if ( error === false ) {
            setShowAlert( true )
            return setEmpData( prevState => { return { ...prevState,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )
        }

        const submitteddata = {
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

        // console.log( submitteddata )

        try {
            const res = await axios.post( `/tasks`,submitteddata )
            navigate( '/datatable' )
            setEmpData( prevState => { return { ...prevState,update: false } } )
            resetFrom()
            resetFormError()
            console.log( res )
        } catch ( error ) {
            console.log( error )
        }

    }

    return (
        <>
            { showalert &&
                <div onClick={ () => {
                    setShowAlert( false )
                    // setEmpData( prevState => { return { ...prevState,showAlert: false } } )
                } }
                    className='bg-warning ' style={ { cursor: 'cell' } } >
                    <h1 className='text-center text-white' style={ { textShadow: '3px 3px 3px rgba(0,0,0,.3)' } } >{ empdata.alertMsg }</h1>
                </div>
            }

            <Container>
                {/* Insert Form */ }
                <Form noValidate autoComplete='off'
                    onSubmit={ empdata.update && onUpdateHandler || onSubmitHandler }
                    className='my-5'>

                    <Form.Row>
                        <Form.Group as={ Col } md='4' >
                            <Form.Label>Emp Code</Form.Label>
                            <Form.Control
                                type='text'
                                name='empcode'
                                onFocus={ handleChange }
                                onChange={ handleChange }
                                value={ empdata.empcode }
                                placeholder='Emp Code'
                            />
                            <InputError validatenow={validatenow} message={ empdataerror.empcodeerror } /> 
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
                            <InputError validatenow={validatenow} message={ empdataerror.nameerror } /> 
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
                            <InputError validatenow={validatenow} message={ empdataerror.departmenterror } /> 
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label className='mr-4 '>Gender :</Form.Label>
                        <Form.Check
                            className='mr-3 '
                            inline
                            type='radio'
                            id='Male'
                            name='gender'
                            label='Male'
                            onChange={ handleChange }
                            value='male'
                            checked={ empdata.gender === 'male' ? true : false }
                        // defaultChecked={empdata.gender.male}
                        />
                        <Form.Check
                            className='mr-3 '
                            inline
                            type='radio'
                            name='gender'
                            id='Female'
                            label='Female'
                            onChange={ handleChange }
                            value='female'
                            checked={ empdata.gender === 'female' ? true : false }
                        // defaultChecked={empdata.gender.female}
                        />
                        <InputError validatenow={validatenow} message={ empdataerror.gendererror } /> 
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
                            <InputError validatenow={validatenow} message={ empdataerror.doberror } /> 
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
                            <InputError validatenow={validatenow} message={ empdataerror.joiningdateerror } /> 
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
                            <InputError validatenow={validatenow} message={ empdataerror.previousexperror } /> 
                        </Form.Group>
                        <Form.Group as={ Col } md='3' >
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type='text'
                                placeholder='Salary'
                                name='salary'
                                onChange={ handleChange }
                                value={ empdata.salary } />
                            <InputError validatenow={validatenow} message={ empdataerror.salaryerror } /> 
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
                        <InputError validatenow={validatenow} message={ empdataerror.addresserror } /> 
                    </Form.Group>

                    <Button type='submit'>{ empdata.update && 'Update' || 'Submit' } form</Button>
                </Form>
            </Container>
        </>

    )
}

export default EmpForm