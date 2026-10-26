import { Redirect, router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/store/auth-store";

export default function CheckoutScreen() {
  const { isHydrating, isLoggedIn, user } = useAuth();

  if (isHydrating)
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );

  if (!isLoggedIn)
    return (
      <Redirect
        href={{ pathname: "/login", params: { returnTo: "checkout" } }}
      />
    );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.copy}>You are checking out as {user?.email}.</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Your order</Text>
          <View style={styles.row}>
            <Text>Atomic Habits</Text>
            <Text>$16.00</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.boldText}>Total</Text>
            <Text style={styles.boldText}>$16.00</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => router.replace("/")}>
          <Text style={styles.buttonText}>Place demo order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
  copy: { color: "gray", marginBottom: 16 },
  summary: { borderWidth: 1, borderColor: "#ccc", padding: 16 },
  summaryTitle: { fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 12,
    paddingTop: 12,
  },
  boldText: { fontWeight: "bold" },
  button: {
    marginTop: 16,
    backgroundColor: "#000",
    padding: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
});
