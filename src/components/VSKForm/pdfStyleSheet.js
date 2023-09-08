import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
        padding: '20px'
    },
    heading: {
        fontSize: 30,
        padding: 20,
        textAlign: 'center'
    },
    info: {
        flexDirection: 'column',
        display: 'flex',
        margin: '20px 0px',
        fontSize: '14px',
        lineHeight: '1.5px'
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #dfdfdf'
    },
    tableHeader: {
        height: '25px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        backgroundColor: '#f9fafb',
        borderTop: '2px solid #2185d0',
        color: '#2b2b2b',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    tableRow: {
        height: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#2b2b2b',
        borderBottom: '1px solid #dfdfdf',
        fontSize: '10px',
        textAlign: 'left'
    },
    maturityLevel: {
        margin: '20px 0px',
        fontSize: '20px'
    },
    matText: {
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#2185d0'
    },
    t1: {
        display: 'flex',
        width: '33%',
        padding: '3px',
        flexWrap: 'wrap'
    },
    t2: {
        display: 'flex',
        width: '33%',
        padding: '3px',
        flexWrap: 'wrap'
    },
    t3: {
        display: 'flex',
        width: '33%',
        padding: '3px',
        flexWrap: 'wrap'
    },
    blueText: {
        fontWeight: 'bold',
        color: '#2185d0'
    }
});