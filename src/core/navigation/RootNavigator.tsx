import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AuthStack } from '@/core/navigation/AuthStack';
import { AppStack } from '@/core/navigation/AppStack';
import { Skeleton } from '@/shared/components/feedback/Skeleton';
import { getTheme, radius, spacing, typography } from '@/shared/theme';

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();
  const theme = getTheme('movie');

  // Chống flash giao diện trong lúc kiểm tra phiên đăng nhập
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <View style={styles.splashCard}>
          <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="film" size={40} color={theme.primary} />
          </View>
          <Text style={[styles.splashTitle, { color: theme.text }]}>CineList</Text>
          <Text style={[styles.splashText, { color: theme.textMuted }]}>
            Initializing watchlist...
          </Text>
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
  },
  splashCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  splashTitle: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  splashText: {
    ...typography.captionBold,
    marginBottom: spacing.md,
  },
  skeletonBar: {
    marginTop: spacing.xs,
  },
});
