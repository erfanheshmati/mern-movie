import React from 'react'

export default function Input({ name, placeholder, label, ...rest }) {
    return (
        <div className="flex flex-col-reverse">
            <input id={name} name={name} placeholder={placeholder} {...rest} className="bg-transparent rounded border-2 border-light-subtle dark:border-dark-subtle w-full text-lg outline-none focus:border-primary dark:focus:border-white p-1 dark:text-white peer transition" />
            <label htmlFor={name} className="font-semibold text-light-subtle dark:text-dark-subtle peer-focus:text-primary dark:peer-focus:text-white transition self-start">{label}</label>
        </div>
    )
}
