import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './Components/Navbar';
import {Register} from './Pages/Register';
import {Login} from './Pages/Login';
import {Home} from './Pages/Home';
import {Products} from './Pages/Products';
import {Users} from './Pages/Users';
import {Cart} from './Pages/Cart';
import {Contact} from './Pages/Contact';
import {FAQ} from './Pages/FAQ';
import {Upload} from './Pages/Upload';
import {Error404} from './Pages/Error404';
import {Chat} from './Pages/Chat';
import {Footer} from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<Users />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
