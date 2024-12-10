import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import HomeScreen from "../screens/home";
import ComprasScreen from "../screens/compras";
import ProdutosScreen from "../screens/produtos";

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "#f8f9fa" },
      tabBarActiveTintColor: "#684AE8",
    }}
  >
    <Tab.Screen
      name="Clientes"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Compras"
      component={ComprasScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="shopping-cart" size={size} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Produtos"
      component={ProdutosScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Entypo name="box" size={24} color="black" />
        ),
      }}
    />
  </Tab.Navigator>
);
