import { Tabs, Redirect } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
      <Redirect href="/explore" /> {/* This will redirect away from index */}
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}