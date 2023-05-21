import React, { useState, useEffect, useContext } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from "formik";

import RoomsContext from "../context/RoomsContext";


const roomSchema = yup.object().shape({
  roomTitle: yup.string().required("benötigt"),
  dailyRate: yup.number().required("benötigt").positive("muss positiv sein"),
  description: yup.string().required("benötigt"),
  // amenities: yup.array().ensure()
  images: yup.array().ensure(),
})

const EMPTY_FORM = {
  roomTitle: "",
  dailyRate: 0,
  description: "",
  // amenities: [],
  images: []
}


export default function ManageRoomsForm(props) {
    const { rooms, addRoomCb } = useContext(RoomsContext);

    const handleFormSubmit = async (values, onSubmitProps) => {
  
      addRoomCb(values, onSubmitProps)
      props.handleCloseCb()
      //resetForm()
    };

  return (
    <Box className="ManageRoomsForm" width="100%" p="1rem 6%" style={{textAlign: "left"}}>
      <Formik 
        onSubmit={handleFormSubmit} 
        initialValues={EMPTY_FORM}
        validationSchema={roomSchema} 
      >
        {({
          values,
          errors, 
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ "& > div": {p: "1rem"}}} >
              <Grid container style={{gap: "1rem"}}>
                <Grid xs={8} style={{display: "flex"}}>
                  <TextField 
                    style={{flexGrow: "1"}}
                    label="Titel des Zimmers"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.roomTitle}
                    name="roomTitle"
                    error={Boolean(touched.roomTitle) && Boolean(errors.roomTitle)}
                    helperText={touched.roomTitle && errors.roomTitle}
                  />
                </Grid>
                <Grid xs>
                  <TextField 
                    style={{flexGrow: "1"}}
                    label="Tagesrate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dailyRate}
                    name="dailyRate"
                    error={Boolean(touched.dailyRate) && Boolean(errors.dailyRate)}
                    helperText={touched.dailyRate && errors.dailyRate}
                  />
                </Grid>
              </Grid>

              <Grid xs={12}>
                <TextField 
                  label="Beschreibung"
                  fullWidth
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={Boolean(touched.description) && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Box style={{margin: "1rem", border: "1px solid lightGrey", borderRadius: "6px"}}>
                <Dropzone 
                  acceptedFiles=".jpeg,.jpg,.png" 
                  multiple={true} 
                  maxFiles={5}
                  onDrop={(acceptedFiles) => setFieldValue("images", acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      style={{border: "1px dashed grey", color: "grey"}}
                      padding="1rem"
                      sx={{ "&:hover": {cursor: "pointer "}}}
                    >
                      <input {...getInputProps()} />
                      {values.images.length === 0
                        ? <p>Bis zu 5 Fotos hochladen (drag'n'drop oder hier klicken)</p>
                        : <Grid container >
                              {
                                values.images.map((image) => (
                                    <Grid xs="6" key={image.name}>
                                      <p style={{paddingInline:"1rem"}}>{image.name}</p> 
                                    </Grid>
                                ))
                              }
                            <Grid xs style={{textAlign:"right"}}> 
                                <EditIcon />
                            </Grid>
                          </Grid>}
                    </Box>
                  )}
                  
                </Dropzone>
              </Box>
            </Box>
            <Box style={{textAlign:"right", marginInline:"1rem"}}>
              <Button 
                type="submit"
                  //resetForm()
                //}
              >
                hinzufügen
              </Button>
            </Box>
          </form>
        )}

      </Formik>

    </Box>
  )
}
