// @flow

import * as React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import type { User } from '../../../../types/common-types'
import { Alert } from '../../../../components'
import { constants, actions, selectors } from '../../../../__data__'
import { validation } from '../../../../utils'

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  field: {
    width: 300,
  },
  button: {
    width: '48%',
  },
})

type Props = {
  loading: boolean,
  alert: boolean,
  editUserAction: Function,
  user: Object,
}

const EditUserForm = ({
  loading,
  alert,
  editUserAction,
  user,
}: Props): React.Node => {
  const style = useStyles()
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={style.container}
    >
      <Grid item>
        <Box mb={2}>
          <Typography variant="h4">Edit new user</Typography>
        </Box>
        <Formik
          initialValues={user}
          validationSchema={validation.schema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            editUserAction(values)
          }}
        >
          {({ submitForm, isSubmitting, dirty }) => (
            <Form>
              <Box mb={1}>
                <Field
                  className={style.field}
                  component={TextField}
                  type="text"
                  name="nick"
                  label="Short Nickname"
                  variant="outlined"
                />
              </Box>
              <Box mb={1}>
                <Field
                  disabled
                  readOnly
                  className={style.field}
                  component={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                />
              </Box>
              <Box mb={1}>
                <Field
                  className={style.field}
                  component={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                />
              </Box>
              <Box mb={1}>
                <Field
                  className={style.field}
                  component={TextField}
                  type="text"
                  name="address"
                  label="Address"
                  variant="outlined"
                />
              </Box>
              <Box mb={1}>
                <Button
                  className={style.button}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty}
                  onClick={submitForm}
                >
                  {loading ? (
                    <CircularProgress color="secondary" size={24} />
                  ) : (
                    'Edit'
                  )}
                </Button>
                &nbsp;&nbsp;
                <Button
                  className={style.button}
                  component={LinkRouter}
                  to={constants.routes.home}
                >
                  Return to home
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Alert open={alert} textSuccess="Success edited" />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  loading: selectors.users.getLoadingSelector(state),
  alert: selectors.users.getLoadedSelector(state),
})
const mapDispatchToProps = { editUserAction: actions.users.editUser }

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserForm): React.AbstractComponent<{ user: User }>)
