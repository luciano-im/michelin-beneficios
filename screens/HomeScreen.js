import React, { Fragment } from 'react';
import {
  AsyncStorage,
  AppState,
  BackHandler,
  StyleSheet,
  View
} from 'react-native';
import {
  ProgressBar,
  SearchBar
} from 'react-native-paper';
import axios from 'axios';
import PromoList from '../components/PromoList.js';
import Reactotron from 'reactotron-react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'promos': [],
      'filteredPromos': [],
      'isLoading': true,
      'progress': 0,
      'searchQuery': '',
      'firstLaunch': true
    };
  }

  _interval: any;

  _handleSearch = (query) => {
    let searchText = query.trim().toLowerCase();
    let data = this.state.promos;

    data = data.filter((l) => {
      // return l.title.toLowerCase().match(searchText);
      return l.tags.toLowerCase().match(searchText);
    });

    this.setState({
      'searchQuery': query,
      'filteredPromos': data
    });
  }

  _pasEditUnmountFunction = () => {
    const { state } = this.props.navigation;
    Reactotron.log(state.routeName);
    BackHandler.exitApp();
    return true;
  }

  _handleAppStateChange = async (nextAppState) => {
    if(nextAppState === 'active') {
      Reactotron.log(nextAppState);
      const API = 'http://mchapp.luciano.im/';
      const promos = await this._getPromosStorage();
      try {
        const response = await axios(API);
        if(promos === null || promos !== JSON.stringify(response.data)) {
          this.setState({
            'promos': response.data,
            'filteredPromos': response.data,
            'isLoading': false
          });
          await this._setPromosStorage(response.data);
        } else if(promos === JSON.stringify(response.data) && this.state.firstLaunch === true) {
          this.setState({
            'promos': response.data,
            'filteredPromos': response.data,
            'isLoading': false,
            'firstLaunch': false
          });
        }
      } catch (error) {
        Reactotron.log('error: ' + error);
      }
    }
  }

  _getPromosStorage = async () => {
    try {
      var promos = await AsyncStorage.getItem('@Promos');
      Reactotron.log('Retrieving data: ' + promos);
      return promos;
    } catch (error) {
      Reactotron.log('Error retrieving data: ' + error);
      return null;
    }
  }

  _setPromosStorage = async (data) => {
    try {
      await AsyncStorage.setItem('@Promos', JSON.stringify(data), () =>{
        Reactotron.log('Force Update');
        this.setState({
          'promos': data
        })
      });
      Reactotron.log('Saving data: ' + data);
    } catch (error) {
      Reactotron.log('Error saving data: ' + error);
    }
  }

  componentWillMount() {
    Reactotron.log('WillMount Home');
    BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    Reactotron.log('Unmount Home');
    clearInterval(this._interval);
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  async componentDidMount() {
    Reactotron.log('DidMount Home');
    const API = 'http://mchapp.luciano.im/';
    const promos = await this._getPromosStorage();
    try {
      const response = await axios(API);
      if(promos === null || promos !== JSON.stringify(response.data)) {
        this.setState({
          'promos': response.data,
          'filteredPromos': response.data,
          'isLoading': false
        });
        await this._setPromosStorage(response.data);
      } else if(promos === JSON.stringify(response.data) && this.state.firstLaunch === true) {
        this.setState({
          'promos': response.data,
          'filteredPromos': response.data,
          'isLoading': false,
          'firstLaunch': false
        });
      }
    } catch (error) {
      Reactotron.log('error: ' + error);
    }

    this._interval = setInterval(
      () =>
        this.setState(state => ({
          progress: state.progress < 1 ? state.progress + 0.01 : 0,
        })),
      16
    );
  }

  render() {
    const isLoading = this.state.isLoading;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ProgressBar progress={this.state.progress} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Fragment>
          <SearchBar
            placeholder="BUSCAR BENEFICIO"
            onChangeText={query => this._handleSearch(query)}
            value={this.state.searchQuery} />
        </Fragment>
        <PromoList promos={this.state.filteredPromos} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
