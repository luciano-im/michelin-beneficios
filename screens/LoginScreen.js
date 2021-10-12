import React from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  Image,
  View,
  StyleSheet
} from 'react-native';
import {
  Button,
  FAB,
  Switch,
  Text,
  TextInput,
  withTheme,
  DefaultTheme
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      accessError: false,
      errorMessage: '',
      theme: loginTheme,
      passwordHide: true,
      passwordIcon: 'visibility-off',
      passwordIconColor: '#003A77'
    }
  }

  _changePwdType = () => {
    if(this.state.passwordIcon === 'visibility-off') {
      this.setState({
        passwordIcon: 'visibility',
        passwordHide: false,
        passwordIconColor: '#FFFFFF'
      });
    } else {
      this.setState({
        passwordIcon: 'visibility-off',
        passwordHide: true,
        passwordIconColor: '#003A77'
      });
    }
  }

  _login = (user, password) => {
    const config = {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    var data = {
      username: user || this.state.user,
      password: password || this.state.password
    }

    axios.post('http://mchapp.luciano.im/login/',
      JSON.stringify(data),
      config
    )
    .then(response => {
      if(response.data.status === 'ok') {
        if(!user && !password) {
          this._setCredentials();
        }
        this._checkSubscription();
      } else {
        this.setState({
          accessError: true,
          errorMessage: 'Usuario o password inválido!'
        });
      }
    })
    .catch(error => {
      Reactotron.error(error.response);
    });
  }

  _checkSubscription = async () => {
    try {
      var subscription = await AsyncStorage.getItem('@Subscription');
      if(subscription === 'ready') {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Subscription');
      }
    } catch (error) {
      Reactotron.log('Error retrieving data');
    }
  }

  _setCredentials = async () => {
    const credentials = {
      'user':this.state.user,
      'password':this.state.password
    }
    try {
      await AsyncStorage.setItem('@Access:key', JSON.stringify(credentials));
    } catch (error) {
      Reactotron.log('Error saving data');
    }
  }

  _checkCredentials = async () => {
    try {
      var credentials = await AsyncStorage.getItem('@Access:key');
      credentials = JSON.parse(credentials);
      if (credentials.user !== null && credentials.password !== null){
        // We have data!!
        this._login(credentials.user, credentials.password);
      } else {
        Reactotron.log('Empty Item');
      }
    } catch (error) {
      Reactotron.log('Error retrieving data');
      // La clave no existe y muestra la pantalla de login
    }
  }

  componentDidMount() {
    Reactotron.log('Login Mount');
    this._checkCredentials();
  }

  componentWillUnmount() {
    Reactotron.log('Login Unmount');
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        behavior="padding"
        enabled
      >
        <Image style={styles.logo}
               height={180}
               resizeMode={'contain'}
               source={require('../assets/imgs/michelin_logo_login.png')}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          underlineColor='#FFFFFF'
          label="Usuario"
          placeholder="Usuario"
          secureTextEntry={false}
          textAlign={'center'}
          theme={this.state.theme}
          value={this.state.user}
          onChangeText={text => this.setState({
            user: text
          })}
        />
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            underlineColor='#FFFFFF'
            label="Password"
            placeholder="Password"
            secureTextEntry={this.state.passwordHide}
            textAlign={'center'}
            theme={this.state.theme}
            value={this.state.password}
            onChangeText={text => this.setState({
              password: text
            })}
          />
          <MaterialIcons
            style={styles.password}
            name={this.state.passwordIcon}
            size={22}
            color={this.state.passwordIconColor}
            onPress={() => this._changePwdType()}
          />
        </View>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <Button style={styles.button} raised color='#ffffff' onPress={() => this._login()}>
          <Text style={styles.buttonText}>INGRESAR</Text>
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  password: {
    position: 'absolute',
    right: 0,
    top: 40
  },
  logo: {
    // marginTop: 0,
    // marginBottom: 0
  },
  input: {
    width: 200
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: '#005AAA'
  },
  error: {
    fontStyle: 'italic',
    color: '#FF0000',
    marginLeft: 10,
    marginRight: 10,
  }
});

export default withTheme(LoginScreen);
