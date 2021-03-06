import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import BaseItem from "./BaseItem";

export default class TrendingItem extends Component {
  render() {
    const {item} = this.props;
    if (!item) return null;
    let favoriteButton =
      <TouchableOpacity
        style={{padding: 6}}
        onPress={()=>{
        }}>
        <FontAwesome name={'star-o'} size={26} style={{color:'red'}}/>
      </TouchableOpacity>
    return (
      <TouchableOpacity
        onPress={()=>this.props.onSelect()}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>
            {item.fullName}
          </Text>
          <Text style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={{marginRight: 6}}>Author:</Text>
              {item.contributors.map((result,i,arr)=>{
                  return <Image style={{height: 22, width: 22, marginRight:2}}
                                key={i}
                                source={{uri: arr[i]}}/>
              })}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Start:</Text>
              <Text>{item.starCount}</Text>
            </View>
            {favoriteButton}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
    cell_container: {
      backgroundColor: 'white',
      padding: 10,
      marginLeft: 5,
      marginRight: 5,
      marginVertical: 3,
      borderColor: '#dddddd',
      borderWidth: 0.5,
      borderRadius: 2,
      shadowColor: 'gray',
      shadowOffset: {width: 0.5, height: 0.5},
      shadowOpacity: 0.4,
      shadowRadius: 1,
      elevation: 2  //android阴影
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      marginBottom: 2,
      color: '#212121',
    },
    description: {
      fontSize: 14,
      marginBottom: 2,
      color: '#757575',
    }
  }
);
