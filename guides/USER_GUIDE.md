# Hướng dẫn sử dụng Date Time Checker

## Mô tả ứng dụng
Date Time Checker là một ứng dụng web Spring Boot cho phép người dùng kiểm tra và xử lý thông tin về ngày tháng thời gian.

## Yêu cầu hệ thống
- Java 8 hoặc cao hơn
- Maven 3.6+
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)

## Cách chạy ứng dụng

### 1. Sử dụng Maven
```bash
mvn spring-boot:run
```

### 2. Sử dụng Java JAR
```bash
mvn clean package
java -jar target/date-time-checker-0.0.1-SNAPSHOT.jar
```

### 3. Sử dụng Maven Wrapper (khuyến nghị)
```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

## Truy cập ứng dụng
Sau khi khởi động thành công, truy cập ứng dụng tại:
- URL: `http://localhost:8080`
- Nếu thay đổi port trong application.properties, sử dụng port tương ứng

## Hướng dẫn sử dụng

### Trang đăng nhập
1. Mở trình duyệt và truy cập `http://localhost:8080`
2. Bạn sẽ được chuyển hướng đến trang đăng nhập
3. Nhập thông tin đăng nhập (username và password)
4. Nhấn nút "Đăng nhập" để tiếp tục

### Trang chính (Main Page)
Sau khi đăng nhập thành công:

1. **Nhập thông tin ngày tháng:**
   - Sử dụng các trường input để nhập thông tin ngày tháng
   - Có thể nhập theo nhiều định dạng khác nhau

2. **Kiểm tra ngày tháng:**
   - Nhấn nút "Kiểm tra" để xử lý thông tin đã nhập
   - Ứng dụng sẽ hiển thị kết quả kiểm tra

3. **Xem kết quả:**
   - Kết quả sẽ được hiển thị trên cùng trang
   - Bao gồm thông tin về tính hợp lệ của ngày tháng đã nhập

## Tính năng chính
- ✅ Đăng nhập người dùng
- ✅ Kiểm tra tính hợp lệ của ngày tháng
- ✅ Xử lý nhiều định dạng ngày tháng khác nhau
- ✅ Giao diện web thân thiện với người dùng
- ✅ Hiển thị kết quả trực quan

## Xử lý sự cố

### Ứng dụng không khởi động được
1. Kiểm tra Java version: `java -version`
2. Kiểm tra Maven version: `mvn -version`
3. Đảm bảo port 8080 không bị chiếm dụng
4. Kiểm tra logs để xem thông tin chi tiết lỗi

### Không thể truy cập web
1. Kiểm tra ứng dụng đã khởi động thành công chưa
2. Kiểm tra URL có chính xác không
3. Thử tải lại trang (F5)
4. Kiểm tra firewall hoặc antivirus có chặn không

### Lỗi đăng nhập
1. Kiểm tra thông tin username/password
2. Đảm bảo nhập đúng định dạng
3. Liên hệ quản trị viên nếu cần

## Ghi chú
- Ứng dụng chạy trên localhost nên chỉ có thể truy cập từ máy tính hiện tại
- Để dừng ứng dụng, nhấn `Ctrl + C` trong terminal
- Dữ liệu sẽ bị mất khi restart ứng dụng (chưa có database persistent)

## Liên hệ hỗ trợ
Nếu gặp vấn đề khi sử dụng ứng dụng, vui lòng liên hệ với nhóm phát triển để được hỗ trợ.
