import React,{ createContext, useState } from 'react'
export const empdatacontext = createContext()

const EmpDataProvider = ( props ) => {
    const [ empdata,setEmpData ] = useState( {
        _id: '',
        empcode: '',
        name: '',
        department: '',
        gender: '',
        dob: '',
        joiningdate: '',
        previousexp: '',
        salary: '',
        address: '',
        update: false,
        showAlert: false,
        alertType: 'success',
        alertMsg: '',
        records: [],
    } )

    return (
        <empdatacontext.Provider value={ { empdata,setEmpData } }>
            { props.children }
        </empdatacontext.Provider>
    )
}

export default EmpDataProvider