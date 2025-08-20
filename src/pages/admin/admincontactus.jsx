import React, { useEffect, useState } from "react";
import axios from "../../helpers/axios";
import Data from "../../components/admin/Cdata";

function AdminContactus() {
  
  let [data, setData] = useState([]);

  useEffect(() => {
    let Fetchdata = async () => {
      try {
        let res = await axios.get("/api/contactus");
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching contact messages:", err);
      }
    };
    Fetchdata();
  }, []);


let Ondeleteed = (_id)=> {
 setData(prev => prev.filter( p => p._id !== _id))
} 



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📩 Customer Contact Messages
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Message</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((d) => <Data d={d} key={d._id} OnDelete={Ondeleteed} />)
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminContactus;
