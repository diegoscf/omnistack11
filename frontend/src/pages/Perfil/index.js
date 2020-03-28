import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './perfil.css';

import imgLogo from '../../assets/logo.svg';

export default function Perfil() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [casos, setCasos] = useState([]);

    const historico = useHistory();

    useEffect(
        () => {
            api.get(
                'ong',
                {
                    headers: {
                        Authorization: ongId
                    }
                }
            ).then(resposta => setCasos(resposta.data));
        }, 
        [ongId]
    );

    async function excluir(id) {
        try {
            await api.delete(`incidentes/${id}`);
            setCasos(casos.filter(caso => caso.id !== id));
        } catch (err) {
            console.log(err);
            alert('Erro ao excluir. Verifique o console.');
        }
    }

    function logout() {
        localStorage.clear();
        historico.push('/');
    }

    return (
        <div className="perfil-container">
            <header>
                <img src={imgLogo} alt="De zero à heroi" />
                <span>Bem vinda, ONG <strong>{ongName}</strong></span>

                <Link className="botao" to="/incidentes/novo">
                    Novo Caso
                </Link>
                <button type="button" onClick={logout}>
                    <FiPower size="18" color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {casos.map( caso => (
                    <li key={caso.id}>
                        <strong>CASO</strong>
                        <p>{caso.titulo}</p>
                        
                        <strong>DESCRIÇÃO</strong>
                        <p>{caso.descricao}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                        {/* 
                        se fizer assim, ele executaria o excluir ao carregar o HTML
                        <button type="button" onClick={excluir(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button> */}
                        <button type="button" onClick={() => excluir(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}