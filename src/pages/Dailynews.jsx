import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from '../helpers/axios';
import { Link, useLocation } from 'react-router-dom';

function DailyNews() {
  const [news, setNews] = useState([]);
  const [links, setLinks] = useState(null);
  const location = useLocation();

  let searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get('page')) || 1;

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get("/api/allnews?page=" + page);
      if (res.status === 200) {
        const data = res.data;
        setNews(data.data);
        setLinks(data.links);
      }
    };
    fetchNews();
  }, [page]);

  return (
    <div className="px-8 py-10 bg-gray-50 min-h-screen mt-10">
       <h2 className="text-2xl font-semibold text-center mb-10">News</h2>
      {news.length > 0 ? news.map(n => (
        <motion.div
          key={n._id}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mt-6 w-full max-w-5xl mx-auto mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
            {/* Image */}
            <img
              src={import.meta.env.VITE_BACKEND_ASSET_URL + n.photo}
              alt="News"
              className="w-full sm:w-52 h-40 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />

            {/* Content */}
            <div className="flex-1 space-y-3">
              <h3 className="text-black md:hover:text-orange-500 text-xl sm:text-2xl font-bold break-words">
                {n.title}
              </h3>
              <p className="text-gray-800 text-md">{n.description}</p>
              <Link
                to={`/Newsdetail/${n._id}`}
                className="text-blue-500 hover:underline font-medium"
              >
                News Details
              </Link>
              <p className="text-sm text-gray-400 italic mt-3">
                {new Date(n.createdAt).toLocaleDateString()} -{" "}
                {new Date(n.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )):<h1>no data</h1>}

      {/* Pagination */}
      {!!links && (
        <div className="mt-6">
          <div className="flex justify-center">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* Previous */}
              <Link
                to={`/Dailynews/?page=${links.previousPage ? page - 1 : page}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.83 10l3.94 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* Numbered Links */}
              {links.loopLink.map((link) => (
                <Link
                  key={link.number}
                  to={`/Dailynews/?page=${link.number}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                    link.number === page
                      ? 'bg-orange-400 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.number}
                </Link>
              ))}

              {/* Next */}
              <Link
                to={`/Dailynews/?page=${links.nextPage ? page + 1 : page}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyNews;