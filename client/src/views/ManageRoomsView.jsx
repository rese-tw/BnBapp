import React, { useState, useEffect, useContext } from "react";
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import TableRooms from "../components/TableRooms";
import ManageRoomsForm from "../components/ManageRoomsForm";


export default function ManageRoomsView() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
          <Box width="100%" p="1rem 6%">
            <Button variant="outlined" onClick={handleClickOpen}>
              Zimmer hinzufügen
            </Button>

            <Dialog 
                open={open} 
                onClose={handleClose} 
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
              <DialogTitle>Zimmerdetails</DialogTitle>
              <DialogContent>
                <ManageRoomsForm handleCloseCb={handleClose}/> 
              </DialogContent>
              <DialogActions>
                <Box style={{marginInline:"5rem", marginTop:"-3rem"}}>
                  <Button onClick={handleClose} >abbrechen</Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>

      
          <TableRooms />
      
    </div>


  )
}
