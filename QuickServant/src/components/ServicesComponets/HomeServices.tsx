import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  ListRenderItem,
} from 'react-native';
import ServiceCard from './ServiceCard'; // adjust path based on your folder structure

type Service = {
  id: string;
  name: string;
  category: 'House' | 'Vehicle' | string;
};

const allServices: Service[] = [
  { id: '1', name: 'Plumbing', category: 'House' },
  { id: '2', name: 'Electrician', category: 'House' },
  { id: '3', name: 'Car Wash', category: 'Vehicle' },
  { id: '4', name: 'Carpenter', category: 'House' },
  { id: '5', name: 'Cleaning', category: 'House' },
  { id: '6', name: 'Bike Repair', category: 'Vehicle' },
];

const HomeServices: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    const houseServices = allServices.filter(service => service.category === 'House');
    setFilteredServices(houseServices);
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = allServices.filter(
      service =>
        service.category === 'House' &&
        service.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const renderItem: ListRenderItem<Service> = ({ item }) => (
    <ServiceCard
      name={item.name}
      onPress={() => console.log('Pressed:', item.name)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-xl font-bold text-blue-600 mb-3">Search House Services</Text>

      <TextInput
        placeholder="Search services..."
        value={search}
        onChangeText={handleSearch}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base bg-gray-50"
        placeholderTextColor="#aaa"
      />

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-5">No services found.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default HomeServices;
