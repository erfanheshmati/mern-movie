import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'

export default function ConfirmPassword() {
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
