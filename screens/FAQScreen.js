import React from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Caption,
  Divider,
  Headline,
  Paragraph,
  Text
} from 'react-native-paper';
import { version } from '../Version.js';
import Reactotron from 'reactotron-react-native';

export default class FAQScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _pasEditUnmountFunction = () => {
    const { state } = this.props.navigation;
    Reactotron.log(state.routeName);
    if(state.routeName === 'FAQScreen') {
      this.props.navigation.navigate('Home');
      return true;
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  componentWillUnmount() {
    Reactotron.log('Unmount FAQ');
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <Headline style={styles.text}>¿CÓMO FUNCIONA?</Headline>
        <Divider />
        <Paragraph style={[styles.text, { marginTop: 10, marginBottom: 10 }]}>
          En la sección "Home" del menú podrá navegar entre las distintas promociones y seleccionar la que desee para acceder al detalle del beneficio en cuestion.
        </Paragraph>
        <Headline style={styles.text}>¿CÓMO BUSCO UN BENEFICIO?</Headline>
        <Divider />
        <Paragraph style={[styles.text, { marginTop: 10, marginBottom: 10 }]}>
          Puede utilizar el buscador integrado que ira filtrando los resultados a medida que ingresa su texto de busqueda.
        </Paragraph>
        <Headline style={styles.text}>¿CÓMO ME CONTACTO CON SOPORTE?</Headline>
        <Divider />
        <Paragraph style={[styles.text, { marginTop: 10, marginBottom: 20 }]}>
          Puede enviarnos sus consultas y/o sugerencias desde la seccion "Contactano" del menú. Recibiremos su mensaje y nos pondremos en contacto para resolver cualquier inquietud.
        </Paragraph>
        <Divider />
        <Caption>Version: {version}</Caption>
        <Text style={styles.text}></Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  text: {
    marginTop: 20,
    marginVertical: 4
  }
});
