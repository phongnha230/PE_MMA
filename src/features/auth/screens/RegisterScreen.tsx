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
import { colors, radius, spacing, typography } from '@/shared/theme';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/shared/utils/validators';
import { haptics } from '@/shared/utils/haptics';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp<'Register'>>();
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
        password: validatePassword(val),
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

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
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
    } catch (err: any) {
      haptics.notificationError();
      setAuthError(err.message || APP_CONSTANTS.ERROR_MESSAGES.REGISTER_FAILED);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
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
          {/* Header Brand Section */}
          <View style={styles.brandSection}>
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Ionicons name="person-add" size={34} color={colors.primary} />
              </View>
            </View>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>New Membership</Text>
            </View>
            <Text style={styles.welcomeTitle}>Create Account</Text>
            <Text style={styles.welcomeSubtitle}>
              Get your free account to organize your items
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
              <Text style={styles.switchTabText}>Sign In</Text>
            </TouchableOpacity>
            <View style={[styles.switchTab, styles.switchTabActive]}>
              <Text style={[styles.switchTabText, styles.switchTabTextActive]}>
                Register
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <ErrorBanner message={authError} />

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
              isPassword
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
              isPassword
              required
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              error={hasSubmitted ? errors.confirmPassword : null}
            />

            <Button
              testID={APP_CONSTANTS.TEST_IDS.REGISTER_BUTTON}
              title="Create Account & Enter"
              onPress={handleRegister}
              loading={submitting}
              size="lg"
              style={styles.submitButton}
            />
          </View>

          {/* Footer Navigation */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                haptics.selection();
                navigation.navigate('Login');
              }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.footerLink}>Sign In</Text>
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
    backgroundColor: '#F1F5F9',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  iconInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...typography.small,
    color: '#4338CA',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
  },
  welcomeSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 290,
  },
  switcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.lg,
  },
  switchTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  switchTabActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  switchTabText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  switchTabTextActive: {
    color: colors.primary,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  submitButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    minHeight: 52,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    minHeight: 44,
  },
  footerText: {
    ...typography.body,
    color: colors.textMuted,
  },
  footerLink: {
    ...typography.bodyBold,
    color: colors.primary,
  },
});
