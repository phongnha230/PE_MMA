import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '@/core/navigation/types';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp<'Home'>>();
  const theme = getTheme('movie');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      {/* Top Header with App Name + Login & Register buttons */}
      <View style={[styles.topHeader, { borderBottomColor: theme.cardBorder }]}>
        <View style={styles.brandRow}>
          <View style={[styles.logoBadge, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="film" size={20} color={theme.primary} />
          </View>
          <Text style={[styles.headerAppName, { color: theme.text }]}>CineList</Text>
        </View>

        <View style={styles.headerAuthButtons}>
          <TouchableOpacity
            testID={APP_CONSTANTS.TEST_IDS.LOGIN_BUTTON}
            style={[styles.headerLoginBtn, { borderColor: theme.cardBorder }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.headerLoginText, { color: theme.text }]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID={APP_CONSTANTS.TEST_IDS.REGISTER_BUTTON}
            style={[styles.headerRegisterBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.headerRegisterText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={[styles.heroIconCircle, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="videocam" size={44} color={theme.primary} />
          </View>

          {/* QUY TẮC BẮT BUỘC: testID home-title VỚI NỘI DUNG TEXT CHÍNH XÁC: CineList */}
          <Text testID={APP_CONSTANTS.TEST_IDS.HOME_TITLE} style={[styles.homeTitle, { color: theme.text }]}>
            CineList
          </Text>

          <Text style={[styles.homeDescription, { color: theme.textMuted }]}>
            Your private cinematic sanctuary. Keep track of what you watch, organize your favorite directors and genres, and never miss a masterpiece again.
          </Text>
        </View>

        {/* Feature Cards Section (At least 3 feature cards) */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            Key Features
          </Text>

          {/* Feature Card 1 */}
          <View
            style={[
              styles.featureCard,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
              theme.cardShadow,
            ]}
          >
            <View style={[styles.featureIconBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="list" size={22} color="#EF4444" />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Track what you watch
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textMuted }]}>
                Record directors, custom genres, personal reflections, and detailed review notes for every movie.
              </Text>
            </View>
          </View>

          {/* Feature Card 2 */}
          <View
            style={[
              styles.featureCard,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
              theme.cardShadow,
            ]}
          >
            <View style={[styles.featureIconBadge, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="layers" size={22} color="#2563EB" />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Sort by status
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textMuted }]}>
                Seamlessly organize your catalog into Plan to Watch, currently Watching, and Watched categories.
              </Text>
            </View>
          </View>

          {/* Feature Card 3 */}
          <View
            style={[
              styles.featureCard,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
              theme.cardShadow,
            ]}
          >
            <View style={[styles.featureIconBadge, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="star" size={22} color="#F59E0B" />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Rate your favorites
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textMuted }]}>
                Star memorable titles with instant favorite toggling and assign numerical ratings from 0 to 5.
              </Text>
            </View>
          </View>
        </View>

        {/* Call to Action CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.primaryCtaBtn, { backgroundColor: theme.primary }, theme.buttonShadow]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.primaryCtaBtnText}>Get Started — It's Free</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryCtaBtn, { borderColor: theme.cardBorder }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.secondaryCtaBtnText, { color: theme.text }]}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAppName: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '800',
  },
  headerAuthButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  headerLoginBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  headerLoginText: {
    ...typography.captionBold,
    fontSize: 13,
  },
  headerRegisterBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  headerRegisterText: {
    ...typography.captionBold,
    color: '#FFFFFF',
    fontSize: 13,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  heroIconCircle: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  homeTitle: {
    ...typography.h1,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  homeDescription: {
    ...typography.body,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  featuresSection: {
    marginTop: spacing.md,
  },
  sectionHeading: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radius.xl,
    marginBottom: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
  },
  featureIconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...typography.h3,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  featureDesc: {
    ...typography.caption,
    fontSize: 13,
    lineHeight: 18,
  },
  ctaContainer: {
    marginTop: spacing.xl,
    gap: spacing.sm,
    alignItems: 'center',
  },
  primaryCtaBtn: {
    width: '100%',
    height: 52,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCtaBtnText: {
    ...typography.bodyBold,
    color: '#FFFFFF',
    fontSize: 16,
  },
  secondaryCtaBtn: {
    width: '100%',
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryCtaBtnText: {
    ...typography.captionBold,
    fontSize: 14,
  },
});
