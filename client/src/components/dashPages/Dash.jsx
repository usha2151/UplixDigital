import React, { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";


const cardData = [
    {
      type: "Clients",
      percentage: "50.43%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "329",
    },
    {
      type: "Email Sents",
      percentage: "12.32%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "200",
    },
    {
      type: "Email Opened",
      percentage: "10.89%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "150",
    },
    {
      type: "Email Replied",
      percentage: "20.92%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/downarrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph3.svg",
      price: "100",
    },
  ];

const TableData = [
    {
      id: 12809,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Waiting Payment",
      Qty: "x1",
      price: "$4.012",
      color: "#DD6107",
      image: "https://www.tailwindtap.com/assets/admin/dashboard/user2.png",
      customer: "Omar Griffith",
    },
    {
      id: 12808,
      product: "iBox iPhone 14Pro...",
      order: "20/03/2023,01:10",
      status: "Transition Done",
      Qty: "x1",
      price: "$2.092",
      customer: "Omar Griffith",
      image: "https://www.tailwindtap.com/assets/admin/dashboard/user3.png",
      color: "#10B860",
    },
    {
      id: 12807,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Transition Done",
      Qty: "x1",
      price: "$1.089",
      customer: "Omar Griffith",
      image: "https://www.tailwindtap.com/assets/admin/dashboard/user3.png",
      color: "#10B860",
    },
    {
      id: 12806,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Delivery to Cust",
      Qty: "x3",
      price: "$833",
      customer: "Omar Griffith",
      image: "https://www.tailwindtap.com/assets/admin/dashboard/user3.png",
      color: "#4F80E1",
    },
    {
      id: 12805,
      product: "iBox iPhone 14Pro...",
      order: "20/03/2023,01:10",
      status: "Cancel",
      Qty: "x3",
      price: "$1.458",
      customer: "Omar Griffith",
      image: "https://www.tailwindtap.com/assets/admin/dashboard/user2.png",
      color: "#FB4949",
    },
  ];

  const people = [
    { name: "This weekly" },
    { name: "This monthly" },
    { name: "This yearly" },
  ];

  const DropDowns = ({ list }) => {
    const [selected, setSelected] = useState(list[0]);
    return (
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="py-2.5 px-2 border border-[#E7E7E7] flex justify-center items-center gap-1 rounded text-sm text-[#637381] font-normal">
            <span className="block truncate">{selected.name}</span>{" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="14" height="14" fill="white" />
              <path
                d="M11 5L7.5 8.5L4 5"
                stroke="#637381"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-w-[100px]">
              {list?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-4 ${
                      active ? "bg-[#F6F8FA] text-gray-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected
                          ? "font-medium text-[#212B36]"
                          : "font-normal text-[#637381]"
                      }`}
                    >
                      {person.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  };
const Dash = () => {

    const [openSideBar, setOpenSieBar] = useState(true);
   
  return (
    <>
     <div className="w-full py-3 pl-7 pr-5 grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-start">
            {cardData?.map((data, key) => (
              <div
                className="p-5 xl:col-span-3 bg-white flex flex-col  2xl:max-w-none w-full rounded-xl gap-2 border border-[#E7E7E7] hover:shadow-xl cursor-pointer"
                key={key}
              >
                <div
                  className={`flex justify-between ${
                    openSideBar ? " sm:flex-col md:flex-row" : " sm:flex-row"
                  }`}
                >
                  <span className="text-[#637381] text-sm font-medium">
                    {data?.type}
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="">{data?.percentage}</span>
                    <img src={data?.arrow} alt="graph" />
                  </div>
                </div>
                <div
                  className={`flex gap-4  justify-between ${
                    openSideBar
                      ? "flex-wrap sm:flex-col md:flex-row items-end md:flex-nowrap"
                      : "flex-nowrap items-center"
                  }`}
                >
                  <span className="text-2xl font-bold whitespace-nowrap">
                    {data?.price}
                  </span>
                  <img src={data?.graph} alt="graph" />
                </div>
              </div>
            ))}

            <div className="p-3 bg-white flex flex-col xl:col-span-12 xl:row-auto lg:row-start-4  rounded-xl border border-[#E7E7E7]">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <div className="lg:max-w-sm w-2/5 lg:w-full border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-1 px-4 justify-between items-center max-h-12 hidden md:flex">
                  <input
                    type="text"
                    className="outline-none w-9/12"
                    placeholder="Search..."
                  />
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16667 3.33335C5.94501 3.33335 3.33334 5.94503 3.33334 9.16669C3.33334 12.3883 5.94501 15 9.16667 15C12.3883 15 15 12.3883 15 9.16669C15 5.94503 12.3883 3.33335 9.16667 3.33335ZM1.66667 9.16669C1.66667 5.02455 5.02454 1.66669 9.16667 1.66669C13.3088 1.66669 16.6667 5.02455 16.6667 9.16669C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3088 1.66667 9.16669Z"
                      fill="#637381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2858C13.6112 12.9603 14.1388 12.9603 14.4643 13.2858L18.0893 16.9108C18.4147 17.2362 18.4147 17.7638 18.0893 18.0893C17.7638 18.4147 17.2362 18.4147 16.9108 18.0893L13.2857 14.4643C12.9603 14.1388 12.9603 13.6112 13.2857 13.2858Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <DropDowns list={people} />
              </div>
              <div className="w-full overflow-x-scroll md:overflow-auto  mt-1">
                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1">
                  <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                    <tr className="">
                      <th className="py-3 pl-3 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-l-lg">
                        Order ID
                      </th>
                      <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Product
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Order time
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Status
                      </th>
                      <th className="py-3 px-2.5 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Qty
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Total Price
                      </th>
                      <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-r-lg">
                        Customer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData.map((data) => (
                      <tr
                        key={data.id}
                        className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
                      >
                        <td className="py-4 pl-3 text-sm font-normal text-[#637381] rounded-l-lg">
                          {data.id}
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                          {data.product}
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                          {data.order}
                        </td>
                        <td
                          className="py-4 px-1 text-sm font-normal text-[#637381]"
                          style={{
                            color: data?.color,
                          }}
                        >
                          {data.status}
                        </td>
                        <td className="py-4 px-2.5 text-sm font-normal text-[#637381]">
                          {data.Qty}
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                          {data.price}
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381] rounded-r-[8px]">
                          <div className="relative flex gap-1 items-center">
                            <div className="w-[22px] h-[22px]">
                              <img
                                src={data?.image}
                                alt="hepta-brown"
                                className="min-w-[22px] min-h-[22px]"
                              />
                            </div>
                            {data.customer}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
           
          </div>
    
    </>
  )
}

export default Dash