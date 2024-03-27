import {useState, useEffect} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'

function UserTranslate(own_id) {
    const [email, setEmail] = useState("")
    const {user} = useAuthContext()

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
                json.map((u) => {
                    if (u._id === own_id) {
                        setEmail(u.email)
                    }
                    return u
                })
            }
        }
        if (user) {
            fetchUsers()
        }

    }, [user, own_id])
    return email;

}
 
export default UserTranslate;