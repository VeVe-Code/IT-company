import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from '../helpers/axios';
import { Link, useLocation } from 'react-router-dom';




function Services() {
 // re
    let [allservices, setAllServices] = useState([])
    let [links, setLinks] = useState(null)
     let location= useLocation()
 let searchQuery =new URLSearchParams(location.search)
 let page = searchQuery.get('page')
 page = parseInt(page) ? parseInt(page) :1
    useEffect(()=>{
        let FetchServices = async () => {
            let res = await axios("/api/allservices?page="+page);
           if(res.status === 200){
            setAllServices(res.data.data)
               setLinks(res.data.links)
           }
        }
        FetchServices();
    },[page])
  return (
  <div className='mt-10'>
     <div>
  <section className="px-8 py-10 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-semibold text-center mb-12">Services</h2>

    {allservices.length > 0 ?(
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
    ): <h1>no data</h1>}
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
