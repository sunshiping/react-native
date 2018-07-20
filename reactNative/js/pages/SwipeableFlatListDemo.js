/**
 * Created by sunshiping on 2018/6/28.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    SwipeableFlatList,
    TouchableOpacity
} from 'react-native'

const CITY = ['北京', '上海', '广州', '深圳'];
export default class FlatListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY
        }
    }

    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true
            });
        }
        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY);
            }
            this.setState({
                dataArray: dataArray,
                isLoading: false
            })
        }, 5000)
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.font}>
                {data.item}
            </Text>
        </View>
    }

    _genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                size={'large'}
                color={'red'}
                animating={true}
            />
            <Text style={styles.indicator}>正在加载更多...</Text>
        </View>
    }

    getQuickActions() {
        return <View style={styles.quickCon}>
            <TouchableOpacity onPress={() => {
                alert('确认删除？')
            }}>
                <View style={styles.quick}>
                    <Text style={styles.text}>删除</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        return <View style={styles.container}>
            <SwipeableFlatList
                data={this.state.dataArray}
                renderItem={(data) => this._renderItem(data)}
                // refreshing={this.state.isLoading}
                // onRefresh={()=>{
                //     this.loadData()
                // }}
                refreshControl={
                    <RefreshControl
                        title={'加载中'}
                        colors={['red']}
                        tintColor={'blue'}
                        titleColor={'blue'}
                        refreshing={this.state.isLoading}
                        onRefresh={() => {
                            this.loadData(true)
                        }}
                    />
                }
                ListFooterComponent={() => this._genIndicator()}
                onEndReached={() => {
                    this.loadData()
                }}
                renderQuickActions={() =>
                    this.getQuickActions()
                }
                maxSwipeDistance={100}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 90,
        backgroundColor: 'blue',
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    font: {
        fontSize: 20,
        color: 'white'
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 100
    },
    quickCon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15,
    },
    text: {
        color: 'white'
    }

})