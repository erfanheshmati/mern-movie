import React, { useEffect, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ImSpinner3 } from 'react-icons/im'
import { resetPassword, verifyPasswordResetToken } from '../../api/auth'
import { useNotification } from '../../hooks'

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: ""
  })

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const id = searchParams.get("id")

  const [isVerify, setIsVerify] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const { updateNotification } = useNotification()

  const navigate = useNavigate()

  useEffect(() => {
    isValidToken()
  }, [])

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id)
    setIsVerify(false)
    if (error) {
      navigate("/auth/reset-password", { replace: true })
      return updateNotification("error", error)
    }
    if (!valid) {
      setIsValid(false)
      return navigate("/auth/reset-password", { replace: true })
    }
    setIsValid(true)
  }

  if (isVerify) {
    return (
      <FormContainer>
        <Container>
          <div className='flex space-x-2 items-center text-primary dark:text-white'>
            <h1 className='text-4xl font-semibold'>
              Please wait, we are verifying your token
            </h1>
            <ImSpinner3 className='animate-spin text-4xl' />
          </div>
        </Container>
      </FormContainer>
    )
  }

  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <h1 className='text-4xl font-semibold text-primary dark:text-white'>
            Sorry, the token is invalid
          </h1>
        </Container>
      </FormContainer>
    )
  }

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.one.trim()) return updateNotification("error", "Password is missing")
    if (password.one.trim().length < 4) return updateNotification("error", "Password must be at least 4 characters")
    if (password.one !== password.two) return updateNotification("error", "Passwords do not match")
    const { error, message } = await resetPassword({ newPassword: password.one, userId: id, token })
    if (error) return updateNotification("error", error)
    updateNotification("success", message)
    navigate("/auth/signin", { replace: true })
  }

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-80"} onSubmit={handleSubmit}>
          <Title children="Set New Password" />
          <div className='space-y-3'>
            <Input name="one" placeholder="********" label="Password" type="password" value={password.one} onChange={handleChange} />
            <Input name="two" placeholder="********" label="Confirm Password" type="password" value={password.two} onChange={handleChange} />
          </div>
          <Submit value="Submit" />
        </form>
      </Container>
    </FormContainer>
  )
}
