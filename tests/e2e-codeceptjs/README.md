# E2E Testing với CodeceptJS + Playwright

## Giới thiệu
Bộ test End-to-End này sử dụng CodeceptJS với Playwright helper để kiểm tra các chức năng chính của ứng dụng Date Time Checker.

## Cài đặt

### Yêu cầu
- Node.js 14+ 
- NPM hoặc Yarn
- Ứng dụng Date Time Checker đang chạy tại `http://localhost:8080`

### Cài đặt dependencies
```bash
cd tests/e2e-codeceptjs
npm install
```

## Cấu trúc project
```
e2e-codeceptjs/
├── codecept.conf.js    # File cấu hình CodeceptJS
├── steps_file.js       # Custom steps (nếu có)
├── package.json        # Dependencies và scripts
├── tests/              # Thư mục chứa test cases
│   ├── login_test.js           # Tests liên quan đến đăng nhập
│   ├── date_validation_test.js # Tests kiểm tra validation ngày
│   └── date_calculation_test.js # Tests tính toán ngày
└── output/             # Thư mục chứa kết quả test và screenshots
```

## Test Cases

### 1. Login Tests (`login_test.js`)
- **Login với thông tin hợp lệ (username: 1, password: 1)**: Kiểm tra đăng nhập thành công và chuyển hướng đúng
- **Login với thông tin sai**: Kiểm tra xử lý lỗi khi đăng nhập sai
- **Truy cập trang chính mà không đăng nhập**: Kiểm tra redirect về login page

### 2. Date Time Validation Tests (`date_validation_test.js`)  
- **Kiểm tra số ngày trong tháng hợp lệ**: Nhập tháng 2/2024 và kiểm tra có 29 ngày (năm nhuận)
- **Kiểm tra số ngày với tháng không hợp lệ**: Nhập tháng 13 và kiểm tra thông báo lỗi
- **Kiểm tra năm nhuận**: Test trường hợp đặc biệt February năm nhuận

### 3. Date Existence Tests (`date_calculation_test.js`)
- **Kiểm tra ngày tồn tại hợp lệ**: Kiểm tra ngày 15/11/2025 có tồn tại
- **Kiểm tra ngày không tồn tại**: Test ngày 30/2/2025 (không hợp lệ)

### 4. Complete Application Flow Tests (`complete_flow_test.js`)
- **Test flow hoàn chỉnh - kiểm tra số ngày**: Test tháng 12/2025 có 31 ngày
- **Test flow hoàn chỉnh - kiểm tra ngày tồn tại**: Test ngày 29/2/2024 (năm nhuận)
- **Test chức năng đăng xuất**: Kiểm tra logout và redirect về login page

## Chạy tests

### Chạy tất cả tests
```bash
npm test
```

### Chạy tests ở chế độ headless
```bash
npm run test:headless
```

### Chạy tests với verbose output
```bash
npm run test:verbose
```

### Chạy tests với debug mode
```bash
npm run test:debug
```

### Chạy từng nhóm test riêng biệt
```bash
# Chỉ chạy login tests
npm run test:login

# Chỉ chạy validation tests  
npm run test:validation

# Chỉ chạy calculation tests
npm run test:calculation
```

### Chạy test cụ thể
```bash
# Chạy một scenario cụ thể
npx codeceptjs run --grep "Login with valid credentials"

# Chạy với tag (nếu có)
npx codeceptjs run --grep "@smoke"
```

## Cấu hình

### Browser Settings
File `codecept.conf.js` đã được cấu hình:
- Browser: Chromium (có thể thay đổi thành firefox, webkit)
- Window Size: 1280x720
- Show browser: true (có thể tắt với headless mode)

### URL Configuration
- Base URL: `http://localhost:8080`
- Có thể thay đổi trong file cấu hình nếu app chạy ở port khác

## Debugging

### Screenshot khi test fail
- Tự động chụp screenshot khi test fail
- Screenshots được lưu trong thư mục `output/`

### Debug mode
```bash
npm run test:debug
```
Sẽ dừng lại khi có lỗi để bạn có thể inspect

### Pause trong test
Thêm `pause()` vào bất kỳ đâu trong test để dừng lại:
```javascript
I.fillField('username', 'admin');
pause(); // Test sẽ dừng ở đây
I.click('Login');
```

## Lưu ý quan trọng

### Trước khi chạy tests
1. **Khởi động ứng dụng**: Đảm bảo ứng dụng Spring Boot đang chạy
```bash
# Trong thư mục root của project
mvnw.cmd spring-boot:run
```

2. **Kiểm tra URL**: Đảm bảo app đang chạy tại `http://localhost:8080`

### Data Dependencies
- Tests sử dụng username/password mặc định là `1/1` (như hiển thị trong ứng dụng)
- Nếu thay đổi, cần update trong các test files

### Selectors
- Tests sử dụng các selector cơ bản (text, field names)
- Nếu UI thay đổi, có thể cần update selectors trong tests

## Troubleshooting

### Tests fail với "Element not found"
- Kiểm tra app có đang chạy không
- Kiểm tra selectors có đúng không
- Tăng timeout nếu app load chậm

### Browser không mở
- Kiểm tra Playwright đã cài đặt browsers chưa:
```bash
npx playwright install
```

### Tests chạy quá chậm
- Sử dụng headless mode: `npm run test:headless`
- Giảm window size trong config
- Tăng timeout cho các thao tác

## Mở rộng

### Thêm test cases mới
1. Tạo file mới trong thư mục `tests/`
2. Follow pattern hiện tại:
```javascript
Feature('Feature Name');

Scenario('Test scenario description', ({ I }) => {
  // Test steps here
});
```

### Custom steps
Thêm custom steps vào `steps_file.js` để tái sử dụng:
```javascript
module.exports = function() {
  return actor({
    loginAsAdmin() {
      this.amOnPage('/');
      this.fillField('username', 'admin');
      this.fillField('password', 'password');
      this.click('Đăng nhập');
      this.waitForElement('.main-container', 5);
    }
  });
}
```
