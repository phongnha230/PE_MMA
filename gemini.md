# 🏆 REACT NATIVE & FIREBASE PE MASTER DIRECTIVES
# (BẢN QUY TẮC NHẠC TRƯỞNG TỔNG HỢP TOÀN DIỆN ĐẠT ĐIỂM 10)
> **Hợp nhất toàn bộ 4 tài liệu cốt lõi**: `GEMINI.md` + `PE_BLUEPRINT.md` + `THEME_PALETTES.md` + `SHADOW_SYSTEM_CHEATSHEET.md`.  
> Tài liệu này được AI Agent tự động nạp ở **mọi phiên làm việc**. Khi nhận đề bài thi mới, Agent lập tức tuân thủ 100% các tiêu chuẩn dưới đây.

---

## 🎯 1. QUY TRÌNH HÀNH ĐỘNG KHI NHẬN ĐỀ THI MỚI (WORKFLOW)
Ngay khi người dùng dán đề bài thi (ví dụ: *Movies, Tasks, Food/Recipes, Fitness, Clinic, Products,...*), Agent tự động thực thi 4 bước:

1. **Bước 1: Xác định Chủ đề & Áp dụng Theme Palette**
   * Tra cứu chủ đề để bốc màu sắc và bóng đổ tương ứng: `food`, `sports`, `healthy`, `fintech`, `ecommerce`, `default`.
   * Sử dụng hàm `getTheme(topic)` tại `@/shared/theme` để cấp màu nền, màu nút, màu viền và bóng đổ.
2. **Bước 2: Sinh Module Tính Năng `src/features/[entities]/`**
   * `api/[entity]Api.ts`: CRUD Firestore (fetchUserItems, addItem, updateItem, deleteItem, toggleFavorite).
   * `hooks/use[Entities].ts`: Realtime `onSnapshot` lọc theo `where('userId', '==', user.uid)`, tự động sort A-Z.
   * `components/`: `[Entity]Card`, `[Entity]Form`, `[Entity]Filters`, `[Entity]Summary`, `[Entity]Skeleton`.
   * `screens/`: `[Entity]ListScreen.tsx` (danh sách có FlatList tối ưu), `[Entity]DetailScreen.tsx` (thêm/sửa).
   * `types/index.ts`: Interface dữ liệu thực thể khớp 100% các trường trong đề.
3. **Bước 3: Đăng ký Điều hướng (`src/core/navigation/`)**
   * Khai báo route vào `AppStackParamList` tại `src/core/navigation/types.ts`.
   * Đăng ký Screen vào `src/core/navigation/AppStack.tsx`.
4. **Bước 4: Xuất bộ quy tắc `firestore.rules`**
   * Cập nhật đúng tên collection của đề và dán vào tab Rules trên Firebase Console.

---

## 🛡️ 2. BỘ 7 QUY TẮC VÀNG BẤT KHẢ XÂM PHẠM (PE GOLDEN RULES)

### 📌 Quy tắc 1: TUYỆT ĐỐI KHÔNG đặt tên thư mục là `src/app/`
* Mọi luồng điều hướng đặt tại `src/core/navigation/`. Tuyệt đối không dùng `src/app/` để tránh crash Metro bundler do xung đột Expo Router.

### 📌 Quy tắc 2: Xử lý Collection `users` Linh Hoạt Theo Đề Bài (Ưu Tiên Đọc Đề)
* **Trường hợp 1 (Mặc định - Đề KHÔNG yêu cầu lưu bảng users):**
  * Thông tin user được quản lý hoàn toàn bằng **Firebase Authentication**.
  * KHÔNG tự ý tạo collection `users` thừa thãi. Trong mọi document của thực thể, bắt buộc lưu trường `userId: user.uid` để xác định quyền sở hữu.
* **Trường hợp 2 (Đề BẮT BUỘC có collection `users`):**
  * Khi đề bài yêu cầu cụ thể (ví dụ: lưu thông tin bổ sung như `role`, `fullName`, `phoneNumber`, `avatar`, `address`... vào collection `users/{uid}`):
  * **Agent BẮT BUỘC đọc kỹ yêu cầu đề thi** và tạo đồng bộ dữ liệu vào `users/{uid}` trong Firestore ngay khi đăng ký/cập nhật profile đúng 100% theo schema đề bài.

### 📌 Quy tắc 3: Logic Form Validation "Bất Khả Xâm Phạm"
* Luôn khai báo state: `const [hasSubmitted, setHasSubmitted] = useState(false);`
* **Không bao giờ hiển thị lỗi đỏ trước lần submit đầu tiên**.
* Khi người dùng gõ sửa trong `onChangeText`, nếu `hasSubmitted === true` thì tự re-validate và xóa bỏ lỗi ngay lập tức khi hợp lệ.
* Chuỗi thông báo lỗi phải khớp nguyên văn 100% từng câu chữ trong đề thi.

### 📌 Quy tắc 4: Sắp xếp A-Z & Số đếm (Counts & Sorting)
* **testID số lượng (ví dụ: `book-count`, `favorite-count`, `item-count`)**: Bắt buộc là **số nguyên trần (plain integer)**:
  ```tsx
  // ✅ ĐÚNG:
  <Text testID="item-count">{count}</Text>
  // ❌ SAI:
  <Text testID="item-count">Total: {count}</Text>
  ```
* **Sắp xếp Alphabet không phân biệt hoa thường**:
  ```typescript
  items.sort((a, b) => {
    const comp = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    if (comp !== 0) return comp;
    return a.author ? a.author.localeCompare(b.author, undefined, { sensitivity: 'base' }) : 0;
  });
  ```

### 📌 Quy tắc 5: Kiểm tra trùng lặp (Deduplication)
* Chặn trùng lặp cặp trường chính (Title + Author / Name + Category) đã trim và so sánh không phân biệt hoa thường:
  ```typescript
  const isDuplicate = existingItems.some(
    (item) =>
      (currentId ? item.id !== currentId : true) &&
      item.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      item.author.trim().toLowerCase() === author.trim().toLowerCase()
  );
  ```

### 📌 Quy tắc 6: Chuẩn Công Thái Học & Thẩm Mỹ Mobile
* **Safe Area Insets**: Luôn dùng `SafeAreaView` hoặc `useSafeAreaInsets` từ `react-native-safe-area-context`.
* **Touch Targets**: Mọi nút bấm, icon có kích thước tối thiểu `44 × 44 pt` (iOS) / `48 × 48 dp` (Android) kèm `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`.
* **Loading States**: Bắt buộc dùng **Skeleton Shimmer Loading** có kích thước khớp với bố cục nội dung thực tế (tuyệt đối không dùng ActivityIndicator xoay tròn đơn điệu).
* **Nút bấm**: Bo tròn hoàn toàn dáng viên thuốc (`borderRadius: 9999px`), chiều cao `48dp - 52dp`.
* **Haptics**: Tích hợp `expo-haptics` cho thao tác chọn tab (`selection`), toggle yêu thích (`impactLight`), cảnh báo xóa (`notificationWarning`), submit thành công (`notificationSuccess`).
* **FlatList Optimization**: Bắt buộc dùng `useCallback` cho `renderItem`, `keyExtractor` và cấu hình `windowSize={5}`, `initialNumToRender={6}` để chống tụt FPS.

### 📌 Quy tắc 7: Nhập liệu bàn phím an toàn (Chống Giật Nháy & Nhảy Ô)
* **TUYỆT ĐỐI KHÔNG bọc `ScrollView` bằng `TouchableWithoutFeedback onPress={Keyboard.dismiss}`** (gây xung đột sự kiện chạm, làm bàn phím bật/tắt liên tục và cướp focus xuống ô dưới).
* Luôn dùng cấu hình chuẩn native:
  ```tsx
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      {/* Form inputs */}
    </ScrollView>
  </KeyboardAvoidingView>
  ```
* Không dùng `elevation` động khi focus input trên Android để tránh kích hoạt re-layout.

---

## 🎨 3. MA TRẬN PHỐI MÀU THEO CHỦ ĐỀ ĐỀ BÀI (THEME PALETTES)
> *Tuyệt đối không dùng nền trắng tinh `#FFFFFF` + nút xanh mặc định cho mọi đề. Phải có bản sắc thương hiệu theo chủ đề.*

| Chủ đề / Đề bài | Màu Chủ đạo (`Primary`) | Màu Nền Màn Hình (`Background`) | Màu Nút Bấm (`Button`) | Viền & Huy hiệu (`Border / Badge`) | Preset Bóng Đổ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🍔 **F&B / Đồ ăn, Cafe, Đặt bàn, Nấu ăn** | **Cam Cháy** `#EA580C` *(Kích thích thèm ăn)* | **Kem bơ ấm** `#FFFDF9` *(Ấm cúng, tôn món)* | `#EA580C` *(Bóng cam ấm)* | Badge: `#FFEDD5`<br>Border: `#FED7AA` | **`Shadows.warmGlow`** |
| 🏃 **Thể thao, Gym, Workout, Running** | **Đỏ Electric** `#EF4444` *(Năng động, bứt phá)* | **Xám lạnh thể thao** `#F8FAFC` *(Khỏe khoắn)* | `#EF4444` *(Mạnh mẽ)* | Badge: `#FEE2E2`<br>Border: `#E2E8F0` | **`createColoredShadow('#EF4444')`** |
| 🥗 **Healthy, Sức khỏe, Y tế, Clinic, Eco** | **Ngọc Lục Bảo** `#059669` *(Tươi mát, thanh lọc)* | **Xanh xô thơm nhạt** `#F4FAF6` *(Thư thái mắt)* | `#059669` *(Thanh thoát)* | Badge: `#D1FAE5`<br>Border: `#A7F3D0` | **`Shadows.minimalAiry`** |
| 💳 **FinTech, Ví tiền, Quản lý chi tiêu** | **Tím Indigo** `#4F46E5` *(Bảo mật, công nghệ cao)* | **Xám công nghệ** `#F8FAFC` *(Đáng tin cậy)* | `#4F46E5` *(Hiện đại)* | Badge: `#EEF2FF`<br>Border: `#E0E7FF` | **`Shadows.cyberGlass`** |
| 🛍️ **Thời trang, Mua sắm (E-Commerce)** | **Đen Than Luxury** `#18181B` *(Sang trọng, đắt tiền)* | **Vải lanh Stone** `#FAFAF9` *(Tối giản)* | `#18181B` *(Nút đen quyền lực)* | Badge: `#FFE4E6`<br>Border: `#E7E5E4` | **`Shadows.softPure`** |
| 📚 **Task, Note, Sách (Mặc định)** | **Xanh Sapphire** `#2563EB` *(Tập trung, nhã nhặn)* | **Xám xanh Slate** `#F8FAFC` | `#2563EB` | Badge: `#DBEAFE`<br>Border: `#E2E8F0` | **`Shadows.minimalAiry`** |

---

## ⚡ 4. HỆ THỐNG ĐỔ BÓNG CHUẨN DESIGNER (SHADOW SYSTEM)

Tất cả đã đóng gói sẵn trong [`@/shared/theme`](file:///c:/Users/HPPAVILION/Documents/IT/Demo_react_Native/PE_MMA/src/shared/theme/shadows.ts):
* **`Shadows.softPure`**: Dành cho E-Commerce, danh sách hàng hóa, thẻ sản phẩm thanh lịch.
* **`Shadows.warmGlow`**: Dành cho Food, Cafe, bóng màu cam nắng ấm áp.
* **`Shadows.cyberGlass`**: Dành cho FinTech, thẻ kính mờ bán trong suốt + viền tím nhạt.
* **`Shadows.minimalAiry`**: Dành cho Y tế, Sức khỏe, Tasks, bóng bay siêu nhẹ (`opacity 4%`).
* **`createColoredShadow(color, height, opacity, elevation)`**: Tạo bóng nhuộm màu phát sáng theo màu nút bấm.
* **Quy tắc Tỷ lệ Vàng đổ bóng:** $\text{shadowRadius} \approx 2 \times \text{shadowOffset.height}$.

---

## 🔒 5. KHUNG BẢO MẬT FIRESTORE RULES MẪU (DÙNG CHO PHÒNG THI)

Dán khung này lên Firebase Console. **Chỉ cần đổi đúng 1 từ `<tên_collection>` theo đề**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function isOwner(userId) { return isAuthenticated() && request.auth.uid == userId; }

    // Đổi tên collection theo đề thi (ví dụ: movies, tasks, recipes, products):
    match /<tên_collection>/{docId} {
      allow read, delete: if isOwner(resource.data.userId);
      allow create: if isOwner(request.resource.data.userId);
      allow update: if isOwner(resource.data.userId) && isOwner(request.resource.data.userId);
    }
  }
}
```

---

## 📦 6. CHECKLIST NỘP BÀI CUỐI GIỜ THI
- [ ] Chạy `npx tsc --noEmit` kiểm tra **0 lỗi TypeScript**.
- [ ] Kiểm tra đầy đủ các `testID` bắt buộc của đề (`email-input`, `password-input`, `item-count`, `submit-button`,...).
- [ ] Kiểm tra xóa dữ liệu: Document trong Firestore chỉ bị xóa bởi đúng chủ sở hữu `userId`.
- [ ] Chụp đầy đủ ảnh màn hình thật của app dán vào file Word `<MãSV>.docx`.
- [ ] Xóa/loại trừ `node_modules/`, `.expo/`, `.git/`, `.env` trước khi nén zip `<MãSV>.zip`.
