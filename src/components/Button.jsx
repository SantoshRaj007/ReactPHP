import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({label}) => {
    return (
        <>
            <Link href="#" className='border font-semibold bg-[#023b5b] text-[#fff] hover:bg-[#ff0064] px-3 py-2 rounded-lg'>{label}</Link>
        </>
    )   
}

export default Button
