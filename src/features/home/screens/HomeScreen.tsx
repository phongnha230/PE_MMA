import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { colors, radius, spacing, typography } from '@/shared/theme';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { haptics } from '@/shared/utils/haptics';
import { ConfirmDialog } from '@/shared/components/feedback/ConfirmDialog';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleOpenLogout = () => {
    haptics.notificationWarning();
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } finally {
      setLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const username = user?.email ? user.email.split('@')[0] : 'Developer';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <View style={styles.userProfile}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.greetingText}>Welcome back,</Text>
              <Text style={styles.usernameText}>{username}</Text>
            </View>
          </View>

          <TouchableOpacity
            testID={APP_CONSTANTS.TEST_IDS.LOGOUT_BUTTON}
            style={styles.logoutButton}
            onPress={handleOpenLogout}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Hero Card: Hello World */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconBadge}>
            <Text style={styles.heroEmoji}>👋</Text>
          </View>
          <Text style={styles.heroTitle}>Hello World!</Text>
          <Text style={styles.heroSubtitle}>
            Hệ thống xác thực Firebase đã sẵn sàng. Bạn đang ở màn hình Trang chủ chính.
          </Text>

          <View style={styles.accountInfoBox}>
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={16} color={colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="key" size={16} color={colors.primary} style={styles.infoIcon} />
              <Text style={styles.infoLabel}>UID:</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{user?.uid}</Text>
            </View>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeaderRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusTitle}>Hệ Thống Sẵn Sàng Nhận Đề Thi PE</Text>
          </View>
          <Text style={styles.statusText}>
            Ngày mai khi bạn gửi đề bài (Movies, Tasks, Products, Notes...), hệ thống sẽ sinh ngay toàn bộ CRUD, Realtime onSnapshot, Sort A-Z, và Form Validation đúng theo cấu trúc chuẩn.
          </Text>
        </View>

        {/* Architecture Reminder Card */}
        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Ionicons name="layers-outline" size={20} color="#1D4ED8" />
            <Text style={styles.guideTitle}>Cấu trúc kiến trúc chuẩn (Feature-Based):</Text>
          </View>
          <Text style={styles.guideStep}>
            • <Text style={styles.boldText}>src/features/[entity]/api:</Text> CRUD Firestore chuẩn (thêm, sửa, xóa, toggle).
          </Text>
          <Text style={styles.guideStep}>
            • <Text style={styles.boldText}>src/features/[entity]/hooks:</Text> onSnapshot realtime lắng nghe theo userId.
          </Text>
          <Text style={styles.guideStep}>
            • <Text style={styles.boldText}>src/features/[entity]/components:</Text> Form, CardItem, Filters, Summary.
          </Text>
          <Text style={styles.guideStep}>
            • <Text style={styles.boldText}>src/features/[entity]/screens:</Text> ListScreen, DetailScreen.
          </Text>
        </View>
      </ScrollView>

      {/* Modern Custom Alert Dialog */}
      <ConfirmDialog
        visible={showLogoutModal}
        iconName="log-out-outline"
        title="Sign Out"
        message="Are you sure you want to sign out from your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
        loading={loggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  usernameText: {
    ...typography.bodyBold,
    color: colors.text,
    fontSize: 17,
  },
  logoutButton: {
    width: 44, // Touch target chuẩn 44pt
    height: 44,
    borderRadius: radius.md,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: spacing.lg,
  },
  heroIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroEmoji: {
    fontSize: 32,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  accountInfoBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: spacing.xs + 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 6,
  },
  infoLabel: {
    ...typography.captionBold,
    color: colors.secondary,
    width: 60,
  },
  infoValue: {
    ...typography.caption,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
  },
  statusCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: spacing.lg,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.xs,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
  },
  statusTitle: {
    ...typography.captionBold,
    color: '#15803D',
    fontSize: 14,
  },
  statusText: {
    ...typography.caption,
    color: '#166534',
    lineHeight: 20,
  },
  guideCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  guideTitle: {
    ...typography.captionBold,
    color: '#1E40AF',
  },
  guideStep: {
    ...typography.caption,
    color: '#1E3A8A',
    marginBottom: 6,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: '#1E40AF',
  },
});
