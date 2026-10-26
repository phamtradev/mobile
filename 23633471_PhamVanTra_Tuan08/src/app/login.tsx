import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/store/auth-store";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const next: FormErrors = {};
    if (mode === "register" && name.trim().length < 2)
      next.name = "Please enter at least 2 characters.";
    if (!emailPattern.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    try {
      if (mode === "login") await login(email.trim(), password);
      else await register(name.trim(), email.trim(), password);
      router.replace(returnTo === "checkout" ? "/checkout" : "/");
    } catch {
      setErrors({ form: "We could not sign you in. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: "login" | "register") => {
    setMode(next);
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", default: undefined })}>
        <Text style={styles.title}>
          {mode === "login" ? "Welcome back" : "Create account"}
        </Text>
        <Text style={styles.subtitle}>
          {mode === "login"
            ? "Log in to continue to your books."
            : "Save reviews and make checkout easy."}
        </Text>
        <View style={styles.tabs}>
          <Pressable
            onPress={() => switchMode("login")}
            style={[styles.tab, mode === "login" && styles.activeTab]}>
            <Text style={mode === "login" ? styles.activeTabText : undefined}>
              Log in
            </Text>
          </Pressable>
          <Pressable
            onPress={() => switchMode("register")}
            style={[styles.tab, mode === "register" && styles.activeTab]}>
            <Text
              style={mode === "register" ? styles.activeTabText : undefined}>
              Register
            </Text>
          </Pressable>
        </View>
        {mode === "register" && (
          <Field
            label="Name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
          />
        )}
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />
        {errors.form && <Text style={styles.error}>{errors.form}</Text>}
        <Pressable
          disabled={submitting}
          onPress={() => void submit()}
          style={[styles.submit, submitting && styles.disabled]}>
          <Text style={styles.submitText}>
            {submitting
              ? "Please wait…"
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field(
  props: { label: string; error?: string } & React.ComponentProps<
    typeof TextInput
  >,
) {
  const { label, error, ...inputProps } = props;
  return (
    <View style={styles.field}>
      <Text>{label}</Text>
      <TextInput
        {...inputProps}
        style={[styles.input, error && styles.inputError]}
        placeholder={label}
      />
      <Text style={styles.error}>{error || " "}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { marginBottom: 16, color: "gray" },
  tabs: { flexDirection: "row", marginBottom: 16 },
  tab: { flex: 1, alignItems: "center", padding: 8, backgroundColor: "#eee" },
  activeTab: { backgroundColor: "#ccc" },
  activeTabText: { fontWeight: "bold" },
  field: { marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8 },
  inputError: { borderColor: "red" },
  error: { color: "red" },
  submit: { backgroundColor: "#000", padding: 12, alignItems: "center" },
  disabled: { opacity: 0.5 },
  submitText: { color: "#fff" },
});
