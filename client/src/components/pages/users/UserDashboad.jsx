import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddFestivals } from "../../../redux/actions/actions";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [addEmail, setaddEmail] = useState(false);
  const [emailSchedule, setEmailScheduled] = useState(false);
  const [festivalName, setFestivalName] = useState('');
  const [festivalDate, setFestivalDate] = useState('');
  const [festivalTitle, setFestivalTitle] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredFestivals, setFilteredFestivals] = useState(null);
  const [festival, addFestival] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientData, setClientData] = useState("");
  const [users, setUsers] = useState([{ firstName: '', lastName: '', email: '' }]);
  const [file, setFile] = useState(null);
  const [SmtpUserName, setsmtpUserName] = useState("");
  const [SmtpPassword, setSmtpPassword] = useState("");

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

  // excel file clients list
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const togglePopup = (e) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };

      const userLogginId = useSelector((state) => state.userData);



  // addSmtp Details
  const addSmtpEmail =  () => {
    setaddEmail(!addEmail);

  };

  // if user add smtp details
  const handleSubmitSmtp = async (e) => {
    e.preventDefault();
    if(!SmtpPassword || !SmtpUserName){
      alert('Add Smtp details first!');
    }
    else{
        try {
      // Send data to Node.js server using Axios
       await axios.post('http://localhost:8080/SMTP/smtp-add', {
        userId: userLogginId.userData.id ? userLogginId.userData.id :  3,
        SmtpUserName,
        SmtpPassword,
      }).then(() => {
        alert('Smtp Details Added successfully');
        setaddEmail(!addEmail);
      console.log('SMTP email added successfully');
      }).catch((err )=>{
        alert(err);
      })
    } catch (error) {
      // Handle error
      console.error('Error adding SMTP email:', error);
    }
  }
  }
  
  
  const toggleSignPopup = () => {
    setShowSign(!showSign);
  }
  const FestPopup = (e) => {
    e.preventDefault();
    addFestival(!festival);
  };

  const handleViewClient = (data) => {
    setIsModalOpen(!isModalOpen);
    setClientData(data)
  }
  const plans = [
    { id: 1, name: 'Free package' },
    { id: 2, name: 'Standard Package' },
    { id: 3, name: 'Business Package' },
  ];

  const emailScheduled = (e) => {
    e.preventDefault();
    setEmailScheduled(!emailSchedule);
  }
  
  const user2 = useSelector((state) => state.userData);

const handleSave = async (event) => {
  event.preventDefault();

  // Assuming users and file are available in your component's state
  console.log(users); // Log user data

  try {
    const formData = new FormData();
    if (users.length > 0) {
      // Append user data to formData only if users array is not empty
      formData.append('userData', JSON.stringify(users));
      formData.append('userId',userLogginId.userData.id)

    }
    if (file) {
      // Append file to formData if it exists
      formData.append('clients', file);
      formData.append('userId',userLogginId.userData.id)
    }

    await axios.post('http://localhost:8080/userClients/user-clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Data saved successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
    alert('Error uploading data:', error);
  }
};

  


  // active or inactive
  const [isActive, setIsActive] = useState(false);

  const toggleActive = (id) => {
    setClients(prevClients => prevClients.map(client => {
      if (client.id === id) {
        return { ...client, isActive: !client.isActive };
      }
      return client;
    }));
  };

  // clients list
  const [clients, setClients] = useState([
    { name: 'Boby Swaroop', email: 'boby@gmail.com', isActive: true, id: 1 },
    { name: 'Usha Singh', email: 'usha22@gmail.com', isActive: false, id: 2 },
    { name: 'Aftab Alam', email: 'aftab@gmail.com', isActive: true, id: 3 },
    { name: 'Shobhit Kumar', email: 'sk@gmail.com', isActive: false, id: 4 },
    { name: 'Shivang Mishra', email: 'shivang@gmail.com', isActive: true, id: 5 },
    { name: 'Diwakar', email: 'dk@gmail.com', isActive: false, id: 6 },
    { name: 'Vyankatesh', email: 'vibhu@gmail.com', isActive: true, id: 7 },
  ]);

  //when user has login to show the clients list
const fetchClientsData = async () => {
  try {
    // Make HTTP request to fetch data from backend
    const response = await axios.get('http://localhost:8080/userClients/clientsData');
    setClients(response.data.clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    // Handle error
  }
};
  
  // festivals
  const [occesion, setOccesion] = useState([
    { name: 'Republic Day', date: '2024-01-15' },
    { name: 'Basant Panchmi', date: '2024-02-20' },
    { name: 'Holi', date: '2024-03-10' },
    { name: 'Ram Navami', date: '2024-04-15' },
    { name: 'Eid-ul-fiter', date: '2024-04-20' },
    { name: 'Budh Poornima', date: '2024-05-10' },
    // Add more festivals here
  ]);

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month, 10) - 1];
  };
  const groupedFestivals = occesion.reduce((grouped, festival) => {
    const month = festival.date.split('-')[1];
    grouped[month] = grouped[month] || [];
    const formattedDate = new Date(festival.date);
    festival.formattedDate = `${formattedDate.getDate()} ${getMonthName(month)}, ${formattedDate.getFullYear()}`;
    grouped[month].push(festival);
    return grouped;
  }, {});

  // add festival
  const handleAddFestival = async (event) => {
    event.preventDefault();
  
    // Check for duplicate festival name
    const isDuplicateName = occesion.some(festival => festival.name === festivalName);
  
    if (isDuplicateName) {
      alert('Festival name already exists. Please add a new Festival.');
      return;
    }
  
    // Store the festival into the database
    const festivalData = {
      date: festivalDate,
      name: festivalName,
      title: festivalTitle
    };
  
    try {
      const response = await axios.post('http://localhost:8080/festivals/add-festivals', festivalData);
  
      // Check if response status is successful
      if (response.status === 200) {
        alert('Festival added successfully');
        
        // Add the new festival to the array
        // setOccesion([...occesion, { name: festivalName, date: festivalDate }]);
        
        // Reset input fields after adding the festival
        setFestivalName('');
        setFestivalDate('');
        setFestivalTitle('');
      } else {
        alert('Failed to add festival');
      }
  
      return response.data; // Return server response data
    } catch (error) {
      console.error('Error adding festival:', error);
      alert('Failed to add festival');
      throw error; // Throw error to handle it where this function is called
    }
  };
  

 // search festivals
 const handleSearchInputChange = (event) => {
  const input = event.target.value.toLowerCase();
  setSearchInput(input);
  filterFestivals(input);
};
// Function to filter festivals based on search input
const filterFestivals = (input) => {
  const filtered = {};

  Object.entries(groupedFestivals).forEach(([month, festivals]) => {
    const filteredFestivalsInMonth = festivals.filter(festival =>
      festival.name.toLowerCase().includes(input) || festival.formattedDate.toLowerCase().includes(input)
    );
    if (filteredFestivalsInMonth.length > 0) {
      filtered[month] = filteredFestivalsInMonth;
    }
  });

  setFilteredFestivals(filtered);
};


useEffect(() => {
  fetchClientsData();
},[]);




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
    <h3 className="text-lg font-semibold">Email Opened</h3>
    <p className="text-gray-500 text-center">67%</p>
  </div>
  {/* Box 4 */}
  <div className="items-center bg-white rounded-lg shadow-md px-4">
    <h3 className="text-lg font-semibold">Email Replied</h3>
    <p className="text-gray-500 text-center">52%</p>
  </div>
  {/* Add User Button */}
  <div>
    <button onClick={toggleSignPopup} className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
      <i className="fa-brands fa-accusoft"></i> View Signature
    </button>
  </div>
  <div>
    <button onClick={togglePopup} className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
      <i className="fa-brands fa-accusoft"></i> Add Users
    </button>
  </div>
  <div>
    <button onClick={addSmtpEmail} className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
      <i className="fa-brands fa-accusoft"></i> Add Email
    </button>
  </div>
   {/* show pop-up */}
   {showPopup && (
     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '650px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
       <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={togglePopup}>
         <i className="fa-solid fa-xmark"></i>
       </button>
       <form onSubmit={handleSave}>
         {users.map((user, index) => (
           <div key={index} className="mb-4.5">
            <div className="mb-4.5  gap-4 xl:flex mb-2">
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">First name</label>
               <input type="text" name="firstName" value={user.firstName} placeholder="Enter your first name" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Last name</label>
               <input type="text" name="lastName" value={user.lastName} placeholder="Enter your last name" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
            
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
               <input type="email" name="email" value={user.email} placeholder="Enter your email address" onChange={(e) => handleInputChange(index, e)} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
           <button onClick={handleCancelUser} className="inline-flex justify-center items-center mt-8 rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm text-white font-medium bg-blue-500 h-8">Cancel</button>
           </div>
           </div>
         ))}
         <div className="mt-4 flex justify-end gap-2">
           <button onClick={handleAddUser} className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500"><i class="fa-solid fa-user-plus mr-1 mt-1"></i>Add Users</button>
         </div>

         <p className="text-center">OR</p>
        <div className="w-full mt-2"><label className="mb-2.5 block text-black dark:text-white">Upload Client List</label> <input type="file" onChange={handleFileChange} accept=".xlsx, .xls"  /></div>

         
         <div className="mt-4 flex justify-end">
           <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Add</button>
         </div>
       </form>
     </div>
   </div>
   
      )}
   {/* show pop-up */}
   {/* // show sign */}

   {showSign && (
     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
       <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={toggleSignPopup}>
         <i className="fa-solid fa-xmark"></i>
       </button>
       <div>
         <p>Boby Swaroop</p>
         <p>Web Developer</p>
         {/* Add social media icons here */}
         <p>Mobile: (800) 555-0299 | Phone: (800) 555-0199</p>
         <p>Email: john.doe@my-company.com</p>
         <p>My Company, Street, City, Zip Code, Country</p>
         <p><a href="www.my-company.com">www.my-company.com</a></p>
       </div>
       <form onSubmit={handleSave}>
         <div className="mt-4 flex justify-end">
           <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Update</button>
         </div>
       </form>
     </div>
   </div>
   )}
   {/* show sign */}
   {/* show addSmtp details */}
   {addEmail && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
      <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={addSmtpEmail}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <form onSubmit={handleSubmitSmtp} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hostname" className="block text-sm font-medium text-gray-700">Hostname:</label>
          <input type="text" id="hostname" name="hostname" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="port" className="block text-sm font-medium text-gray-700">Port:</label>
          <input type="text" id="port" name="port" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input type="text" onChange={(e) => setsmtpUserName(e.target.value)} id="username" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input type="password"  onChange={(e) => 
            setSmtpPassword(e.target.value)} id="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="encryption" className="block text-sm font-medium text-gray-700">Encryption:</label>
          <select id="encryption" name="encryption" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
        <div className="flex justify-end col-span-2">
          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Save</button>
        </div>
      </form>
    </div>
  </div>
)}

   {/* show addsmtp details */}

   {/* show view clients data */}
   {isModalOpen && (
     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
       <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={handleViewClient}>
         <i className="fa-solid fa-xmark"></i>
       </button>
       <div>
       Name <input type="text" value={clientData.name} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></input>
       Email <input type="text" value={clientData.email} className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></input>

       </div>
       <form >
         <div className="mt-4 flex justify-end">
           <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500">Update</button>
         </div>
       </form>
     </div>
   </div>
 )}
   {/* show view clients data */}
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
                       Email Sent
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email Opened
                      </th>
                      <th scope="col" class="px-6 py-3">
                         Email Replied
                      </th>    
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
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
          <td className="px-6 py-4">44%</td>
          <td className="px-6 py-4">20%</td>  
          <td className="px-6 py-4">5</td>
          <td className="px-6 py-4">
          <button
            onClick={() => toggleActive(client.id)}
            className={`relative inline-flex items-center rounded-full border border-gray-300 w-10 h-6 transition-colors focus:outline-none ${client.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute left-0 inline-block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ease-in-out ${
                client.isActive ? 'translate-x-full' : 'translate-x-0'
              }`}
            ></span>
            <span
              className={`absolute inset-y-0 left-0 flex items-center justify-center w-8 h-8 rounded-full transition-transform ease-in-out transform ${
                client.isActive ? 'translate-x-8' : 'translate-x-0'
              }`}
            ></span>
          </button>
</td>
<td className="px-6 py-4"><div className="flex gap-3"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-user-pen" onClick={() => {handleViewClient(client)}}></i></div></td>


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
          <h2 className="text-lg font-semibold mb-4 mt-12">List of Festivals</h2>
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
                    class="block outline-none p-2 mb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for Festivals"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </div>
                {(filteredFestivals && Object.keys(filteredFestivals).length > 0)
      ? Object.entries(filteredFestivals).map(([month, festivalsInMonth]) => (
          <div key={month} className="border-b mb-4 pb-4 bg-slate-200 p-2">
            <h2 className="text-xl mb-2 font-bold">{getMonthName(month)}</h2>
            <div className="space-y-2">
              {festivalsInMonth.map((festival, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{festival.name}</p>
                  <div className="flex items-center">
                    <p className="mr-2">{festival.formattedDate}</p>
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      : Object.entries(groupedFestivals).map(([month, festivalsInMonth]) => (
          <div key={month} className="border-b mb-4 pb-4 bg-slate-200 p-2">
            <h2 className="text-xl mb-2 font-bold">{getMonthName(month)}</h2>
            <div className="space-y-2">
              {festivalsInMonth.map((festival, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{festival.name}</p>
                  <div className="flex items-center">
                    <p className="mr-2">{festival.formattedDate}</p>
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
          <button onClick={FestPopup} className="mt-4 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2>Add Festivals">Request New Festival</button>
     
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

            <form onSubmit={handleAddFestival}>
        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2">Date of Festival</label>
          <input
            type="date"
            value={festivalDate}
            onChange={(e) => setFestivalDate(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Name of Festival</label>
          <input
            type="text"
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
            placeholder="Enter Festival Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>
        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Title of Festival</label>
          <input
            type="text"
            value={festivalTitle}
            onChange={(e) => setFestivalTitle(e.target.value)}
            placeholder="Enter Festival Title"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
      </div>
    </>
  );
};

export default UserDashboard;
