import * as React from 'react';
import { TouchableOpacity,Modal, Keyboard, View, Text, Alert,AppRegistry, ScrollView, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Pedido from './pedido';





export default function App() {
  const [table, setTable] = React.useState(0)
  const [txt, setTxt] = React.useState('0')

  const [prevTable, setPrevTable] = React.useState(0)
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  global.prices = {
    // [name,quantity,isServed,price]
    pescados: [
      { name: 'Pesca', quantity: '0', isServed: false, unitPrice: 140 },
      { exists: false, way: 'Frito', fish: '', isServed: false },
      { exists: false, way: 'Plancha', fish: '', isServed: false },
      { exists: false, way: 'Regamonte', fish: '', isServed: false },
      { exists: false, way: 'S.B', fish: '', isServed: false },
      { exists: false, way: 'A.N.M', fish: '', isServed: false },

    ],
    salade: [

      { name: 'Variée (p)', quantity: '0', isServed: false, unitPrice: 20 },
      { name: 'Variée (M)', quantity: '0', isServed: false, unitPrice: 30 },
      { name: 'Mixte (p)', quantity: '0', isServed: false, unitPrice: 15 },
      { name: 'Mixte (M)', quantity: '0', isServed: false, unitPrice: 25 },
      { name: 'Pulpo (p)', quantity: '0', isServed: false, unitPrice: 30 },
      { name: 'Pulpo (M)', quantity: '0', isServed: false, unitPrice: 45 },

    ],
    boisson: [
      { name: 'Eau', quantity: '0', isServed: false, unitPrice: 10 },
      { name: 'Thé', quantity: '0', isServed: false, unitPrice: 10 },
      { name: 'Café', quantity: '0', isServed: false, unitPrice: 12 },
      { name: 'Orange', quantity: '0', isServed: false, unitPrice: 20 },
      { name: 'Panaché', quantity: '0', isServed: false, unitPrice: 25 },

    ]
    ,
    entree: [
      { name: 'Concha', quantity: '0', isServed: false, unitPrice: 30 },
      { name: 'Pilpil', quantity: '0', isServed: false, unitPrice: 50 },
      { name: 'Puntilla', quantity: '0', isServed: false, unitPrice: 50 },
      { name: 'Frit', quantity: '0', isServed: false, unitPrice: 10 },
      { name: 'Paella', quantity: '0', isServed: false, unitPrice: 20 },
      { name: 'Brinj', quantity: '0', isServed: false, unitPrice: 30 },

    ],
    postre: [
      { name: 'Postre', quantity: '0', isServed: false, unitPrice: 40 },
      { name: 'Flan sec', quantity: '0', isServed: false, unitPrice: 30 },
      { name: 'Flan Fruit', quantity: '0', isServed: false, unitPrice: 40 },
      { name: 'Teramiso', quantity: '0', isServed: false, unitPrice: 20 },
      { name: 'Fruta', quantity: '0', isServed: false, unitPrice: 20 },
      
    ],
    autres: [
      { name: '', quantity: '1', isServed: false, unitPrice: 0 },
      
    ]

  }
  const [nbrAutres,setNbrAutres]=React.useState([0])
  const [tableList, setTableList] = React.useState([{}])
  const [payedTables, setPayedTables] = React.useState([false])
  const [camareroOpen, setCamareroOpen] = React.useState(false)
  const [addModal,setAddModal]=React.useState(false)
  const [tableCamarero, setTableCamarero] = React.useState([' ---- '])
  const [camareros,setCamareros]=React.useState(['Abdo','Yassin','euzeu','jkdj','dkj'])
  AppRegistry.registerComponent('tableList', () => {
    return tableList})
    AppRegistry.registerComponent('table', () => {
      return table})
  
  let camList=camareros.map((camarero,index)=>{
     
      return <View key={index} style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',marginBottom:20,flex:1}}>
          <TouchableOpacity style={{height:40,width:200,borderWidth:1.1,borderRadius:8,justifyContent:"center",alignItems:"center",backgroundColor:"#ffff66"}}  onPress={()=>{
          let x=[...tableCamarero]
          x[table]=camarero
          setTableCamarero([...x])
          setCamareroOpen(false)
        }} >
          <Text>{camarero}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={()=>{
          Alert.alert(
            "Confirmation",
            "Sùr?",
            [

              { text: "Non", style: "cancel" },
              {
                text: "oui",
                onPressIn: () => {
                  setCamareros(camareros.filter(function(value, ind, arr){ 
                    return ind !== index;
                }))
              },
        }]
          )
          }} style={{height:30,width:30,backgroundColor:'red',alignItems:'center',justifyContent:'center',marginLeft:30,borderWidth:1,borderRadius:5}}>
          <NativeBaseProvider>
            <Icon size="4" style={{flex:1,margin:5}} as={Ionicons} name="trash" color='black' />
          </NativeBaseProvider>
        </TouchableOpacity>
      </View>
      })

  const onAddBtnClick = () => {
    Keyboard.dismiss()
    setTableList(tableList.concat([{ ...prices }]));
    setPayedTables(payedTables.concat(false))
    setTableCamarero(tableCamarero.concat(' ---- '))
    setTable(tableList.length)
    setNbrAutres(nbrAutres.concat(0))
    setTxt(tableList.length.toString())
  };

  return (
    <ScrollView style={{ flex: 1,opacity:1-0.6*(camareroOpen) }}>
      < View style={{ flexDirection: 'column',alignItems:"center"}}>

        <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 40, alignItems: 'center',alignContent:"center", justifyContent: "space-around",flex:1}}>
          <Text style={{ fontWeight: 'bold', fontSize: 30,marginLeft:80 }}>Table : </Text>
          <TextInput keyboardType="numeric" style={{ minWidth: 20, fontWeight: 'bold', fontSize: 30, textAlign: 'center', backgroundColor: 'white', marginRight: 30 }} value={txt} onChangeText={setTxt} />

          <View style={{ marginRight: 30, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 5 }}>
            <NativeBaseProvider >
              <TouchableOpacity onPressIn={() => {
                setPrevTable(table)
                setTable(Number(txt))

              }
              } style={{ borderWidth: 0.3, width: 50,marginTop:4,borderRadius:5, alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#ffffcc' }}>

                <Icon size="8" as={Ionicons} name="search" color='black' />

              </TouchableOpacity>
            </NativeBaseProvider>
          </View>

          <TouchableOpacity  style={{ backgroundColor: "#00ccff", borderRadius: 8, borderWidth: 0.8 }}   onPressIn={onAddBtnClick}>
            <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10, marginBottom: 7, marginTop: 7, fontWeight: "bold", textAlign: "center" }}>+ TABLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20, marginLeft: 50, borderWidth: 0.6, borderRadius: 10, backgroundColor: "lightgreen".repeat(payedTables[table]) + "orange".repeat(!payedTables[table]) }}
            onPressIn={() => {
              Alert.alert(
                "Confirmation",
                "Changer l'état?",
                [

                  { text: "Non", style: "cancel" },
                  {
                    text: "oui",
                    onPress: () => {
                      let xx = [...payedTables]
                      xx[table] = !xx[table]
                      setPayedTables([...xx])
                    }
                  },
                ]
              );
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, marginBottom: 7, marginLeft: 8, marginTop: 7, fontWeight: "bold", textAlign: 'center' }}>{payedTables[table] ? "✔" : "x"}</Text>
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10, marginBottom: 7, marginTop: 7, fontWeight: "bold", textAlign: "center" }}>{payedTables[table] ? "Payé" : "En cours"}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{marginLeft:35,margin:5,borderRadius:4,borderWidth:1,alignItems:"center",justifyContent:'center',backgroundColor:"#ffcccc"}} onPressIn={()=>setCamareroOpen(true)}>
            <NativeBaseProvider>
              <View style={{flexDirection:"row",alignItems:"center",alignSelf:"center",justifyContent:"center",margin:6}}>
              <Icon size="4" as={Ionicons} name="chevron-down-sharp" color='black' />
              <Text style={{fontWeight:"bold",fontSize:15}}>{tableCamarero[table]}</Text>
              </View>
            </NativeBaseProvider>
          </TouchableOpacity>
          <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={camareroOpen}
        onRequestClose={() => {
          setAddModal(false)
          setCamareroOpen(!camareroOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{position:"absolute",flexDirection:"row",width:375,justifyContent:'space-between',margin:15}}>
              <TouchableOpacity style={{borderWidth:0.4,borderRadius:5,backgroundColor:"lightblue"}} onPressIn={()=>{
                setCamareroOpen(!camareroOpen)
                setAddModal(false)
                }}>
                <Text style={{margin:5}}>{'<'} Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderWidth:0.4,borderRadius:5,backgroundColor:"lightgreen"}} onPressIn={()=>{
              
                setAddModal(!addModal)
                }}>
                <Text style={{margin:5}}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <Text style={{position:"absolute",fontSize:26,fontWeight:"bold",marginTop:18}}>Liste :</Text>

          <ScrollView style={{marginTop:50}}>
          {addModal?<View ><Text style={{fontSize:25,fontWeight:"bold",marginBottom:20}}>Nom :</Text><TextInput style={{borderWidth:2,height:40,width:200,marginBottom:30}} onSubmitEditing={({ nativeEvent: { text, eventCount, target }})=>{
            setCamareros([text,...camareros])
            setAddModal(!addModal)
            }}/></View>:null}

            {camList}
          </ScrollView>
            
          </View>
        </View>
      </Modal>
      
    </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPressIn={() => {
            setPrevTable(table)
            setTable(Math.max(1, table - 1))
            setTxt(Math.max(1, table - 1).toString())
          }
          } style={{ height: '100%', width: 70, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderWidth: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 50 }}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
            {table === 0 ? <View></View> : <Pedido tableList={tableList} setTableList={setTableList} setTable={setTable}  table={table} nbrAutres={nbrAutres} setNbrAutres={setNbrAutres} />
            }</TouchableWithoutFeedback>
          <TouchableOpacity onPressIn={() => {
            setPrevTable(table)
            setTable(Math.min(table + 1, tableList.length - 1))
            setTxt(Math.min(table + 1, tableList.length - 1).toString())
          }
          } style={{ height: '100%', width: 70, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderWidth: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 50 }}>{'>'}</Text></TouchableOpacity>

        </View>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  encours: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    alignItems: 'center'
  },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      width:400,
      minHeight:250,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  
});
