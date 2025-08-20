import axios from '../../helpers/axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../../components/admin/newsCard'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/admin/newsPagination'
function AdminNews() {
    let [news, setNews] = useState([])
    let [links, setLinks] = useState(null)
    let naviagte = useNavigate()
    
 let location= useLocation()
 let searchQuery =new URLSearchParams(location.search)
 let page = searchQuery.get('page')
 page = parseInt(page) ? parseInt(page) :1
    useEffect(() => {
        let fetchNews = async () => {
            let res = await axios.get('/api/news?page=' + page)
            if (res.status === 200) {
                let data = res.data
                setNews(data.data)
                setLinks(data.links)

                window.scroll({ top: 0, left: 0, behavior: "smooth" })
            }
        }
        fetchNews()
    }, [page])

let onDelete = (_id) => {
    if(news.length === 1 && page > 1 ){

        naviagte('/admin/news/?page=' + (page - 1))
    }else{
        setNews(prev => prev.filter(n => n._id !== _id))
    }
    
}

    return (
        <div className="p-4 md:mt-1.5 mt-14 ">
          <div className='flex justify-between items-center mb-4'>
            <div className='text-2xl font-bold'>Admin News</div>
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
