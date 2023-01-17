import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';

import { Participant } from '../../components/Participant';

export function Home(){

    const [participants, setParticipants] = useState<String[]>([]);
    const [participantName, setParticipantName] = useState('');

   function handleParticipantAdd(){
    if(participants.includes(participantName)){
        return Alert.alert('Participante existente', 'Este participante já está na lista!');
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
   } 

   function handleParticipantRemove(name: string){

    Alert.alert('Remover participante', `Remover o(a) participante ${name}?`, [
        { 
            text: 'remover',
            onPress: () => setParticipants(prevSate => prevSate.filter(participant => participant !== name))
        },
        {
            text: 'cancelar',
            style: 'cancel'
        }
    ])
    console.log(`Você clicou no botão remover ${name}`);
   }

  return(
    <View style={styles.container}>
        <Text style={styles.eventName}>
            Nome do Evento
        </Text>
        <Text style={styles.eventDate}>
            terça, 10 de janeiro de 2023
        </Text>
        <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder="Nome do participante"
                placeholderTextColor='#6B6B6B'
                onChangeText={setParticipantName}
                value={participantName}
            />
            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>

        <FlatList 
            data={participants}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <Participant 
                    key={item}
                    name={item}
                    onRemove={() => handleParticipantRemove(item)}
                />
            )}
            ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                    Ninguém chegou no evento ainda? Adicione participantes à sua lista de presença.
                </Text>
            )}
        />
        
    </View>
  );
}