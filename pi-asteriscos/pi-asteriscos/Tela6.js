import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Tela6({ navigation }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log(`Avaliação: ${rating} estrelas. Comentário: ${comment}`);
   
    navigation.navigate('Notificacoes'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como foi o atendimento?</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={rating >= star ? styles.starSelected : styles.star}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Comentário (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Enviar avaliação" color="#4E89AE" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06101B',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    color: '#A0A0A0',
    marginHorizontal: 5,
  },
  starSelected: {
    fontSize: 40,
    color: '#FFD700',
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    height: 80,
    textAlignVertical: 'top',
  },
});
