import React from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
  // TextInput,
  KeyboardAvoidingView
} from 'react-native';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  TextInput,
  Text
} from 'react-native-paper';
import Reactotron from 'reactotron-react-native';

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      nameError: '',
      emailError: '',
      messageError: '',
      contactResult: '',
      dialogVisible: false
    }
  }

  _showDialog = () => this.setState({ dialogVisible: true });

  _hideDialog = () => {
    if(this.state.contactResult.status === 'ok') {
      this.setState({
        dialogVisible: false,
        name: '',
        email: '',
        message: ''
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
      if(!rules.maxlength(30, this.state.name)) {
        this.setState({
          nameError: '* Nombre supera el limite de 30 caracteres'
        })
      } else {
        if(this.state.nameError) {
          this.setState({
            nameError: ''
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

    // message validation
    if(!rules.required.test(this.state.message)) {
      this.setState({
        messageError: '* Mensaje es obligatorio'
      })
    } else {
      if(!rules.maxlength(250, this.state.message)) {
        this.setState({
          messageError: '* Mensaje supera el limite de 250 caracteres'
        })
      } else {
        if(this.state.messageError) {
          this.setState({
            messageError: ''
          })
        }
      }
    }


    if(this.state.nameError === '' && this.state.emailError === '' && this.state.messageError === '' && this.state.name !== '' && this.state.email !== '' && this.state.message !== '') {
  		const url = 'http://mchapp.luciano.im/contact';
  		const params = encodeURIComponent(JSON.stringify({
  			name: this.state.name,
  			email: this.state.email,
  			message: this.state.message
  		}));

  		fetch(url+'?params='+params)
  		.then((response) => response.json())
  		.then((msg) => this.setState({
  			'contactResult': msg,
  			'dialogVisible': true
  		}))
  		.catch((error) => {
  			console.error(error);
  		});
    }
  }

  _pasEditUnmountFunction = () => {
    const { state } = this.props.navigation;
    Reactotron.log(state.routeName);
    if(state.routeName === 'ContactScreen') {
      this.props.navigation.navigate('Home');
      return true;
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  componentWillUnmount() {
    Reactotron.log('Unmount Contact');
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.text}>¿Tenes una duda o consulta?</Text>
          <Text style={styles.text}>Contactate con nosotros.</Text>
          <TextInput
            style={styles.input}
            label="Nombre"
            placeholder="Nombre"
            value={this.state.name}
            onChangeText={text => this.setState({
              name: text
            })}
          />
          <Text style={styles.error}>{this.state.nameError}</Text>

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

          <TextInput
            style={styles.input}
            label="Mensaje"
            placeholder="Mensaje"
            value={this.state.message}
            onChangeText={text => this.setState({
              message: text
            })}
            multiline={true}
            numberOfLines={3}
          />
          <Text style={styles.error}>{this.state.messageError}</Text>

        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} raised color='#005AAA' icon="send" onPress={this._onSubmit}>
            ENVIAR
          </Button>
        </View>
        <View style={{ height: 80 }} />

        <Dialog visible={this.state.dialogVisible} onDismiss={this._hideDialog}>
          <DialogContent>
            <Paragraph>{this.state.contactResult.message}</Paragraph>
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
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    padding: 4
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    // margin: 20,
    // marginBottom: 0,
    // height: 34,
    // paddingHorizontal: 10,
    // borderRadius: 4,
    // borderColor: '#ccc',
    // borderWidth: 1,
    // fontSize: 16
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    // marginTop: 10
    width: 110
  },
  form: {
    paddingTop: 20
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'stretch'
  },
  error: {
    // fontStyle: 'italic',
    // color: '#FF0000',
    // marginLeft: 10,
    // marginRight: 10,
  }
});
