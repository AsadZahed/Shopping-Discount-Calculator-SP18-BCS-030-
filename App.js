import React, { useState,useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import MyButton from './components/button.js';
import history from './components/list.js';
import { useRoute } from '@react-navigation/native';
import back from './assets/back.webp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function A() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={App} 
        options={{
            title:"Shoping Discount Calculator",
            headerTitleAlign:"left",
            headerStyle:{
                 backgroundColor:"lightblue",
                 }
        }} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function History({ navigation,route }) {
   const back =()=>{
     navigation.setParams({list:getList})
navigation.navigate('Home',{list:getList})
}
  const [getList, setList] = useState(route.params.list);
  console.log(route.params.label)
  const removeItem = (a) => {
    const list1 = getList.filter((item) => item.key != a);
    setList(list1);
  };
const alert= () =>{
  console.log("Asad")
Alert.alert(
      "Clear History",
      "Do you want to Clear History?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress:() => setList([]) }
      ],
      { cancelable: false }
    );
};
    navigation.setOptions({
    headerLeft: () => (
        <Button
          title="<--"
          size={24}
          color="orange"
          onPress={()=> navigation.navigate("Home",{list:getList})}
        ></Button>
    ),
    headerRight: () => (
        <Button
          title="Clear History"
          size={24}
          color="orange"
          onPress={alert}
        ></Button>
    )
  });
  // const editingtext = (utext) => {
  //   setText(utext.data);
  //   seteditingitem(utext.key);
  // };
  // const edittext = () => {
  //   setList((list) =>
  //     getList.map((item) =>
  //       item.key === geteditingitem ? { key: item.key, data: getText } : item
  //     )
  //   );
  //   setText('');
  //   seteditingitem(0);
  // };

  return (
    <View style={styles.container}>
  
      <ScrollView style={styles.Scrollview1}>
        <DataTable>
          <DataTable.Header style={styles.col}>
            <DataTable.Title>Label</DataTable.Title>
            <DataTable.Title >Price</DataTable.Title>
            <DataTable.Title>Discount</DataTable.Title>
            <DataTable.Title >Final Price</DataTable.Title>
            <DataTable.Title >  </DataTable.Title>
          </DataTable.Header>
          {getList.map((item, index) => (
              <DataTable.Row style={styles.row}>
                <DataTable.Cell><Text>{item.label}</Text></DataTable.Cell>
                <DataTable.Cell ><Text>{item.orgprice}</Text></DataTable.Cell>
                <DataTable.Cell ><Text>{item.disprcnt}%</Text></DataTable.Cell>
                <DataTable.Cell ><Text>{item.fprice}</Text></DataTable.Cell>
                <DataTable.Cell numeric ><TouchableOpacity onPress={() => removeItem(item.key)}>
                <View
                  style={{
                    backgroundColor: '#161b57',
                    padding: 7,
                    borderRadius: 100,
                  }}>
                  <Text style={styles.scrollviewtext}>X</Text>
                </View>
              </TouchableOpacity></DataTable.Cell>
              </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
}
function App({ navigation,route}) {
  const [getdprice, setdprice] = useState('');
  const [getoprice, setoprice] = useState('');
  const [getdper, setdper] = useState('');
  const [geterror, seterror] = useState('');
  const [getsprice, setsprice] = useState('');
  const [getstr, setstr] = useState('');
  const [getText, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [getList, setList] = useState([{label:"khaddi",orgprice:1000,disprcnt:25,fprice:750}]);
  const [geteditingitem, seteditingitem] = useState(0);
useEffect(() => {
    // When returning from History Screen Update state
    if (route.params?.list) {
      setList(route.params.list);
      // Reste Parameters
      navigation.setParams({ list: undefined });
    }
  });
 navigation.setOptions({
    headerRight: () => (
        <Button
          title="History"
          size={24}
          color="orange"
          onPress={()=> navigation.navigate("History",{list:getList})}
        ></Button>
    ),
  });

  const removeItem = (a) => {
    const list1 = getList.filter((item) => item.key != a);
    setList(list1);
  };
  const additem = () => {
    var g = getText + getstr;
    setList([
      ...getList,
      {
        key: Math.random().toString(),
        label: getText,
        orgprice: getoprice,
        disprcnt: getdper,
        fprice: (getoprice-(getdper/100)*getoprice).toFixed(2),
      },
    ]);
    setText('');
    setoprice('')
    setdper('')
    seterror('')
  };

  const calculatedprice = () => {
    if (getdper < 100 && getdper > 0 && getoprice > 0) {
      var x = (getdper * getoprice) / 100;
      x = getoprice - x;
      x = x.toFixed(2);
      console.log(x);
      setdprice(x);
      f = getoprice - x;
      setsprice(f.toFixed(2));
      seterror('')
    } else {
      seterror('There is error in your input, Re-check');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        
        <View style={styles.buttoncontainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Orignal Price"
            keyboardType="Decimal-pad"
            onChangeText={(text) => {
              setoprice(text);
            }}
            value={getoprice}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Discount Percentage"
            keyboardType="Decimal-pad"
            onChangeText={(text) => {
              setdper(text);
            }}
            value={getdper}
          />
          

          <Text style={styles.paragraph}>{geterror}</Text>
          <Text style={styles.paragraph1}>After Discount: <Text style={styles.paragraph1}>{getoprice>-1 ? (getoprice-getoprice*(getdper/100).toFixed(2)) : setoprice(0)}</Text></Text>
          <Text style={styles.paragraph1}>You saved: <Text style={styles.paragraph1}>{(getdper>-1 && getdper<100) ? (getoprice-(getoprice-getoprice*(getdper/100))).toFixed(2) : setdper(0)}</Text></Text>
        </View>
        <Text style={styles.paragraph2}>Want to save this calculation?</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Label"
            onChangeText={(text) => {
              setText(text);
            }}
            value={getText}
          />
          <MyButton onPressEvent={additem} list={getList} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
  },
  inputcontainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttoncontainer: {
    padding: 30,
  },
  textinput: {
    width: '70%',
    borderColor: 'Black',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 16,
    padding: 10,
    margin: 10,
  },
  paragraph: {
    margin: 14,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraph1: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottomWidth:2
  },
   paragraph2: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollviewtext: {
    fontSize: 18,
    color: 'white',
  },
  Scrollview1: {
    width: '100%',
  },
  ScrollViewItem: {
    width: '100%',
    backgroundColor: 'orange',
    alignSelf: 'center',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default A;
