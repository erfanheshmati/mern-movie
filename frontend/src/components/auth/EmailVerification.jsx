import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'

export default function EmailVerification() {
    const OTP_LENGTH = 6
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
    const [activeOtpIndex, setActiveOtpIndex] = useState(0)
    const inputRef = useRef()

    const focusNextInputField = (index) => {
        setActiveOtpIndex(index + 1)
    }

    const focusPrevInputField = (index) => {
        let nextIndex
        const diff = index - 1
        nextIndex = diff !== 0 ? diff : 0
        setActiveOtpIndex(nextIndex)
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

    return (
        <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
            <Container>
                <form className="bg-secondary rounded p-6 space-y-6">
                    <Title children="Verify Your Account" />
                    <p className='text-center text-dark-subtle'>OTP has been sent to your email</p>
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
                                    className='w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none' />
                            )
                        })}
                    </div>
                    <Submit value="Submit" />
                </form>
            </Container>
        </div>
    )
}
