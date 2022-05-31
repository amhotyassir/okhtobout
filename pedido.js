import * as React from 'react';
import {TouchableOpacity, View, Text,Modal, Alert,TextInput,StyleSheet,Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { NativeBaseProvider,Icon,Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Rect } from 'react-native-svg';

 export default function Pedido({ tableList, setTableList,setTable,setTxt, table,nbrAutres,setNbrAutres }) {
    let somme=0;
    
    const convert =(obj,str)=>{
       
      let xxx=[...tableList]
      let x=[...obj];
      let list = obj.map((arr, index) =>{
        return <View  key={index} style={{ flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:60,borderWidth:0.3,}}>
          <View style={{marginLeft:20,width:120}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>{arr.name} :</Text>
          </View>
         <TextInput keyboardType='decimal-pad' style={{minWidth:50,borderWidth:1.3,borderColor:"gray",fontWeight:'bold',fontSize:22,textAlign:'center',marginRight:30}}
         onChange={({ nativeEvent: { text, eventCount, target }})=>{
           x[index].quantity=text

           if (str==="salade"){
            xxx[table].salade=x
            
          }
          if (str==="boisson"){
            xxx[table].boisson=x
            
          }
          if (str==="entree"){
            xxx[table].entree=x
            
          }
          if (str==="postre"){
              xxx[table].postre=x
              
            }
            if (str==="pesca"){
                xxx[table].pescados[0]=x[index]
                
              }setTableList([...xxx])
            }} value={arr.quantity||'0'}/>
          
         
              
          
          <TouchableOpacity  onPressIn={()=>{
            
              x[index].quantity=(Number(x[index].quantity)+1).toString()
              if (str==="salade"){
                xxx[table].salade=x
                
              }
              if (str==="boisson"){
                xxx[table].boisson=x
                
              }
              if (str==="entree"){
                xxx[table].entree=x
                
              }
              if (str==="postre"){
                  xxx[table].postre=x
                  
                }
                if (str==="pesca"){
                    xxx[table].pescados[0]=x[index]
                    
                  }setTableList([...xxx])
            
            
          }} style={{backgroundColor:'#00cc00',borderRadius:10,width:50,height:40,alignItems:'center',justifyContent:'center',marginRight:30}}>
            <Text style={{color:'white',fontSize:25,textAlign:'center',alignSelf:'center'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPressIn={()=>{
            
              x[index].quantity=Math.max((Number(obj[index].quantity))-1,0).toString()
            if (x[index].quantity==='0'){
                x[index].isServed=false
                if (str==="autres"){
                  xxx[table].autres=xxx[table].autres.filter(function(value, ind, arr){ 
                    let t=[...nbrAutres]
                    t[table]=t[table]-1

                    setNbrAutres([...t])
                    return ind !== index;
                })
                  setTableList([...xxx])
                }
              }
            if (str==="salade"){
              xxx[table].salade=x
              
            }
            if (str==="boisson"){
              xxx[table].boisson=x
              
            }
            if (str==="entree"){
              xxx[table].entree=x
              
            }
            if (str==="postre"){
                xxx[table].postre=x
                
              }
              if (str==="pesca"){
                  xxx[table].pescados[0]=x[index]
                  
                }
              setTableList([...xxx])
            
            
                
            
            
          }} style={{backgroundColor:'red',width:50,height:40,alignItems:'center',justifyContent:'center',marginRight:40,borderRadius:10}}>
            <Text style={{color:'white',fontSize:25,textAlign:'center'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:25,height:25,backgroundColor:"green".repeat(arr.isServed)+"white".repeat((!arr.isServed)),borderWidth:0.2}} onPressIn={()=>{
            
            x[index].isServed=(arr.quantity!=="0")? !(x[index].isServed):(x[index].isServed)
            if (str==="salade"){
              xxx[table].salade=x
              
            }
            if (str==="boisson"){
              xxx[table].boisson=x
              
            }
            if (str==="entree"){
              xxx[table].entree=x
              
            }
            if (str==="postre"){
                xxx[table].postre=x
                
              }
              
            if (str==="pesca"){
                xxx[table].pescados[0]=x[index]
                
              }
            setTableList([...xxx])
            
            
            
          }}><Text style={{color:"white",fontSize:16,alignSelf:'center'}}>✔</Text></TouchableOpacity>
          <Text style={{marginRight:30,width:50,marginLeft:20,fontWeight:'bold',fontSize:20,textAlign:"center"}}>{(arr.unitPrice*parseFloat(arr.quantity)).toFixed()}</Text>
        </View>})
      let smm=0
      for (let i = 0; i < obj.length; i++) {
     smm=smm+obj[i].quantity*obj[i].unitPrice;
    }
      return {
        list:list,
        x:x,
        smm:smm
      }
    }
  //  
    // try{
  
    let saladeArray=convert(tableList[table].salade,"salade")
    let boissonArray=convert(tableList[table].boisson,"boisson")
    let entreeArray=convert(tableList[table].entree,"entree")
    let xx=[...tableList]
    let pescaArray=tableList[table].pescados.slice(1,tableList[table].pescados.length).map((obj,index)=>{
        index=index+1
        return <View  key={index} style={{ flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:60,borderWidth:0.3,}}>
        
        <RadioButton
        status={ obj.exists? 'checked' : 'unchecked' }
        onPressIn={() => {
          if (xx[table].pescados[index].exists){
            xx[table].pescados[index].fish=''
            xx[table].pescados[index].isServed=false
          }
            xx[table].pescados[index].exists=!xx[table].pescados[index].exists

            setTableList([...xx])
        }}
      />
       <View style={{width:130}}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>{obj.way} :</Text>
        </View>
          
        <TextInput style={{width:120,borderWidth:1.3,fontWeight:'bold',fontSize:22,textAlign:'center',}}  value={obj.fish} onChange={({ nativeEvent: { text, eventCount, target }}) =>{
          
          xx[table].pescados[index].fish=text
          if (text!=""){xx[table].pescados[index].exists=true}
          setTableList([...xx])
        }}/>
        
        
        <TouchableOpacity style={{width:25,height:25,backgroundColor:"green".repeat(obj.isServed)+"white".repeat((!obj.isServed)),borderWidth:0.2}} onPressIn={()=>{
          xx[table].pescados[index].isServed=(obj.exists)? !(xx[table].pescados[index].isServed):(xx[table].pescados[index].isServed)
          setTableList([...xx])
          
        }}><Text style={{color:"white",fontSize:16,alignSelf:'center'}}>✔</Text></TouchableOpacity>
                  <Text style={{marginRight:30,width:50,marginLeft:20,fontWeight:'bold',fontSize:20,textAlign:"center"}}>-</Text>

      </View>
    })
    
    let postreArray=convert(tableList[table].postre,"postre")
    let autresArray=convert(tableList[table].autres.slice(0,nbrAutres[table]),"autres")
    somme=saladeArray.smm+(autresArray.smm||0)+boissonArray.smm+entreeArray.smm+postreArray.smm+tableList[table].pescados[0].quantity*tableList[table].pescados[0].unitPrice
    
    return <View style={{marginTop:40,justifyContent:"space-around",flex:1}}>
        <View  style={{flex:1}}>
        <View style={{borderWidth:2,alignItems:'center',flexDirection:'row',}}>
        <View style={{width:110}}>
                    <Text style={[{fontWeight:'bold',fontSize:25}, {
                        transform: [{ rotate: "270deg" }]
                    }]}>Pescado</Text>
                </View>
                <View style={{flexDirection:'column',flex:1}}>
                {convert([...tableList[table].pescados.slice(0,1)],"pesca").list}
            {pescaArray}</View>
            </View>
            
   
            
            <View style={{borderWidth:2,alignItems:'center',flexDirection:'row'}}>
            <View style={{width:110}}>
                    <Text style={[{fontWeight:'bold',fontSize:25}, {
                        transform: [{ rotate: "270deg" }]
                    }]}>Entées</Text>
                </View>
                <View style={{flexDirection:'column',flex:1}}>
            {entreeArray.list}</View>
            </View>
            
            <View style={{borderWidth:2,alignItems:'center',flexDirection:'row'}}>
                <View style={{width:110}}>
                    <Text style={[{fontWeight:'bold',fontSize:25}, {
                        transform: [{ rotate: "270deg" }]
                    }]}>Boissons</Text>
                </View>
                <View style={{flexDirection:'column',flex:1}}>
            {boissonArray.list}</View>
            </View>

            <View style={{borderWidth:2,alignItems:'center',flexDirection:'row'}}>
                <View style={{width:110}}>
                    <Text style={[{fontWeight:'bold',fontSize:25}, {
                        transform: [{ rotate: "270deg" }]
                    }]}>Postre</Text>
                </View>
                <View style={{flexDirection:'column',flex:1}}>
            {postreArray.list}</View>
            </View>

            <View style={{borderWidth:2,alignItems:'center',flexDirection:'row'}}>
                <View style={{width:110}}>
                    <Text style={[{fontWeight:'bold',fontSize:25,textAlign:'center'}, {
                        transform: [{ rotate: "0deg" }]
                    }]}>Autres</Text>
                </View>
                <View style={{flexDirection:'column',flex:1}}>
                {autresArray.list}
                <View style={{flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:60,borderWidth:0.3}}>
                    <TextInput style={{marginLeft:20,width:100,fontSize:16,height:40,fontWeight:"bold",borderWidth:2,marginRight:20,alignItems:"center",justifyContent:"center",textAlign:'center'}}
                    
                    value={tableList[table].autres[nbrAutres[table]].name} 
                    onChange={({ nativeEvent: { text, eventCount, target }})=>{
                     
                      let x=[...tableList]
                      x[table].autres[nbrAutres[table]].name=text
                      setTableList([...x])
                      }}/>
                    <TextInput keyboardType='decimal-pad' style={{minWidth:80,borderWidth:1.3,borderColor:"blue",fontWeight:'bold',fontSize:22,textAlign:'center',marginRight:30}} value={(tableList[table].autres[nbrAutres[table]].unitPrice).toString()} onChange={({ nativeEvent: { text, eventCount, target }})=>{
                    let x=[...tableList]
                    x[table].autres[nbrAutres[table]].unitPrice=parseFloat(text||0).toFixed()
                    setTableList([...x])
                    }} />
                    <TouchableOpacity style={{width:40,marginLeft:70,height:30,borderRadius:5,alignItems:'center',alignSelf:'center',backgroundColor:'#0066ff'}}
                    onPressIn={()=>{
                      let x=[...tableList]
                      if (x[table].autres[nbrAutres[table]].unitPrice===0){Alert.alert('Attention','Entrer le prix')}
                     else{
                       let k=[...nbrAutres]
                       k[table]=k[table]+1
                      
                      x[table].autres=[...x[table].autres,{ name: '', quantity: '1', isServed: false, unitPrice: 0 }]
                      setNbrAutres([...k])
                      setTableList([...x])
                     }
                    }}
                    >
                        <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            

        </View>
        <Text  style={{marginTop:20,fontSize:50,marginBottom:40,fontWeight:"bold",alignSelf:'center'}}>Total : {somme}</Text> 
    </View>
    //         }catch{ 
    //   Alert.alert('erreur','Numéro de table invalide')
    //   setTable(prevTable)
    //   setTxt(prevTable.toString())
  
    //   return null
    // }
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
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,marginTop:-15,
        height:350,
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
        textAlign: "center",
      }
    
  });