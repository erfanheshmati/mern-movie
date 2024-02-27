import React, { useEffect, useState } from 'react'
import Container from "../Container";
import Title from '../form/Title';
import Input from '../form/Input';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { createUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks';

export default function Signup() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const { updateNotification } = useNotification()

    const { authInfo } = useAuth()
    const { isLoggedIn } = authInfo

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const validateUserInfo = ({ name, email, password }) => {
        const isValidName = /^[a-z A-Z]+$/
        const isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!name.trim()) return { ok: false, error: "Name is missing" }
        if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" }

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
        const response = await createUser(userInfo)
        if (response.error) return console.log(response.error)
        navigate("/auth/verification", {
            state: { user: response.user },
            replace: true
        })
    }

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn])

    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-80"} onSubmit={handleSubmit}>
                    <Title children="Sign Up" />
                    <div className='space-y-3'>
                        <Input name="name" placeholder="John Doe" label="Name" type="text" value={userInfo.name} onChange={handleChange} />
                        <Input name="email" placeholder="example@gmail.com" label="Email" type="text" value={userInfo.email} onChange={handleChange} />
                        <Input name="password" placeholder="********" label="Password" type="password" value={userInfo.password} onChange={handleChange} />
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
