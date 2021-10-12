import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import {
  DrawerItem,
  Colors
} from 'react-native-paper';
import Reactotron from 'reactotron-react-native';

const DrawerItemsData = [
  { label: 'Home', icon: 'home', key: 0, screen: 'home' },
  { label: 'Preguntas Frecuentes', icon: 'question-answer', key: 1, screen: 'faq' },
  { label: 'Contactanos', icon: 'email', key: 2, screen: 'contact' },
];

export default class DrawerItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerItemIndex: 0
    };
    this._navigate = this._navigate.bind(this);
  }

  _navigate = (index, screen) => {
    this.setState({
      drawerItemIndex: index
    });
    this.props.navigation.navigate(screen);
  }
  // _setDrawerItem = (index) => this.setState({ drawerItemIndex: index });

  // componentDidMount() {
  //   const currentScreen = this.props.currentScreen;
  //   Reactotron.warn(currentScreen);
  // }

  render() {
    const currentScreen = this.props.currentScreen;
    Reactotron.warn(currentScreen);

    return (
      <View style={[styles.drawerContent, { backgroundColor: '#FFFFFF' }]}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/imgs/michelin_logo.png')} />
        </View>
        {DrawerItemsData.map((props, index) => (
          <DrawerItem
            {...props}
            key={props.key}
            active={this.state.drawerItemIndex === index}
            onPress={()=> this._navigate(index, props.screen)}
          />
        ))}
      </View>
    );
  }
}

// color={props.key === 3 ? Colors.tealA200 : undefined}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: 10,
    marginBottom: 20
  }
});
