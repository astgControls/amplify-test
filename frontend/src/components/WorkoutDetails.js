import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import UserTranslate from '../tools/useUserTranslate'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout, active, onClick}) => {
    const { dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return ( 
        <div onClick={onClick} className={active ? "workout-details active" : "workout-details"}>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <p>Owner: {UserTranslate(workout.user_id)}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default WorkoutDetails;