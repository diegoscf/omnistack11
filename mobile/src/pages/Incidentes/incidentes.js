import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'    
    },

    textoCabecalho: {
        fontSize: 15,
        color: '#737380'
    },

    textoCabecalhoNegrito: {
        fontWeight: 'bold'
    },

    titulo: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    descricao: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    casos: {
        marginTop: 32
    },

    caso: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },

    rotulo: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },

    valor: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    botaoDetalhar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textoBotaoDetalhar: {
       color: '#E02041',
       fontSize: 15,
       fontWeight: 'bold' 
    }
    
});