import { useMemo, useState } from 'react'
import { Grid, IconButton, InputAdornment } from '@mui/material'
import * as Yup from 'yup'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'

import { Field } from 'src/@core/components/Formik'

const { default: Dialog } = require('src/@core/components/Modal')

const FormModal = ({ title, isOpenFormModal, setIsOpenFormModal, tempItem, setTempItem, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = useMemo(() => {
    return {
      name: tempItem?.firstName || '',
      email: tempItem?.email || '',
      password: tempItem?.password || '',
      confirmPassword: tempItem?.confirmPassword || ''
    }
  }, [tempItem])

  return (
    <Dialog
      title={title}
      open={isOpenFormModal}
      onCancel={() => {
        setIsOpenFormModal(false)
        setTempItem(null)
      }}
      cancelLabel={'Hủy'}
      submitLabel={'Cập nhật'}
      formikProps={{
        initialValues,
        onSubmit: values => onSubmit(values),
        validationSchema: Yup.object().shape({
          name: Yup.string().nullable().required('Trường này bắt buộc phải điền!'),
          email: Yup.string().nullable().required('Trường này bắt buộc phải điền!'),
          password: Yup.string().nullable().required('Trường này bắt buộc phải điền!'),
          confirmPassword: Yup.string()
            .nullable()
            .required('Trường này bắt buộc phải điền!')
            .test(_, (value, context) => {
              if (value !== context.parent.password) {
                return context.createError({
                  message: 'Mật khẩu không khớp'
                })
              }

              return true
            })
        }),
        enableReinitialize: true
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Field.TextField label='Name' name='name' placeholder='Leonard Carter' />
        </Grid>
        <Grid item xs={12}>
          <Field.TextField type='email' label='Email' name='email' placeholder='carterleonard@gmail.com' />
        </Grid>
        <Grid item xs={12}>
          <Field.TextField
            label='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            aria-describedby='form-layouts-basic-password-helper'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                  aria-label='toggle password visibility'
                >
                  {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Field.TextField
            label='Confirm Password'
            name='confirmPassword'
            aria-describedby='form-layouts-confirm-password-helper'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                  aria-label='toggle password visibility'
                >
                  {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default FormModal
