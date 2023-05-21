import React, { useState, useEffect, useContext } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';


import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import './BookingsView.css';
import RoomsContext from "../context/RoomsContext";
import TableBlockedDates from "../components/TableBlockedDates";
import AddBlockedDateForm from "../components/AddBlockedDateForm";




 export default function BookingsView(props) {

    // document.querySelectorAll("div.checkboxes input[name='room']").prop("checked", false);    
    // find a way to target the checked property to reset it to 0 (use FORM.Control controlid??) OR
    // write and trigger function that targets all inputs, checks their type for "check", then resets only those to 0
  

  

  return (
    <Box className="BookingsView" width="100%" p="1rem 6%">
      <Grid container spacing={2}>
        <Grid xs></Grid>

        <Grid xs={12} md={8}>
                <Grid xs={12}>
                  Monatskalender mit geblockten/reservierten Zeitraeumen aus DB
                </Grid>

                <Grid container columnSpacing={2}>
                    <Grid xs={12} md={7} p="1rem">
                        <h2>Verfügbarkeiten managen</h2>
                        <TableBlockedDates p="1rem"/>
                        <AddBlockedDateForm />
                    </Grid>

                    <Grid xs p="1rem">
                        <h2>Buchungsanfragen</h2>
                        Tabelle: Name, Adresse, Telefonnummer, Email, Zeitraum, Zahlungseingang, bestaetigt
                    </Grid>
                </Grid>  
        </Grid>
                
        <Grid xs></Grid>
      </Grid>

            

            {/* <Table className="blockDates" responsive="sm">
            <thead>
              <tr>
                <th>Beginn</th>
                <th>Ende</th>
                <th>ergänzende Details</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={3} >
                  <form size="sm" style={{ display:"flex", flexDirection:"column"}}>
                    <div style={{ display:"flex", gap: "5px", flexGrow: "1"}}>
                      <Form.Group className="mb-3" controlid="startDate">
                        <Form.Label className="hide">Beginn</Form.Label>
                        <Form.Control 
                          key="startDate"
                          type="date"
                          name="startDate" 
                          value={blockedDates.startDate}
                          onChange={handleChange} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlid="endDate">
                        <Form.Label className="hide">Ende</Form.Label>
                        <Form.Control 
                          key="endDate"
                          type="date"
                          name="endDate" 
                          value={blockedDates.endDate}
                          onChange={handleChange} />
                      </Form.Group>

                      <InputGroup className="mb-3" controlid="comment" style={{ flexGrow: "1"}}>
                        <Form.Label className="hide">Beschreibung</Form.Label>
                        <InputGroup.Text className="hide">Beschreibung</InputGroup.Text>
                        <Form.Control 
                          key="comment"
                          as="textarea" 
                          aria-label="Beschreibung"
                          name="comment"
                          value={blockedDates.comment}
                          onChange={handleChange}
                          placeholder="ergänzende Details" />
                      </InputGroup>
                    </div>

                    <div style={{ display:"flex", gap: "8px"}} className="checkboxes">
                      {
                        rooms.map(room => (
                          <Form.Group className="mb-3" controlid={room.id}>
                              <Form.Check 
                                key={room.id}
                                type="checkbox"
                                name="rooms"
                                value={room.id}
                                // checked={checked}  
                                onChange={handleChange}
                                label={room.roomTitle}
                               />
                            </Form.Group>
                        ))
                      }
                    </div>

                    <div style={{ flexGrow: "1"}}>
                            <Button type="submit" size="sm" onClick={handleSubmit}>
                                Zeitraum blockieren
                            </Button>
                    </div>
                  </form>
                </td> 
              </tr>
            </tbody>
            </Table> */}

            {/* <Col xs={7}  style={{textAlign:'left'}}>
 
                <DateRangePicker
                      startDate={blockedDates.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={blockedDates.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) => setBlockedDates({ startDate, endDate })} // PropTypes.func.isRequired,
                      focusedInput={focusedInput.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput => setFocusedInput({ focusedInput })} // PropTypes.func.isRequired,
                      small={true} //PropTypes.bool,
                      keepOpenOnDateSelect={false}
                  />
                <p> start date : { JSON.stringify(dateRange.startDate.format("D-MM-Y")) } </p>
                <p> end date : { JSON.stringify(dateRange.endDate.format("D-MM-Y"))} </p>
                <p> focused input : { JSON.stringify(focusedInput.focusedInput)} </p>
                
            Liste mit geblockten Zeitraeumen
            </Col> 
            */}
       
    </Box>

  )
}
