import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const App = () =>{
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState('');
  const [error, setError] = useState('');

  const formatDateString = (inputDate) => {
    let formattedDate = inputDate;
    if (formattedDate.length === 2 || formattedDate.length === 5) {
      formattedDate += '/';
    }
    return formattedDate.slice(0, 10);
  };

  const handleDate1Change = (text) => {
    setDate1(formatDateString(text));
  };

  const handleDate2Change = (text) => {
    setDate2(formatDateString(text));
  };

  const calculateDifference = () => {
    if (!date1 || !date2) {
      setError('Fill in the date fields');
      return;
    }
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date1) || !regex.test(date2)) {
      setError('Use only numbers');
      return;
    }

    setError('');

    const [day1, month1, year1] = date1.split('/');
    const [day2, month2, year2] = date2.split('/');

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date(year2, month2 - 1, day2);

    const timeDifference = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDifference(differenceInDays.toString());
  };

  const clearFields = () => {
    setDate1('');
    setDate2('');
    setDifference('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculate date difference for days</Text>
      <TextInput
        style={styles.input}
        placeholder="type the first date"
        placeholderTextColor="#ccc"
        value={date1}
        onChangeText={handleDate1Change}
      />
      <TextInput
        style={styles.input}
        placeholder="type the second date"
        placeholderTextColor="#ccc"
        value={date2}
        onChangeText={handleDate2Change}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'black' }]} onPress={calculateDifference}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={clearFields}>
          <Text style={styles.buttonText}>Clean</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.result}> {difference}
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'center',
    border: 'none',
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
