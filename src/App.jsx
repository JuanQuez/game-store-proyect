import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import ProtectedRoutes from './components/ProtectecRoutes'
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
      <br /> 
      <main className='my-5'>
        <HashRouter>
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductsDetail />} />
              <Route path='/login' element={<Login />} />

              <Route  element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
              </Route>

            </Routes>
          </Container>
        </HashRouter>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
