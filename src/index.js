'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'

import './styles.css'

function App() {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <InputForm onSubmit={onSubmit}>
        <InputElement
          label="Q1: First Name"
          inputName="firstName"
          validation={{
            required: true,
            maxLength: 20
          }}
          validationMsg="First Name is required and must be &le; 20 charaters"
        />
        <input type="submit" value="Save Q1" />
      </InputForm>

      <InputForm onSubmit={onSubmit}>
        <InputElement
          label="Q2: Last Name"
          inputName="lastName"
          validation={{
            required: true,
            pattern: /^[A-Za-z]+$/i
          }}
          validationMsg="Last Name is required"
        />
        <input type="submit" value="Save Q2" />
      </InputForm>

      <InputForm onSubmit={onSubmit}>
        <InputElement
          label="Q3: Age"
          inputName="age"
          validation={{
            required: true,
            min: 18,
            max: 99
          }}
          validationMsg="Age is required and must be &ge; 18 and &le; 99"
        />
        <input type="submit" value="Save Q3" />
      </InputForm>
    </>
  )
}

/**
 * InputForm implements a unique FormProvider and HTML form
 * meant to wrap an individual InputElement (or group of related inputs)
 */
function InputForm({...props}) {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  )
}

/**
 * InputElement provides an HTML input element, wrapped in a label
 * element, with its own error/validation handling
 */
function InputElement({...props}) {
  const { register, formState: {errors}, watch } = useFormContext()

  // In development mode, we can watch the individual
  // input by passing the name of the input element
  if (process.env.NODE_ENV === 'development') {
    console.log(watch(props.inputName))
  }

  return (
    <>
      <label>
        {props.label}
        <input
          {...register(props.inputName, props.validation)}
        />
      </label>
      {errors[props.inputName] && <p>{props.validationMsg}</p>}
    </>
  )
}

const root = document.getElementById('root')
const appRoot = createRoot(root)
appRoot.render(<App />)
