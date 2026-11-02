# 🎨 BẢN ĐỒ ĐỔ BÓNG & GIAO DIỆN FORM ĐỈNH CAO (MOBILE SHADOW CHEATSHEET)
> **Dành cho**: React Native, Flutter & Native Mobile.  
> **Mục tiêu**: Ngày mai dù gặp bất kỳ đề tài/chủ đề nào, chỉ cần tra bảng là bốc ngay thông số dùng được luôn, giao diện đẹp chuẩn Designer mà không sợ bị gắt hay vỡ layout.

---

## ⚡ 1. MA TRẬN TRA CỨU NHANH: "GẶP ĐỀ GÌ - BỐC BÓNG NẤY"

| Chủ đề / Loại Ứng Dụng | Phong cách khuyên dùng | Cảm giác mang lại | Màu bóng đề xuất (`shadowColor`) | Preset áp dụng |
| :--- | :--- | :--- | :--- | :--- |
| 🛍️ **E-Commerce / Mua sắm, Thời trang** | **Soft Clean Elevation** | Sang trọng, thoáng đãng, nổi bật sản phẩm | `#1A202C` độ mờ `6% - 8%` | **Preset 1: Soft Pure** |
| 🍔 **F&B / Đồ ăn, Cafe, Đặt bàn** | **Warm Appetite Glow** | Thân thiện, kích thích thị giác, ấm cúng | `#E26D28` hoặc `#DD6B20` (pha loãng `12%`) | **Preset 2: Warm Glow** |
| 💳 **FinTech / Ví điện tử, Crypto, Ngân hàng** | **Glassmorphism + Neon Glow** | Hiện đại, công nghệ cao, an toàn | `#3B82F6` (Xanh dương) hoặc `#6366F1` (Indigo) | **Preset 3: Cyber Glass** |
| 🏥 **Y tế, Sức khỏe, Clinic, Giáo dục** | **Airy Elevation (Bóng bay)** | Tinh tế, sạch sẽ, chuẩn mực, uy tín | `#0F172A` (pha siêu nhẹ `4% - 6%`) | **Preset 4: Minimal Airy** |
| 🎮 **Gaming, Mạng xã hội Gen Z, AI Tools** | **Gradient Border & Vibrant Glow** | Phá cách, tràn đầy năng lượng | `#EC4899` (Hồng tím) hoặc `#8B5CF6` (Tím) | **Preset 5: Electric Glow** |
| 📅 **Quản lý công việc, Task, Note, Học tập** | **Card Flat-Elevation** | Gọn gàng, tập trung vào nội dung, không mỏi mắt | `#000000` độ mờ `5%` | **Preset 6: Paper Card** |
| 🌙 **Bất kỳ App nào khi chạy Dark Mode** | **Surface Lightening / Border Glow** | Tương phản tốt, không bị "chìm nghỉm" | `#38BDF8` hoặc `#818CF8` (Pha `15% - 20%`) | **Preset 7: Dark Aura** |

---

## 🛠️ 2. BỘ PRESET "COPY & PASTE NGAY" CHO REACT NATIVE

Trong React Native, bóng đổ chia làm 2 hệ:
- **iOS**: Dùng `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`.
- **Android**: Dùng `elevation` (bóng mặc định của hệ thống) hoặc bọc ngoài khéo léo.

Dưới đây là các StyleSheet objects đã được cân chỉnh chuẩn xác cả 2 nền tảng:

```typescript
import { StyleSheet, Platform } from 'react-native';

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
  },

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
  },

  // 🔵 3. DÀNH CHO FINTECH, VÍ TIỀN, CRYPTO, CÔNG NGHỆ CAO
  cyberGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Kết hợp nền hơi trong suốt
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)', // Viền tím nhạt
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
  },

  // 🏥 4. DÀNH CHO Y TẾ, GIÁO DỤC, PROFILE CÁ NHÂN (SIÊU NHẸ, KHÔNG GẮT)
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
  },

  // ⚡ 5. DÀNH CHO FORM FOCUS INPUT / NÚT CTA NỔI BẬT (BÓNG PHÁT SÁNG)
  inputFocusGlow: {
    borderColor: '#6366F1',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // 🔴 6. DÀNH CHO INPUT KHI BỊ LỖI (ERROR STATE GLOW)
  inputErrorGlow: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // 🌙 7. DÀNH CHO DARK MODE (BÓNG SÁNG HUỲNH QUANG NHẸ QUANH CARD)
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
  },
});
```

---

## 🎯 3. BỘ PRESET "COPY & PASTE NGAY" CHO FLUTTER

Nếu viết Flutter, dùng mảng `boxShadow: [...]` trực tiếp bên trong `BoxDecoration`:

```dart
import 'package:flutter/material.dart';

class AppShadows {
  // 1. Soft Pure (E-commerce / Clean List)
  static List<BoxShadow> softPure = [
    BoxShadow(
      color: const Color(0xFF171923).withOpacity(0.06),
      blurRadius: 20,
      offset: const Offset(0, 10),
    ),
  ];

  // 2. Warm Glow (Food / Cafe / Đặt bàn)
  static List<BoxShadow> warmGlow = [
    BoxShadow(
      color: const Color(0xFFF97316).withOpacity(0.18),
      blurRadius: 24,
      offset: const Offset(0, 10),
    ),
  ];

  // 3. Cyber Glass (FinTech / Crypto / Login nổi)
  static List<BoxShadow> cyberGlass = [
    BoxShadow(
      color: const Color(0xFF6366F1).withOpacity(0.22),
      blurRadius: 30,
      offset: const Offset(0, 14),
    ),
  ];

  // 4. Focus Input Glow (Khi người dùng chạm vào ô nhập)
  static List<BoxShadow> focusInput(Color brandColor) => [
    BoxShadow(
      color: brandColor.withOpacity(0.28),
      blurRadius: 16,
      offset: const Offset(0, 6),
      spreadRadius: 1,
    ),
  ];

  // 5. Neumorphism Double Shadow (Chìm/Nổi kiểu nút bấm Smart Home)
  static List<BoxShadow> neumorphicRaised = [
    const BoxShadow(
      color: Colors.white,
      blurRadius: 12,
      offset: Offset(-5, -5), // Bóng sáng bên trên - trái
    ),
    BoxShadow(
      color: const Color(0xFFA3B1C6).withOpacity(0.4),
      blurRadius: 12,
      offset: const Offset(5, 5), // Bóng tối bên dưới - phải
    ),
  ];
}
```

---

## 🧠 4. QUY TẮC "BẤT BIẾN" CỦA DESIGNER CHUYÊN NGHIỆP

1. **Quy tắc Tỷ lệ Vàng:**
   $$\text{blurRadius} \approx 2 \times \text{offset.height}$$
   *(Ví dụ: `offset: { height: 8 }` thì `blurRadius: 16` là mượt mắt nhất, không bao giờ lo bị thô).*

2. **Tuyệt đối không dùng bóng đen đục:**
   - ❌ **Xấu:** `rgba(0, 0, 0, 0.4)` hoặc `Colors.black45` (trông như bị cháy sém, vết dầu loang dơ bẩn).
   - ✅ **Đẹp:** `shadowColor = brandColor` pha `10% - 20%`, hoặc xám than `#0F172A` pha loãng `5% - 8%`.

3. **Bí quyết Dark Mode:**
   - Trong Dark Mode (`#121212` hoặc `#0F172A`), bóng đen hoàn toàn vô hình!
   - **Cách cứu cánh:** Hãy nâng màu nền của Card sáng hơn nền chính 1 tông (`#1E293B` trên nền `#0F172A`), gắn viền mảnh `borderColor: 'rgba(255,255,255,0.08)'`, và dùng bóng đổ mang màu Accent (xanh lơ, tím nhạt) với độ mờ `12%`.

4. **Tránh lỗi phình to thẻ khi Focus Input:**
   - Thay vì đổi `borderWidth` từ `0` lên `2` khi Focus (làm co giật các phần tử xung quanh), hãy **luôn đặt sẵn `borderWidth: 1.5`** với `borderColor: 'transparent'`, khi Focus chỉ cần đổi `borderColor` sang màu nổi.
