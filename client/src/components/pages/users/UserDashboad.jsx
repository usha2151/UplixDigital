import React, { useState } from "react";
import Navbar from "../../common/Navbar";

const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [emailSchedule, setEmailScheduled] = useState(false);
  const [festival, addFestival] = useState(false);
  const [users, setUsers] = useState([{ firstName: '', lastName: '', email: '' }]);

  const handleAddUser = () => {
    setUsers([...users, { firstName: '', lastName: '', email: '' }]);
  };

  const handleCancelUser = () => {
    setUsers(users.slice(0, -1));
  };
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const togglePopup = (e) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };
  const FestPopup = (e) => {
    e.preventDefault();
    addFestival(!festival);
  };
  const plans = [
    { id: 1, name: 'Free package' },
    { id: 2, name: 'Standard Package' },
    { id: 3, name: 'Business Package' },
  ];

  const emailScheduled = (e) => {
    e.preventDefault();
    setEmailScheduled(!emailSchedule);
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    togglePopup();
  };

  const festivals = [
    { name: "Holi", date: "March 29" },
    { name: "Ram Navmi", date: "April 2" },
    { name: "Eid-ul-Fitar", date: "May 2" },
    { name: "Independence Day", date: "August 15" },
    { name: "Raksha Bandhan", date: "August 22" },
    { name: "Janmashtami", date: "August 30" },
    { name: "Diwali", date: "October 24" }
  ];

  // active or inactive
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // clients list
  const clients = [
    { name: 'Boby Swaroop', email: 'boby@gmail.com', isActive: true, id: 1 },
    { name: 'Usha Singh', email: 'usha22@gmail.com', isActive: false, id: 2 },
    { name: 'Aftab Alam', email: 'aftab@gmail.com', isActive: true, id: 3 },
    { name: 'Shobhit Kumar', email: 'sk@gmail.com', isActive: false, id: 4 },
    { name: 'Shivang Mishra', email: 'shivang@gmail.com', isActive: true, id: 5 },
    { name: 'Diwakar', email: 'dk@gmail.com', isActive: false, id: 6 },
    { name: 'Vyankatesh', email: 'vibhu@gmail.com', isActive: true, id: 7 },
  ];
  
  // festivals
  const occesion = [
    { name: 'Republic Day', date: '2024-01-15' },
    { name: 'Basant Panchmi', date: '2024-02-20' },
    { name: 'Holi', date: '2024-03-10' },
    { name: 'Ram Navami', date: '2024-04-15' },
    { name: 'Eid-ul-fiter', date: '2024-04-20' },
    { name: 'Budh Poornima', date: '2024-05-10' },
    // Add more festivals here
  ];

  const groupedFestivals = occesion.reduce((grouped, festival) => {
    const month = festival.date.split('-')[1];
    grouped[month] = grouped[month] || [];
    grouped[month].push(festival);
    return grouped;
  }, {});

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month, 10) - 1];
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 h-screen mt-4">
        {/* Right Content */}
        <div className="flex-1 bg-gray-200 p-4">
          <div className="py-12">
          <div className="flex flex-row mb-1 te-black sm:mb-0 justify-between w-full">
  {/* Box 1 */}
  <div className=" bg-white rounded-lg shadow-md px-2 mr-2">
    <h3 className="text-lg font-semibold">Clients</h3>
    <p className="text-gray-500 text-center"> 100</p>
  </div>
  {/* Box 2 */}
  <div className="bg-white rounded-lg shadow-md px-4 mr-2">
    <h3 className="text-lg font-semibold">Email Sents</h3>
    <p className="text-gray-500 text-center">3262</p>
  </div>
  {/* Box 3 */}
  <div className=" bg-white rounded-lg shadow-md px-2 mr-2">
    <h3 className="text-lg font-semibold">Email Open</h3>
    <p className="text-gray-500 text-center">67%</p>
  </div>
  {/* Box 4 */}
  <div className="items-center bg-white rounded-lg shadow-md px-4">
    <h3 className="text-lg font-semibold">Email Replied</h3>
    <p className="text-gray-500 text-center">52%</p>
  </div>
  {/* Add User Button */}
  <div>
    <button onClick={togglePopup} className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
      <i className="fa-brands fa-accusoft"></i> Add User
    </button>
  </div>
   {/* show pop-up */}
   {showPopup && (
     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
       <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={togglePopup}>
         <i className="fa-solid fa-xmark"></i>
       </button>
       <form onSubmit={handleSave}>
         {users.map((user, index) => (
           <div key={index} className="mb-4.5  gap-6 xl:flex-row">
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">First name</label>
               <input type="text" name="firstName" value={user.firstName} placeholder="Enter your first name" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Last name</label>
               <input type="text" name="lastName" value={user.lastName} placeholder="Enter your last name" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
               <input type="email" name="email" value={user.email} placeholder="Enter your email address" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
           </div>
         ))}
        <div className="w-full mt-2"><label className="mb-2.5 block text-black dark:text-white">Upload Client List</label><input type="file"></input></div>

         <div className="mt-4 flex justify-end gap-2">
           <button onClick={handleCancelUser} className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm text-white font-medium bg-blue-500">Cancel</button>
           <button onClick={handleAddUser} className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Add More User</button>
         </div>
         <div className="mt-4 flex justify-end">
           <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Active</button>
         </div>
       </form>
     </div>
   </div>
   
      )}
   {/* show pop-up */}
</div>

            
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
            <div class="inline-block min-w-full shadow rounded-lg p-8 overflow-hidden bg-gray-50">
              <div class="flex flex-row gap-56 mb-1 te-black sm:mb-0 justify-between w-full">
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
                    class="block outline-none p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
                </div>

                <div class="text-end">
                  <form class="flex w-full max-w-sm space-x-3">
                    <div>
                      All{" "}
                      <span className="px-2 bg-black text-white rounded-md">
                        34
                      </span>
                    </div>
                    <div>
                      Active{" "}
                      <span className="px-2 bg-green-200 text-green-700 rounded-md">
                        34
                      </span>
                    </div>
                    <div>
                      Inactive{" "}
                      <span className="px-2 bg-rose-200 text-white text-rose-700 rounded-md">
                        34
                      </span>
                    </div>
                    <div>
                      Trial{" "}
                      <span className="px-2 bg-purple-200 text-white text-purple-700 rounded-md">
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
                      <th scope="col" class="p-4">
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
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                         Email Replied
                      </th>
                      <th scope="col" class="px-6 py-3">
                       Email Sent
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email Open
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
      {clients.map((client) => (
        <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id={`checkbox-table-search-${client.id}`}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`checkbox-table-search-${client.id}`} className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {client.name}
          </th>
          <td className="px-6 py-4">{client.email}</td>
          <td className="px-6 py-4">5</td>
          <td className="px-6 py-4">20%</td>
          <td className="px-6 py-4">44%</td>
          <td className="px-6 py-4">
            <button onClick={toggleActive} className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 w-16 text-sm font-medium ${client.isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
              {client.isActive ? 'Active' : 'Inactive'}
            </button>
          </td>
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
        {/* Left Sidebar */}
        <div className="w-80 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">List of Festivals</h2>
          {Object.entries(groupedFestivals).map(([month, festivalsInMonth]) => (
        <div key={month} className="border-b mb-4 pb-4 bg-slate-200 p-2">
          <h2 className="text-xl mb-2 font-bold">{getMonthName(month)}</h2>
          <div className="space-y-2">
            {festivalsInMonth.map((festival, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>{festival.name}</p>
                <div className="flex items-center">
                  <p className="mr-2">{festival.date}</p>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

          <button onClick={FestPopup} className="mt-4 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2>Add Festivals">Add Festivals</button>
     
        </div>
        {/* show pop-up */}
        {festival && (
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
              onClick={() =>  addFestival(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <form>
            <div className="mb-4.5">
      <label className="block text-black dark:text-white mb-2">Date of Occasion</label>
      <input
        type="date"
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        required
      />
    </div>

              <div className="mb-4.5">
                <label className="block text-black dark:text-white mb-2 mt-2">Occasion Name</label>
                <input
                  type="text"
                  placeholder="Enter Occasion Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2"
                >
                  Add Occasion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default UserDashboard;