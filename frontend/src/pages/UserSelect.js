import {useEffect, useState} from 'react'
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import {useAuthContext} from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import SelectForm from '../components/SelectForm'


const UserSelect = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [chosen, setChosen] = useState();  

    //get WORKOUTS list
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user) {
            fetchWorkouts()
        }
        
    }, [dispatch, user])

    return ( 
        <div className="userselect">
            <div className="workouts">
                {workouts && workouts.map((w) => (
                    <WorkoutDetails  key={w._id} workout={w} active={w === chosen} onClick={() => setChosen(w)}/>
                    
                ))}
            </div>
             <SelectForm selected={chosen}/>
        </div>
     );
}
 
export default UserSelect