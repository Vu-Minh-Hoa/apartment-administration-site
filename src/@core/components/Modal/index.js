import { useCallback } from 'react'

import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Icon } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import CloseIcon from '@mui/icons-material/Close'

const Dialog = ({
  title,
  maxWidth,
  fullWidth,
  open,
  children,
  renderFooter,
  onCancel,
  cancelLabel,
  cancelProps,
  onSubmit,
  submitLabel,
  submitProps,
  disableBackdropClick,
  noBorderBottom,
  noBorderTop,
  formikProps,
  renderDeps,
  titleProps,
  ...props
}) => {
  const DialogWrapper = useCallback(
    ({ children }) =>
      !isEmpty(formikProps) ? (
        <Formik {...formikProps}>
          {() => (
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {children}
            </Form>
          )}
        </Formik>
      ) : (
        children
      ),
    [formikProps]
  )

  const DialogInner = () => (
    <>
      <DialogContent
        dividers
        sx={{
          ...(noBorderBottom ? { borderBottom: 'none' } : {}),
          ...(noBorderTop ? { borderTop: 'none' } : {}),
          mb: 2
        }}
      >
        {children}
      </DialogContent>
      {(cancelLabel || submitLabel || typeof renderFooter === 'function') && (
        <DialogActions>
          {renderFooter ? (
            renderFooter()
          ) : (
            <>
              {cancelLabel && (
                <Button onClick={onCancel} {...cancelProps}>
                  {cancelLabel}
                </Button>
              )}
              {submitLabel && (
                <Button
                  variant='contained'
                  onClick={onSubmit}
                  {...(formikProps ? { type: 'submit' } : {})}
                  {...submitProps}
                >
                  {submitLabel}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </>
  )

  return (
    <MuiDialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' && disableBackdropClick) return
        onCancel && onCancel()
      }}
      transitionDuration={{
        exit: 0
      }}
      {...props}
    >
      <DialogTitle {...titleProps} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        {onCancel && (
          <IconButton onClick={onCancel}>
            <CloseIcon sx={{ width: 18, height: 18 }} />
          </IconButton>
        )}
      </DialogTitle>
      <DialogWrapper>
        <DialogInner />
      </DialogWrapper>
    </MuiDialog>
  )
}

Dialog.defaultProps = {
  title: '',
  open: false,
  children: '',
  maxWidth: 'sm',
  fullWidth: true,
  disableBackdropClick: false,
  onCancel: null,
  cancelLabel: '',
  cancelProps: null,
  onSubmit: null,
  submitLabel: '',
  submitProps: null,
  noBorderBottom: false
}

// Dialog.propTypes = {
//   title: PropTypes.string,
//   maxWidth: PropTypes.string,
//   fullWidth: PropTypes.bool,
//   open: PropTypes.bool,
//   onCancel: PropTypes.func,
//   cancelLabel: PropTypes.string,
//   cancelProps: PropTypes.shape(),
//   onSubmit: PropTypes.func,
//   submitLabel: PropTypes.string,
//   submitProps: PropTypes.shape(),
//   disableBackdropClick: PropTypes.bool,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.shape(), PropTypes.string]),
//   renderFooter: PropTypes.func,
//   noBorderBottom: PropTypes.bool,
//   renderDeps: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.bool,
//     PropTypes.array,
//     PropTypes.object
//   ])
// }

export default Dialog
