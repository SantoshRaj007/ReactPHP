import axios from 'axios';
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {

    const navigate = useNavigate();

    const [formvalue, setFormvalue] = useState({username:'', email:'', status:''});
    const [message, setMessage] = useState('');

    const handleInput = (e) => {
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = {username:formvalue.username, email:formvalue.email, status:formvalue.status};
        const res = await axios.post("http://localhost/react/reactphp/api/user.php",formData);

        if(res.data.success){
            setMessage(res.data.success);
            setTimeout( ()=>{
                navigate('/all-user');
            }, 2000);
            
        }
    }
      

    return (
        <>
            <div className="flex flex-1 justify-center items-center h-[80vh]">
                <div className="w-4/12">
                    <div className="border bg-slate-200 p-4">
                        <div className="flex">
                            <h2 className="text-3xl my-3 font-semibold text-slate-600 uppercase text-center">Add User</h2>
                            <p className='text-green-600'>{ message }</p>
                        </div>
                        <form onSubmit = {handleSubmit}>
                            <div className="mb-3">
                                <label>User Name</label>
                                <input type="text" name="username" value={formvalue.username} className="border px-3 py-2 rounded w-full" placeholder="e.g Santosh Singh" onChange= {handleInput} />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" name="email" value={formvalue.email} className="border px-3 py-2 rounded w-full" placeholder="e.g email@gmail.com" onChange= {handleInput} />
                            </div>
                            <div className="mb-3">
                                <label className="text-slate-700 text-sm">Status</label>
                                <select name="status" className="border border-slate-300 w-full px-3 py-2 rounded" value={formvalue.status} onChange= {handleInput}>
                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">In-Active</option>
                                </select>
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

export default AddUser
