import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Clientes from '../Pages/Clientes/Clientes'
import Adicionar from '../Pages/Adicionar/Adicionar'
import LateralBar from '../Components/LateralBar'


function Rotas() {
    return (
        <BrowserRouter>
            <div className='fixed-content'>
                <LateralBar></LateralBar>
            </div>
            <div className='Main-Content'>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/criar' element={<Adicionar />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Rotas