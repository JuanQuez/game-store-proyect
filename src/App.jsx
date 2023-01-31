import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <header>
        <AppNavbar />
        {isLoading && <LoadingScreen />}
      </header>
      <main className='mt-5'>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductsDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/purchases' element={<Purchases />} />
          </Routes>
        </HashRouter>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
