import React, { useState, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import './BookingsView.css';
import RoomsContext from "../context/RoomsContext";
import TableBlockedDates from "../components/TableBlockedDates";

const EMPTY_FORM = {
  startDate: '',
  endDate: '',
  rooms: [],
  comment: "",
 }

 /* fetch rooms, initialize as global state, 
 use roomId to initialize object with 0 for every value, 
 use object for reset function on submit to reset checked to 0 */

 export default function BookingsView(props) {
  const [blockedDates, setBlockedDates] = useState(EMPTY_FORM);
  const { rooms, addBlockedDatesCb } = useContext(RoomsContext);
  //const [focusedInput, setFocusedInput] = useState('')

  function handleChange(e) {
      const { name, value, type, checked } = e.target;
      if (type === 'date') {
        setBlockedDates( data => ({ ...data, [name]: name==="startDate" 
                                                      ? new Date(value).toISOString().substring(0, 10)  //YYYY-MM-DD
                                                      : new Date(value).toISOString().substring(0, 10) 
                                                      }))} 
      if (type === 'textarea') {
        setBlockedDates( data => ({ ...data, [name]: value }))}

      if ( type === 'checkbox') {
        setBlockedDates( data => ({ ...data, [name]: checked 
                                                  ? blockedDates.rooms.includes(+value) 
                                                            ? blockedDates.rooms.slice() 
                                                            : [...blockedDates.rooms, +value]
                                                  : blockedDates.rooms.includes(+value) 
                                                            ? blockedDates.rooms.filter(el => +el !== +value) 
                                                            : blockedDates.rooms.slice() }))
      //console.log('checked:', checked)
    }
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    addBlockedDatesCb(blockedDates);
    setBlockedDates(EMPTY_FORM);
    // document.querySelectorAll("div.checkboxes input[name='room']").prop("checked", false);    
    // find a way to target the checked property to reset it to 0 (use FORM.Control controlid??) OR
    // write and trigger function that targets all inputs, checks their type for "check", then resets only those to 0
  }

  

  return (
    <Container className="BookingsView">
      <Row>Monatskalender mit geblockten/reservierten Zeitraeumen aus DB</Row>
      <Row>
        <Col>
          <Row><h2>Verfügbarkeiten managen</h2></Row>
          
            <TableBlockedDates />

            <Table className="blockDates" responsive="sm">
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
                  <InputGroup size="sm" style={{ display:"flex", flexDirection:"column"}}>
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
                  </InputGroup>
                </td> 
              </tr>
            </tbody>
            </Table>

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
        </Col>
        
        <Col>
            <h2>Buchungsanfragen</h2>
            Tabelle: Name, Adresse, Telefonnummer, Email, Zeitraum, Zahlungseingang, bestaetigt
        </Col>
      </Row>
    </Container>

  )
}
