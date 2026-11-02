import { StyleSheet, Platform, ViewStyle } from 'react-native';

export const Shadows = StyleSheet.create({
  // 🟢 1. DÀNH CHO E-COMMERCE, THỜI TRANG, LIST HÀNG HÓA
  softPure: {
    ...Platform.select({
      ios: {
        shadowColor: '#171923',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  } as ViewStyle,

  // 🟠 2. DÀNH CHO F&B, CAFE, GIAO ĐỒ ĂN (ẤM ÁP, BÓNG NHUỘM MÀU BRAND)
  warmGlow: {
    ...Platform.select({
      ios: {
        shadowColor: '#F97316', // Tông cam/nắng
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.16,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
    }),
  } as ViewStyle,

  // 🔵 3. DÀNH CHO FINTECH, VÍ TIỀN, CRYPTO, CÔNG NGHỆ CAO
  cyberGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1', // Tím Indigo
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.22,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  } as ViewStyle,

  // 🏥 4. DÀNH CHO Y TẾ, GIÁO DỤC, PROFILE, HEALTHY (SIÊU NHẸ, KHÔNG GẮT)
  minimalAiry: {
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  } as ViewStyle,

  // ⚡ 5. DÀNH CHO FORM FOCUS INPUT / NÚT CTA NỔI BẬT
  inputFocusGlow: {
    borderColor: '#6366F1',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 14,
      },
      android: {
        elevation: 4,
      },
    }),
  } as ViewStyle,

  // 🔴 6. DÀNH CHO INPUT KHI BỊ LỖI (ERROR STATE GLOW)
  inputErrorGlow: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  } as ViewStyle,

  // 🌙 7. DÀNH CHO DARK MODE
  darkModeCard: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 5,
      },
    }),
  } as ViewStyle,
});

/**
 * Hàm tiện ích tạo bóng tùy biến theo màu thương hiệu
 */
export const createColoredShadow = (
  color: string,
  height: number = 8,
  opacity: number = 0.18,
  elevation: number = 4
): ViewStyle => ({
  ...Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height },
      shadowOpacity: opacity,
      shadowRadius: height * 2,
    },
    android: {
      elevation,
    },
  }),
});
