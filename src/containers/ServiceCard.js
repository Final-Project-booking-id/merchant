import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'

export default function card(data) {
  const navigation = useNavigation()
  const [modalText, setModalText] = useState('')
  const [ModalVisible, setModalVisible] = useState(false)

  function goToQueue(id) {
    navigation.navigate('Queue', { id })
  }

  function goToDetail() {
    setModalText(data.service.description)
    setModalVisible(true)
  }

  return(
    <View style={styles.card}>
        <View>
            <Text style={styles.title}>{data.service.name}</Text>
            <Text style={styles.desc}>Est. Time: {data.service.estimation_time} </Text>
        </View>
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => {
              goToQueue(data.service.id)
            }}
          >
            <LinearGradient
              colors={['#f86674', '#f9af8b']}
              style={styles.primarybtn}
              start={{ x: 0.1, y: 0.1 }}
              end={{ x: 1.0, y: 0.1 }}
            >
              <Text style={styles.font}>Queues</Text>
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            colors={['#f86674', '#f9af8b']}
            style={styles.borderbtn}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 1.0, y: 0.1 }}
          >
            <TouchableOpacity
              style={styles.secondarybtn}
              onPress={goToDetail}
            >
              <Text style={styles.font}>Detail</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <Modal
        isVisible={ModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={ styles.modalStyle }>
                <Text style={ styles.modalText }>{data.service.name}</Text>
                <Text style={ styles.desc }>Est. Time: {data.service.estimation_time}</Text>
                <Text style={ styles.desc }>{data.service.description}</Text>
            </View>
        </View>
        </Modal>
      </View>
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
    height: 100,
    paddingLeft: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end'
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
  option: {
    display: 'flex',
    flexDirection: 'row'
  },
  primarybtn: {
    width: 80,
    height: 50,
    margin: 5,
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
  modalStyle: {
    // flex: 1,
    height: '25%',
    width: '95%',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#3d4558'
  },
  modalBtn: {
    width: 80,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  modalText: {
    marginLeft: 10,
    color: '#eff2f6',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
