import { ViewStyle } from 'react-native';
import { Shadows, createColoredShadow } from './shadows';

export interface ThemePalette {
  name: string;
  tag: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  buttonBg: string;
  buttonText: string;
  badgeBg: string;
  badgeText: string;
  inputBg: string;
  inputBorder: string;
  inputFocusedBorder: string;
  cardShadow: ViewStyle;
  buttonShadow: ViewStyle;
}

export const ThemePalettes: Record<string, ThemePalette> = {
  // 🍔 1. CHỦ ĐỀ F&B / ĐỒ ĂN / CAFE / CÔNG THỨC NẤU ĂN / NHÀ HÀNG
  food: {
    name: 'Food & Beverage',
    tag: '🍔 Ẩm thực & Đồ ăn',
    primary: '#EA580C',        // Cam cháy kích thích vị giác
    primaryLight: '#FFEDD5',   // Cam sữa nhạt
    primaryDark: '#C2410C',
    background: '#FFFDF9',     // Nền kem bơ ấm cúng (không bị trắng bệch)
    card: '#FFFFFF',
    cardBorder: '#FED7AA',     // Viền màu mơ ấm
    text: '#292524',           // Nâu than ấm
    textMuted: '#78716C',
    accent: '#F59E0B',         // Vàng mật ong
    buttonBg: '#EA580C',
    buttonText: '#FFFFFF',
    badgeBg: '#FFEDD5',
    badgeText: '#C2410C',
    inputBg: '#FFFDF9',
    inputBorder: '#FED7AA',
    inputFocusedBorder: '#EA580C',
    cardShadow: Shadows.warmGlow,
    buttonShadow: createColoredShadow('#EA580C', 6, 0.28, 4),
  },

  // 🏃 2. CHỦ ĐỀ THỂ THAO / GYM / FITNESS / WORKOUT / CHẠY BỘ
  sports: {
    name: 'Sports & Fitness',
    tag: '🏃 Thể thao & Vận động',
    primary: '#EF4444',        // Đỏ năng lượng / Bứt phá
    primaryLight: '#FEE2E2',
    primaryDark: '#B91C1C',
    background: '#F8FAFC',     // Xám lạnh thể thao
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    text: '#0F172A',           // Đen than mạnh mẽ
    textMuted: '#64748B',
    accent: '#F59E0B',         // Vàng cúp chiến thắng
    buttonBg: '#EF4444',
    buttonText: '#FFFFFF',
    badgeBg: '#FEE2E2',
    badgeText: '#B91C1C',
    inputBg: '#F8FAFC',
    inputBorder: '#E2E8F0',
    inputFocusedBorder: '#EF4444',
    cardShadow: createColoredShadow('#0F172A', 8, 0.08, 4),
    buttonShadow: createColoredShadow('#EF4444', 6, 0.35, 4),
  },

  // 🥗 3. CHỦ ĐỀ HEALTHY / SỨC KHỎE / Y TẾ / CLINIC / ECO / TỰ NHIÊN
  healthy: {
    name: 'Health & Wellness',
    tag: '🥗 Sức khỏe & Healthy',
    primary: '#059669',        // Xanh ngọc lục bảo tươi mát, thanh lọc
    primaryLight: '#D1FAE5',
    primaryDark: '#047857',
    background: '#F4FAF6',     // Xanh lá xô thơm siêu nhạt dịu mắt
    card: '#FFFFFF',
    cardBorder: '#A7F3D0',
    text: '#064E3B',           // Xanh rêu đậm sang trọng
    textMuted: '#4B7B6A',
    accent: '#84CC16',         // Xanh mầm lá
    buttonBg: '#059669',
    buttonText: '#FFFFFF',
    badgeBg: '#D1FAE5',
    badgeText: '#047857',
    inputBg: '#F4FAF6',
    inputBorder: '#D1FAE5',
    inputFocusedBorder: '#059669',
    cardShadow: Shadows.minimalAiry,
    buttonShadow: createColoredShadow('#059669', 6, 0.25, 4),
  },

  // 💳 4. CHỦ ĐỀ TÀI CHÍNH / VÍ TIỀN / CRYPTO / QUẢN LÝ CHI TIÊU (FINTECH)
  fintech: {
    name: 'Finance & Wallet',
    tag: '💳 Tài chính & Ví điện tử',
    primary: '#4F46E5',        // Xanh tím Indigo công nghệ cao, uy tín
    primaryLight: '#EEF2FF',
    primaryDark: '#3730A3',
    background: '#F8FAFC',
    card: '#FFFFFF',
    cardBorder: '#E0E7FF',
    text: '#0F172A',
    textMuted: '#64748B',
    accent: '#06B6D4',         // Cyan phát sáng
    buttonBg: '#4F46E5',
    buttonText: '#FFFFFF',
    badgeBg: '#EEF2FF',
    badgeText: '#3730A3',
    inputBg: '#FFFFFF',
    inputBorder: '#E0E7FF',
    inputFocusedBorder: '#4F46E5',
    cardShadow: Shadows.cyberGlass,
    buttonShadow: createColoredShadow('#4F46E5', 8, 0.3, 5),
  },

  // 🛍️ 5. CHỦ ĐỀ MUA SẮM / THỜI TRANG / THƯƠNG MẠI ĐIỆN TỬ (E-COMMERCE)
  ecommerce: {
    name: 'Shopping & Fashion',
    tag: '🛍️ Thời trang & Mua sắm',
    primary: '#18181B',        // Đen sang trọng kiểu Luxury
    primaryLight: '#F4F4F5',
    primaryDark: '#09090B',
    background: '#FAFAF9',     // Nền màu vải lanh / Stone ấm áp
    card: '#FFFFFF',
    cardBorder: '#E7E5E4',
    text: '#18181B',
    textMuted: '#71717A',
    accent: '#E11D48',         // Hồng Rose điểm nhấn
    buttonBg: '#18181B',
    buttonText: '#FFFFFF',
    badgeBg: '#FFE4E6',
    badgeText: '#BE123C',
    inputBg: '#FFFFFF',
    inputBorder: '#E7E5E4',
    inputFocusedBorder: '#18181B',
    cardShadow: Shadows.softPure,
    buttonShadow: createColoredShadow('#18181B', 6, 0.25, 4),
  },

  // 🎬 6. CHỦ ĐỀ PHIM ẢNH / CINEMA / MOVIE WATCHLIST (ENTERTAINMENT)
  movie: {
    name: 'Cinema & Movies',
    tag: '🎬 Phim ảnh & Điện ảnh',
    primary: '#E11D48',        // Đỏ Ruby điện ảnh quyến rũ
    primaryLight: '#FFE4E6',   // Hồng phấn nhạt
    primaryDark: '#9F1239',
    background: '#F8FAFC',     // Nền slate thanh lịch
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',     // Viền slate nhẹ
    text: '#0F172A',           // Đen than sâu
    textMuted: '#64748B',
    accent: '#F59E0B',         // Vàng ánh kim ngôi sao xếp hạng
    buttonBg: '#E11D48',
    buttonText: '#FFFFFF',
    badgeBg: '#FFE4E6',
    badgeText: '#BE123C',
    inputBg: '#FFFFFF',
    inputBorder: '#E2E8F0',
    inputFocusedBorder: '#E11D48',
    cardShadow: Shadows.warmGlow,
    buttonShadow: createColoredShadow('#E11D48', 6, 0.3, 4),
  },

  // 📚 7. CHỦ ĐỀ MẶC ĐỊNH / HỌC TẬP / GHI CHÚ / TASK (EDUCATION & NOTES)
  default: {
    name: 'Default Blue',
    tag: '📚 Học tập & Quản lý',
    primary: '#2563EB',        // Xanh Sapphire chuẩn mực
    primaryLight: '#DBEAFE',
    primaryDark: '#1D4ED8',
    background: '#F8FAFC',     // Xám trắng nhạt
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    accent: '#F59E0B',
    buttonBg: '#2563EB',
    buttonText: '#FFFFFF',
    badgeBg: '#DBEAFE',
    badgeText: '#1D4ED8',
    inputBg: '#F8FAFC',
    inputBorder: '#E2E8F0',
    inputFocusedBorder: '#2563EB',
    cardShadow: Shadows.minimalAiry,
    buttonShadow: createColoredShadow('#2563EB', 6, 0.25, 4),
  },
};

/**
 * Hàm lấy Palette theo chủ đề đề bài: 'food' | 'sports' | 'healthy' | 'fintech' | 'ecommerce' | 'default'
 */
export const getTheme = (topic: string = 'default'): ThemePalette => {
  const key = topic.toLowerCase().trim();
  if (key.includes('food') || key.includes('ăn') || key.includes('uống') || key.includes('cook') || key.includes('cafe')) {
    return ThemePalettes.food;
  }
  if (key.includes('sport') || key.includes('thể thao') || key.includes('gym') || key.includes('fit')) {
    return ThemePalettes.sports;
  }
  if (key.includes('health') || key.includes('sức khỏe') || key.includes('y tế') || key.includes('eco')) {
    return ThemePalettes.healthy;
  }
  if (key.includes('fintech') || key.includes('tiền') || key.includes('wallet') || key.includes('chi tiêu')) {
    return ThemePalettes.fintech;
  }
  if (key.includes('shop') || key.includes('thời trang') || key.includes('store') || key.includes('hàng')) {
    return ThemePalettes.ecommerce;
  }
  if (key.includes('movie') || key.includes('film') || key.includes('cinema') || key.includes('cine') || key.includes('phim')) {
    return ThemePalettes.movie;
  }
  return ThemePalettes.default;
};
