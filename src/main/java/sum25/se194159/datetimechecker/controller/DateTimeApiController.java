package sum25.se194159.datetimechecker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sum25.se194159.datetimechecker.service.DateTimeService;
import sum25.se194159.datetimechecker.model.DateRequest;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DateTimeApiController {

    @Autowired
    private DateTimeService dateTimeService;

    /**
     * API endpoint để kiểm tra số ngày trong tháng
     * Tương đương với POST /check-days
     */
    @PostMapping("/check-days")
    public ResponseEntity<Map<String, Object>> checkDaysInMonth(
            @RequestParam String month,
            @RequestParam String year,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        // Kiểm tra authentication
        String username = (String) session.getAttribute("SE194159");
        if (username == null) {
            response.put("success", false);
            response.put("error", "Unauthorized");
            response.put("message", "Bạn cần đăng nhập để sử dụng chức năng này");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            // Sử dụng cùng service logic như controller chính
            String result = dateTimeService.validateAndGetDaysInMonth(month, year);

            response.put("success", true);
            response.put("result", result);
            response.put("month", month);
            response.put("year", year);
            response.put("user", username);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Internal Server Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * API endpoint để kiểm tra ngày có tồn tại
     * Tương đương với POST /check-date
     */
    @PostMapping("/check-date")
    public ResponseEntity<Map<String, Object>> checkDateExists(
            @RequestParam String day,
            @RequestParam String month,
            @RequestParam String year,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        // Kiểm tra authentication
        String username = (String) session.getAttribute("SE194159");
        if (username == null) {
            response.put("success", false);
            response.put("error", "Unauthorized");
            response.put("message", "Bạn cần đăng nhập để sử dụng chức năng này");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            // Sử dụng cùng service logic như controller chính
            String result = dateTimeService.validateDate(day, month, year);

            response.put("success", true);
            response.put("result", result);
            response.put("day", day);
            response.put("month", month);
            response.put("year", year);
            response.put("user", username);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Internal Server Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * API endpoint để kiểm tra trạng thái đăng nhập
     * Bổ sung cho API testing
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        String username = (String) session.getAttribute("SE194159");
        if (username != null) {
            response.put("success", true);
            response.put("authenticated", true);
            response.put("user", username);
            response.put("sessionId", session.getId());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("authenticated", false);
            response.put("message", "No active session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    /**
     * API endpoint để đăng nhập (cho API testing)
     * Tương đương với POST /login
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> apiLogin(
            @RequestParam String username,
            @RequestParam String password,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        // Sử dụng cùng logic authentication như controller chính
        if ("1".equals(username) && "1".equals(password)) {
            session.setAttribute("SE194159", username);
            response.put("success", true);
            response.put("message", "Đăng nhập thành công");
            response.put("user", username);
            response.put("sessionId", session.getId());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("error", "Invalid credentials");
            response.put("message", "Tên đăng nhập hoặc mật khẩu không đúng");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    /**
     * API endpoint để đăng xuất (cho API testing)
     * Tương đương với GET /logout
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> apiLogout(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        session.invalidate();
        response.put("success", true);
        response.put("message", "Đăng xuất thành công");

        return ResponseEntity.ok(response);
    }
}
