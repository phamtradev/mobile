import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { RatingStars } from "@/components/rating-stars";
import { books } from "@/data/books";
import { reviewService } from "@/services/review-service";
import { useAuth } from "@/store/auth-store";
import { Review } from "@/types";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = books.find((item) => item.id === id) ?? books[0];
  const { isLoggedIn, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(book.reviews);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const average = useMemo(
    () =>
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    [reviews],
  );

  const related = books.filter(
    (item) => item.category === book.category && item.id !== book.id,
  );

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert(
        "Complete your review",
        "Choose a star rating and add a comment.",
      );
      return;
    }
    setSubmitting(true);
    try {
      const review = await reviewService.create(book.id, {
        userName: user?.name ?? "Reader",
        rating,
        comment: comment.trim(),
      });
      setReviews((current) => [review, ...current]);
      setRating(0);
      setComment("");
    } catch {
      Alert.alert("Review not sent", "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.cover}>
            <Text style={styles.coverText}>BOOK</Text>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.category}>{book.category}</Text>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
          </View>
        </View>

        <Text style={styles.description}>{book.description}</Text>

        <View style={styles.ratingSummary}>
          <RatingStars value={average} size={25} />
          <Text style={styles.boldText}>{average.toFixed(1)}</Text>
          <Text style={styles.mutedText}>({reviews.length} reviews)</Text>
        </View>

        <Text style={styles.sectionTitle}>Reviews</Text>

        {isLoggedIn ? (
          <View style={styles.form}>
            <Text style={styles.boldText}>Write a review</Text>
            <RatingStars value={rating} size={31} onChange={setRating} />
            <TextInput
              value={comment}
              onChangeText={setComment}
              style={styles.comment}
              multiline
              placeholder="What did you think?"
              textAlignVertical="top"
            />
            <Pressable
              disabled={submitting}
              style={[styles.submit, submitting && styles.disabled]}
              onPress={() => void submitReview()}>
              <Text style={styles.submitText}>
                {submitting ? "Posting…" : "Post review"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => router.push("/login")}
            style={styles.signIn}>
            <Text style={styles.signInText}>Log in to write a review →</Text>
          </Pressable>
        )}

        {reviews.map((review) => (
          <View key={review.id} style={styles.review}>
            <View style={styles.reviewTop}>
              <Text style={styles.boldText}>{review.userName}</Text>
              <RatingStars value={review.rating} size={15} />
            </View>
            <Text>{review.comment}</Text>
          </View>
        ))}

        {related.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Related books</Text>
            <FlatList
              horizontal
              data={related}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/books/[id]",
                      params: { id: item.id },
                    })
                  }
                  style={styles.related}>
                  <View style={styles.smallCover}>
                    <Text style={styles.coverText}>BOOK</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.boldText}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.mutedText}>
                    {item.author}
                  </Text>
                </Pressable>
              )}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16 },
  hero: { flexDirection: "row" },
  cover: {
    width: 100,
    height: 140,
    backgroundColor: "#000",
    alignItems: "center",
    justify: "center",
  },
  coverText: { color: "#fff", fontWeight: "bold" },
  heroText: { flex: 1, paddingLeft: 12, justifyContent: "center" },
  category: { color: "gray" },
  title: { fontSize: 20, fontWeight: "bold" },
  author: { color: "gray" },
  description: { marginTop: 12 },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  form: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 12 },
  comment: {
    borderWidth: 1,
    borderColor: "#ccc",
    minHeight: 80,
    padding: 8,
    marginTop: 8,
  },
  submit: {
    marginTop: 8,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#000",
  },
  disabled: { opacity: 0.5 },
  submitText: { color: "#fff", fontWeight: "bold" },
  signIn: {
    padding: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    marginBottom: 12,
  },
  signInText: { fontWeight: "bold" },
  review: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  reviewTop: {
    flexDirection: "row",
    alignItems: "center",
    justify: "space-between",
    marginBottom: 4,
  },
  related: { width: 110, marginRight: 12 },
  smallCover: {
    height: 100,
    backgroundColor: "#000",
    alignItems: "center",
    justify: "center",
    marginBottom: 4,
  },
  boldText: { fontWeight: "bold" },
  mutedText: { color: "gray" },
});
