import React from 'react'

function Register() {
  return (
    <div className='w-full h-full bg-cyan-200'>
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <form

        className="bg-white p-6 rounded-md w-full max-w-md flex flex-col"
      >
        <h2 className="text-center">Create Account</h2>
        <label htmlFor="">username:</label>
        <input
          type="text"

          name="username"
          placeholder="username"


        ></input>


        <label htmlFor="" name="password">
          password:
        </label>
        <input
          type="password"

          name="password"
          placeholder="password"

        ></input>


        <label htmlFor="">email:</label>
        <input
          type="text"

          name="email"
          placeholder="example@mail.com"
 
        ></input>


        <label htmlFor="">phone:</label>
        <input
          type="text"

          name="phone"
          placeholder="081-XXXXXXXX"

        ></input>


        <button className="bg-gray-500 py-1 mt-3 rounded-2xl cursor-pointer hover:bg-rose-400 transition-all duration-150">
          Register
        </button>
      </form>
    </div>

    </div>
  )
}

export default Register