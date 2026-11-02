import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/shared/theme';

export interface SuccessBannerProps {
  message: string | null;
  testID?: string;
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({ message, testID }) => {
  if (!message) return null;

  return (
    <View testID={testID} style={styles.container}>
      <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBackground,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    flex: 1,
    ...typography.captionBold,
    color: colors.success,
  },
});
