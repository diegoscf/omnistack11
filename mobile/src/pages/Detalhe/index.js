import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import * as EscritorDeEmail from 'expo-mail-composer';

import estilo from './detalhe';
import imgLogo from '../../assets/logo.png';

export default function Detalhe() {
    const navegacao = useNavigation();
    const route = useRoute();

    const casoSelecionado = route.params.caso;
    const mensagem = `Olá ${casoSelecionado.nome}, gostaria de ajudar com o caso 
        "${casoSelecionado.titulo}" que tem o valor de 
        ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(casoSelecionado.valor)}`;

    function voltar() {
        navegacao.goBack();
    }

    function enviarEmail() {
        EscritorDeEmail.composeAsync({
            subject: `Herói do caso: ${casoSelecionado.titulo}`,
            recipients: ['calangodocerrado@hotmail.com'],
            body: mensagem
        });
    }

    function abrirWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=55${casoSelecionado.whatsapp}&text=${mensagem}`);
    }

    return (
        <View style={estilo.container}>
            <View style={estilo.cabecalho}>
                <Image source={imgLogo} />

                <TouchableOpacity onPress={voltar}>
                    <Feather name='arrow-left' size={28} color='#E02041' />
                </TouchableOpacity>
            </View>

            <View style={estilo.caso}>
                <Text style={[estilo.rotulo, {marginTop: 0}]}>ONG</Text>
                <Text style={estilo.valor}>
                    {casoSelecionado.nome} de {casoSelecionado.cidade}/{casoSelecionado.uf}
                </Text>

                <Text style={estilo.rotulo}>CASO</Text>
                <Text style={estilo.valor}>{casoSelecionado.titulo}</Text>

                <Text style={estilo.rotulo}>VALOR</Text>
                <Text style={estilo.valor}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(casoSelecionado.valor)}
                </Text>
            </View>

            <View style={[estilo.caso, {marginTop: 0}]}>
                <Text style={estilo.titulo}>Salve o dia!</Text>
                <Text style={estilo.titulo}>Seja o herói deste caso.</Text>

                <Text style={estilo.descricao}>Entre em contato:</Text>
                
                <View style={estilo.acoes}>
                    <TouchableOpacity style={estilo.acao} onPress={abrirWhatsApp}>
                        <Text style={estilo.textoAcao}>WhatsApp</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={estilo.acao} onPress={enviarEmail}>
                        <Text style={estilo.textoAcao}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}