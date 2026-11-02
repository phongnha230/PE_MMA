# 🎨 CẨM NANG PHỐI MÀU & ĐỔ BÓNG THEO ĐỀ TÀI (ANTI-SLOP DESIGN PALETTES)
> **Tài liệu chuẩn dành riêng cho các đề thi PE React Native & Mobile Apps.**  
> *Nói không với kiểu thiết kế nghèo nàn "Lúc nào cũng nền trắng tinh dại dột + nút bấm xanh dương mặc định".*

---

## ⚡ 1. MA TRẬN PHỐI MÀU CHUYÊN SÂU THEO CHỦ ĐỀ ĐỀ THI

| Chủ đề / Đề bài | Màu Chủ đạo (`Primary`) | Màu Nền Màn Hình (`Background`) | Màu Nút Bấm (`Button`) | Màu Viền & Badge (`Badge / Border`) | Loại Bóng Đổ (`Shadow Preset`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🍔 **F&B / Ẩm thực, Đồ ăn, Cafe, Nhà hàng** | **Cam Cháy** `#EA580C` *(Kích thích cảm giác thèm ăn)* | **Kem bơ ấm** `#FFFDF9` *(Ấm cúng, không bị chói)* | `#EA580C` *(Bóng cam ấm áp)* | Badge: `#FFEDD5`<br>Border: `#FED7AA` | **`Shadows.warmGlow`** *(Bóng cam nhuộm màu)* |
| 🏃 **Thể thao, Gym, Workout, Running** | **Đỏ Electric / Rực lửa** `#EF4444` *(Năng động, bứt phá)* | **Xám lạnh thể thao** `#F8FAFC` *(Khỏe khoắn, dứt khoát)* | `#EF4444` *(Bo viên thuốc)* | Badge: `#FEE2E2`<br>Border: `#E2E8F0` | **`createColoredShadow('#EF4444')`** |
| 🥗 **Healthy, Sức khỏe, Y tế, Organic, Eco** | **Ngọc Lục Bảo** `#059669` *(Tươi mát, thanh lọc)* | **Xanh xô thơm siêu nhạt** `#F4FAF6` *(Thư thái mắt)* | `#059669` *(Bo tròn mềm)* | Badge: `#D1FAE5`<br>Border: `#A7F3D0` | **`Shadows.minimalAiry`** *(Bóng bay nhẹ tênh)* |
| 💳 **FinTech, Ví tiền, Quản lý chi tiêu, Crypto** | **Tím Indigo** `#4F46E5` *(Hiện đại, công nghệ cao)* | **Xám công nghệ** `#F8FAFC` *(Bảo mật, tin cậy)* | `#4F46E5` *(Đậm chất Tech)* | Badge: `#EEF2FF`<br>Border: `#E0E7FF` | **`Shadows.cyberGlass`** *(Kính mờ + Viền Neon)* |
| 🛍️ **E-Commerce, Thời trang, Mua sắm** | **Đen Than Luxury** `#18181B` *(Sang trọng, thời thượng)* | **Vải lanh / Stone nhạt** `#FAFAF9` *(Thanh lịch)* | `#18181B` *(Nút đen quyền lực)* | Badge: `#FFE4E6`<br>Border: `#E7E5E4` | **`Shadows.softPure`** *(Bóng nâng nhẹ tinh tế)* |
| 📚 **Task, Note, Học tập, Sách (Mặc định)** | **Xanh Sapphire** `#2563EB` *(Tập trung, nhã nhặn)* | **Xám xanh Slate** `#F8FAFC` | `#2563EB` | Badge: `#DBEAFE`<br>Border: `#E2E8F0` | **`Shadows.minimalAiry`** |

---

## 💡 2. NGUYÊN TẮC VÀNG VỀ MÀU NỀN & NÚT BẤM CỦA DESIGNER

1. **Tuyệt đối không dùng nền trắng tinh (`#FFFFFF`) cho toàn màn hình:**
   * Nền trắng tinh làm mắt bị chói lóa và khiến các Card màu trắng bên trong bị "chìm nghỉm", không có chiều sâu lớp lang (Layer Depth).
   * **Quy tắc phối chuẩn:**
     * Nền App (Background): Dùng tone hơi ngả nhẹ theo chủ đề (`#FFFDF9` cho đồ ăn, `#F4FAF6` cho healthy, `#F8FAFC` cho tech).
     * Thẻ Card bên trong: Dùng `#FFFFFF` trắng tinh đặt lên trên ➔ Tự nhiên các Card sẽ nổi bật 3D rõ rệt ngay cả khi chưa đổ bóng!

2. **Bóng đổ phải "nhuộm màu" (Tinted Shadow), không dùng bóng đen đục:**
   * ❌ **Xấu:** Đổ bóng đen xì thô kệch (`#000000` độ đậm cao).
   * ✅ **Đẹp:** 
     * Nút màu cam ➔ Bóng màu cam nhạt (`rgba(234, 88, 12, 0.28)`).
     * Nút màu xanh ➔ Bóng màu xanh nhạt (`rgba(37, 99, 235, 0.25)`).
     * Nút màu ngọc ➔ Bóng màu ngọc lục bảo (`rgba(5, 150, 105, 0.25)`).

3. **Hình dáng nút bấm (Button Ergonomics):**
   * Nút bấm bo tròn dáng viên thuốc (`borderRadius: 9999px` hoặc `height / 2`) đem lại cảm giác mượt mà, hiện đại và cao cấp nhất.
   * Chiều cao nút bấm luôn giữ chuẩn `48dp` - `52dp` để ngón tay bấm không bao giờ bị trượt.

---

## 🛠️ 3. CÁCH DÙNG TRONG CODE DỰ ÁN

Hệ thống đã được tích hợp sẵn tại [`src/shared/theme/`](file:///c:/Users/HPPAVILION/Documents/IT/Demo_react_Native/PE_MMA/src/shared/theme/index.ts). Ngày mai gặp bất kỳ đề tài nào, chỉ cần gọi hàm:

```typescript
import { getTheme, Shadows } from '@/shared/theme';

// Ngày mai đề là Đồ ăn / Cafe:
const theme = getTheme('food'); 

// Hoặc đề là Thể thao / Gym:
const theme = getTheme('sports');

// Hoặc đề là Healthy / Sức khỏe:
const theme = getTheme('healthy');
```

Khi đó bạn có thể áp dụng ngay vào `StyleSheet`:
```typescript
const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.background, // Nền chuẩn theo chủ đề
  },
  card: {
    backgroundColor: theme.card,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    ...theme.cardShadow,               // Bóng đổ chuẩn Designer
  },
  primaryBtn: {
    backgroundColor: theme.buttonBg,
    borderRadius: 9999,                // Dáng viên thuốc bo tròn
    ...theme.buttonShadow,             // Bóng phát sáng tiệp màu nút
  },
});
```
