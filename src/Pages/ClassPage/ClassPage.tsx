import React, { useEffect, useState } from "react";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

interface ClassData {
  id: number,
  name: string,
}

function ClassPage({}: Props) {
    const navigate = useNavigate()
    const [classData, setClassData] = useState<ClassData[]>([])

    useEffect(() => {
      getClass()
    }, [])

    const getClass = () => {
      axios.get("https://virtserver.swaggerhub.com/BE-18/ALTA_Project/1.0.0/classes")
      .then((response) => {
        setClassData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow flex flex-col">
          <Navbar />
          {/* Konten Utama Dashboard */}
          <div className="flex-grow bg-white p-4 m-3 rounded-md">
            <div className="flex justify-end mb-5 mt-2">
              <input
                type="text"
                className="w-1/3 p-2 border rounded-md shadow-md border-transparent text-center"
                placeholder="Cari disini"
              />
              <button
                className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none"
              >
                Search
              </button>
              <button
                className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                onClick={() => navigate('/NewClass')}
              >
                Add New
              </button>
            </div>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-300 border">
                  <th className="p-2 border text-left">No.</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {classData?.map((item, index) => (
                  <tr>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item?.name}</td>
                  <td className="p-2 border flex justify-center">
                  <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none mx-1"
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-lg hover:bg-gray-500 focus:outline-none"
              >
                Prev
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-lg hover:bg-gray-500 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassPage;
