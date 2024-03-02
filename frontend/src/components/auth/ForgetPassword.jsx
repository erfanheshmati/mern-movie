import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../hooks'
import { isValidEmail } from '../../utils/helper'

export default function ForgetPassword() {
    const [email, setEmail] = useState("")

    const { updateNotification } = useNotification()

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidEmail(email)) return updateNotification("error", "Invalid Email")
        const { error, message } = await forgetPassword(email)
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
    }

    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-80"} onSubmit={handleSubmit}>
                    <Title children="Forget Password" />
                    <Input name="email" placeholder="example@gmail.com" label="Email" type="text" value={email} onChange={handleChange} />
                    <Submit value="Send Reset Link" />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/signup" children="Sign Up" />
                        <CustomLink to="/auth/signin" children="Sign In" />
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
