import React from 'react'

export default function Submit({ value }) {
    return (
        <input type='submit' value={value} className="w-full rounded bg-secondary dark:bg-white text-white dark:text-secondary hover:bg-gray-700 dark:hover:bg-opacity-80 transition font-semibold text-lg cursor-pointer p-1" />
    )
}
