import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AuthStack } from '@/core/navigation/AuthStack';
import { AppStack } from '@/core/navigation/AppStack';
import { Skeleton } from '@/shared/components/feedback/Skeleton';
import { colors, radius, spacing, typography } from '@/shared/theme';

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.splashCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="book" size={42} color={colors.primary} />
          </View>
          <Text style={styles.splashText}>Loading Library...</Text>
          <Skeleton width={140} height={10} borderRadius={radius.full} style={styles.skeletonBar} />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  splashCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  splashText: {
    ...typography.captionBold,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  skeletonBar: {
    marginTop: spacing.xs,
  },
});
