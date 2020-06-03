import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueue } from "../store/actions";
import QueueCard from "./QueueCard"

function merchantPage({ navigation: { goBack }, route }) {
  const navigation = useNavigation()
  const { id } = route.params
  const dispatch = useDispatch()
  // Karena ngutak-atik reducer ribet, lebih baik ambil nama service dari sini
  const services = useSelector(state => state.services)
  const index = id - 1
  // End
  const queue = useSelector(state => state.queues)
  const [ModalVisible, setModalVisible] = useState(false)
  
  useEffect(() => {
    dispatch(fetchQueue(id))
  }, [dispatch])

  function accessHistory() {
    navigation.navigate('History', { id })
  }

  function goToCamera() {
    navigation.navigate('QRCamera')
  }

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{
              height: 40,
              justifyContent: 'center',
              marginRight: 20
            }}
          >
            <Text style={{ color: '#f74658', fontWeight: 'bold' }}>
              Back
            </Text>
          </TouchableOpacity>
        <Text style={{
          height: 40,
          color: '#2b2b2b',
          fontSize: 22.5,
          textAlignVertical: 'center'
        }}>Service:
        </Text>
          <Text style={{
            color: '#2b2b2b',
            fontSize: 25,
            fontWeight: '500',
            fontWeight: 'bold'
          }}>{services[index].name}</Text> 
      </View>
      {/* Ini nanti tinggal di map berdasarkan jumlah merchat */}
      {queue.map(el => {
          return <QueueCard order={el} />
      })}
      {/*  sampai sini */}
        <View style={styles.option}>
          <TouchableOpacity
            onPress={goToCamera}
          >
            <LinearGradient
              colors={['#f86674', '#f9af8b']}
              style={styles.historyBtn}
              start={{ x: 0.1, y: 0.1 }}
              end={{ x: 1.0, y: 0.1 }}
            >
              <Text style={styles.font}>Scan</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={accessHistory}
          >
            <LinearGradient
              colors={['#f86674', '#f9af8b']}
              style={styles.historyBtn}
              start={{ x: 0.1, y: 0.1 }}
              end={{ x: 1.0, y: 0.1 }}
            >
              <Text style={styles.font}>Order History</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

    </View>
    <Modal
    isVisible={ModalVisible}
    onBackdropPress={() => setModalVisible(false)}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={ styles.modalStyle }>
            <Text style={ styles.modalText }>Order Cancelled</Text>
        </View>
    </View>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d4558',
    paddingTop: Constant.statusBarHeight,
    padding: 15,
    fontFamily: 'monospace'
  },
  header: {
    width: '100%',
    height: 130,
    paddingLeft: 20,
    paddingBottom: 20,
    borderRadius: 20,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
    height: 70,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#30384d',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#30384d',
  },
  items: {
    color: '#ffffff'
  },
  option: {
    display: 'flex',
    flexDirection: 'row'
  },
  historyBtn: { //Formerly primarybtn
    width: 200,
    height: 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  secondarybtn: {
    width: 78,
    height: 48,
    backgroundColor: '#30384d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  borderbtn: {
    height: 50,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
    marginRight: 0
  },
  title: {
    marginLeft: 10,
    color: '#eff2f6',
    fontSize: 20,
    fontWeight: 'bold'
  },
  desc: {
    marginLeft: 10,
    color: '#eff2f6',
    fontSize: 14,
    fontWeight: '800'
  },
  font: {
    color: '#eff2f6',
    fontWeight: '600'
  },
  modal: {
      height: '25%',
      width: '95%',
      backgroundColor: 'white',
      borderRadius: 10
  }
})

export default merchantPage