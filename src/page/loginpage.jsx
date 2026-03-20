
import axios from "axios";
import { useState } from "react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";

function Login() {
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    })


    const setUser = useUserStore((state) => state.setUser)
    const setToken = useUserStore((state) => state.setToken)
    const navigate = useNavigate()

    const inputStyle = "border p-0.5 px-2 border-gray-500 rounded-md";

    const hdlChange = (e) => {
        const { name, value } = e.target
        setFormLogin((prv) => ({ ...prv, [name]: value }))

    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post("https://mt-todolist-backend.onrender.com/auth/login", formLogin)

        console.log("dd",res.data.user)
        setUser(res.data.user)
        setToken(res.data.user.token)
        navigate('/todolist')
    }
    


    console.log(formLogin)
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-400">
            <form
                onSubmit={hdlSubmit}
                className="bg-gray-600 p-6 rounded-md w-full max-w-md flex flex-col"
            >
                <h2 className="text-center">Login</h2>
                <label htmlFor="">username:</label>
                <input
                    type="text"
                    className={inputStyle}
                    name="username"
                    placeholder="username"
                    onChange={hdlChange}


                ></input>

                <label htmlFor="" name="password">
                    password:
                </label>
                <input
                    type="password"
                    className={inputStyle}
                    name="password"
                    placeholder="password"
                    onChange={hdlChange}


                ></input>

                <button className="bg-gray-700 py-1 mt-3 rounded-2xl cursor-pointer hover:bg-rose-400 transition-all duration-150">
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login