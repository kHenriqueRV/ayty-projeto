import '../../Styles/Criar.css'
import { useEffect, useState } from 'react';
import { redirectToPage } from '../../Components/LateralBar'




function Adicionar() {

    useEffect(() => {
        const edicao = new URLSearchParams(window.location.search);
        const nome_editar = edicao.get('nome');
        const descricao_editar = edicao.get('descricao');
        const id = parseInt(edicao.get('id_string'))
        const data = new Date(edicao.get('data_string'))
        const id_editar = edicao.get('_id');
        console.log(nome_editar, descricao_editar);


        setnome_cliente(nome_editar || '');
        setdescricao(descricao_editar || '');
        setdataCriacao(data)
        setIdEditar(id)
        set_id(id_editar)
    }, []);




    interface ModeloContrato {
        _id: null,
        id: number | null;
        nome: string;
        descricao: string;
        estado: string;
        dataCriacao: Date | null;
    }

    const [dataCriacao, setdataCriacao] = useState();
    const [_id, set_id] = useState();
    const [IdEditar, setIdEditar] = useState();
    const [nome_cliente, setnome_cliente] = useState('');
    const [estado, setestado] = useState('negociacao');
    const [descricao, setdescricao] = useState('');

    const editar_contrato = async () => {
        const contratoDados: ModeloContrato = {

            id: IdEditar,
            nomeCliente: nome_cliente,
            dataCriacao: dataCriacao,
            descricao: descricao,
            estado: estado,
        };

        try {
            fetch(`http://localhost:3030/contratos/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contratoDados),
            })
                .then(resposta => {
                    if (!resposta.ok) {
                        throw new Error('Erro ao editar contrato');
                    }
                    return resposta.json(); // Retorna os dados atualizados, se necessário
                })
                .then(data => {
                    alert('Contrato editado com sucesso')
                    console.log('Contrato editado com sucesso:', data);
                    setTimeout(() => {
                        redirectToPage('/');
                    }, 800);

                })
                .catch(error => {
                    console.error('Erro ao editar contrato:', error);
                });
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    }





    const adicionar_contrato = async () => {
        const contratoDados: ModeloContrato = {
            _id: null,
            id: null,
            nomeCliente: nome_cliente,
            dataCriacao: null,
            descricao: descricao,
            estado: estado,


        };
        try {
            const resposta = await fetch('http://localhost:3030/contratos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contratoDados),

            }, alert('Contrato adicionado com sucesso'),
                setTimeout(() => {
                    redirectToPage('/');
                }, 800)
            );
            resposta.json().then(data => {
            }).catch(error => {
                console.error('Erro ao acessar o corpo da resposta:', error);
            });
        } catch (erro) {
            console.error('Erro ao enviar contrato', erro);

        }

    }


    return (
        <>
            <div className="Amostragem">
                <div className='inputs'>
                    <section className='nome_estado'>
                        <input id='nome' className="nome_cliente"
                            value={nome_cliente}
                            onChange={(event) => setnome_cliente(event.target.value)}
                            placeholder='nome do cliente'>
                        </input>
                        <section className='estado-botao'>
                            <button className='finalizado' onClick={() => setestado('finalizado')}>finalizado</button>
                            <button className='negociacao' onClick={() => setestado('negociacao')}>negociacao</button>
                            <button className='aprovado' onClick={() => setestado('aprovado')}>aprovado</button>
                        </section>
                        
                    </section>
                    <h4>basta pressionar o botão para definir o estado</h4>
                    <section>
                        <input id='descricao' className="descricao"
                            value={descricao}
                            onChange={(event) => setdescricao(event.target.value)}
                            placeholder='descrição'
                        >
                        </input>
                    </section>
                    <section className='set-button'>
                        <button className='editar'
                            onClick={() => { editar_contrato() }} >editar</button>
                        <button className='confirmar'
                            onClick={() => { adicionar_contrato() }}>adicionar</button>
                    </section>
                    <h4>OBS: se você veio através da opção de editar e apertar adicionar, ele pode acabar duplicando o contrato.</h4>
                </div>
            </div>
        </>
    )
}
export default Adicionar;