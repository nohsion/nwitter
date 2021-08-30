import { useEffect, useState } from "react"
import { dbService } from "fbase"


const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setNweet("")
    }

    const onChange = (event) => {
        event.preventDefault()
        const {
            target: { value },
        } = event
        setNweet(value)
    }

    

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setNweets(newArray)
        })
    }, [])


    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={128}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home