import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import avatar from '../../assets/images/avatar.jpeg'
import Icon from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import { NavbarModal } from './NavbarModal'

export const Header = ({ navigation, text, isShowText = true }) => {
  const [openModal, setOpenModal] = useState(false)
  const { user } = useSelector(authSelector)
  return (
    <>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Icon size={38} style={{ color: 'white' }} name='rocket1' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {text ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: 'rgb(150,225,255)' }}>
            {text}
          </Text>
        </View>
      ) : !isShowText ? null : (
        <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
            Hey {user.name},
          </Text>
        </View>
      )}
      {openModal ? <NavbarModal navigation={navigation} /> : null}
    </>
  )
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 50 },
})
