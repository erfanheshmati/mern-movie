import React from 'react'
import Container from "../Container";
import Title from '../form/Title';
import Input from '../form/Input';
import Submit from '../form/Submit';

export default function Signin() {
    return (
        <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
            <Container>
                <form className="bg-secondary rounded p-6 w-72 space-y-6">
                    <Title children="Sign In" />
                    <Input name="email" placeholder="example@gmail.com" label="Email" type="text" autocomplete="off" />
                    <Input name="password" placeholder="********" label="Password" type="password" />
                    <Submit value="Sign in" />
                    <div className='flex justify-between'>
                        <a href="#" className='text-dark-subtle hover:text-white transition'>Forget Password</a>
                        <a href="#" className='text-dark-subtle hover:text-white transition'>Sign Up</a>
                    </div>
                </form>
            </Container>
        </div>
    )
}