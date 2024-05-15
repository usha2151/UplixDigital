import React, { useState, useEffect } from "react";
import Navbar from "../../common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {  useSelector, useDispatch } from 'react-redux'; 
import { setRegistrationData } from "../../../redux/actions/actions";
import axios from "axios";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // Check if user is already authenticated
    useEffect(() => {
      if (isAuthenticated) {

        return navigate('/user');
      }
    }, [isAuthenticated]);
  // Example state management for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    email: "",
    otp: ""
  });
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to backend for OTP generation and email sending
      await axios.post('http://localhost:8080/otp/email-otp', { email: formData.email });
      setEmailSent(true);
      setOtpSent(true); // Show OTP input field after sending email
      setVerificationError('');
    } catch (error) {
      console.error('Error sending email:', error);
      setVerificationError('Error sending email. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send OTP to backend for verification
      await axios.post('http://localhost:8080/otp/email-otp', { email: formData.email, otp: formData.otp });
      console.log('OTP verified successfully. Granting access...');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationError('Invalid OTP. Please try again.');
    }
  };


  const [emailSent, setEmailSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const { firstName, lastName, email, password, confirmPassword, designation, companyName } = formData;
      if (!firstName || !lastName || !designation || !companyName || !email || !password || !confirmPassword){
      alert("Please, Fill the all field!");
      }
    else{
     if(formData.password !== formData.confirmPassword){
     alert("Password and confirm are not matched!");
     }
     else{
      dispatch(setRegistrationData(formData));
      navigate('/addUserInfo')

     }
    }
    console.log(formData);
  };

  return (
    <>
    <Navbar />
    <div className="h-full bg-white dark:bg-gray-900 py-12">
  <div className="mx-auto container lg:px-20">
    <div className="flex justify-center px-6 py-12">
      <div className="w-full grid lg:grid-cols-2 shadow-xl">
        <div
          className="w-full h-auto bg-blue-500 dark:bg-gray-800 hidden lg:block  bg-cover rounded-l-lg"
          style={{ backgroundImage: "url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
          <div>
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Create an Account!
            </h3>
            {!emailSent && !otpSent && (
              <form onSubmit={handleEmailSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            )}
            {(emailSent || otpSent) && (
              <form onSubmit={handleOtpSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {otpSent && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                      OTP
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="otp"
                      type="text"
                      name="otp"
                      placeholder="OTP"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
            )}
            {verificationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {/* <span className="block sm:inline">{verificationError}</span> */}
              </div>
            )}
          </div>
        </div>  
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default SignUp;
