import React from 'react';
import {
  BackHandler,
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Text,
  withTheme,
  DefaultTheme
} from 'react-native-paper';
import Reactotron from 'reactotron-react-native';

const loginTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#005AAA',
    accent: '#FCE500',
    text: '#FFFFFF',
    placeholder: '#FFFFFF'
  }
};

class SubscriptionScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSubmit = () => {
    this.props.navigation.navigate('Home');
  }

  _pasEditUnmountFunction = () => {
    // const { state } = this.props.navigation;
    Reactotron.log(state.routeName);
    BackHandler.exitApp();
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  componentWillUnmount() {
    Reactotron.log('Unmount Welcome');
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          padding: 10,
          paddingTop: 30
        }}
      >
        <Text
          style={{
            color: '#444444',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center'
        }}>
          TU SUSCRIPCIÓN HA SIDO ENVIADA.
        </Text>
        <Text
          style={{
            color: '#444444',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center'
        }}>
          YA PODÉS UTILIZAR LA APP
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 15,
            marginBottom: 15,
            textAlign: 'center'
          }}>
          PROMOCIONES Y BENEFICIOS MICHELIN
        </Text>
        <Text
          style={{
            color: '#444444',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center'
        }}>
          ¡MUCHAS GRACIAS!
        </Text>

        <View style={styles.sendContainer}>
          <Button style={styles.send} raised color='#005AAA' onPress={this._onSubmit}>
            OK
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sendContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  send: {
    marginTop: 20,
    width: 100
  }
});

export default withTheme(SubscriptionScreen);
