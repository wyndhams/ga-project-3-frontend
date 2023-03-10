import { useNavigate, createSearchParams } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { API } from '../lib/api';
// import MuscleCard from './common/MuscleCard';

const WorkoutDirectory = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);

  const handleSelect = (muscleGroup) => {
    const groupArr = muscleGroup.split(',');
    if (!selectedMuscleGroups.some((i) => groupArr.includes(i))) {
      setSelectedMuscleGroups([...selectedMuscleGroups, ...groupArr]);
    }
  };
  console.log(selectedMuscleGroups);

  const goToSelectedWorkouts = () => {
    navigate({
      pathname: '/workout-directory/workouts',
      search: `?${createSearchParams({
        muscleGroups: selectedMuscleGroups.join(','),
      })}`,
    });
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.workoutDirectory)
      .then(({ data }) => {
        setWorkouts(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  if (!workouts) {
    return null;
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {workouts?.map((workout) => (
            <Grid item xs={4} key={workout._id}>
              {/* <MuscleCard
                name={workout.name}
                image={workout.image}
                onClick={() => handleSelect(`${workout.name}`)}
              /> */}
              <Button
                color='secondary'
                variant='outlined'
                name={workout.name}
                image={workout.image}
                onClick={() => handleSelect(`${workout.workout}`)}
              >
                {workout.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Button
          sx={{ border: 3 }}
          color='secondary'
          variant='outlined'
          size='large'
          onClick={goToSelectedWorkouts}
        >
          Go To Exercises!
        </Button>
      </Container>
    </>
  );
};

export default WorkoutDirectory;
