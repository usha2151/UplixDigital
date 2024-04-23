import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUserInfo = () => {
  const navigate = useNavigate();

  const registrationData = useSelector((state) => state.userReducer);
  console.log(registrationData);
  const { firstName = "", lastName = "", email = "", designation = "", companyName = "" } = registrationData.registrationData || {};

  const [userInfo, setUserInfo] = useState({
    websiteUrl: "",
    phoneNo: "",
    linkdinUrl: "",
    websiteUrl: "",
    signature: null,
    clientList: null,
    occasion: "",
  });

  //  checkbox add to signature
  const [selectedOptions, setSelectedOptions] = useState({
    name: true,
    email: true,
    phone: false,
    designation: true,
    companyName: false,
    websiteUrl: false,
    linkdinUrl: false,

  });
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: e.target.files[0],
    }));
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signature = `
        ${selectedOptions.name ? `${firstName} ${lastName}\n` : ""}
        ${selectedOptions.email ? `${email}\n` : ""}
        ${selectedOptions.phone ? `${userInfo.phoneNo}\n` : ""}
        ${selectedOptions.designation ? `${designation}\n` : ""}
        ${selectedOptions.companyName ? `${companyName}\n` : ""}
        ${selectedOptions.websiteUrl ? `${userInfo.websiteUrl}\n` : ""}
        ${selectedOptions.linkdinUrl ? `${userInfo.linkdinUrl}\n` : ""}
      `.trim(); // Trim whitespace
  
      const formData = new FormData();
      formData.append("websiteUrl", userInfo.websiteUrl);
      formData.append("occasion", userInfo.occasion);
      formData.append("signature", signature); // Assign signature value
      formData.append("clientList", userInfo.clientList); // Client list file
  
      // Registration data ko FormData mein include karna
      formData.append("registrationData", JSON.stringify(registrationData));
  
      // Send the form data to the server
      await axios.post("http://localhost:8080/user/user-register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData ko multipart/form-data ke roop mein bhejna zaroori hai
        },
      });
  
      // Navigate to the user dashboard upon successful registration
      alert("Successfully registered!");
      navigate("/userDashboard");
    } catch (error) {
      console.error("Error adding user information:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-full bg-white dark:bg-gray-900 py-12">
        <div className="container lg:px-20">
          <div className="w-full grid lg:grid-cols-2 shadow-xl">
            <div className="w-full bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Add User Information
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                onSubmit={handleSubmit}  encType="multipart/form-data"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="websiteUrl"
                  >
                    Website Url
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    placeholder="Website Url"
                    value={userInfo.websiteUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="phoneNo"
                      >
                       Phone No.
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="phoneNo"
                        name="phoneNo"
                        type="number"
                        placeholder="Phone No"
                        value={userInfo.phoneNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="linkdinUrl"
                      >
                       Linkdin Url
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="linkdinUrl"
                        name="linkdinUrl"
                        type="url"
                        placeholder="Linkdin Url"
                        value={userInfo.linkdinUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="signature"
                  >
                    Signature Add
                  </label>
                  <textarea
                    className="w-full h-32 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="signature"
                    name="signature"
                    value={`${selectedOptions.name ? `${firstName} ${lastName}\n` : ""}${selectedOptions.email ? `${email}\n` : ""}${selectedOptions.phone ? `${userInfo.phoneNo}\n` : ""}${selectedOptions.designation ? `${designation}\n` : ""}${selectedOptions.companyName ? `${companyName}\n` : ""}${selectedOptions.websiteUrl ? `${userInfo.websiteUrl}\n` : ""}${selectedOptions.linkdinUrl ? `${userInfo.linkdinUrl}\n` : ""}`}
                    readOnly
                  />
                   <div>
        <label>
          <input
            type="checkbox"
            name="name"
            checked={selectedOptions.name}
            onChange={handleCheckboxChange}
          />
          Name
        </label>
        <label>
          <input
            type="checkbox"
            name="email"
            checked={selectedOptions.email}
            onChange={handleCheckboxChange}
          />
          Email
        </label>
        <label>
          <input
            type="checkbox"
            name="phone"
            checked={selectedOptions.phone}
            onChange={handleCheckboxChange}
          />
          Phone
        </label>
        <label>
          <input
            type="checkbox"
            name="designation"
            checked={selectedOptions.designation}
            onChange={handleCheckboxChange}
          />
          Designation
        </label>
        <label>
          <input
            type="checkbox"
            name="companyName"
            checked={selectedOptions.companyName}
            onChange={handleCheckboxChange}
          />
          Company Name
        </label>
        <label>
          <input
            type="checkbox"
            name="websiteUrl"
            checked={selectedOptions.websiteUrl}
            onChange={handleCheckboxChange}
          />
          Website URL
        </label>
        <label>
          <input
            type="checkbox"
            name="linkdinUrl"
            checked={selectedOptions.linkdinUrl}
            onChange={handleCheckboxChange}
          />
          LinkedIn URL
        </label>
        {/* Add more checkboxes as needed */}
      </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="clientList"
                  >
                    Client List Upload
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="clientList"
                    name="clientList"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="occasion"
                  >
                    Occasion
                  </label>
                  <select
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="occasion"
                    name="occasion"
                    value={userInfo.occasion}
                    onChange={handleChange}
                  >
                    <option value="">Select Occasion</option>
                    <option value="holiday">Holiday</option>
                    <option value="diwali">Diwali</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserInfo;
