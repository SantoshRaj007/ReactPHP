import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Product () {

    const [productData, setProductData] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(()=>{
        // const getProduct = () => {
        //     fetch("http://localhost/react/reactphp/api/product.php/")
        //     .then(res=>{
        //         return res.json()
        //     })
        //     .then(data=>{ setProductData(data)})
        //     .then(error=>{ console.log(error)});
        // }
        getProduct();
    },[]);

    async function getProduct() {
        const reqData = await fetch("http://localhost/react/reactphp/api/product.php");
        const resData = await reqData.json();
        console.log(resData);
        setProductData(resData);
    }


    const handleDelete = async(id) => {
        const res = await axios.delete("http://localhost/react/reactphp/api/product.php/"+id);
        setMessage(res.data.success);
        getProduct();
    }

    return (
        <>
            <div className="container mt-2">

                <div className="row">
                    <div className='col-md-12'>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-2xl font-semibold">Manage Product ({productData.length})</h2>
                            <p className='text-danger'>{message}</p>
                            <Link to={'/add-product'} className="bg-[#ed174a] text-[#fff] hover:bg-[#1976d2] px-3 py-2 flex gap-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add Product
                            </Link>
                        </div>

                        <table className="w-full table table-bordered shadow-lg">
                            <thead>
                                <tr>
                                    <th className="border p-3">Id</th>
                                    <th className="border p-3">Product Title</th>
                                    <th className="border p-3">Product Price</th>
                                    <th className="border p-3">Image</th>
                                    <th className="border p-3">Status</th>
                                    <th className="border p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productData.map((pro_data, index) =>(
                                        <tr key={index}>
                                            <td className="border p-2">{index+1}</td>
                                            <td className="border p-2">{pro_data.p_title}</td>
                                            <td className="border p-2">{pro_data.p_price}</td>
                                            <td className="border p-2"><img src={`http://localhost/react/reactphp/api/images/${pro_data.p_image}`} height={50} width={50} /></td>
                                            <td className="border p-2 capitalize">{ pro_data.status == 1 ? "Active" : "In-active"}</td>
                                            <td className="border p-2 capitalize flex justify-between items-center gap-2">
                                                <Link to={'/edit-product/'+pro_data.id} className='bg-green-400 px-3 py-2 text-[#f9f9f9] rounded-md hover:bg-[#ed174a] '>Edit</Link>
                                                <button className='bg-[#ed174a] px-3 py-2 text-[#f9f9f9] rounded-md hover:bg-[#e9b629]' onClick={()=>handleDelete(pro_data.id)} >Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
