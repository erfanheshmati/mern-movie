import React, { useEffect, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ImSpinner3 } from 'react-icons/im'
import { verifyPasswordResetToken } from '../../api/auth'
import { useNotification } from '../../hooks'

export default function ConfirmPassword() {
  // http://localhost:5000/auth/reset-password?token=bd70056babf6d8ff26a46ffea4d76a3566b4d49682a8cd3c8682299fe32c&id=65de06a2b42bffecf34cc3eb
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

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-80"}>
          <Title children="Set New Password" />
          <div className='space-y-3'>
            <Input name="password" placeholder="********" label="Password" type="password" />
            <Input name="confirmPassword" placeholder="********" label="Confirm Password" type="password" />
          </div>
          <Submit value="Submit" />
        </form>
      </Container>
    </FormContainer>
  )
}
