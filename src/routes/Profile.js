import { authService, dbService } from "fbase"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"


const Profile = ({ userObj }) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/")
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile