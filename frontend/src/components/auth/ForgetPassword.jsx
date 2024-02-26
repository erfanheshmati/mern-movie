import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'

export default function ForgetPassword() {
    return (
        <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
            <Container>
                <form className="bg-secondary rounded p-6 w-72 space-y-6">
                    <Title children="Forget Password" />
                    <Input name="email" placeholder="example@gmail.com" label="Email" type="text" autocomplete="off" />
                    <Submit value="Send Reset Link" />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/signup" children="Sign Up" />
                        <CustomLink to="/auth/signin" children="Sign In" />
                    </div>
                </form>
            </Container>
        </div>
    )
}
