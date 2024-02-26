import React from 'react'
import Container from "../Container";
import Title from '../form/Title';
import Input from '../form/Input';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';

export default function Signup() {
    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-80"}>
                    <Title children="Sign Up" />
                    <div className='space-y-3'>
                        <Input name="name" placeholder="John Doe" label="Name" type="text" autoComplete="off" />
                        <Input name="email" placeholder="example@gmail.com" label="Email" type="text" autoComplete="off" />
                        <Input name="password" placeholder="********" label="Password" type="password" />
                    </div>
                    <Submit value="Sign up" />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/signin" children="Sign In" />
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
