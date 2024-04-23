import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 
import { login } from "../../../redux/actions/actions";
import { UserData } from "../../../redux/actions/actions";

export const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // Check if user is already authenticated
    useEffect(() => {
      if (isAuthenticated) {

        return navigate('/user');
      }
    }, [isAuthenticated]);


  // Example state management for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Form must be filled');
      return;
  }

    try {
      const response = await axios.post('http://localhost:8080/admin/admin-login', { formData });
  
      if(response.data.Status === 'Success'){
       localStorage.setItem('token', response.data.token);
       dispatch(login(response.data.token));
       dispatch(UserData(response.data.data));
       localStorage.setItem('userData', JSON.stringify(response.data.data)); 
       navigate('/user');
      }
      else if (response.data.Error){
        setError(response.data.Error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Navbar />
     <div className="h-full bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto container lg:px-20">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full grid lg:grid-cols-2 shadow-xl">
              <div
                className="w-full h-auto bg-blue-500 dark:bg-gray-800 hidden lg:block  bg-cover rounded-l-lg"
                style={{ backgroundImage: "url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg')" }}
              ></div>
              <div className=" bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  SignIn an Account
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded" onSubmit={handleSubmit}>
                  
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******************"
                        value={formData.password}
                        onChange={handleChange}
                      />
                  </div>
                  <p className="text-red-500 mb-2">{error}</p>
                 
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      to="/"
                    >
                       have an account? SignUp!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
