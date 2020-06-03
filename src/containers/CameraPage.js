import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux'
import { verifyId } from '../store/actions'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function QRCamera({ navigation: { goBack } }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const cameraModal = useSelector(state => state.cameraModal)
  const dispatch = useDispatch()
  // const [qrdata, setQrdata] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  function goBack() {
    navigation.navigate('Service')
  }
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Ini function buat proses hasil scannya
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (typeof data == 'string') {
      dispatch(verifyId(data))
        .then(() => {
          toggleModal()
        })
        .catch(() => {
          toggleModal()
        })
      // verifyId(data) //Data nya berisi token
    }
    else {
      alert(`QR Content of type ${type} is not our valid token!`)
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    
      {/* Modal begins */}
      <Modal isVisible={isModalVisible}
      onBackdropPress={() => {
        goBack()
        setModalVisible(false)
        }}>
        <View style={styles.modalStyle}>
          <Text style={styles.modalText}>{cameraModal}</Text>

          {/* <Button style={styles.btn} title="Back" onPress={goBack} /> */}
        </View>
      </Modal>
      {/* Modal end */}

    </View>

  );
}

const styles = StyleSheet.create({
  modalStyle: {
    // flex: 1,
    height: '25%',
    width: '95%',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#3d4558',
    borderRadius: 5
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
