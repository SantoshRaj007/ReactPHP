import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate();
    const [proTitle, setProTitle] = useState('');
    const [proPrice, setProPrice] = useState('');
    const [proImage, setProImage] = useState('');
    const [message, setMessage] = useState('');

    const uploadProduct =  async()=> {
        const formData = new FormData();
        formData.append('pro_title',proTitle);
        formData.append('pro_price',proPrice);
        formData.append('pro_image',proImage);
        const response = await axios.post("http://localhost/react/reactphp/api/product.php/",formData,{
            headers:{'Content-Type':"multipart/form-data"},
        });

        if(response.data.success){
            setMessage(response.data.success);
            setTimeout(()=>{
                navigate('/all-product');
            },2000);
        }
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        await uploadProduct();
    }

    return (
        <>
            <div className="flex flex-1 justify-center items-center h-[80vh]">
                <div className="w-4/12">
                    <div className="border bg-slate-200 p-4">
                        <div className="flex">
                            <h2 className="text-3xl my-3 font-semibold text-slate-600 uppercase text-center">Add Product</h2>
                            <p className='text-green-600'>{message}</p>
                        </div>
                        <form onSubmit={ handleSubmit}>
                            <div className="mb-3">
                                <label>Product Title</label>
                                <input type="text" 
                                    name="product_title"  
                                    className="border px-3 py-2 rounded w-full" placeholder="e.g Product Title" 
                                    onChange={(e) =>setProTitle(e.target.value)}   
                                />
                            </div>
                            <div className="mb-3">
                                <label>Product Price</label>
                                <input type="number" 
                                    name="price"  
                                    className="border px-3 py-2 rounded w-full" placeholder="e.g Price: 500/-"  
                                    onChange={(e)=>setProPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="text-slate-700 text-sm">Product Image</label>
                                <input type='file' 
                                    name='image' 
                                    className='border px-3 py-2 rounded w-full' placeholder='Product Image' 
                                    onChange={(e)=>setProImage(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-3">
                                <button name="submit" className="text-white text-xl font-semibold bg-teal-600 w-full px-3 py-3 rounded-md">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
