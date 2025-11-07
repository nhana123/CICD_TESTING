package sum25.se194159.datetimechecker;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import sum25.se194159.datetimechecker.service.DateTimeService;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("DateTimeService Unit Tests")
class DateTimeCheckerApplicationTests {

    @Autowired
    private DateTimeService dateTimeService;

    @Test
    @DisplayName("Context loads")
    void contextLoads() {
        assertNotNull(dateTimeService);
    }

    @Test
    @DisplayName("Valid date should be accepted")
    void testValidDate() {
        String result = dateTimeService.validateDate("15", "6", "2025");
        assertTrue(result.contains("tồn tại"));
    }

    @Test
    @DisplayName("Invalid date should be rejected")
    void testInvalidDate() {
        String result = dateTimeService.validateDate("31", "4", "2025");
        assertTrue(result.contains("không tồn tại"));
    }

    @Test
    @DisplayName("Leap year February should have 29 days")
    void testLeapYearFebruary() {
        String result = dateTimeService.validateAndGetDaysInMonth("2", "2024");
        assertTrue(result.contains("29"));
    }

    @Test
    @DisplayName("Regular February should have 28 days")
    void testRegularFebruary() {
        String result = dateTimeService.validateAndGetDaysInMonth("2", "2025");
        assertTrue(result.contains("28"));
    }

    @Test
    @DisplayName("Empty input should be rejected")
    void testEmptyInput() {
        String result = dateTimeService.validateDate("", "6", "2025");
        assertTrue(result.contains("trống"));
    }
}
