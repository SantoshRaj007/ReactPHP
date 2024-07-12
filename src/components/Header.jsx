import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
    return (
        <div className='flex border-[#000] drop-shadow-lg shadow-xl'>
            <div className='bg-[#000] text-[#fff] px-2 py-1 md:py-2 flex items-center'>
                <span className='font-bold text-sm md:text-lg text-nowrap'>San</span>
            </div>
            <div className='bg-[#fff] text-[#000] px-2 py-1 md:px-2 md:py-2 flex items-center shadow-inherit'>
                <span className='font-bold text-sm md:text-lg text-nowrap'>Singh</span>
            </div>
        </div>
    )
}

function Header() {
    return (
        <>
            <nav className="p-3 shadow-lg">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink to={'/'} className="d-flex align-items-center mb-2 mb-lg-0 text-[#fff] text-decoration-none">
                           <Logo/>
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto mx-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink to={'/'} className="nav-link px-2 text-secondary font-semibold">Home</NavLink></li>
                            <li><NavLink to={'/all-user'} className="nav-link px-2 text-secondary font-semibold">User List</NavLink></li>
                            <li><NavLink to={'/add-user'} className="nav-link px-2 text-secondary font-semibold">Add User</NavLink></li>
                            <li><NavLink to={'/all-product'} className="nav-link px-2 text-secondary font-semibold">Product List</NavLink></li>
                            <li><NavLink to={'/add-product'} className="nav-link px-2 text-secondary font-semibold">Add Product</NavLink></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark bg-[#f9f9f9]" placeholder="Search..." aria-label="Search" />
                        </form>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-info me-2">Login</button>
                            <button type="button" className="btn btn-outline-warning">Sign-up</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
