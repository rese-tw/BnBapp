import React, { useState, useEffect, useContext } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import RoomsContext from "../context/RoomsContext";

export default function TableRooms() {
    const { rooms } = useContext(RoomsContext);


    function createData(id, title, rate, description, images) {
        return { id, title, rate, description, images };
      }

    const rows = []
    rooms.forEach((room) => {     
        rows.push(createData(room.id, room.roomTitle, room.dailyRate, room.description, room.Images))
        }
    )


  return (
    <Box paddingBlock="1rem">
        <Grid container spacing={2}>
            <Grid xs></Grid>
            <Grid xs={12} md={8}>
                    {
                        rows.length === 0
                        ? <div><p>Es liegen keine Zimmerdaten vor.</p></div>
                        : 
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="allRooms">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Zimmer</TableCell>
                                            <TableCell align="left">Tagesrate</TableCell>
                                            <TableCell align="left">Beschreibung</TableCell>
                                            <TableCell align="left">Ausstattung</TableCell>
                                            <TableCell align="left">Fotos</TableCell>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">{row.title}</TableCell>
                                                <TableCell align="left">{row.rate} €/Tag</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="left">Platzhalter</TableCell>
                                                <TableCell align="left">
                                                    {
                                                        row.images.length === 0
                                                        ? <p>keine Fotos</p>
                                                        : row.images.map((image) => <p style={{margin:"0"}}>{image.name}</p>)
                                                    }
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton aria-label="edit" /*onClick={(e)=>updateRoomCb(row.id)}*/>
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton aria-label="delete" /*onClick={(e)=>deleteRoomCb(row.id)}*/>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                    }
            </Grid>
            <Grid xs></Grid>
        </Grid>
        

    </Box>

  )
}
