import * as React from 'react';
import AccountText from '../assets/account-text-white.png';
import ProfilePic from '../assets/profile-pic.jpg';
import legs from '../assets/legs.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Stack,
  Avatar,
  ImageListItem,
  ImageList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  // m: 1,
  // border: 1,
  width: '12.5rem',
  height: '12.5rem',
};

function createData(name, height, weight, startWeight, goalWeight, bmi) {
  return { name, height, weight, startWeight, goalWeight, bmi };
}

const rows = [createData('Ulas Temel', 181, 106, 110, 90, 32)];

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549476464-37392f717541',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1605296866985-34ba3c0b527b',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1605300287659-9ca1a156d7c8',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1600026453346-a44501602a02',
    title: 'Camera',
  },
];

const Account = () => (
  <>
    <Box sx={{ backgroundColor: 'black' }}>
      {/* title */}
      {/* <Box
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
        alt='Account page text'
        src={AccountText}
      /> */}
      {/* end of title */}
      {/* image slide */}
      <Box
        sx={{
          // backgroundColor: 'pink',
          position: 'absolute',
          top: '10vh',
          justify: 'center',
          left: '15%',
          // zIndex: 'tooltip',
          mt: 4,
          mb: 20,
          height: 350,
          width: '70%',
        }}
      >
        {/* Image slide */}
        <Box>
          <Stack direction='row' spacing={2}>
            <ImageList
              sx={{ width: '100%', height: 350 }}
              cols={4}
              rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Box>
      </Box>
      {/* end of image slide */}

      {/* profile image and username */}
      <Box
        sx={{
          position: 'absolute',
          top: '40vh',
          justify: 'center',
          left: '15%',
          // zIndex: 'tooltip',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack>
            <Box sx={{ ...commonStyles, borderRadius: '50%' }}>
              <Avatar
                alt='Profile picture'
                src={ProfilePic}
                sx={{
                  height: '12rem',
                  width: '12rem',
                  // position: 'absolute',
                  top: '2%',
                  justify: 'center',
                  left: '2%',
                }}
              />
            </Box>
            <Box>
              <Typography
                variant='h4'
                gutterBottom
                align='center'
                sx={{
                  color: 'white',
                  width: '200px',
                  mt: 3,
                  fontSize: 50,
                }}
              >
                {/* get names for API only username though */}
                Ulas Temel
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* end of profile and user */}

      {/* pink */}
      <Box
        sx={{
          position: 'absolute',
          top: '50vh',
          justify: 'center',
          left: '35%',
          // zIndex: 'tooltip',
          mt: 4,
          mb: 20,
          // height: 100,
          // width: 800,
          height: 400,
          width: '50%',
        }}
      >
        <Grid sx={{ backgroundColor: 'pink' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align='left'>Height&nbsp;(cm)</TableCell>
                  <TableCell align='left'>Weight&nbsp;(kg)</TableCell>
                  <TableCell align='left'>Starting Weight&nbsp;(kg)</TableCell>
                  <TableCell align='left'>Goal Weight&nbsp;(kg)</TableCell>
                  <TableCell align='left'>BMI&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='left'>&ensp;{row.height}</TableCell>
                    <TableCell align='left'>&ensp;{row.weight}</TableCell>
                    <TableCell align='left'>&ensp;{row.startWeight}</TableCell>
                    <TableCell align='left'>&ensp;{row.goalWeight}</TableCell>
                    <TableCell align='left'>&ensp;{row.bmi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
      {/* pink */}

      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
        // sx={{ backgroundColor: 'black' }}
      >
        <Card>
          {/* <LazyLoadImage alt={legs.alt} effect='blur' src={legs} /> */}
          {/* <LazyLoadImage
          alt={legs.alt}
          height={legs.height}
          src={legs} // use normal <img> attributes as props
          width={legs.width}
        /> */}
        </Card>
      </Grid>
    </Box>
  </>
);

export default Account;
