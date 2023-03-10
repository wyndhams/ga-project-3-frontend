import * as React from 'react';
import { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';

import { useNavigate } from 'react-router-dom';
import WorkoutLogText from '../assets/workout-log.png';
import Logo from '../assets/logo-small-black.png';
import UploadImagePng from '../assets/upload-image-white.png';

import { API } from '../lib/api';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

export default function WorkoutLog() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    // m: 1,
    // border: 1,
    width: '12.5rem',
    height: '12.5rem',
  };

  function createData(name, weight, sets, reps, kcals) {
    return { name, weight, sets, reps, kcals };
  }

  // const [images, setImages] = React.useState([]);
  // const maxNumber = 69;
  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateTimePicker: '',
    weightUsed: 0,
    reps: 0,
    sets: 0,
    rest: 0,
    difficulty: '',
    totalTime: 0,
    caloriesBurned: 0,
    muscleGroup: '',
  });

  const [error, setError] = useState(false);
  const [muscleGroups, setMuscleGroups] = useState(['']);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allWorkouts)
      .then(({ data }) => setMuscleGroups(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData.muscleGroup
      ? formData
      : {
          name: formData.name,
          weight: formData.weight,
          sets: formData.sets,
          reps: formData.reps,
          caloriesBurned: formData.caloriesBurned,
        };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    API.GET(API.ENDPOINTS.allWorkouts, data, API.getHeaders())
      .then(({ data }) => {
        navigate(`/workouts/${data._id}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'black', flexGrow: 1 }}>
        <Grid container style={{ minHeight: '100vh' }}></Grid>
        {/* title */}
        <Box
          component='img'
          sx={{
            position: 'absolute',
            top: '8vh',
            justify: 'center',
            left: '40%',
            // zIndex: 'tooltip',
            mt: 4,
            mb: 20,
            height: 100,
            width: 400,
          }}
          alt='Workout log text'
          src={WorkoutLogText}
        />
        {/* end of title */}

        <Grid container spacing={2}>
          {/* new table */}
          <Grid item xs={8}>
            <Box
              component={Paper}
              sx={{
                position: 'absolute',
                top: '25vh',
                justify: 'center',
                left: '8.5%',
                pt: 2,
                pb: 2,
                width: '60%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DateTimePicker
                      label='Date & Time'
                      // value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exercise</TableCell>
                      <TableCell align='center'>Weight&nbsp;(kg)</TableCell>
                      <TableCell align='center'>Sets</TableCell>
                      <TableCell align='center'>Reps</TableCell>
                      <TableCell align='center'>Kcals&nbsp;Burned</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        <Box
                          component='form'
                          sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
                          noValidate
                          autoComplete='off'
                        >
                          <FormControl fullWidth>
                            <InputLabel id='muscleGroup'>
                              Select Exercise
                            </InputLabel>
                            <Select
                              size='small'
                              labelId='muscleGroup'
                              value={formData.muscleGroup}
                              label='Muscle Group'
                              onChange={handleChange}
                            >
                              <MenuItem value=''>None</MenuItem>
                              {muscleGroups.map((muscleGroup) => (
                                <MenuItem
                                  key={muscleGroup._id}
                                  value={muscleGroup._id}
                                >
                                  {muscleGroup.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell align='center'>
                        <Box
                          component='form'
                          sx={{
                            '& > :not(style)': { m: 1, width: '5ch' },
                          }}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='standard-basic'
                            label='0'
                            variant='standard'
                          />
                        </Box>
                      </TableCell>

                      <TableCell align='center'>
                        <Box
                          component='form'
                          sx={{
                            '& > :not(style)': { m: 1, width: '5ch' },
                          }}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='standard-basic'
                            label='0'
                            variant='standard'
                          />
                        </Box>
                      </TableCell>

                      <TableCell align='center'>
                        <Box
                          component='form'
                          sx={{
                            '& > :not(style)': { m: 1, width: '5ch' },
                          }}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='standard-basic'
                            label='0'
                            variant='standard'
                          />
                        </Box>
                      </TableCell>

                      <TableCell align='center'>
                        <Box
                          component='form'
                          sx={{
                            '& > :not(style)': { m: 1, width: '5ch' },
                          }}
                          noValidate
                          autoComplete='off'
                        >
                          <TextField
                            id='standard-basic'
                            label='0'
                            variant='standard'
                          />
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <Box>
                        <Stack>
                          <Button
                            variant='text'
                            color='error'
                            type='submit'
                            sx={{ width: '234.7%' }}
                          >
                            + ADD another exercise
                          </Button>
                        </Stack>
                      </Box>
                    </TableRow>
                    <TableRow>
                      <Box>
                        <Stack>
                          <Button
                            variant='contained'
                            color='secondary'
                            type='submit'
                            sx={{ width: '234.7%' }}
                          >
                            Upload Workout
                          </Button>
                        </Stack>
                      </Box>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {/* end new table */}
          </Grid>

          {/* upload image */}
          <Grid
            item
            xs={4}
            sx={{
              position: 'absolute',
              top: '28vh',
              justify: 'center',
              left: '72%',
            }}
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              <Button
                variant='text'
                component='label'
                sx={{ fontSize: '50px' }}
              >
                Upload&nbsp;your&nbsp;pump
                <Box
                  component='img'
                  sx={{
                    position: 'absolute',
                    top: '8vh',
                    justify: 'center',
                    left: '19%',
                    // mt: 2,
                    height: 180,
                    width: 200,
                  }}
                  alt='Workout log text'
                  src={UploadImagePng}
                />
                <input hidden accept='image/*' multiple type='file' />
              </Button>
            </Stack>
          </Grid>
          {/* upload image */}
        </Grid>
      </Box>
    </>
  );
}
