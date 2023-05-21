import React, { useState, useEffect, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import RoomsContext from "../context/RoomsContext";

const EMPTY_FORM = {
    startDate: null,
    endDate: null,
    rooms: [],
    comment: "",
   }


export default function AddBlockedDateForm() {
    const [blockedDates, setBlockedDates] = useState(EMPTY_FORM);
    const { rooms, addBlockedDatesCb } = useContext(RoomsContext);
    const [checkedState, setCheckedState] = useState([])
    
    useEffect(() => {
        resetCheckedState()
      }, [rooms]);
    
    function resetCheckedState() {
        const initialCheckedState = new Array(rooms.length).fill(false);
        setCheckedState(initialCheckedState)
    }

    function handleStartDateChange(newDate) {
        setBlockedDates(data => ({...data, startDate: new Date(newDate)}))
    }

    function handleEndDateChange(newDate) {
        setBlockedDates(data => ({...data, endDate: new Date(newDate)}))
    }

    function handleCommentChange(e) {
        const { name, value } = e.target;
        if (name === 'comment') {
            setBlockedDates( data => ({ ...data, [name]: value }))}
  
        // if (type === 'checkbox') {
        //     setBlockedDates( data => ({ ...data, [name.slice(0,5)]: checked 
        //                                             ? blockedDates.rooms.includes(+value) 
        //                                                       ? blockedDates.rooms.slice() 
        //                                                       : [...blockedDates.rooms, +value]
        //                                             : blockedDates.rooms.includes(+value) 
        //                                                       ? blockedDates.rooms.filter(el => +el !== +value) 
        //                                                       : blockedDates.rooms.slice() }));
        //     }
    }

    function handleCheckedChange(roomIx, e) {
        const updatedCheckedState = checkedState.map((item, index) =>
        index === roomIx ? !item : item 
        );
        setCheckedState(updatedCheckedState);

        const { name, value, checked } = e.target;
        setBlockedDates( data => ({ ...data, [name.slice(0,5)]: checked 
            ? blockedDates.rooms.includes(+value) 
                      ? blockedDates.rooms.slice() 
                      : [...blockedDates.rooms, +value]
            : blockedDates.rooms.includes(+value) 
                      ? blockedDates.rooms.filter(el => +el !== +value) 
                      : blockedDates.rooms.slice() }));
    }
      
    function handleSubmit(e) {
      e.preventDefault();
      addBlockedDatesCb(blockedDates);
      setBlockedDates(EMPTY_FORM);
      resetCheckedState()
    }

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap: "1rem"}}>
                    <div style={{ display:"flex"}}>
                        <div size="sm" style={{ display:"flex", flexDirection:"row", gap: "1rem", width: "100%"}}>
                            <div style={{ display:"flex", flexDirection:"column", gap: "1rem"}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        label="Beginn"
                                        key="startDate"
                                        value={blockedDates.startDate}
                                        onChange={(newDate) => handleStartDateChange(newDate)} 
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        label="Ende"
                                        key="endDate"
                                        value={blockedDates.endDate}
                                        onChange={(newDate) => handleEndDateChange(newDate)} 
                                    />
                                </LocalizationProvider>
                            </div>

                            <div style={{ display:"flex", flexGrow:"1"} }>
                                <TextField
                                    key="comment"
                                    name="comment"
                                    value={blockedDates.comment}
                                    onChange={handleCommentChange}
                                    id="outlined-multiline-flexible"
                                    label="ergänzende Details"
                                    multiline
                                    rows={4}
                                    style={{ display:"flex", flexGrow: "1"}}
                                />
                            </div> 
                        </div>   
                    </div>
                    <div style={{ display:"flex", gap: "1rem"}}>
                        {
                            rooms.map((room, index) => (
                            <FormGroup>
                                <FormControlLabel
                                        control={
                                            <Checkbox 
                                                key={room.id}
                                                type="checkbox"
                                                name={`rooms_${room.roomTitle}`}
                                                checked={!!checkedState[index]} // SINCE THE CHECKEDSTATE IS INITIALIZED AS EMPTY ARRAY, REACT CONSIDERS IT UNCONTROLLED, BUT SINCE IT IS CONTROLLED, THE DOUBLE !! IS NEEDED TO AVOID AN ERROR SWITICHING FROM UNCONTROLLED TO CONTROLLED
                                                value={room.id}
                                                icon={<PanoramaFishEyeIcon />} 
                                                checkedIcon={<RemoveCircleIcon color="error"/>}
                                                onChange={(e)=>handleCheckedChange(index, e)}  
                                            />
                                        }
                                        label={room.roomTitle}
                                    />
                            </FormGroup>
                            ))
                        }
                    </div>

                    <div style={{ flexGrow: "1"}}>
                            <Button 
                                type="submit" 
                                variant="outlined" color="error"
                                //onClick={handleSubmit}
                            >
                                Zeitraum blockieren
                            </Button>
                    </div>
    </form>
  )
}
