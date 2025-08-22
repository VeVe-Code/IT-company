import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from '../helpers/axios';
import { Link, useLocation } from 'react-router-dom';




function Services() {
 // re
    let [allservices, setAllServices] = useState([])
    let [links, setLinks] = useState(null)
    let [loading, setLoading]= useState(false)
     let location= useLocation()
 let searchQuery =new URLSearchParams(location.search)
 let page = searchQuery.get('page')
 page = parseInt(page) ? parseInt(page) :1
    useEffect(()=>{
        let FetchServices = async () => {
           setLoading(true)
            let res = await axios("/api/allservices?page="+page);
           if(res.status === 200){
            setAllServices(res.data.data)
               setLinks(res.data.links)
           }
           setLoading(false)
        }
        FetchServices();
    },[page])
  return (
  <div className='mt-10'>
     <div>
  <section className="px-8 py-10 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-semibold text-center mb-12">Services</h2>

    {loading ? (
        // ✅ Spinner Section
        <div
          role="status"
          className="flex justify-center items-center h-40"
        >
                 <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>

        </div>
      ) : !!allservices.length  ?(
     <div key={page} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {allservices.map((s, i) => (
    <motion.div
      key={s._id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.2 }}
      className="p-6 bg-white shadow rounded-lg text-center"
    >
      <h3 className="text-xl font-semibold">{s.title}</h3>
      <p className="text-gray-500 mt-2">{s.about}</p>
    </motion.div>
  ))}
</div>
    ): <h1 className='text-center text-gray-500'>no data</h1>}
  </section>
</div>
<div>
  {!!links && (
    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile pagination (hidden on sm+) */}
      <div className="flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:items-center sm:justify-center">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {/* Previous */}
          <Link
            to={`${
              links.previousPage
                ? "/services/?page=" + (page - 1)
                : "/services/?page=" + page
            }`}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* Numbered links */}
          {links.loopLink.map((link) =>
            link.number == page ? (
              <Link
                key={link.number}
                to={`/services/?page=${link.number}`}
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-orange-400 px-4 py-2 text-sm font-semibold text-white"
              >
                {link.number}
              </Link>
            ) : (
              <Link
                key={link.number}
                to={`/services/?page=${link.number}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {link.number}
              </Link>
            )
          )}

          {/* Next */}
          <Link
            to={`${
              links.nextPage
                ? "/services/?page=" + (page + 1)
                : "/services/?page=" + page
            }`}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  )}
</div>


  </div>
  )
}

export default Services
