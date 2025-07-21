import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '~/navigations/types';
import { services } from '~/services/fetchServices';

type Props = NativeStackScreenProps<RootStackParamList, 'services'>;

type Service = {
  id: string;
  name: string;
  category: string;
};

const Services: React.FC<Props> = ({ route }) => {
  const { serviceName } = route.params;
  const [search, setSearch] = useState('');
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredList, setFilteredList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      const data = await services();
      setAllServices(data);
      setLoading(false);

      const filtered = data.filter(
        (item: Service) =>
          item.category.toLowerCase() === serviceName.toLowerCase()
      );
      setFilteredList(filtered);
    };
    loadServices();
  }, [serviceName]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const result = allServices.filter(
      (item) =>
        item.category.toLowerCase() === serviceName.toLowerCase() &&
        item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(result);
  };

  return (
    <SafeAreaView className="flex-1 px-4 pt-6">
      <Text className="text-2xl font-bold text-purple-600 mb-3">
        {serviceName} Services
      </Text>

      <TextInput
        placeholder={`Search ${serviceName} services...`}
        value={search}
        onChangeText={handleSearch}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base bg-gray-50"
        placeholderTextColor="#aaa"
      />

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-blue-100 rounded-xl p-4 mb-3">
            <Text className="text-blue-900 font-semibold text-lg">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          loading ? (
            <Text className="text-center text-gray-500 mt-5">Loading...</Text>
          ) : (
            <Text className="text-center text-gray-500 mt-5">
              No services found.
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Services;
