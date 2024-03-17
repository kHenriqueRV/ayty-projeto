
import '../Styles/Contratos_view.css'
import { format } from 'date-fns';
import { redirectToPage } from './LateralBar';


export default function ContratosView({ _id, id, nome_cliente, dataCriacao, descricao, estado }) {
    function getStatusColor(estado) {
        switch (estado) {
            case 'negociacao':
                return '#E37559';
            case 'finalizado':
                return '#6E4973';
            case 'aprovado':
                return '#29D967';
            default:
                return 'gray';
        }
    }

    function formatarData(data) {
        return format(new Date(data), 'dd/MM/yyyy HH:mm');
    }

    const deletaContrato = async (id) => {
        try {
            const resposta = await fetch(`http://localhost:3030/contratos/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert('Contrato deletado com sucesso')
            setTimeout(() => {
                redirectToPage('/')
            }, 800);

            if (!resposta.ok) {
                throw new Error('Erro ao excluir contrato');
            }

            const data = await resposta.json();
            console.log(data);
        } catch (error) {
            console.error('Erro ao excluir contrato:', error);
        }
    };

    function redirectToPageEdit() {
        const nome = document.getElementById(`nome${_id}`).textContent;
        const descricao = document.getElementById(`descricao${_id}`).textContent;
        const id_string = document.getElementById(`id${_id}`).textContent;
        const data_string = document.getElementById(`data${_id}`).textContent;
        window.location.href = `/criar?nome=${encodeURIComponent(nome)}&descricao=${encodeURIComponent(descricao)}&_id=${encodeURIComponent(_id)}&id=${encodeURIComponent(id_string)}&data=${encodeURIComponent(data_string)}`;
    };

    return (

        <>
            <div className='contrato'>
                <div className="card-infos">
                    <div id={`id${_id}`} className='id'>ID: {id}</div>
                    <div id={`nome${_id}`} className='cliente'>Cliente: {nome_cliente}</div>
                    <div id={`data${_id}`} className='data'>Data de criação: {formatarData(dataCriacao)}</div>
                    <div className="card-status"
                        style={{ backgroundColor: getStatusColor(estado) }}>
                        <div>{estado}</div>
                    </div>
                </div>
                <div id={`descricao${_id}`} className="card-descricao">
                    {descricao}
                </div>
                <div className='botoes'>
                    <button onClick={redirectToPageEdit} className='editar_view'>Editar Contrato</button>
                    <button onClick={deletaContrato} className='remover'>Excluir contrato</button>
                </div>
            </div>
        </>

    )
}
