import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-semibold mb-4">Feedback</Text>
      <TextInput
        className="bg-gray-100 p-3 rounded-md mb-4"
        placeholder="Write your feedback..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit Feedback" onPress={submitFeedback} />
    </View>
  );
};

export default FeedbackScreen;
