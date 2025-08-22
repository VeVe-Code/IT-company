import axios from '../../helpers/axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../../components/admin/newsCard'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/admin/newsPagination'
import { motion } from "framer-motion";
import { Search } from "lucide-react";
function AdminNews() {
    let [news, setNews] = useState([])
    let [links, setLinks] = useState(null)
    let naviagte = useNavigate()
      let [search, setSearch] = useState("");
      const [focused, setFocused] = useState(false);
    
 let location= useLocation()
 let searchQuery =new URLSearchParams(location.search)
 let page = searchQuery.get('page')
 page = parseInt(page) ? parseInt(page) :1
useEffect(() => {
  let fetchNews = async () => {
    let res = await axios.get('/api/news?page=' + page);
    if (res.status === 200) {
      let data = res.data;
      setNews(data.data);
      setLinks(data.links);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  let searchNews = async () => {
    let res = await axios.get('/api/news?title=' + search);
    if (res.status === 200) {
      let data = res.data;
      setNews(data.data);
      setLinks(null);
    }
  };

  if (search) {
    searchNews();
  } else {
    fetchNews();
  }
}, [page, search]);

let onDelete = (_id) => {
    if(news.length === 1 && page > 1 ){

        naviagte('/admin/news/?page=' + (page - 1))
    }else{
        setNews(prev => prev.filter(n => n._id !== _id))
    }
    
}

    return (
        <div className="p-4 md:mt-1.5 mt-14 ">
             <div className="mx-auto text-center">
  <h1 className="text-xl font-bold md:hidden text-gray-800 mb-6">
    Admin News
  </h1>
</div>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-2xl mr-28 font-bold hidden md:block text-gray-800 mb-6 whitespace-nowrap'>Admin News</div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex items-center justify-end w-full p-4"
>
  <motion.div
    animate={{ 
      width: focused 
        ? "90%"   // mobile expands full
        : "70%"   // mobile default
    }}
    transition={{ duration: 0.4, type: "spring" }}
    className="flex items-center rounded-2xl px-3 py-2 bg-white/10 shadow-2xl border hover:border-2 
               sm:w-[16rem] sm:animate-none sm:transition-none 
               md:w-[20rem] lg:w-[24rem]"
  >
    <Search className="text-gray-500 mr-2" size={20} />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Search data..."
      className="w-full bg-transparent outline-none text-sm sm:text-base"
    />
  </motion.div>
</motion.div> 
            <div>
                <Link to="/admin/news/create" className='bg-blue-500 p-2 rounded text-white'> Create </Link>
            </div>
          </div>
        
              
            {!!news.length ? (
                news.map(n => (
                <NewsCard n={n} key={n._id} onDelete={onDelete}/>
                ))
            ): <h1>no data</h1>}
           {!!links&& <Pagination links={links} page={page|| 1}/> }
        </div>
    )
}

export default AdminNews
