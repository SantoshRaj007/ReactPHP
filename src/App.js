import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './index.css';
import Home from './components/Home';
import Footer from './components/Footer';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import Edit from './components/Edit';
import AddProduct from './components/products/AddProduct';
import Product from './components/products/Product';
import EditProduct from './components/products/EditProduct';

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/>} />
                <Route path='/all-user' element={ <UserList/>} />
                <Route path='/add-user' element={ <AddUser/>} />
                <Route path='/edit-user/:id' element={ <Edit/>} />
                <Route path='/add-product' element={ <AddProduct/>} />
                <Route path='/all-product' element={ <Product/>} />
                <Route path='/edit-product/:id' element={ <EditProduct/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
