import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { fetchService } from "../store/actions";
import ServiceCard from "./ServiceCard"

function merchantPage() {
  const navigation = useNavigation()
  const merchant = useSelector(state => state.merchant)
  const merchantId = useSelector(state => state.merchantId)
  const services = useSelector(state => state.services)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchService(merchantId))
  }, [])
  useEffect(() => {
    dispatch(fetchService(merchantId))
  }, [dispatch])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{
          color: '#eff2f6',
          fontSize: 32,
          fontWeight: 'bold'
          }}>{merchant.name.toUpperCase()}</Text>
        <Text style={{
          color: '#eff2f6',
          fontSize: 25,
          fontWeight: '500'
        }}>Your
          <Text style={{
            fontWeight: 'bold'
          }}> Services</Text>
        </Text>
      </View>
      {/* Ini nanti tinggal di map berdasarkan jumlah merchat */}
      {services.map(el => {
        return <ServiceCard service={el}></ServiceCard>
      })
      }
      {/*  sampai sini */}
      
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
  }
})

export default merchantPage