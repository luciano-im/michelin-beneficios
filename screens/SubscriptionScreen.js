import React from 'react';
import {
  AsyncStorage,
  BackHandler,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView
} from 'react-native';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  Text,
  TextInput,
  withTheme,
  DefaultTheme
} from 'react-native-paper';
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

class SubscriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      branchOffice: '',
      nameError: '',
      lastNameError: '',
      emailError: '',
      branchOfficeError: '',
      dialogVisible: false
    }
  }

  _showDialog = () => this.setState({ dialogVisible: true });

  _hideDialog = () => {
    if(this.state.contactResult.status === 'ok') {
      this.setState({
        dialogVisible: false,
        name: '',
        lastName: '',
        email: '',
        branchOffice: ''
      });
    } else {
      this.setState({
        dialogVisible: false
      });
    }
  }

  _onSubmit = () => {

    const rules = {
      required: /\S+/,
      email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
      maxlength(length, value) {
        if (value.length > length) {
          return false;
        }
        return true;
      }
    }

    // name validation
    if(!rules.required.test(this.state.name)) {
      this.setState({
        nameError: '* Nombre es obligatorio'
      })
    } else {
      if(!rules.maxlength(50, this.state.name)) {
        this.setState({
          nameError: '* Nombre supera el limite de 50 caracteres'
        })
      } else {
        if(this.state.nameError) {
          this.setState({
            nameError: ''
          })
        }
      }
    }

    // lastName validation
    if(!rules.required.test(this.state.lastName)) {
      this.setState({
        lastNameError: '* Nombre es obligatorio'
      })
    } else {
      if(!rules.maxlength(50, this.state.lastName)) {
        this.setState({
          lastNameError: '* Nombre supera el limite de 50 caracteres'
        })
      } else {
        if(this.state.lastNameError) {
          this.setState({
            lastNameError: ''
          })
        }
      }
    }

    // branchOffice validation
    if(!rules.required.test(this.state.branchOffice)) {
      this.setState({
        branchOfficeError: '* Nombre es obligatorio'
      })
    } else {
      if(!rules.maxlength(50, this.state.branchOffice)) {
        this.setState({
          branchOfficeError: '* Nombre supera el limite de 50 caracteres'
        })
      } else {
        if(this.state.branchOfficeError) {
          this.setState({
            branchOfficeError: ''
          })
        }
      }
    }

    // email validation
    if(!rules.email.test(this.state.email)) {
      this.setState({
        emailError: '* Email invalido'
      })
    } else {
      if(this.state.emailError) {
        this.setState({
          emailError: ''
        })
      }
    }

    if(this.state.nameError === '' && this.state.lastNameError === '' && this.state.branchOfficeError === '' && this.state.emailError === '' && this.state.name !== '' && this.state.lastName !== '' && this.state.branchOffice !== '' && this.state.email !== '') {
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };

      var data = {
        name: this.state.name,
        lastName: this.state.lastName,
        branchOffice: this.state.branchOffice,
        email: this.state.email
      }

      axios.post('http://mchapp.luciano.im/subscription/',
        JSON.stringify(data),
        config
      )
      .then(response => {
        if(response.data.status === 'ok') {
          this._setSubscription();
          this.props.navigation.navigate('WelcomeScreen');
        } else {
          Reactotron.error('No se puede enviar la suscripción!');
          this.setState({
            'dialogVisible': true
          });
        }
      })
      .catch(error => {
        Reactotron.error("error: "+error.response);
      });
    }
  }

  _setSubscription = async () => {
    try {
      await AsyncStorage.setItem('@Subscription', 'ready');
    } catch (error) {
      Reactotron.log('Error saving data: ' + error);
    }
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
    Reactotron.log('Unmount Subscription');
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10
            }}>
            BIENVENIDO A PROMOCIONES Y BENEFICIOS MICHELIN
          </Text>
          <Text
            style={{
              color: '#444444',
              fontWeight: 'bold',
              fontSize: 18
          }}>
            POR FAVOR INGRESÁ TUS DATOS:
          </Text>
          <TextInput
            style={styles.input}
            label="Apellido"
            placeholder="Apellido"
            autoCapitalize={'sentences'}
            theme={this.state.theme}
            value={this.state.lastName}
            onChangeText={text => this.setState({
              lastName: text
            })}
          />
          <Text style={styles.error}>{this.state.lastNameError}</Text>
          <TextInput
            style={styles.input}
            label="Nombre"
            placeholder="Nombre"
            autoCapitalize={'sentences'}
            theme={this.state.theme}
            value={this.state.name}
            onChangeText={text => this.setState({
              name: text
            })}
          />
          <Text style={styles.error}>{this.state.nameError}</Text>
          <TextInput
            style={styles.input}
            label="Punto de Venta"
            placeholder="Punto de Venta"
            autoCapitalize={'sentences'}
            theme={this.state.theme}
            value={this.state.branchOffice}
            onChangeText={text => this.setState({
              branchOffice: text
            })}
          />
          <Text style={styles.error}>{this.state.branchOfficeError}</Text>
          <TextInput
            style={styles.input}
            label="Email"
            placeholder="Email"
            value={this.state.email}
            onChangeText={text => this.setState({
              email: text
            })}
            keyboardType='email-address'
          />
          <Text style={styles.error}>{this.state.emailError}</Text>
        </ScrollView>
        <View style={styles.sendContainer}>
          <Button style={styles.send} raised color='#005AAA' icon="send" onPress={this._onSubmit}>
            ENVIAR
          </Button>
        </View>
        <View style={{ height: 80 }} />

        <Dialog visible={this.state.dialogVisible} onDismiss={this._hideDialog}>
          <DialogContent>
            <Paragraph>No se pudo procesar la suscipción</Paragraph>
          </DialogContent>
          <DialogActions>
            <Button onPress={this._hideDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20
  },
  form: {
    // paddingTop: 20
  },
  password: {
    position: 'absolute',
    right: 0,
    top: 40
  },
  input: {
    marginTop: 0
  },
  sendContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  send: {
    marginTop: 20,
    width: 100
  },
  error: {
    fontStyle: 'italic',
    color: '#FF0000',
    marginLeft: 10,
    marginRight: 10,
  }
});

export default withTheme(SubscriptionScreen);
