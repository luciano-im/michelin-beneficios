import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { DrawerItems, DrawerNavigator, StackNavigator } from 'react-navigation';
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
  withTheme
} from 'react-native-paper';
import LoginScreen from '../screens/LoginScreen.js';
import SubscriptionScreen from '../screens/SubscriptionScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import DetailScreen from '../screens/DetailScreen.js';
import FAQScreen from '../screens/FAQScreen.js';
import ContactScreen from '../screens/ContactScreen.js';
import { MaterialIcons } from '@expo/vector-icons';

const Home = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Toolbar>
            <ToolbarAction
              icon="menu"
              onPress={() => navigation.navigate('DrawerOpen')}
            />
            <ToolbarContent title="MICHELIN" />
          </Toolbar>
        )
      })
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Toolbar>
            <ToolbarBackAction onPress={() => navigation.goBack()} />
            <ToolbarContent title="DETALLE" />
          </Toolbar>
        ),
        drawerLockMode: 'locked-closed'
      })
    }
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

const FAQ = StackNavigator({
  FAQScreen: {
    screen: FAQScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Toolbar>
          <ToolbarBackAction onPress={() => navigation.navigate('Home')} />
          <ToolbarContent title="PREGUNTAS FRECUENTES" />
        </Toolbar>
      )
    })
  }
});

const Contact = StackNavigator({
  ContactScreen: {
    screen: ContactScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Toolbar>
          <ToolbarBackAction onPress={() => navigation.navigate('Home')} />
          <ToolbarContent title="CONTACTANOS" />
        </Toolbar>
      )
    })
  }
});

const Login = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const Subscription = StackNavigator({
  SubscriptionScreen: {
    screen: SubscriptionScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Toolbar>
          <ToolbarContent title="MICHELIN" />
        </Toolbar>
      )
    })
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Toolbar>
          <ToolbarContent title="MICHELIN" />
        </Toolbar>
      )
    })
  }
});

const AppNavigation = DrawerNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel: () => null,
        drawerLockMode: 'locked-closed'
      }
    },
    Subscription: {
      screen: Subscription,
      navigationOptions: {
        drawerLabel: () => null,
        drawerLockMode: 'locked-closed'
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="home" size={22} color={tintColor} />
        )
      }
    },
    FAQ: {
      screen: FAQ,
      navigationOptions: {
        drawerLabel: 'Preguntas Frecuentes',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="question-answer" size={22} color={tintColor} />
        ),
        drawerLockMode: 'locked-closed'
      }
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        drawerLabel: 'Contactanos',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="email" size={22} color={tintColor} />
        ),
        drawerLockMode: 'locked-closed'
      }
    }
  },
  {
    //initialRouteName: 'Home',
    initialRouteName: 'Login',
    contentComponent: props => (
      <View style={[styles.drawerContent, { backgroundColor: '#FFFFFF' }]}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/imgs/michelin_logo.png')}
          />
        </View>
        <DrawerItems {...props} />
      </View>
    ),
    contentOptions: {
      activeTintColor: '#005AAA'
    }
  }
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22
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

export const MyApp = AppNavigation;
