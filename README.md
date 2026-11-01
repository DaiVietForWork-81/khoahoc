# 🎓 Orbit | Vietnam — Phân Hệ Khóa Học (`khoahoc`)

> **Kho mã nguồn độc lập cho Phân hệ Khóa Học Chuyên Đề Orbit (Toán · Ngữ Văn · Tiếng Anh · Vật Lí · Hóa Học · Sinh Học · Tin Học · Lịch Sử & Địa Lí).**
>
> 🔗 **Cơ chế đồng bộ 1 chiều (One-way Sync)**:
> - Repo này (`https://github.com/DaiVietForWork-81/khoahoc`) chỉ chứa riêng phần **Khóa học** (giao diện `src/courses/` + dữ liệu bài giảng `data/courses.json`).
> - Giao diện chính của **Orbit | Vietnam (`Hyperhub`)** sẽ **tự động đọc và đồng bộ thời gian thực** từ nhánh `main` của repo này (`data/courses.json`) cũng như qua lệnh `npm run sync:khoahoc`.
> - Phần còn lại của dự án Orbit (Discord Bot, DocInspector, Database, Admin...) **hoàn toàn tách biệt**, không đẩy sang repo này để bạn thoải mái phát triển phần Khóa học một cách độc lập, gọn nhẹ và an toàn.

---

## 📂 1. Cấu trúc mã nguồn (Phần Thô / Scaffold v1.0)

```text
khoahoc/
├── data/
│   └── courses.json              # ⭐ File dữ liệu trung tâm: Môn học, Khóa học, Chương & Bài giảng (Đồng bộ Live lên Web chính)
├── src/
│   ├── courses/                  # ⭐ Thư mục Component dùng chung với Web chính (src/courses/*)
│   │   ├── types.ts              # Định nghĩa kiểu dữ liệu TypeScript (CourseItem, CourseChapter, CourseLesson...)
│   │   ├── coursesCatalog.ts     # Khung dữ liệu mặc định + hàm fetchRemoteCoursesCatalog() tự động kéo từ GitHub
│   │   └── CoursesHub.tsx        # Giao diện Trung tâm Khóa Học (Lọc môn, lọc khối lớp, tìm kiếm, xem khung bài giảng)
│   ├── styles/
│   │   └── globals.css           # Hệ màu Cosmic Nebula (#08060e / #110d1b / #221a35) & Font Be Vietnam Pro
│   ├── App.tsx                   # Khung chạy thử độc lập (Standalone Preview)
│   └── main.tsx                  # Entry point Vite + React 19
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 2. Hướng dẫn chạy thử trên máy (Local Development)

Bạn không cần cài đặt Bot hay Database của Orbit. Chỉ cần **Node.js (v18+)** để chạy trực tiếp giao diện Khóa học:

```bash
# 1. Clone kho mã nguồn khoahoc
git clone https://github.com/DaiVietForWork-81/khoahoc.git
cd khoahoc

# 2. Cài đặt thư viện
npm install

# 3. Chạy server phát triển tại http://localhost:5174
npm run dev

# 4. Kiểm tra lỗi TypeScript & Build trước khi push
npm run build
```

---

## 🛠️ 3. Hướng dẫn cách làm & phát triển tiếp từ phần thô

### Cách A: Thêm / Sửa Môn học, Khóa học, Chương & Bài giảng (Chỉ cần sửa `data/courses.json`)
Khi bạn chỉnh sửa file [`data/courses.json`](./data/courses.json) và `git push origin main`, trang web chính của Orbit sẽ **tự động tải bản mới nhất ngay lập tức** mà không cần build lại Web chính!

#### Cấu trúc 1 khóa học trong `data/courses.json`:
```json
{
  "id": "course-toan-12-2025",
  "slug": "toan-12-chinh-phuc-cau-truc-2025",
  "title": "Toán 12 · Chinh Phục Đề Thi Cấu Trúc Mới 3 Phần (GDPT 2018)",
  "subjectId": "TOAN",
  "grade": "12",
  "level": "Vận dụng",
  "instructor": "Thầy/Cô hoặc Ban Chuyên Môn Toán Orbit",
  "durationHours": 36,
  "lessonsCount": 24,
  "status": "ready",
  "summary": "Mô tả ngắn gọn trọng tâm khóa học...",
  "tags": ["Toán 12", "Chuẩn 2025", "Đúng/Sai", "Trả lời ngắn"],
  "updatedAt": "2026-11-01",
  "chapters": [
    {
      "id": "ch-toan-1",
      "title": "Chương 1: Ứng dụng đạo hàm để khảo sát hàm số",
      "lessons": [
        {
          "id": "ls-toan-1",
          "index": 1,
          "title": "Bài 1: Tính đơn điệu và cực trị của hàm số",
          "durationMinutes": 45,
          "type": "video",
          "videoUrl": "https://www.youtube.com/embed/...",
          "documentUrl": "https://...",
          "isFreePreview": true
        }
      ]
    }
  ]
}
```
- **Mã môn học (`subjectId`) hỗ trợ sẵn**:
  - `TOAN` (Toán học)
  - `VAN` (Ngữ văn)
  - `ANH` (Tiếng Anh)
  - `LY` (Vật lí)
  - `HOA` (Hóa học)
  - `SINH` (Sinh học)
  - `TIN` (Tin học & Thuật toán)
  - `SU_DIA` (Lịch sử & Địa lí)
  *(Có thể thêm môn mới vào mảng `"subjects"` trong `data/courses.json` và cập nhật union `CourseSubjectId` trong `src/courses/types.ts`).*
- **Khối lớp (`grade`)**: `"12"`, `"11"`, `"10"`, `"THCS"`, `"CHUYEN"`.
- **Trạng thái (`status`)**:
  - `"ready"` → Hiển thị nhãn xanh **Sẵn sàng học**
  - `"draft"` → Hiển thị nhãn hồng **Khung bản thô (Đang mở rộng)**
  - `"coming_soon"` → Hiển thị nhãn vàng **Sắp ra mắt**
- **Loại bài học (`type`)**: `"video"` (Video bài giảng YouTube/Vimeo/HLS), `"document"` (Tài liệu PDF/Markdown), `"quiz"` (Bài tập trắc nghiệm luyện tập).

---

### Cách B: Phát triển thêm tính năng Giao diện trong `src/courses/CoursesHub.tsx`
Nếu bạn muốn nâng cấp giao diện (ví dụ: thêm Modal xem Video bài giảng trực tiếp, ghi nhớ tiến độ bài đã học vào `localStorage`, làm bài Quiz trắc nghiệm sau mỗi bài giảng):
1. Chỉnh sửa trực tiếp trong thư mục **`src/courses/`** (`types.ts`, `coursesCatalog.ts`, `CoursesHub.tsx`).
2. Giữ nguyên prop `onOpenExamVaultForSubject?: (subjectCode: string) => void` của `CoursesHub` để khi ghép vào Web chính, nút **"Luyện đề Toán/Văn/Anh..."** vẫn nhảy thẳng sang Kho đề thi tương ứng.
3. Sau khi hoàn tất và chạy thử bằng `npm run dev` + `npm run build`, hãy commit và push lên `main`:
   ```bash
   git add .
   git commit -m "feat(courses): cap nhat giao dien va noi dung khoa hoc"
   git push origin main
   ```
4. Trên Web chính (`Hyperhub`), hệ thống sẽ tự động lấy `data/courses.json` mới nhất, hoặc quản trị viên chỉ cần gõ 1 lệnh `npm run sync:khoahoc` để kéo toàn bộ code `src/courses/*` mới nhất về Web chính.

---

## 🧠 4. Bộ AI Agent Skills cần thiết & Quy chuẩn Thiết kế (Khi dùng AI hỗ trợ code)

Nếu bạn sử dụng AI Coding Agent (Antigravity, Cursor, Claude Code...) để thiết kế hoặc mở rộng phân hệ Khóa học, hãy kích hoạt các **Skills** sau để đồng bộ 100% chất lượng thẩm mỹ với toàn hệ thống **Orbit | Vietnam**:

### Danh sách Skills khuyến nghị kích hoạt:
1. **`/web-ui-master`** & **`/taste-skill`** (`design-taste-frontend`):
   - Giữ kỷ luật giao diện **App-Screen / Workbench** chuẩn Awwwards (không làm card rỗng, không lạm dụng kính mờ `backdrop-filter: blur`, không dùng lưới 4 cột thẻ giống hệt nhau gây rối mắt).
2. **`/ui-ux-pro-max`** & **`/frontend-design`**:
   - Phân cấp thị giác rõ ràng, căn chỉnh nhịp chữ (`12px / 13px / 15px / 16px / 18px / 24px`), dùng `tabular-nums` cho mọi con số (thời lượng, số bài giảng, tiến độ).
3. **`/animate-ui`**:
   - Chuyển động mượt theo đường cong `cubic-bezier(0.22, 1, 0.36, 1)`, không dùng `filter: blur()` trên các container lớn để đảm bảo tốc độ cuộn trang **120fps không khựng**.
4. **`/vercel-react-best-practices`**:
   - Tối ưu `useMemo`, `useCallback`, `React.memo`, tách nhỏ component khi danh sách bài giảng lớn.
5. **`/antislop`**:
   - Ngăn chặn văn phong AI sáo rỗng, giữ câu chữ học thuật Việt Nam tự nhiên, rõ ràng và chuẩn chương trình GDPT 2018.

### Bảng màu chuẩn Cosmic Nebula của Orbit:
| Thành phần | Mã màu / CSS | Ghi chú |
| :--- | :--- | :--- |
| **Nền trang chính** | `#08060e` | Đêm tinh vân sâu thẳm |
| **Bề mặt thẻ (`.hh-hub-surface`)** | `rgba(17, 13, 27, 0.94)` | Không dùng `backdrop-filter: blur` |
| **Viền thẻ chuẩn** | `1px solid #221a35` | Hover sáng nhẹ lên `#32264d` |
| **Nút hành động chính (Primary CTA)** | `#d61f79` (Hover `#e11d84`) | Viền `#e13689`, chữ trắng `#ffffff` |
| **Điểm nhấn Hồng / Tím Orbit** | `#FF4FCB` / `#FFB8E6` / `#C4A6FF` | Dùng cho badge, icon, trạng thái active |
| **Font chữ** | `Be Vietnam Pro` & `JetBrains Mono` | Hỗ trợ đầy đủ dấu tiếng Việt sắc nét |
