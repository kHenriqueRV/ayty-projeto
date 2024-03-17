import '../Styles/LateralBar.css'
import VivaLogo from "../Assets/VivaLogo.png"
import Perfil from '../Assets/Perfil.png'


export const redirectToPage = (link) => {
    if (typeof link === 'string') {
        window.location.href = link
    }

}
function LateralBar() {

    return (
        <>
            <nav>
                <img className='Perfil' src={Perfil} alt='Perfil'></img>
                <div className='Botao-navegacao'>
                    <button className='nav-button' onClick={() => redirectToPage('/')}>Resumo</button>
                    <button className='nav-button' onClick={() => redirectToPage('/clientes')}>Clientes</button>
                    <button className='nav-button' onClick={() => redirectToPage('/criar')}>Adicionar</button>
                </div>
                <img className='VivaLogo' src={VivaLogo} alt='VivaLogo'></img>
            </nav>
        </>
    )
}

export default LateralBar;