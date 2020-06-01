import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { verifyId } from '../store/actions'
import Modal from 'react-native-modal';

export default function QRCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Ini function buat proses hasil scannya
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (typeof data == 'string') {
      toggleModal()
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
      onBackdropPress={() => setModalVisible(false)}>
        <View style={{flex: 1}}>
          <Text>Sending data...</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      {/* Modal end */}

    </View>

  );
}
