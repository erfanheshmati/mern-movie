import React from 'react'
import { ImSpinner3 } from "react-icons/im"

export default function Submit({ value, busy }) {
    return (
        <button type='submit' className="w-full rounded bg-secondary dark:bg-white text-white dark:text-secondary hover:bg-gray-700 dark:hover:bg-opacity-80 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center">
            {busy ? <ImSpinner3 className='animate-spin' /> : value}
        </button>
    )
}
