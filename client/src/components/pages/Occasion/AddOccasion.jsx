import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddFestivals } from '../../../redux/actions/actions';
import { useDispatch } from 'react-redux';

const AddOccasion = ({user}) => {
    const dispatch = useDispatch();
    const [festivals, setFestivals] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const [festivalDate, setFestivalDate] = useState('');
    const [festivalName, setFestivalName] = useState('');
    const [festivalTitle, setFestivalTitle] = useState('');

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

  // Search festivals
  const handleSearchInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
  };

  // Function to get month name
  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month, 10) - 1];
  };

  // Group festivals by month
  const groupedFestivals = festivals.reduce((grouped, festival) => {
    const month = festival.festival_date.split('-')[1];
    grouped[month] = grouped[month] || [];
    grouped[month].push(festival);
    return grouped;
  }, {});

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleAddFestival = async (event) => {
    event.preventDefault();
  
    // Check for duplicate festival name
    const isDuplicateName = festivals.some(festival => festival.name === festivalName);
  
    if (isDuplicateName) {
      alert('Festival name already exists. Please add a new Festival.');
      return;
    }

    const festivalData = {
        date: festivalDate,
        name: festivalName,
        title: festivalTitle
      };
  
    dispatch(AddFestivals(festivalData, user));

    // Reset input fields after dispatching the action
    setFestivalName('');
    setFestivalDate('');
    setFestivalTitle('');
    setShowForm(false);
  };
  

  return (
    <div className="w-80 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 mt-12">List of Festivals</h2>
      <div className="relative">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search-users"
          className="block outline-none p-2 mb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for Festivals"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      {Object.entries(groupedFestivals).map(([month, festivalsInMonth]) => (
  <div key={month} className="border-b mb-4 pb-4 bg-slate-200 p-2">
    <h2 className="text-xl mb-2 font-bold">{getMonthName(month)}</h2>
    <div className="space-y-2">
      {festivalsInMonth
        .filter(festival => festival.festival_name.toLowerCase().includes(searchInput))
        .map((festival, index) => (
          <div key={index} className="flex items-center justify-between">
            <p>{festival.festival_name}</p>
            <div className="flex items-center">
              <p className="mr-2">{festival.festival_date}</p>
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



      {/* Show form button */}
      <button onClick={toggleForm} className="mt-4 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2" style={{ zIndex: 999 }}> {/* Ensure the button is on top */}
        Request New Festival
      </button>

      {/* Show form */}
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '350px', height: 'auto', padding: '20px' }}>
            {/* Close Icon */}
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={toggleForm}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Form */}
            <form onSubmit={handleAddFestival}>
            <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2">Date of Festival</label>
          <input
            type="date"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalDate}
            onChange={(e) => setFestivalDate(e.target.value)}
          />
        </div>

        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Festival Name</label>
          <input
            type="text"
            placeholder="Enter Festival Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
          />
        </div>
        
        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Festival Title</label>
          <input
            type="text"
            placeholder="Enter Festival Title"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalTitle}
            onChange={(e) => setFestivalTitle(e.target.value)}
          />
        </div>

              <div className="mt-4 flex justify-end">
                <button type="submit" className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
                  Add Festival
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOccasion;
