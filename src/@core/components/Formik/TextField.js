import React from 'react'

import { getIn } from 'formik'
import { FormLabel, TextField } from '@mui/material'

// import PropTypes from 'prop-types'

const FormikTextField = ({ form, field, onChange, onInput, error, helperText, ...props }) => {
  return (
    <>
      {props?.label && <FormLabel>{props?.label}</FormLabel>}
      <TextField
        fullWidth
        {...field}
        error={error || (!!getIn(form.touched, field.name) && !!getIn(form.errors, field.name))}
        helperText={helperText || getIn(form.errors, field.name)}
        value={field.value ?? ''}
        onBlur={e => {
          form.setFieldTouched(field.name, true)

          const val = e?.target?.value
          if (typeof val === 'string' && val?.trim() !== val) {
            form.setFieldValue(field.name, val?.trim())
          }
        }}
        onChange={e => {
          if (typeof onInput === 'function') {
            onInput(e.target.value)
          } else {
            onChange(e.target.value)
            form.setFieldValue(field.name, e.target.value)
          }
        }}
        sx={{
          '& legend': { display: 'none' },
          '& .MuiInputLabel-shrink': { opacity: 0, transition: 'all 0.2s ease-in' }
        }}
        {...props}
      />
    </>
  )
}

FormikTextField.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
  error: false,
  helperText: ''
}

// FormikTextField.propTypes = {
//   form: PropTypes.shape(),
//   field: PropTypes.shape(),
//   onInput: PropTypes.func,
//   onChange: PropTypes.func,
//   error: PropTypes.bool,
//   helperText: PropTypes.string
// }

export default FormikTextField
