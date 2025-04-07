import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../styles/styles';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  ILS: '₪',
  CAD: '$',
  NZD: '$',
  AUD: '$',
  AED: 'د.إ',
  ADA: '₳',
};

const currencyFullForms = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  ILS: 'Israeli Shekel',
  CAD: 'Canadian Dollar',
  NZD: 'New Zealand Dollar',
  AUD: 'Australian Dollar',
  AED: 'Emirati Dirham',
  ADA: 'Cardano',
};

const formatIndianNumber = (num) => {
  if (!num) return '0';
  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
};

const evaluateExpression = (expression) => {
  try {
    const sanitized = expression
      .replace('×', '*')
      .replace('÷', '/')
      .replace('−', '-');
    const result = new Function(`return ${sanitized}`)();
    return isNaN(result) || !isFinite(result) ? null : result;
  } catch (error) {
    return null;
  }
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('ILS');
  const [toCurrency, setToCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [recentCalculations, setRecentCalculations] = useState([]);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => setCurrencies(Object.keys(data.rates)))
      .catch(console.error);
  }, []);

  const convertCurrency = () => {
    if (!amount) return alert('Enter valid amount');
    if (!fromCurrency || !toCurrency) return alert('Select both currencies');

    const calculatedAmount = evaluateExpression(amount);
    if (calculatedAmount === null) return alert('Invalid calculation');

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[toCurrency];
        const result = calculatedAmount * rate;

        let formattedResult = toCurrency === 'INR'
          ? formatIndianNumber(result.toFixed(2))
          : result.toLocaleString('en-US', { maximumFractionDigits: 2 });

        setConvertedAmount(formattedResult);

        const timestamp = new Date().toLocaleString();
        const newCalculation = `${amount}${fromCurrency} = ${formattedResult} ${toCurrency} ${timestamp}`;
        const updatedCalculations = [newCalculation, ...recentCalculations].slice(0, 5);
        setRecentCalculations(updatedCalculations);
      })
      .catch(() => alert('Conversion failed'));
  };

  const openDropdown = (dropdownRef) => {
    if (dropdownRef.current) {
      dropdownRef.current.show();
    }
  };

  const handleCalculatorPress = (value) => {
    if (value === 'C') {
      setAmount('');
      setConvertedAmount(null);
    } else if (value === '=') {
      convertCurrency();
    } else if (value === '⌫') {
      setAmount(prev => prev.slice(0, -1));
    } else {
      const lastChar = amount.slice(-1);
      const isOperator = ['+', '−', '×', '÷'].includes(value);
      const lastIsOperator = ['+', '−', '×', '÷'].includes(lastChar);
      
      if (isOperator && lastIsOperator) {
        setAmount(prev => prev.slice(0, -1) + value);
      } else {
        setAmount(prev => prev + value);
      }
    }
  };

  const calculatorButtons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const renderRecentItem = ({ item }) => (
    <Text style={styles.recentText}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Converter</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => openDropdown(fromDropdownRef)}
        >
          <ModalDropdown
            ref={fromDropdownRef}
            options={currencies.map(c => `${c} - ${currencyFullForms[c]}`)}
            defaultIndex={-1}
            defaultValue={`${fromCurrency} - ${currencyFullForms[fromCurrency]}`}
            onSelect={(index, value) => setFromCurrency(value.split(' - ')[0])}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownMenu}
          />
        </TouchableOpacity>
        <Text style={styles.amountText}>{amount || '0'}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => openDropdown(toDropdownRef)}
        >
          <ModalDropdown
            ref={toDropdownRef}
            options={currencies.map(c => `${c} - ${currencyFullForms[c]}`)}
            defaultIndex={-1}
            defaultValue={`${toCurrency} - ${currencyFullForms[toCurrency]}`}
            onSelect={(index, value) => setToCurrency(value.split(' - ')[0])}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownMenu}
          />
        </TouchableOpacity>
        <Text style={styles.amountText}>{convertedAmount || '0'}</Text>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.recentTitle}>Recents</Text>
        <FlatList
          data={recentCalculations}
          renderItem={renderRecentItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.recentText}>No recent calculations</Text>}
          style={styles.recentList}
        />
      </View>

      <View style={styles.calculatorContainer}>
        {calculatorButtons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.calculatorRow}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.calculatorButton,
                  button === '=' && styles.equalButton,
                  button === '0' && styles.zeroButton,
                ]}
                onPress={() => handleCalculatorPress(button)}
              >
                <Text 
                  style={[
                    styles.calculatorButtonText,
                    button === '=' && styles.equalButtonText
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CurrencyConverter;