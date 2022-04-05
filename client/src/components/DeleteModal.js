import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

export const DeleteModal = ({
  isModalVisible,
  item,
  setIsModalVisible,
  handleDelete,
  text,
  title,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}
    >
      <View style={styles.modalBodyContainer}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.title}>
            {text}:{'  '}
            <Text style={[styles.title, { fontSize: 18, color: 'blue' }]}>
              {title}
            </Text>
          </Text>

          {/* Try agian */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => {
              setIsModalVisible(false)
              handleDelete(item.id)
            }}
          >
            <Text style={styles.butonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#a6a6a9cc' }]}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={[styles.butonText, { color: 'blue' }]}>Cancel</Text>
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
  title: { fontSize: 16, color: '#171717' },
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
    fontSize: 14,
  },
})
