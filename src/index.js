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
      <h1>
        React Hook Form Example:<br />
        One Page With Multiple, Distinct Forms
      </h1>

      <p class="info">
        This app defines a single <code>onSubmit()</code> action that is used by all 3 forms.
      </p>

      <InputForm onSubmit={onSubmit}>
        <fieldset>
          <legend>Question 1</legend>
          <InputElement
            label="Q1: First Name"
            inputName="firstName"
            validation={{
              required: {
                value: true,
                message: "First Name is required"
              },
              maxLength: {
                value: 20,
                message: "Must be no more than 20 characters"
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Alphabetic characters only"
              }
            }}
          />
          <input type="submit" value="Save Q1" />
        </fieldset>
      </InputForm>

      <InputForm onSubmit={onSubmit}>
        <fieldset>
          <legend>Question 2</legend>
          <InputElement
            label="Q2: Last Name"
            inputName="lastName"
            validation={{
              required: {
                value: true,
                message: "Last Name is required"
              },
              maxLength: {
                value: 20,
                message: "Must be no more than 20 characters"
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Alphabetic characters only'
              }
            }}
          />
          <input type="submit" value="Save Q2" />
        </fieldset>
      </InputForm>

      {/* Demo muliple inputs in one form */}
      <InputForm onSubmit={onSubmit}>
        <fieldset>
          <legend>Two Questions</legend>

          <InputElement
            label="Q3: Age"
            inputName="age"
            type="number"
            validation={{
              required: {
                value: true,
                message: "Age is required"
              },
              min: {
                value: 18,
                message: "Must be at least 18"
              },
              max: {
                value: 99,
                message: "May not be more than 99"
              },
              pattern: {
                value: /^([1-9][0-9]*)$/,
                message: "Must be a number"
              }
            }}
          />

          <SelectElement
            label="Q3: Birth Month"
            inputName="birthMonth"
            selectOptions={[
              { value: '', text: ''},
              { value: 'jan', text: 'January'},
              { value: 'feb', text: 'February'},
              { value: 'mar', text: 'March'},
              { value: 'apr', text: 'April'},
              { value: 'may', text: 'May'},
              { value: 'jun', text: 'June'},
              { value: 'jul', text: 'July'},
              { value: 'aug', text: 'August'},
              { value: 'sep', text: 'September'},
              { value: 'oct', text: 'October'},
              { value: 'nov', text: 'November'},
              { value: 'dec', text: 'December'},
            ]}
          />

          <input type="submit" value="Save Q3 and Q4" />
        </fieldset>
      </InputForm>
    </>
  )
}

/**
 * InputForm implements a unique FormProvider and HTML/JSX form
 * meant to wrap an individual InputElement (or group of related inputs)
 * and corresponding submit button
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
          type={props.type}
          {...register(props.inputName, props.validation)}
        />
      </label>

      <ValidationErrors inputName={props.inputName} />
    </>
  )
}

function SelectElement({...props}) {
  const { register, formState: {errors}, watch } = useFormContext()

  // In development mode, we can watch the individual
  // input by passing the name of the input element
  if (process.env.NODE_ENV === 'development') {
    console.log(watch(props.inputName))
  }

  const selectOptions = props.selectOptions.map((next, i) => {
    return (
      <option key={i} value={next.value}>{next.text}</option>
    )
  })

  return (
    <>
      <label>
        {props.label}
        <select
          {...register(props.inputName, props.validation)}
        >
          {selectOptions}
        </select>
      </label>

      <ValidationErrors inputName={props.inputName} />
    </>
  )
}

/**
 * Generic handler for form validation errors
 */
function ValidationErrors({...props}) {
  const {formState: {errors}} = useFormContext()

  return (
    <>
      {errors[props.inputName]?.message && <p>{errors[props.inputName].message}</p>}
    </>
  )
}

const root = document.getElementById('root')
const appRoot = createRoot(root)
appRoot.render(<App />)
