import '../../Styles/Home.css'
import ContratosView from '../../Components/ContratosView'
import { useEffect, useState } from 'react';


function Home() {
    const [Contratos, setContratos] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [contratosFiltrados, setcontratosFiltrados] = useState([]);
    const [pesquisa, setpesquisa] = useState('');
    const [estado, setestado] = useState('');

    useEffect(() => {
        async function buscaContratos() {
            try {
                const resposta = await fetch('http://localhost:777/contratos');
                if (!resposta.ok) {
                    throw new Error('Erro de servidor: ' + resposta.status);
                }
                const contratosData = await resposta.json();
                return contratosData;
            } catch (error) {
                console.error('Erro ao obter dados', error);
                return [];
            }
        }

        async function loadingData() {
            setLoading(true);
            try {
                const data = await buscaContratos();
                setContratos(data);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);

            }
        }

        loadingData();
    }, []);

    useEffect(() => {
        function filtrarContratos() {
            const contratosFiltrados = Contratos.filter((contrato) => {
                if (pesquisa === '' && estado === '') {
                    return true;
                }
                if (pesquisa !== '') {
                    if (typeof contrato.id === 'number' && contrato.id === parseInt(pesquisa)) {
                        return true;
                    }
                    if (contrato.nomeCliente && typeof contrato.nomeCliente === 'string') {
                        return contrato.nomeCliente.toLowerCase().includes(pesquisa.toLowerCase());
                    }
                }
                if (estado === 'finalizado') {
                    return contrato.estado.toLowerCase() === 'finalizado';
                }
                if (estado === 'negociacao') {
                    return contrato.estado.toLowerCase() === 'negociacao';
                }
                if (estado === 'aprovado') {
                    return contrato.estado.toLowerCase() === 'aprovado';
                }
                else {
                    return false;
                }
            });

            setcontratosFiltrados(contratosFiltrados);
        }

        filtrarContratos();
    }, [pesquisa, estado, Contratos]);



    return (
        <body>
            <div className="Amostragem">
                <div className='Pesquisas'>
                    <input className="pesquisa" type='text' placeholder='ID/NOME CLIENTE'
                        onChange={(event) => setpesquisa(event.target.value)} />
                    <div className="pesquisa_status">
                        <button onClick={() => setestado(prevState => prevState === 'finalizado' ? '' : 'finalizado')}>Finalizados</button>
                        <button onClick={() => setestado(prevState => prevState === 'negociacao' ? '' : 'negociacao')}>Negociação</button>
                        <button onClick={() => setestado(prevState => prevState === 'aprovado' ? '' : 'aprovado')}>Aprovados</button>
                    </div>
                </div>
                <div className='Contratos_amostra'>
                    {Loading ? (
                        <svg className="spinner" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                    ) : (
                        <div className='contratos'>
                            <div>
                                {
                                    contratosFiltrados.map((item) => (
                                        <ContratosView
                                            key={item._id}
                                            _id={item._id}
                                            id={item.id}
                                            nome_cliente={item.nomeCliente}
                                            dataCriacao={item.dataCriacao}
                                            descricao={item.descricao}
                                            estado={item.estado}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </body>
    )
}

export default Home;