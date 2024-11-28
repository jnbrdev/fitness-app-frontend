import { useState, useEffect, useContext, useCallback } from 'react';
import WorkoutView from '../components/WorkoutView';
import UserContext from '../context/UserContext';

export default function Workout() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  // Use useCallback to memoize fetchData and prevent unnecessary re-renders
  const fetchData = useCallback(() => {
    let fetchUrl = `https://fitness-app-api-l2sk.onrender.com/workouts/getMyWorkouts`

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
      });
  }, [user]); // Dependencies array includes 'user' to update fetchData when 'user' changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now you can safely use fetchData as a dependency

  return (
    <>
        <WorkoutView workoutsData={workouts} fetchData={fetchData} />;

    </>
  );
}
