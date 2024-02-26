import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'

export default function ForgetPassword() {
    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-80"}>
                    <Title children="Forget Password" />
                    <Input name="email" placeholder="example@gmail.com" label="Email" type="text" autoComplete="off" />
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
