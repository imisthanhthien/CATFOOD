import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useCategories from '../../../hooks/useCategori';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

export default function ListCateloris({ data }) {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (Array.isArray(data)) {
      setRows(data);  
    }
  }, [data]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const updatedRow = findUpdatedRowById(id, rows);
    updateCategory(id, updatedRow);  
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const findUpdatedRowById = (id, rows) => {
    return rows.find((row) => row.id === id);
  };

  const handleEditCellChangeCommitted = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      setRows(updatedRows);
      handleSaveClick(id)();
    },
    [rows]
  );

  const handleDeleteClick = (id) => () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      deleteCategory(id); // Gọi API để xóa danh mục
      setRows(rows.filter((row) => row.id !== id)); // Cập nhật dữ liệu sau khi xóa
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));  // Xóa nếu là dòng mới
    }
  };

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? { ...row, ...newRow } : row))
    );
    return newRow;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 180, editable: false },
    {
      field: 'name',
      headerName: 'Tên loại sản phẩm',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Thao tác',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = async () => {
    if (!newCategoryName || typeof newCategoryName !== 'string') {
      alert('Vui lòng nhập tên danh mục hợp lệ');
      return;
    }
  
    const newRow = { name: newCategoryName, isNew: true };
  
    try {
      const addedCategory = await addCategory(newRow);
      setOpenDialog(false);
      setNewCategoryName('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Có lỗi xảy ra khi thêm danh mục');
    }
  };
  

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newRowModesModel) => setRowModesModel(newRowModesModel)}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, handleDialogOpen },
        }}
      />

      {/* Dialog to Add New Category */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Thêm mới danh mục</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên danh mục"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel, handleDialogOpen } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleDialogOpen}>
        Thêm chi tiết sản phẩm
      </Button>
    </GridToolbarContainer>
  );
}
