import React from 'react';
import {
  BackHandler,
  Image,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Text,
  Title
} from 'react-native-paper';
import Reactotron from 'reactotron-react-native';

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _pasEditUnmountFunction = () => {
    const { state } = this.props.navigation;
    Reactotron.log(state.routeName);
    if(state.routeName === 'DetailScreen') {
      this.props.navigation.goBack();
      return true;
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }

  componentWillUnmount() {
    Reactotron.log('Unmount Details');
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }


  render() {
    const {params} = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
        <Headline style={styles.text}>{params.title}</Headline>
        <Divider />
        <Subheading style={styles.text}>{params.title_2}</Subheading>
        <Subheading style={styles.text}>{params.line_1}</Subheading>
        <Subheading style={styles.text}>{params.line_2}</Subheading>
        <Subheading style={styles.text}>{params.line_3}</Subheading>
        <Divider />
        <Paragraph style={[styles.text, { marginTop: 10, marginBottom: 10 }]}>{params.extended_info}</Paragraph>
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
    marginVertical: 2
  }
});
