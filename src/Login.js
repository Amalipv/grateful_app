import React, { useState } from 'react'

function Login() {
  const [code, setCode]=useState('');
  const [username, setUsername] = useState('');
  const [userpwd, setUserpwd] = useState('');

  const checkCredentials = async () => {
    console.log("inside checkCredentials");
    let response = await fetch('http://127.0.0.1:8086/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        "username" : username,
        "password": userpwd
      }),
      headers:{
        'Content-type' : 'application/json;charset=UTF-8',
      }
    });
    let data = await response.json();
    console.log(data+" "+response.status);
    setCode(response.status);
    window.location.pathname="/home";
  }
  return (
     <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 w-2/5">
        <p className="font-200 text-4xl mb-5 text-center text-slate-700">Login</p>
       
          <label className="block">
            <span className="block text-m font-medium text-slate-700">
              User name
            </span>
            <input
              type="text"
               onChange = {e => setUsername(e.target.value)}
              className="mt-1 w-4/5 focus:outline-none 
              focus:border-sky-400 
         focus:ring-sky-400 focus:ring-1 placeholder placeholder:italic placeholder:text-sm border border-slate-300 rounded-md pr-10 pl-2 py-1 peer"
              placeholder="Enter an username"
              name="username"
              id="uname"
              required
              minLength="3"
            />
            <p className="text-sm text-rose-500 font-medium pt-1 invisible peer-invalid:visible">
              Please enter a valid name
            </p>
          </label>
          
          <label className="block mt-1">
            <span className="block text-m font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              onChange={e => setUserpwd(e.target.value)}
              className="mt-1 w-4/5 focus:outline-none focus:border-sky-400 
         focus:ring-sky-400 focus:ring-1 placeholder placeholder:italic placeholder:text-sm border border-slate-300 rounded-md pr-10 pl-2 py-1 peer"
              placeholder="Enter your password"
              name="userpassword"
              id="upwd"
              required
            />
            <p className="text-sm text-rose-500 font-medium pt-1 invisible peer-invalid:visible">
              Please enter a password
            </p>
          </label>
          <button
            type="button"
            className="bg-rose-400 text-white text-sm font-semibold shadow-sm ml-40 mt-5 border border-rose-400 py-2 px-4 rounded-full "
            onClick={checkCredentials}
          >
            Login
          </button>
      
      </div>
       {
        (code === 200) && 
        <div class="bg-rose-100 border-t border-b border-rose-400 text-rose-400 px-4 py-3 sm:mx-auto sm:max-w-lg sm:px-10 w-3/5 mt-5" role="alert">
  <p className="font-bold">Login Successful! Please start entering the grateful moments.Redirecting to home page...</p>
</div>
       }
    </div>
  )
}

export default Login