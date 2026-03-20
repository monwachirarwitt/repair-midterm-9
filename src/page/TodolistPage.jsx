import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useUserStore from '../stores/userStore'

function TodolistPage() {

    const user = useUserStore(state => state.user)

    const [list, setlist] = useState([])

    const [content, setcontent] = React.useState("")

    useEffect(() => {
        getUser()

    }, [])
    async function getUser() {

        try {
            const res = await axios.get(`https://mt-todolist-backend.onrender.com/todos/${user.userId}`)
            console.log(res.data)

            setlist(res.data)
        }
        catch (err) {

        }
    }

    async function getUseradd() {

        try {
            const res = await axios.post(`https://mt-todolist-backend.onrender.com/todos/${user.userId}`,
                {
                    content: content
                }
            )

            setlist((prev) => [...prev,res.data])
        }
        catch (err) {
        }
    }
  
        async function getUserdelete(todoId) {

        try {
            const res = await axios.delete(`https://mt-todolist-backend.onrender.com/todos/${user.userId}/${todoId}`
              
            )
            setlist((prev) => prev.filter((obj) => obj.id !== todoId ) )
        }
        catch (err) {

        }
    }
console.log(user.userId)
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-400">
            <div className="bg-gray-600 p-6 rounded-md w-full max-w-md flex flex-col">

                <div className="text-3xl"><h1>My Todo</h1></div>
                <br />
                <div>
                    <input type="text" className='border-2 bg-amber-100' onChange={(event) => setcontent(event.target.value)} />
                    <button className='bg-gray-600 border-2 w-30 rounded-2xl  ml-2 'onClick={getUseradd} >add</button>
                </div>
                <br />
                {list.map((el) => (
                    <div className='w-5xl h-10'>

                        <p> <input type="checkbox" className='bg-amber-200' /> {el.content} 
                                                         
                        <button className='text-1xl w-40 ml-4 bg-gray-200 border-2 ref rounded-2xl '  onClick={()=>getUserdelete(el.id)}  >deleted</button>  </p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodolistPage