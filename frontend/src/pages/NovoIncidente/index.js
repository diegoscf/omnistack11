import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './novo-incidente.css';

import imgLogo from '../../assets/logo.svg';

export default function NovoIncidente() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const ongId = localStorage.getItem('ongId');

    const historico = useHistory();

    async function salvar(evt) {
        evt.preventDefault();
        try {
            await api.post(
                'incidentes',
                {
                    titulo,
                    desc: descricao,
                    valor
                },
                {
                    headers: {
                        Authorization: ongId
                    }
                }
            );
            alert(`Caso salvo com sucesso`);
            historico.push('/ong');
        } catch (err) {
            console.log(err);
            alert('Erro ao salvar caso. Tente novamente.');
        }
    }

    return (
        <div className="novo-incidente-container">
            <div className="conteudo">
                <section>
                    <img src={imgLogo} alt="De zero à heroi" />

                    <h1>Cadastro de Incidentes</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar
                        um herói para resolver isso.
                    </p>

                    <Link to="/perfil" className="link-ancora">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={salvar}>
                    <input 
                        placeholder="Título"
                        value={titulo}
                        onChange={evt => setTitulo(evt.target.value)} />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={evt => setDescricao(evt.target.value)} />
                    <input 
                        placeholder="Valor em Reais"
                        value={valor}
                        onChange={evt => setValor(evt.target.value)} />
                    
                    <button type="submit" className="botao">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}