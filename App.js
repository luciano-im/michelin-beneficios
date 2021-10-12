import Expo, { KeepAwake } from 'expo';
import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme
} from 'react-native-paper';
// import { AndroidBackHandler } from 'react-navigation-backhandler';
import {MyApp} from './components/Navigation.js';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#005AAA',
    accent: '#FCE500',
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: theme,
      drawerItemIndex: 0
    };
  }

  render() {
    return (
      <PaperProvider theme={this.state.theme}>
        <SafeAreaView style={{flex: 1}}>
          <MyApp />
          </SafeAreaView>
        <KeepAwake />
      </PaperProvider>
    );
  }
}
