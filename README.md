# DELTA-V · App báo cáo OXH02

Vỏ app (PWA) để xem webapp báo cáo Apps Script của dự án Khu nhà ở xã hội OXH02 trên điện thoại:
có biểu tượng ngoài màn hình chính, mở toàn màn hình, không có thanh trình duyệt.
Số liệu và giao diện báo cáo vẫn nằm trong Apps Script; thư mục này chỉ là phần vỏ.

## Các file

| File | Vai trò |
|---|---|
| `index.html` | Trang mở app: màn hình chờ + khung hiển thị webapp, đổi trang ngay trong app |
| `config.js` | Link webapp Apps Script (`WEBAPP_URL`, kết thúc bằng `/exec`) |
| `manifest.webmanifest` | Tên app, biểu tượng, màu, chế độ toàn màn hình |
| `sw.js` | Cho phép cài app; hiện `offline.html` khi mất mạng |
| `icons/` | Biểu tượng app |

## Điều kiện bên Apps Script

- Triển khai webapp: **Thực thi với tư cách: Tôi** · **Ai có quyền truy cập: Bất kỳ ai**.
- Mỗi lần cập nhật: **Triển khai → Quản lý bản triển khai → Sửa (bút chì) → Phiên bản: Phiên bản mới → Triển khai**.
  Không tạo bản triển khai mới, để link `/exec` không đổi.

## Cài trên điện thoại

- **Android (Chrome):** mở `https://dat-0705.github.io/OXH02/` → bấm **Cài đặt ứng dụng** (hoặc menu ⋮ → Thêm vào màn hình chính).
- **iPhone (Safari):** mở link trên → nút **Chia sẻ** → **Thêm vào MH chính**.
