import React from 'react'
import { useAuth } from "../../hooks"
import Container from "../Container"
import { useNavigate } from "react-router-dom"

export default function NotVerified() {
    const { authInfo } = useAuth()
    const { isLoggedIn } = authInfo
    const isVerified = authInfo.profile?.isVerified

    const navigate = useNavigate()

    const navigateToVerify = () => {
        navigate('/auth/verification', { state: { user: authInfo.profile } })
    }

    return (
        <Container>
            {isLoggedIn && !isVerified ? (
                <p className='text-lg text-center bg-blue-50 p-2 mt-1'>
                    It looks you have not verified your account,{" "}
                    <button className='text-blue-500 font-semibold hover:underline' onClick={navigateToVerify}>
                        click here to verify your account.
                    </button>
                </p>
            ) : null}
        </Container>
    )
}
