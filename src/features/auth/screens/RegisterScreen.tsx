import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '@/core/navigation/types';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { CustomTextInput } from '@/shared/components/inputs/CustomTextInput';
import { Button } from '@/shared/components/buttons/Button';
import { ErrorBanner } from '@/shared/components/feedback/ErrorBanner';
import { getTheme, radius, spacing, typography } from '@/shared/theme';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/shared/utils/validators';
import { haptics } from '@/shared/utils/haptics';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp<'Register'>>();
  const theme = getTheme('movie');
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(val),
      }));
      setAuthError(null);
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(val, true),
        confirmPassword: validateConfirmPassword(val, confirmPassword),
      }));
      setAuthError(null);
    }
  };

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(password, val),
      }));
      setAuthError(null);
    }
  };

  const handleRegister = async () => {
    setHasSubmitted(true);
    setAuthError(null);
    setSuccessMessage(null);

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password, true); // isRegister = true: enforces min 6 chars
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    setErrors({
      email: emailErr,
      password: passErr,
      confirmPassword: confirmErr,
    });

    if (emailErr || passErr || confirmErr) {
      haptics.notificationError();
      return;
    }

    try {
      setSubmitting(true);
      await register(email, password);
      haptics.notificationSuccess();
      // EXACT TEXT: Registration successful
      setSuccessMessage(APP_CONSTANTS.ERROR_MESSAGES.REGISTRATION_SUCCESS);
    } catch (err: any) {
      haptics.notificationError();
      const rawMsg = err.message || '';
      if (rawMsg.includes('email-already-in-use')) {
        setAuthError('Email already in use. Please use another email or sign in.');
      } else {
        setAuthError(err.message || APP_CONSTANTS.ERROR_MESSAGES.REGISTER_FAILED);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Back to Home */}
          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => navigation.navigate('Home')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={22} color={theme.text} />
            <Text style={[styles.backHomeText, { color: theme.text }]}>Back to Home</Text>
          </TouchableOpacity>

          {/* Header Brand Section */}
          <View style={styles.brandSection}>
            <View style={[styles.iconOuter, { backgroundColor: theme.primaryLight }]}>
              <View style={[styles.iconInner, { backgroundColor: '#FFFFFF' }]}>
                <Ionicons name="film" size={36} color={theme.primary} />
              </View>
            </View>
            <View style={[styles.badgeContainer, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.badgeText, { color: theme.primaryDark }]}>CineList • Free Account</Text>
            </View>
            <Text style={[styles.welcomeTitle, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.welcomeSubtitle, { color: theme.textMuted }]}>
              Get your personal movie watchlist and sync across devices
            </Text>
          </View>

          {/* Segmented Auth Switcher (Pill Rounded) */}
          <View style={styles.switcherContainer}>
            <TouchableOpacity
              style={styles.switchTab}
              onPress={() => {
                haptics.selection();
                navigation.navigate('Login');
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.switchTabText, { color: theme.textMuted }]}>Sign In</Text>
            </TouchableOpacity>
            <View style={[styles.switchTab, { backgroundColor: theme.primary }]}>
              <Text style={[styles.switchTabText, { color: '#FFFFFF', fontWeight: '700' }]}>
                Register
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }, theme.cardShadow]}>
            {/* EXACT TESTID: form-success */}
            {successMessage && (
              <View style={styles.successBanner}>
                <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                <Text testID={APP_CONSTANTS.TEST_IDS.FORM_SUCCESS} style={styles.successText}>
                  {successMessage}
                </Text>
              </View>
            )}

            {/* EXACT TESTID: error-auth */}
            <ErrorBanner testID={APP_CONSTANTS.TEST_IDS.ERROR_AUTH} message={authError} />

            <CustomTextInput
              testID={APP_CONSTANTS.TEST_IDS.EMAIL_INPUT}
              label="Email Address"
              placeholder="name@example.com"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              required
              value={email}
              onChangeText={handleEmailChange}
              error={hasSubmitted ? errors.email : null}
            />

            <CustomTextInput
              testID={APP_CONSTANTS.TEST_IDS.PASSWORD_INPUT}
              label="Password"
              placeholder="At least 6 characters"
              leftIcon="lock-closed-outline"
              secureTextEntry
              required
              value={password}
              onChangeText={handlePasswordChange}
              error={hasSubmitted ? errors.password : null}
            />

            <CustomTextInput
              testID={APP_CONSTANTS.TEST_IDS.CONFIRM_PASSWORD_INPUT}
              label="Confirm Password"
              placeholder="Re-enter your password"
              leftIcon="shield-checkmark-outline"
              secureTextEntry
              required
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              error={hasSubmitted ? errors.confirmPassword : null}
            />

            {/* Submit Button (Pill Rounded & Centered) */}
            <Button
              testID={APP_CONSTANTS.TEST_IDS.REGISTER_BUTTON}
              title="Create Account"
              onPress={handleRegister}
              loading={submitting}
              variant="primary"
              style={[styles.submitButton, { backgroundColor: theme.primary }]}
            />
          </View>

          {/* Footer Note */}
          <View style={styles.footerRow}>
            <Text style={[styles.footerText, { color: theme.textMuted }]}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.footerLink, { color: theme.primary }]}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  backHomeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  backHomeText: {
    ...typography.captionBold,
    fontSize: 13,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconOuter: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconInner: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...typography.captionBold,
    fontSize: 12,
  },
  welcomeTitle: {
    ...typography.h1,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    ...typography.caption,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    fontSize: 13,
  },
  switcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.md,
  },
  switchTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  switchTabText: {
    ...typography.captionBold,
    fontSize: 14,
  },
  formCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  successText: {
    ...typography.captionBold,
    color: '#15803D',
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.md,
    height: 50,
    borderRadius: radius.full,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.caption,
    fontSize: 13,
  },
  footerLink: {
    ...typography.captionBold,
    fontSize: 13,
  },
});
