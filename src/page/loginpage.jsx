import axios from "axios";
import { useState } from "react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";

function Login() {
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    });
    

    const [isLoading, setIsLoading] = useState(false);

    const setUser = useUserStore((state) => state.setUser);
    const setToken = useUserStore((state) => state.setToken);
    const navigate = useNavigate();

    const hdlChange = (e) => {
        const { name, value } = e.target;
        setFormLogin((prv) => ({ ...prv, [name]: value }));
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        
        try {
            const res = await axios.post("https://mt-todolist-backend.onrender.com/auth/login", formLogin);
            console.log("dd", res.data.user);
            setUser(res.data.user);
            setToken(res.data.user.token);
            navigate('/todolist');
        } catch (error) {
            console.error("Login Error:", error);

            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-50 font-sans">
            <form
                onSubmit={hdlSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col border border-gray-100"
            >
  
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                </div>

                <div className="flex flex-col gap-5">
                
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1.5" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your username"
                            onChange={hdlChange}
                            required
                        />
                    </div>

            
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            onChange={hdlChange}
                            required
                        />
                    </div>

             
                    <button 
                        type="submit"
                        disabled={isLoading} 
                        className={`mt-4 w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-semibold transition-all duration-200 
                            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}
                    >
                        {isLoading ? (
                            <>

                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;