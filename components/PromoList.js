import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Title,
  Text,
  Caption,
  Paragraph,
  Card,
  CardCover,
  CardActions,
  CardContent,
  FAB,
  withTheme
} from 'react-native-paper';
import Reactotron from 'reactotron-react-native';


class PromoList extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(promo) {
    const img = 'http://mchapp.luciano.im/media/'+promo.item.image;
    const { colors } = this.props.theme;

    const win = Dimensions.get('window');
    const ratio = win.width / 900; // 900 is the width
    const h = ratio * 539;         // 539 is the height

    const components = [];
    if(promo.item.title) {
      components.push(
        <Title style={styles.title} key='1'>{promo.item.title}</Title>
      );
    }
    if(promo.item.title_2) {
      components.push(
        <Paragraph style={styles.paragraph} key='3'>{promo.item.title_2}</Paragraph>
      );
    }
    if(promo.item.info) {
      components.push(
        <Paragraph style={styles.paragraph} key='3'>{promo.item.info}</Paragraph>
      );
    }
    if(promo.item.validity) {
      components.push(
        <Paragraph style={styles.paragraph} key='4'>{promo.item.validity}</Paragraph>
      );
    }
    if(promo.item.line_3) {
      components.push(
        <Paragraph style={styles.paragraph} key='5'>{promo.item.line_3}</Paragraph>
      );
    }

    return (
      <Card>
        <View
          style={{backgroundColor: colors.primary, height:5}}
        ></View>
        <CardCover source={{uri: img}} style={{height: h, width: win.width}} />
        <CardContent style={{backgroundColor: colors.primary, height: 110, paddingTop: 8, paddingBottom: 8}}>
          {components}
          <CardActions style={styles.row}>
            <FAB
              small
              icon="add"
              onPress={() => this.props.navigation.navigate('DetailScreen', {
                title: promo.item.title,
                title_2: promo.item.title_2,
                line_1: promo.item.info,
                line_2: promo.item.validity,
                line_3: promo.item.line_3,
                extended_info: promo.item.extended_info,
                img: img
              })}
              color="#000000"
              style={styles.fabColor}
            />
          </CardActions>
        </CardContent>
      </Card>
    )
  }

// <Title style={styles.title}>{promo.item.title}</Title>
// <Paragraph style={styles.paragraph}>{promo.item.info}</Paragraph>
// <Paragraph style={styles.paragraph}>{promo.item.validity}</Paragraph>

  //Avoid FlatList renders completely when a new item is rendered
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.promos !== nextProps.promos) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.promos}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    )
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
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 19
  },
  paragraph: {
    color: '#FFFFFF',
    lineHeight: 17,
    fontSize: 15
  },
  fabColor: {
    backgroundColor: '#FFFFFF'
  }
});

export default withTheme(PromoList);
