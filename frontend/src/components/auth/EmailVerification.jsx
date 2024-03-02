import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { resendVerifyEmail, verifyEmail } from '../../api/auth'
import { useAuth, useNotification } from '../../hooks'

export default function EmailVerification() {
    const OTP_LENGTH = 6
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
    const [activeOtpIndex, setActiveOtpIndex] = useState(0)
    const inputRef = useRef()

    const { state } = useLocation()
    const user = state?.user
    const navigate = useNavigate()

    const { updateNotification } = useNotification()

    const { isAuth, authInfo } = useAuth()
    const { isLoggedIn, profile } = authInfo
    const isVerified = profile?.isVerified

    const focusNextInputField = (index) => {
        setActiveOtpIndex(index + 1)
    }

    const focusPrevInputField = (index) => {
        let nextIndex
        const diff = index - 1
        nextIndex = diff !== 0 ? diff : 0
        setActiveOtpIndex(nextIndex)
    }

    const handleResendVerifyEmail = async () => {
        const { error, message } = await resendVerifyEmail(user.id)
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
    }

    const handleOtpChange = ({ target }, index) => {
        const { value } = target
        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1, value.length)
        if (!value) focusPrevInputField(index)
        else focusNextInputField(index)
        setOtp([...newOtp])
    }

    const handleKeyDown = ({ key }, index) => {
        if (key === "Backspace") focusPrevInputField(index)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeOtpIndex])

    const isValidOTP = (otp) => {
        let valid = false
        for (let val of otp) {
            valid = !isNaN(parseInt(val))
            if (!valid) break
        }
        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidOTP(otp)) return updateNotification("error", "Invalid OTP")
        const { error, message, user: userResponse } = await verifyEmail({ OTP: otp.join(''), userId: user.id })
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
        localStorage.setItem("auth-token", userResponse.token)
        isAuth()
    }

    useEffect(() => {
        if (!user) navigate("/not-found")
        if (isLoggedIn && isVerified) navigate('/')
    }, [user, isLoggedIn, isVerified])

    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + "w-[360px] sm:w-full"} onSubmit={handleSubmit}>
                    <Title children="Please Enter the OTP to Verify Your Account" />
                    <p className='text-center text-light-subtle dark:text-dark-subtle'>OTP has been sent to {user.email}</p>
                    <div className='flex justify-center items-center gap-2'>
                        {otp.map((_, index) => {
                            return (
                                <input
                                    key={index}
                                    value={otp[index] || ""}
                                    ref={activeOtpIndex === index ? inputRef : null}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    type="number"
                                    className='w-12 h-12 border-2 border-light-subtle dark:border-dark-subtle focus:border-primary dark:focus:border-white rounded bg-transparent outline-none text-center text-primary dark:text-white font-semibold text-xl spin-button-none' />
                            )
                        })}
                    </div>
                    <div>
                        <Submit value="Verify Account" />
                        <button type='button' className='text-blue-500 hover:underline font-semibold mt-4 px-1' onClick={handleResendVerifyEmail}>
                            I don not have OTP
                        </button>
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}
