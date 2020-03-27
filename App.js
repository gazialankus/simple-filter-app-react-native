import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Picker} from 'react-native';

export default class FlatListBasics extends Component {

    state = {
        items: [
            {
                key: "1",
                value: "one"
            },
            {
                key: "2",
                value: "too"
            },
            {
                key: "3",
                value: "tee"
            }
        ],
        selectedKeys: [
            2
        ],
        currentFilter: "all"
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Picker
                        selectedValue={this.state.currentFilter}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                this.setState({currentFilter: itemValue});
                            }
                        }>
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Done" value="done" />
                        <Picker.Item label="Not done" value="notdone" />
                    </Picker>

                </View>
                <View style={{flex: 10}}>
                    <FlatList style={{flex: 1}}
                              data={this.state.items.filter((item) => {
                                  if (this.state.currentFilter === "all") {
                                      return true;
                                  } else if (this.state.currentFilter === "done") {
                                      return this.state.selectedKeys.indexOf(item.key) !== -1;
                                  } else {
                                      return this.state.selectedKeys.indexOf(item.key) === -1;
                                  }
                              })}
                              renderItem={({item}) =>
                                  <View style={{flex: 1, flexDirection: 'row'}}>
                                      <Text style={styles.item}>{item.value}</Text>
                                      <Button title={
                                          this.state.selectedKeys.indexOf(item.key) === -1 ?
                                          "o" :
                                          "+"
                                      } onPress={() => {
                                          if (this.state.selectedKeys.indexOf(item.key) === -1) {
                                              this.setState((prev) => {
                                                  return Object.assign({}, this.state, {
                                                      selectedKeys: [...this.state.selectedKeys, item.key]
                                                  });
                                              });
                                          } else {
                                              var newSelecteds = this.state.selectedKeys.filter((i) => {
                                                  return i !== item.key;
                                              });
                                              this.setState((prev) => {
                                                  return Object.assign({}, this.state, {
                                                      selectedKeys: newSelecteds
                                                  });
                                              });
                                          }

                                      }}/>
                                  </View>
                              }
                    />
                </View>
                <View style={{flex: 1}}>
                    <AddItemComponent instruction={"Enter the new item"} onAddClicked={(item) => {
                        console.log("want to add: " + item);
                        this.setState((prev) => {
                            return {
                                items: [...prev.items, {key: prev.items.length + 1, value: item}],
                            };
                        });
                    }}/>
                </View>
            </View>
        );
    }
}

class AddItemComponent extends Component {
    state = {itemToAdd: ""};

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TextInput
                    style={{flex:1, height: 40}}
                    placeholder={this.props.instruction}
                    onChangeText={(text) => this.setState({itemToAdd: text})}
                    value={this.state.itemToAdd}
                />
                <Button style={{width: 100}} title={"Add"} onPress={() => {
                    this.props.onAddClicked(this.state.itemToAdd);
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
