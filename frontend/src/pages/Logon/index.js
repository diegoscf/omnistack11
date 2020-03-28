import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import './logon.css';

import api from '../../services/api';

import imgPessoas from '../../assets/heroes.png';
import imgLogo from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');

    const historico = useHistory();

    async function fazerLogin(e) {
        e.preventDefault();

        try {
            const resposta = await api.post('sessao', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resposta.data.nome);

            historico.push('/ong');
        } catch (err) {
            console.log(err);
            setId('');
            alert('Falha no login. Tente novamente.');
        }
    }
    
    return (
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="De zero à heroi" />
                <form onSubmit={fazerLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Seu identificador"
                        value={id}
                        onChange={evt => setId(evt.target.value)} />
                    <button type="submit" className="botao">Entrar</button>

                    <Link to="/cadastrar" className="link-ancora">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={imgPessoas} alt="Pessoas" />
        </div>
    );
};