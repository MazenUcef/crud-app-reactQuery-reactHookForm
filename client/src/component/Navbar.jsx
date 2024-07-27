import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='py-3 flex justify-between px-3 bg-yellow-600'>
            <div className=''>
                <h1 className='font-bold text-3xl'>CRUD APP</h1>
            </div>
            <div>
                <ul className='flex gap-5 font-semibold text-xl'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar