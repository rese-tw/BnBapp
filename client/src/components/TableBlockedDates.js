import React, { useState, useEffect, useContext } from 'react';
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

import RoomsContext from "../context/RoomsContext";


export default function TableBlockedDates() {
    const { rooms, deleteBlockedDatesCb } = useContext(RoomsContext);

    function createData(room, roomId, startDate, endDate, details, dateId) {
        return { room, roomId, startDate, endDate, details, dateId };
      }
    
    const rows = []
    rooms.forEach((room) => {
        if( room.BlockedDates.length !== 0 ) {
            room.BlockedDates.forEach((date) => { 
                rows.push(createData(room.roomTitle, room.id, date.startDate, date.endDate, date.comment, date.id))
            })
        } 
    })

  return (
    <Box paddingBlock="1rem">

        {
            rows.length === 0 
                ? <div><p>Es sind keine Daten geblockt.</p></div> 
                :   
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="blockedDates">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Zimmer</TableCell>
                                <TableCell align="left">Beginn</TableCell>
                                <TableCell align="left">Ende</TableCell>
                                <TableCell align="left">Details</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={`${row.roomId}, ${row.dateId}`} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{row.room}</TableCell>
                                        <TableCell align="left">{new Date(row.startDate).toISOString().substring(0, 10)}</TableCell>
                                        <TableCell align="left">{new Date(row.endDate).toISOString().substring(0, 10)}</TableCell>
                                        <TableCell align="left">{row.details}</TableCell>
                                        {/* <TableCell style={{display:"none"}}>{row.roomId}</TableCell>
                                        <TableCell style={{display:"none"}}>{row.dateId}</TableCell> */}
                                        <TableCell align="left">
                                            <IconButton aria-label="delete" onClick={(e)=>deleteBlockedDatesCb(row.roomId, row.dateId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

        }
    </Box>
  );
}
