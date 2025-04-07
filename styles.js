import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  currencySelector: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownMenu: {
    width: '80%',
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recentSection: {
    height: 180, // Fixed height for consistent space (adjust as needed)
    marginVertical: 10, // Consistent spacing above and below
    backgroundColor: '#f9f9f9', // Slight background to distinguish section
    borderRadius: 8,
    padding: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  recentList: {
    flexGrow: 0, // Prevents FlatList from expanding beyond its container
  },
  calculatorContainer: {
    marginTop: 10, // Reduced from 20 to balance spacing
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calculatorButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 5,
  },
  zeroButton: {
    flex: 2,
  },
  equalButton: {
    backgroundColor: '#007AFF',
  },
  calculatorButtonText: {
    fontSize: 20,
    color: '#000',
  },
  equalButtonText: {
    color: '#fff', // White text for equal button
  },
});

export default styles;