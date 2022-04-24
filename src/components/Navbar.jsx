import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='row m-0 justify-content-center '>
            <div className='col-12 col-sm-8 col-lg-6 py-1'>
                <div className='row  g-1 text-center ' >
                    <div className='col'>
                        <NavLink to='/' className='h-100'>
                            <button className='col btn btn-primary  shadow rounded-lg  h-100' >Employee Table</button>
                        </NavLink>
                    </div>
                    <div className='col'>
                        <NavLink to='/datatable' className='h-100'>
                            <button className='col btn btn-primary  shadow rounded-lg h-100' >Data Table</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar