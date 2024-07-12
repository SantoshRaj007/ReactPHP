import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {

    const navigate = useNavigate();

    const {id} = useParams();

    const [formvalue, setFormvalue] = useState({product_title:'', price:'', image:'', status:''});
    const [message, setMessage] = useState();

    const handleInput = (e) => {
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        const productRowData = async() => {
            const getProductData = await fetch("http://localhost/react/reactphp/api/product.php/"+id);
            const productData = await getProductData.json();

            setFormvalue(productData);
        }
        productRowData();
    },[]);

    // const [proTitle, setProTitle] = useState('');
    // const [proPrice, setProPrice] = useState('');
    // const [proImage, setProImage] = useState('');
    // const [message, setMessage] = useState('');

    // const uploadProduct =  async()=> {
    //     const formData = new FormData();
    //     formData.append('pro_title',proTitle);
    //     formData.append('pro_price',proPrice);
    //     formData.append('pro_image',proImage);
    //     const response = await axios.post("http://localhost/react/reactphp/api/product.php/",formData,{
    //         headers:{'Content-Type':"multipart/form-data"},
    //     });

    //     if(response.data.success){
    //         setMessage(response.data.success);
    //         setTimeout(()=>{
    //             navigate('/all-product');
    //         },2000);
    //     }
    // }

    const handleSubmit = async(e)=> {
        e.preventDefault();

        const formData = {id:id, product_title:formvalue.p_title, price:formvalue.p_price, image:formvalue.p_image, status:formvalue.status};

        const res = await axios.put("http://localhost/react/reactphp/api/product.php",formData);

        if (res.data.success) {
            setMessage(res.data.success);
            setTimeout( () => {
                navigate('/all-product');
            },2000);
        }
    }
    return (
        <>
            <div className="flex flex-1 justify-center items-center h-[80vh]">
                <div className="w-4/12">
                    <div className="border bg-slate-200 p-4">
                        <div className="flex">
                            <h2 className="text-3xl my-3 font-semibold text-slate-600 uppercase text-center">Edit Product</h2>
                            <p className='text-green-600'>{message}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Product Title</label>
                                <input type="text" 
                                    name="product_title" 
                                    value={formvalue.p_title} 
                                    className="border px-3 py-2 rounded w-full" placeholder="e.g Product Title" 
                                    onChange={handleInput}   
                                />
                            </div>
                            <div className="mb-3">
                                <label>Product Price</label>
                                <input type="number" 
                                    name="price" 
                                    value={formvalue.p_price} 
                                    className="border px-3 py-2 rounded w-full" placeholder="e.g Price: 500/-"  
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="text-slate-700 text-sm">Product Image</label>
                                <img src={`http://localhost/react/reactphp/api/images/${formvalue.p_image}`} height={50} width={50}/>
                                <input type='file' 
                                    name='image' 
                                    className='border px-3 py-2 rounded w-full' placeholder='Product Image' 
                                    onChange={handleInput}
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

export default EditProduct
