import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/shared/theme';

export interface ErrorBannerProps {
  message: string | null;
  testID?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, testID }) => {
  if (!message) return null;

  return (
    <View testID={testID} style={styles.container}>
      <Ionicons name="alert-circle" size={20} color={colors.error} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBackground,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    flex: 1,
    ...typography.captionBold,
    color: colors.error,
  },
});
