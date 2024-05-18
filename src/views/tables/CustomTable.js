import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid'
import { useMemo } from 'react'

const CustomTable = ({
  columns = [],
  rows = [],
  defaultPageSize,
  isViewColumnsSettings,
  isViewFilter,
  isViewDensity,
  isViewExport
}) => {
  const DEFAULT_PAGESIZE = defaultPageSize || 5
  const visibleColumns = useMemo(() => columns?.filter?.(i => !i?.hide), [columns])

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {isViewColumnsSettings && <GridToolbarColumnsButton />}
        {isViewFilter && <GridToolbarFilterButton />}
        {isViewDensity && <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />}
        {isViewExport && (
          <GridToolbarExport
            slotProps={{
              tooltip: { title: 'Export data' },
              button: { variant: 'outlined' }
            }}
          />
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={visibleColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: DEFAULT_PAGESIZE
              }
            }
          }}
          pageSizeOptions={[5, 15, 25]}
          slots={{ toolbar: CustomToolbar }}
          sx={{ '& td': { border: 0 } }}
        />
      </div>
    </>
  )
}

export default CustomTable
