import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import estilo from './incidentes';
import imgLogo from '../../assets/logo.png';
import api from '../../services/api';

export default function Incidentes() {
    const navegacao = useNavigation();

    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [carregando, setCarregando] = useState(false);

    function detalhar(caso) {
        navegacao.navigate('Detalhe', {caso});
    }

    async function carregarIncidentes() {
        if (carregando) {
            return;
        }

        if (total > 0 && casos.length === total) {
            return;
        }

        setCarregando(true);

        const resposta = await api.get(
            'incidentes',
            {
                params: {
                    page: pagina
                }
            }
        );
        // setCasos(resposta.data);
        setCasos([...casos, ...resposta.data]);
        setTotal(resposta.headers['x-total-count']);
        setPagina(pagina+1); 
        setCarregando(false);
    }

    useEffect(() => carregarIncidentes(), []);

    return (
        <View style={estilo.container}>
            <View style={estilo.cabecalho}>
                <Image source={imgLogo} />
                <Text style={estilo.textoCabecalho}>
                    Total de <Text style={estilo.textoCabecalhoNegrito}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={estilo.titulo}>
                Bem-vindo!
            </Text>
            <Text style={estilo.descricao}>
                Escolha um dos casos abaixo e vá de zero à herói!
            </Text>

            <FlatList
                style={estilo.casos}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={carregarIncidentes}
                onEndReachedThreshold={0.2}
                renderItem={({item: caso}) => (
                    <View style={estilo.caso}>
                        <Text style={estilo.rotulo}>ONG</Text>
                        <Text style={estilo.valor}>{caso.nome}</Text>

                        <Text style={estilo.rotulo}>CASO</Text>
                        <Text style={estilo.valor}>{caso.titulo}</Text>

                        <Text style={estilo.rotulo}>VALOR</Text>
                        <Text style={estilo.valor}>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
                        </Text>

                        <TouchableOpacity
                            style={estilo.botaoDetalhar}
                            onPress={() => detalhar(caso)}>
                            
                            <Text style={estilo.textoBotaoDetalhar}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}