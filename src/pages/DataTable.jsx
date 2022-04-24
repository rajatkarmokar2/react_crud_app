import React,{ useContext,useEffect,useState } from 'react'
import axios from '../api/baseUrl.js'
import {
    Button,
    Table,
} from 'react-bootstrap'
import { empdatacontext } from '../context/EmpDataContext'
import { NavLink } from 'react-router-dom'

const DataTable = () => {
    const [ refresh,setRefresh ] = useState( false )
    const { empdata,setEmpData } = useContext( empdatacontext )

    const onRefresh = () => setRefresh( prevState => !prevState )

    useEffect( () => {
        fetchAllRecords()
        return () => fetchAllRecords()
    },[refresh] )

    const fetchAllRecords = async () => {
        try {
            const res = await axios.get( '/tasks' )
            let data = res.data
            data = data.map( val => {
                return {
                    ...val,
                    dob: formateDate( val.dob ),
                    joiningdate: formateDate( val.joiningdate )
                }
            } )
            // console.log( data )
            setEmpData( prevState => { return { ...prevState,records: data } } )
        } catch ( error ) {
            console.log( error.message )
        }
    }

    const onEditHandler = ( _id ) => {
        empdata.records.filter( record => {
            if ( record._id === _id )
                setEmpData( prevState => {
                    return {
                        ...prevState,
                        _id,
                        empcode: record.empcode,
                        name: record.name,
                        department: record.department,
                        gender: record.gender,
                        dob: record.dob,
                        joiningdate: record.joiningdate,
                        previousexp: record.previousexp,
                        salary: record.salary,
                        address: record.address,
                        update: true,
                    }
                } )
        } )
    }

    const deleteRecord = async ( id ) => {
        // console.log( id )
        try {
            const res = await axios.delete( `/tasks/${id}` )
            console.log( res )
        } catch ( error ) {
            console.log( error )
        }
    }

    const formateDate = ( datetime,reverse ) => {
        // console.log( datetime );
        const date = new Date( datetime )
        let newdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        newdate = newdate.split( '-' ).map( val => val.split( '' ).length === 1 ? `0${val}` : val ).join( '-' )
        return newdate
    }
    // val.split( '' ).length === 1 ? `0${val}` : val

    return (
        <div className='mt-3 mx-3 mx-xl-auto shadow ' style={ { maxWidth: '1200px' } }>
            <Table striped bordered hover size='sm' responsive className=' bg-white'>
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
                        <th colSpan='2' className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { empdata.records &&
                        empdata.records.map( ( record ) => {
                            return (
                                <tr key={ `empdata${record._id}` }>
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
                                        <NavLink to='/'>
                                            <Button
                                                variant='info'
                                                onClick={ () => onEditHandler( record._id ) }>
                                                Edit
                                            </Button>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <Button
                                            variant='danger'
                                            onClick={ () => { deleteRecord( record._id );onRefresh() } }>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        } ) }
                </tbody>
            </Table>
        </div>
    )
}

export default DataTable