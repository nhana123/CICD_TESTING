# API Testing với CodeceptJS REST Helper

## Giới thiệu
Bộ test API này sử dụng CodeceptJS với REST helper để kiểm tra các JSON API endpoints của ứng dụng Date Time Checker. Đã tạo riêng RestController để phục vụ API testing với JSON responses.

## Cài đặt

### Yêu cầu
- Node.js 14+
- NPM 
- Ứng dụng Date Time Checker đang chạy tại `http://localhost:8080`

### Cài đặt dependencies
```bash
cd tests/api-testing
npm install
```

## API Endpoints Mới Được Tạo

Đã tạo `DateTimeApiController.java` với các endpoints JSON API:

### Authentication APIs
- **POST `/api/login`** - API login, trả về JSON với session
- **POST `/api/logout`** - API logout, trả về JSON success
- **GET `/api/status`** - Kiểm tra trạng thái authentication

### Business Logic APIs  
- **POST `/api/check-days`** - Kiểm tra số ngày trong tháng, trả về JSON
- **POST `/api/check-date`** - Kiểm tra ngày có tồn tại, trả về JSON

### Ví dụ Response Format
```json
{
  "success": true,
  "result": "Tháng 3 năm 2025 có 31 ngày",
  "month": "3",
  "year": "2025", 
  "user": "1"
}
```

## Cấu trúc project
```
api-testing/
├── codecept.conf.js           # Cấu hình CodeceptJS với REST helper
├── steps_file.js              # Custom steps cho authentication
├── package.json               # Dependencies và scripts
├── README.md                  # Hướng dẫn này
├── tests/                     # Test cases
│   ├── auth_api_test.js           # Authentication API tests 
│   ├── check_days_api_test.js     # Check days API tests
│   ├── check_date_api_test.js     # Check date API tests
│   └── main_page_api_test.js      # API status tests
└── output/                    # Test results
```

## Test Cases Được Thiết Kế

### 1. Authentication API Tests (`auth_api_test.js`)
- ✅ Login với valid credentials (1/1)
- ✅ Login với invalid username
- ✅ Login với invalid password  
- ✅ Login với empty fields
- ✅ Check authentication status
- ✅ Logout functionality

### 2. Check Days API Tests (`check_days_api_test.js`)
**Valid Cases:**
- ✅ Valid month và year (March 2025 = 31 days)
- ✅ Leap year February (2024 = 29 days) 
- ✅ Non-leap year February (2025 = 28 days)

**Invalid Cases (khác với E2E):**
- ✅ Negative month (-5)
- ✅ Zero month (0)
- ✅ Negative year (-2025)
- ✅ Unauthorized access (no session)

### 3. Check Date API Tests (`check_date_api_test.js`)
**Valid Cases:**
- ✅ Valid date (25/12/2025)
- ✅ Leap year date (29/2/2024)

**Invalid Cases (khác với E2E):**
- ✅ Negative day (-15)
- ✅ Zero day (0)
- ✅ Impossible date (31/4/2025)
- ✅ 29 Feb non-leap year (29/2/2025)
- ✅ Unauthorized access (no session)

### 4. API Status Tests (`main_page_api_test.js`)
- ✅ Check API status without authentication
- ✅ Test login flow với valid/invalid credentials

## Chạy Tests

### Chạy tất cả tests
```bash
npm test
```

### Chạy từng nhóm test
```bash
# Authentication tests
npm run test:auth

# Check days API tests
npm run test:check-days

# Check date API tests  
npm run test:check-date

# API status tests
npm run test:main
```

## Tính Năng Đặc Biệt

### JSON API Responses
- Tất cả responses trả về JSON format chuẩn
- Consistent response structure với `success`, `result`, `error` fields
- HTTP status codes đúng chuẩn (200, 401, 500)

### Session Management
- API endpoints tự động handle session cookies
- Authentication check cho protected endpoints
- Proper error responses cho unauthorized requests

### Business Logic Consistency
- API endpoints sử dụng cùng service layer như web controller
- Kết quả validation giống hệt với web interface
- Cùng business rules và error messages

## Khác Biệt với E2E Tests

### Test Cases Strategy
- **E2E**: Tháng 13, ngày 32/13, etc.
- **API**: Negative values (-5, -15), zero values (0), etc.
- **Mục đích**: Cover nhiều edge cases khác nhau

### Response Format
- **E2E**: Test HTML pages và UI elements
- **API**: Test JSON responses và HTTP status codes

### Authentication Flow
- **E2E**: Form submissions và page redirects
- **API**: JSON login responses và session cookies

## Trạng Thái Hiện Tại

### ✅ Đã Hoàn Thành
1. ✅ Tạo `DateTimeApiController.java` với đầy đủ endpoints
2. ✅ Setup CodeceptJS với REST helper
3. ✅ Thiết kế test cases phù hợp
4. ✅ Custom steps cho authentication
5. ✅ Test structure và documentation

### ⚠️ Cần Hoàn Thiện
1. **REST Helper Methods**: CodeceptJS REST helper có vẻ không có một số methods như `seeResponseContainsJson`
2. **API Testing**: Cần điều chỉnh test methods để phù hợp với available REST helper API
3. **Application Startup**: Cần đảm bảo Spring Boot app đã khởi động thành công

### 🔧 Giải Pháp Thay Thế
Nếu REST helper không hoạt động như mong đợi, có thể:
1. Sử dụng raw HTTP requests với axios/fetch
2. Chuyển sang sử dụng Playwright helper với API calls
3. Sử dụng Jest + Supertest thay vì CodeceptJS

## Lợi Ích Của Approach Này

### 1. Pure API Testing
- Test trực tiếp business logic qua API
- Không phụ thuộc vào UI changes
- Faster execution time

### 2. Real JSON Responses
- Test actual API contract
- Validate response structure
- Check HTTP status codes

### 3. Reusable APIs
- API endpoints có thể dùng cho mobile apps
- Frontend frameworks khác có thể consume
- Third-party integrations

### 4. Clear Separation
- API logic tách biệt với UI logic
- Easy to maintain và extend
- Better test coverage

## Next Steps

1. **Fix REST Helper Issues**: Tìm hiểu và sử dụng đúng methods của CodeceptJS REST helper
2. **Complete Test Suite**: Hoàn thiện tất cả test cases
3. **Add More Edge Cases**: Thêm nhiều scenarios khác
4. **Performance Testing**: Thêm performance tests nếu cần
5. **CI/CD Integration**: Setup để chạy trong pipeline

## Tài nguyên tham khảo
- [CodeceptJS REST Helper](https://codecept.io/helpers/REST/)
- [Spring Boot REST Controllers](https://spring.io/guides/gs/rest-service/)
- [API Testing Best Practices](https://www.postman.com/api-testing/)
