import { useEffect, useState } from "react"
import { dbService } from "fbase"


const Home = () => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
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

    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get()
        dbNweets.forEach((document) => {
            setNweets((prev) => [document.data(), ...prev])
        })
    }

    useEffect(() => {
        getNweets()
    }, [])
    console.log(nweets)
    return (
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
    )
}

export default Home