import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BookCard } from "@/components/book-card";
import { books } from "@/data/books";
import { useAuth } from "@/store/auth-store";

export default function HomeScreen() {
  const { isHydrating, isLoggedIn, user, logout } = useAuth();

  if (isHydrating)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );

  const openCheckout = () =>
    router.push(
      isLoggedIn
        ? "/checkout"
        : { pathname: "/login", params: { returnTo: "checkout" } },
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>
              {isLoggedIn ? `Hi, ${user?.name}` : "Find your next read"}
            </Text>
            <Text style={styles.subtitle}>Stories worth staying in for.</Text>
          </View>
          {isLoggedIn ? (
            <Pressable onPress={() => void logout()}>
              <Text style={styles.actionText}>Log out</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.actionText}>Log in</Text>
            </Pressable>
          )}
        </View>

        <Pressable style={styles.checkout} onPress={openCheckout}>
          <Text style={styles.checkoutText}>Go to checkout</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Featured books</Text>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { padding: 16 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  greeting: { fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "gray" },
  actionText: { fontWeight: "bold" },
  checkout: {
    backgroundColor: "#000",
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  checkoutText: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
});
