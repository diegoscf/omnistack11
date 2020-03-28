import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './cadastrar.css';

import imgLogo from '../../assets/logo.svg';

export default function Cadastrar() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhats] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const historico = useHistory();

    async function salvar(e) {
        e.preventDefault();

        try {
            const resposta = await api.post(
                'ongs',
                {
                    nome,
                    email,
                    whatsapp,
                    cidade,
                    uf
                }
            );
            alert(`Seu IDENTIFICADOR de acesso é: ${resposta.data.id}. Guarde-o bem.`);
            historico.push('/');
        } catch (err) {
            console.log(err);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    }

    return (
        <div className="cadastrar-container">
            <div className="conteudo">
                <section>
                    <img src={imgLogo} alt="De zero à heroi" />

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude 
                        pessoas a encontrarem os casos da sua ONG.
                    </p>

                    <Link to="/" className="link-ancora">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={salvar}>
                    <input 
                        placeholder="Nome"
                        value={nome}
                        onChange={evt => setNome(evt.target.value)} />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)} />
                    <input 
                        type="phone" 
                        placeholder="Fone para WhatsApp"
                        value={whatsapp}
                        onChange={evt => setWhats(evt.target.value)} />
                    <div className="inputs-agrupados">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={evt => setCidade(evt.target.value)} />
                        {/* <input placeholder="UF" width="80" /> */}
                        <input 
                            placeholder="UF" 
                            style={{width: 80}} 
                            maxLength="2"
                            value={uf}
                            onChange={evt => setUf(evt.target.value)} />
                    </div>
                    <button type="submit" className="botao">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}