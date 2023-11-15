import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import JitBitAPI from '../services/api'; // Assuming this is your API wrapper

const TicketsScreen = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadTickets() {
      const response = await JitBitAPI.getTickets({});
      setTickets(response.data);
    }

    loadTickets();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.ticketItem}>
      <Text style={styles.ticketTitle}>{item.Subject}</Text>
      <Text style={styles.ticketDescription}>{item.UserName}</Text>
      {/* Add more ticket details here */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={item => item.IssueID.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  ticketItem: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: 14,
    color: 'gray',
  },
  // Add more styles as needed
});

export default TicketsScreen;
