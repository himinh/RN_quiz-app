import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions'
import { authSelector } from '../redux/selector'
import { axiosInstance } from '../utils/axiosInstance'

export const NavbarModal = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(authSelector)

  const signOut = async () => {
    await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    dispatch(logout())
  }
  return (
    <View style={styles.navbarModalContainer}>
      <TouchableOpacity style={styles.navbarOption}>
        <Text>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut} style={styles.navbarOption}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  navbarModalContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 12,
    zIndex: 100,
  },
  navbarOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#F5F5F7',
  },
})
