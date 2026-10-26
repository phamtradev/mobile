import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { RatingStars } from "@/components/rating-stars";
import { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  const average =
    book.reviews.reduce((sum, review) => sum + review.rating, 0) /
    book.reviews.length;

  return (
    <Link href={{ pathname: "/books/[id]", params: { id: book.id } }} asChild>
      <Pressable style={styles.card}>
        <View style={styles.cover}>
          <Text style={styles.coverText}>BOOK</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.rating}>
            <RatingStars value={average} size={15} />
            <Text>{average.toFixed(1)}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 8,
  },
  cover: {
    width: 50,
    height: 70,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  coverText: { color: "#fff", fontWeight: "bold" },
  details: { flex: 1, paddingLeft: 10, justifyContent: "center" },
  title: { fontWeight: "bold" },
  author: { color: "gray" },
  rating: { flexDirection: "row", gap: 4, alignItems: "center", marginTop: 4 },
});
