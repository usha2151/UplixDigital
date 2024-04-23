import React, { useState } from "react";
import Navbar from "../../common/Navbar";

const User = () => {

  const plans = [
    { id: 1, name: 'Free package' },
    { id: 2, name: 'Standard Package' },
    { id: 3, name: 'Business Package' },
  ];


  const [showPopup, setShowPopup] = useState(false);
  const [checkPayment, setcheckPayment] = useState(false);


  // payment status popup

  const paymentPopup = () => {
    setcheckPayment(!checkPayment);
  }

  // Function to toggle popup visibility
  const togglePopup = (e) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };

  // Function to handle form submission
  const handleSave = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    togglePopup();
  };

  return (
    <>
      <Navbar />
      <div class="container mx-auto px-4 sm:px-8 max-w-5xl mt-12 ">
        <div class="py-8">
          <div class="flex flex-row mb-1 te-black sm:mb-0 justify-between w-full">
            <h2 class="text-xl leading-tight">All Users</h2>
            <div class="text-end">
              <form class="flex w-full max-w-sm space-x-3">
                <button
                  class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2"
                  type="submit"
                  onClick={togglePopup}
                >
                  <i class="fa-solid fa-user-plus"></i> Add User
                </button>
              </form>
            </div>
          </div>

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
                    onClick={togglePopup}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  <form onSubmit={handleSave}>
                    {showPopup && (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div
                          className="bg-white p-5 rounded-lg relative"
                          style={{
                            width: '50vw',
                            maxWidth: '560px',
                            height: 'auto',
                            padding: '20px',
                          }}
                        >
                          {/* Close Icon */}
                          <button
                            className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
                            onClick={togglePopup}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>

                          <form onSubmit={handleSave}>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                              <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                  First name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your first name"
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                              </div>

                              <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your last name"
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                              </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                              <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                  Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                  type="email"
                                  placeholder="Enter your email address"
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                              </div>

                              <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                  Choose<span className="text-meta-1">*</span>
                                </label>
                                <select
                                  name="selectedPlan"
                                  className="py-2 w-full px-2 rounded border-[1.5px] border-stroke"
                                  required
                                >
                                  <option value="">plan/Subscription</option>
                                  {plans.map((plan) => (
                                    <option key={plan.id} value={plan.name}>
                                      {plan.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm text-white font-medium bg-blue-500"
                              >
                                Active
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
          {/* <!-- Table --> */}
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
                         Clients
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
                      <th scope="col" class="px-6 py-3">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Boby Swaroop
                      </th>
                      <td class="px-6 py-4">boby@gmail.com</td>
                      <td class="px-6 py-4">80</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">Active</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-2"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-2" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Usha Singh
                      </th>
                      <td class="px-6 py-4">usha22@gmail.com</td>
                      <td class="px-6 py-4">90</td>
                      <td class="px-6 py-4">No</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">inactive</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Aftab Alam
                      </th>
                      <td class="px-6 py-4">aftab@gmail.com</td>
                      <td class="px-6 py-4">80</td>
                      <td class="px-6 py-4">No</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">trial</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Shobhit Kumar 
                      </th>
                      <td class="px-6 py-4">sk@gmail.com</td>
                      <td class="px-6 py-4">95</td>
                      <td class="px-6 py-4">No</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">Active</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Shivang Mishra
                      </th>
                      <td class="px-6 py-4">shivang@gmail.com</td>
                      <td class="px-6 py-4">75</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">trial</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Diwakar
                      </th>
                      <td class="px-6 py-4">dk@gmail.com</td>
                      <td class="px-6 py-4">80</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">No</td>
                      <td class="px-6 py-4">inactive</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Vyankatesh
                      </th>
                      <td class="px-6 py-4">vibhu@gmail.com</td>
                      <td class="px-6 py-4">80</td>
                      <td class="px-6 py-4">Yes</td>
                      <td class="px-6 py-4">No</td>
                      <td class="px-6 py-4">Active</td>
                      <td class="px-6 py-4"><button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={paymentPopup}>Check</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* payment status show popup  */}
              {checkPayment && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="bg-white p-5 rounded-lg relative"
      style={{
        width: '50vw',
        maxWidth: '560px',
        height: 'auto',
        padding: '20px',
      }}
    >
      {/* Close Icon */}
      <button
        className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600"
        onClick={paymentPopup}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <form onSubmit={handleSave}>
      <div className="grid grid-cols-2 gap-4">
  <div className="flex flex-col gap-6">
    <div className="mb-4">
      <label className="mb-2 block text-black dark:text-white">Payment Date</label>
      <input
        type="date"
        className="rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2 block text-black dark:text-white">Payment Mode</label>
      <input
        type="text"
        placeholder="Enter payment mode"
        className="rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary"
      />
    </div>
  </div>

  <div className="flex flex-col gap-6">
    <div className="mb-4">
      <label className="mb-2 block text-black dark:text-white">Plan</label>
      <select
        name="selectedPlan"
        className="py-2 rounded border-[1.5px] border-stroke"
        required
      >
        <option value="">Select a plan</option>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.name}>
            {plan.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label className="mb-2 block text-black dark:text-white">Amount</label>
      <input
        type="number"
        placeholder="Enter amount"
        className="rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary"
      />
    </div>
  </div>
</div>

<div className="mt-4 flex justify-end">
  <button
    type="submit"
    className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
  >
    Active
  </button>
</div>

      </form>
    </div>
  </div>
)}

              {/* payment status show popup  */}

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

export default User;
