import axios from '../../helpers/axios'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ServiceCard from '../../components/admin/servicesCard'
import Pagination from '../../components/admin/pagination'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";




function adminservices() {
   
    let[links,setLinks]=useState(null)
 let [services, setServices] = useState([])
 let location = useLocation();
 let searchQuery = new URLSearchParams(location.search)
 let page = searchQuery.get('page')
  page = parseInt(page)? parseInt(page) : 1
 let navigate=useNavigate()
console.log(page)

    useEffect(() => {
        let fetchServices = async () => {
         let response =    await axios.get("/api/services?page="+page);
         if(response.status===200){
                    let data = response.data
                    setLinks(data.links)
                    setServices(data.data)
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
         }
        }
        fetchServices()
    }, [page])

    let onDeleted=(_id)=>{
        if(services.length ===1 && page > 1){
            navigate('/admin/service/?page='+(page-1))
        }else{ setServices(prev => prev.filter(s=>s._id !==_id))}
           
    }
    return (
     <div className="p-4 md:mt-1.5 mt-14 ">
                <div className='flex justify-between items-center mb-4'>
                            <div className='text-2xl font-bold'>Admin Services</div>
                            <div>
                                <Link to="/admin/service/create" className='bg-blue-500 p-2 rounded text-white'> Create </Link>
                            </div>
                          </div>
            <div>

                {!!services.length  ? (services.map(service => (
                    <ServiceCard service={service} key={service._id} onDeleted={onDeleted}/>
                )) ) : <h1>no data</h1>}

            </div>
{!!links && <Pagination links={links} page={page || 1}/>}




        </div>
    )
}

export default adminservices
