import React from 'react'
import Container from "../Container";
import Title from '../form/Title';
import Input from '../form/Input';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';

export default function Signin() {
    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-80"}>
                    <Title children="Sign In" />
                    <div className='space-y-3'>
                        <Input name="email" placeholder="example@gmail.com" label="Email" type="text" autoComplete="off" />
                        <Input name="password" placeholder="********" label="Password" type="password" />
                    </div>
                    <Submit value="Sign in" />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/signup" children="Sign Up" />
                        <CustomLink to="/auth/forget-password" children="Forget Password" />
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
