import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './Components/Navbar/Navbar';
import {Footer} from './Components/Footer/Footer';
import {Home} from './Pages/Home/Home';
import {Products} from './Pages/Products/Products';
import {Users} from './Pages/Users/Users';
import {Cart} from './Pages/Cart/Cart';
import {Contact} from './Pages/Contact/Contact';
import {FAQ} from './Pages/FAQ/FAQ';
import {Upload} from './Pages/Upload/Upload';
import {Error404} from './Pages/Error404/Error404';
import {Chat} from './Pages/Chat/Chat';
import {Register} from './Pages/Register/Register';
import {Login} from './Pages/Login/Login';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/homepage' element={<Home />} />
				<Route path='/products' element={<Products/>} />
				<Route path='/products/:id' element={<Products />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/:id' element={<Users />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/cart/:id' element={<Cart />} />
				<Route path='/chat' element={<Chat />} />
				<Route path='/contacts' element={<Contact />} />
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
