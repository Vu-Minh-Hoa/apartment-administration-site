// Icon
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import { Card, CardHeader, Grid, IconButton, Link, Typography } from '@mui/material'

import CustomTable from 'src/views/tables/CustomTable'
import FormModal from './modal/form-modal'

const UserManagement = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 150,
      renderCell: params => {
        return params?.row?.firstName + ' ' + params?.row?.lastName
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      renderCell: params => {
        return params?.row?.email
      }
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone number',
      type: 'number',
      width: 110,
      renderCell: params => params?.row?.phoneNumber
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 160,
      renderCell: params => (params?.row?.gender ? 'Male' : 'Female')
    },
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      width: 200,
      headerAlign: 'center',
      renderCell: params => {
        return (
          <>
            <IconButton
              onClick={() => {
                console.log(123)
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setTempItem(params?.row)
                setIsOpenFormModal(true)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => console.log(123)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => console.log(123)}>
              <VisibilityIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      email: 'nguyenvana@gmail.com',
      phoneNumber: '123456789',
      age: 14,
      user: {
        name: '1',
        age: '2'
      }
    },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ]

  const handleSubmit = values => {
    console.log(values)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Quản lý người dùng
          </Link>
        </Typography>
        <Typography variant='body2'>Quản lý thông tin người dùng</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Custom Table' titleTypographyProps={{ variant: 'h6' }} />
          <CustomTable rows={rows} columns={columns} defaultPageSize={5} isViewFilter={true} />
        </Card>
      </Grid>

      <FormModal
        title={'Sửa người dùng'}
        isOpenFormModal={isOpenFormModal}
        setIsOpenFormModal={setIsOpenFormModal}
        tempItem={tempItem}
        setTempItem={setTempItem}
        onSubmit={handleSubmit}
      />
    </Grid>
  )
}

export default UserManagement
