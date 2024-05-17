import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import axios from "axios";

const Occasion = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [emailSchedule, setEmailScheduled] = useState(false);
  const [festivalId, setFestivalId] = useState("");
  const [festivals, setFestivals] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/festivals/verifyFestivals');
        setFestivals(response.data);
        
      } catch (error) {
        console.error('Error fetching festivals:', error);
        // Handle error
      }
    };

    fetchFestivals();
  }, []);

  // Function to toggle popup visibility
  const togglePopup = (e) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };

  // email scheduled
  const emailScheduled = (id,date) => {
   setFestivalId(id);
   setEmailScheduled(!emailSchedule);
  }


  // Function to handle form submission
  const handleSave = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    togglePopup();
  };
  

  // email schedule function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      festival_id: festivalId,
      festival_subject: subject,
      festival_message: message,
    };

    try {
      const response = await axios.post('http://localhost:8080/festivals/scheduleEmail', emailData);

      if (response.status === 200) {
        alert('Email scheduled successfully');
      } else {
        alert('Failed to schedule email');
      }
    } catch (error) {
      console.error('Error scheduling email:', error);
      alert('An error occurred while scheduling the email');
    }

    setEmailScheduled(false);
  };
  return (
    <>
      <Navbar />
      <div class="container mx-auto px-4 sm:px-8 max-w-6xl mt-12 ">
        <div class="py-12">
          <div class="flex flex-row mb-1 te-black sm:mb-0 justify-between w-full">
            <h2 class="text-xl leading-tight">All Festivals</h2>
            <div class="">
              <form class="flex w-full">
                <button onClick={togglePopup}
                  class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2"
                  type="submit"
                >
                  <i class="fa-brands fa-accusoft"></i> Add Festival
                </button>
              </form>
            </div>  
          </div>
          {/* show pop-up */}
          {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-5 rounded-lg relative"
            style={{
              width: '50vw',
              maxWidth: '350px',
              height: 'auto',
              padding: '20px',
            }}
          >
            {/* Close Icon */}
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPopup(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <form onSubmit={handleSave}>
            <div className="mb-4.5">
      <label className="block text-black dark:text-white mb-2">Date of Festival</label>
      <input
        type="date"
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        required
      />
    </div>

              <div className="mb-4.5">
                <label className="block text-black dark:text-white mb-2 mt-2">Festival Name</label>
                <input
                  type="text"
                  placeholder="Enter Occasion Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  // value={occasionName}
                  // onChange={(e) => setOccasionName(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2"
                >
                  Add Festival
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* show email scheduled */}
      {emailSchedule ? 
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
           <div
            className="bg-white p-5 rounded-lg relative"
            style={{
              width: '50vw',
              maxWidth: '350px',
              height: 'auto',
              padding: '20px',
            }}
          >
            {/* Close Icon */}
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
              onClick={() => setEmailScheduled(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              />
            </div>
            <div className="mb-4">
              <textarea
                rows="4"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-green-500 px-4 py-2 rounded-md text-white">
                Send
              </button>
            </div>
          </div>
        </form>
      </div> 
      </div>
      
      : ''}


          {/* <!-- Table --> */}
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
            <div class="inline-block min-w-full rounded-lg p-8 bg-gray-50">
              <div class="flex flex-row gap-28 mb-1  te-black sm:mb-0 justify-between w-full">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    class="block outline-non p-2 ps-10 text-sm text-gray-900  outline-none rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
                </div>

                <div class="text-end">
                  <form class="flex items-center pt-2 w-full space-x-3">
                    <div>
                      Total Occasion{" "}
                      <span className="px-2 bg-black text-white rounded-md">
                        34
                      </span>
                    </div>
                    <div>
                      Scheduled Occasion{" "}
                      <span className="px-2 bg-green-200 text-green-700 rounded-md">
                        34
                      </span>
                    </div>
                    <div>
                      Not Scheduled Occasion {" "}
                      <span className="px-2 bg-rose-200 text-white text-rose-700 rounded-md">
                        34
                      </span>
                    </div>
                    
                  </form>
                </div>
              </div>

              <div class="relative overflow-x-auto mt-4">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-blue-500  text-white dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4 border-2 border-white">
                        <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-all-search" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 border-2 border-white">
                        Date of Festival
                      </th>
                      <th scope="col" class="px-6 py-3 border-2 border-white">
                       Name of The Festival
                      </th>
                      <th scope="col" class="px-6 py-3 border-2 border-white">
                        Email scheduled
                      </th>
                      <th scope="col" class="px-6 py-3 border-2 border-white">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3 border-2 border-white">
                        Action
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {festivals.map((festival, index) => (
            <tr key={festival.id} className={index % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' : 'bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}>
              <td>
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">{festival.festival_date}</td>
              <td className="px-6 py-4">{festival.festival_name}</td>
              <td className="px-6 py-4">Yes</td>
              <td className="px-6 py-4">Yes</td>
              <td className="px-6 py-4" onClick={() => emailScheduled(festival.festival_id,festival.festivalDate)}>Yes</td>
            </tr>
                     ))}
                  </tbody>
                </table>
              </div>

              {/* <!-- Pagination --> */}
              <div class="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                <nav aria-label="Page navigation example">
                  <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          class="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        aria-current="page"
                        class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        4
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        5
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          class="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default  Occasion;
