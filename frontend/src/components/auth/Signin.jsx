import React, { useEffect, useState } from 'react'
import Container from "../Container";
import Title from '../form/Title';
import Input from '../form/Input';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { useAuth, useNotification } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const { updateNotification } = useNotification()

    const { handleLogin, authInfo } = useAuth()
    const { isPending, isLoggedIn } = authInfo

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const validateUserInfo = ({ email, password }) => {
        const isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!email.trim()) return { ok: false, error: "Email is missing" }
        if (!isValidMail.test(email)) return { ok: false, error: "Invalid Email" }

        if (!password.trim()) return { ok: false, error: "Password is missing" }
        if (password.length < 4) return { ok: false, error: "Password must be 4 to 20 characters" }

        return { ok: true }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { ok, error } = validateUserInfo(userInfo)
        if (!ok) return updateNotification("error", error)
        handleLogin(userInfo.email, userInfo.password)
    }

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn])

    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses + "w-80"}>
                    <Title children="Sign In" />
                    <div className='space-y-3'>
                        <Input name="email" placeholder="example@gmail.com" label="Email" type="text" value={userInfo.email} onChange={handleChange} />
                        <Input name="password" placeholder="********" label="Password" type="password" value={userInfo.password} onChange={handleChange} />
                    </div>
                    <Submit value="Sign in" busy={isPending} />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/signup" children="Sign Up" />
                        <CustomLink to="/auth/forget-password" children="Forget Password" />
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
