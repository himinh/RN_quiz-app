import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}
    >
      <View style={styles.modalBodyContainer}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.title}>Results</Text>
          <View style={styles.result}>
            <View style={styles.resultTextContainer}>
              <Text style={[styles.resultText, { color: '#00C851' }]}>
                {correctCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Correct</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={[styles.resultText, { color: '#ff4444' }]}>
                {incorrectCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Incorrect</Text>
            </View>
          </View>
          <Text style={{ opacity: 0.8 }}>
            {totalCount - (incorrectCount + correctCount)} Unattempted
          </Text>

          {/* Try agian */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4630EB' }]}
            onPress={handleRetry}
          >
            <MaterialIcons name='replay' style={{ color: '#FFFFFF' }} />
            <Text style={styles.butonText}>Try Again</Text>
          </TouchableOpacity>
          {/* Go Home */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4630EB' + '20' }]}
            onPress={handleHome}
          >
            <MaterialIcons name='home' style={{ color: '#4630EB' }} />
            <Text style={[styles.butonText, { color: '#4630EB' }]}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalBodyContainer: {
    flex: 1,
    backgroundColor: '#171717' + '90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 5,
    padding: 40,
    alignItems: 'center',
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTextContainer: { alignItems: 'center', padding: 20 },
  resultText: { color: 'black', fontSize: 30 },
  title: { fontSize: 28, color: '#171717' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
  },
  butonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 10,
  },
})
