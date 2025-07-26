import * as React from 'react';
import './global.css';
import RootNavigation from './src/navigations/RootNavigation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <RootNavigation />
      <Toast
        position="top"
        visibilityTime={3000}
        autoHide={true}
        topOffset={50}
        bottomOffset={40}
        config={{
          success: (props) => (
            <View
              style={{
                backgroundColor: '#10b981',
                padding: 12,
                borderRadius: 12,
                marginHorizontal: 20,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                {props.text1}
              </Text>
              {props.text2 ? (
                <Text style={{ color: 'white', marginTop: 4 }}>{props.text2}</Text>
              ) : null}
            </View>
          ),
          error: (props) => (
            <View
              style={{
                backgroundColor: '#ef4444',
                padding: 12,
                borderRadius: 12,
                marginHorizontal: 20,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                {props.text1}
              </Text>
              {props.text2 ? (
                <Text style={{ color: 'white', marginTop: 4 }}>{props.text2}</Text>
              ) : null}
            </View>
          ),
        }}
      />
    </>
  );
}
