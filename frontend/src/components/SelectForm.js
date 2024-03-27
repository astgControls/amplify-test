import {useState, useEffect} from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from '../hooks/useAuthContext'

const SelectForm = ({selected}) => {
  const { dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [user_id, setUserId] = useState('')
  const [list, setList] = useState([""])
  const [idList, setIdList] = useState([""])

  //Get the USERS list
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            setList(json.map((u) => {
              return u.email
            }))
            setIdList(json.map((u) => {
              return u._id
            }))
      }
    }
    if (user) {
        fetchUsers()
    }

  }, [user, list, idList])

  
  //Populate List
  const populate = async (e) => {
    e.preventDefault()
    if (!user) {
        return
    }

    //remove users from DROPDOWN LIST
    var select = document.getElementById("arr");
    if (select.innerHTML === ""){
      //Default blank choice
      var sel_default = document.createElement("option");
      sel_default.textContent = "(no change)"
      sel_default.value = ""
      select.appendChild(sel_default)
      //add users to DROPDOWN LIST
      for (var i = 0; i < list.length; i++) {
        var el = document.createElement("option");
        el.textContent = list[i];
        el.value = idList[i];
        select.appendChild(el)
      }
    }
  }

  //Edit all the things
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
        return
    }

    const workout = {
        "_id": selected._id,
        "title": title === '' ? selected.title : title,
        "reps": reps === '' ? selected.reps : reps,
        "load": load === '' ? selected.load : load,
        "user_id": user_id ==='' ? selected.user_id : user_id
    }

    //Patch a workout to something
    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'PATCH',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        } 
    })
    // eslint-disable-next-line
    const json = await response.json()
    
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setUserId('')
      dispatch({type: 'PATCH_WORKOUT', payload: workout})
    }
}
 //FORM STRUCTURE
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Change details of workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <label>Owner:</label>
      <select id="arr" 
        onChange={(e) => setUserId(e.target.value)} 
        onClick={populate}
        value={user_id}>
      </select>
      
      <button>Edit</button>

    </form>
  )
}

export default SelectForm