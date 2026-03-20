import { NavLink } from "react-router";

function NavBar() {

    const linkStyle = ({ isActive }) => 
        `relative px-1 py-2 transition-all duration-300 group ${
            isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-500"
        }`;

    return(
  
        <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 h-16 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
            

            <div className="text-xl font-extrabold text-transparent bg-clip-text bg-blue-500 ">
               Retake exam
            </div>

      
            <div className="flex gap-8 font-semibold">
                <NavLink to="/" className={linkStyle}>
                    {({ isActive }) => (
                        <>
                            Login
                  
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/todolist" className={linkStyle}>
                    {({ isActive }) => (
                        <>
                            To Do List
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                        </>
                    )}
                </NavLink>
            </div>

        </div>
    )
}

export default NavBar;