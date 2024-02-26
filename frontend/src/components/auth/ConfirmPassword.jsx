import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'

export default function ConfirmPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title children="Set New Password" />
          <Input name="password" placeholder="********" label="Password" type="password" />
          <Input name="confirmPassword" placeholder="********" label="Confirm Password" type="password" />
          <Submit value="Submit" />
        </form>
      </Container>
    </div>
  )
}
