import { NavLink } from "react-router";

function NavBar() {
    return(

        <div className=" bg-gray-500 h-12 px-8 flex justify-center items-center shadow-md">

            <div className="flex gap-6 font-semibold ">
                <NavLink to="/" className="hover:text-rose-600 ">Login</NavLink>
                <NavLink to="register" className="hover:text-rose-600">Register</NavLink>
                <NavLink to="todolist" className="hover:text-rose-600">To do list Page</NavLink>
            </div>

        </div>
    )
}
export default NavBar;