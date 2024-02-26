import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomLink({ to, children }) {
    return (
        <Link to={to} className='text-light-subtle dark:text-dark-subtle hover:text-primary dark:hover:text-white transition'>{children}</Link>
    )
}
