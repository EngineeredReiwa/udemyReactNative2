import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCL6QxT66Wk5zTnhLfpKhaLuDp9eKBrlTA",
    authDomain: "shop-review-34578.firebaseapp.com",
    projectId: "shop-review-34578",
    storageBucket: "shop-review-34578.appspot.com",
    messagingSenderId: "704873982351",
    appId: "1:704873982351:web:e83af5528b70ac08ffc3fa",
    measurementId: "G-M9ZHRTHG7X",
  };
  firebase.initializeApp(firebaseConfig);
}

type Shop = {
  name: string;
  place: string;
};

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    setShops(shops);
    console.log(shops);
  };

  const shopItems = shops.map((shop, index) => {
    return (
      <View style={{ margin: 10 }} key={index.toString()}>
        <Text>{shop.name}</Text>
        <Text>{shop.place}</Text>
      </View>
    );
  });

  return <View style={styles.container}>{shopItems}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
