package sum25.se194159.datetimechecker.service;

import org.springframework.stereotype.Service;

@Service
public class DateTimeService {

    public String validateAndGetDaysInMonth(String monthStr, String yearStr) {
        try {
            // Kiểm tra input rỗng
            if (monthStr == null || monthStr.trim().isEmpty()) {
                return "Tháng không được để trống";
            }
            if (yearStr == null || yearStr.trim().isEmpty()) {
                return "Năm không được để trống";
            }

            // Kiểm tra và parse month
            int month;
            try {
                double monthDouble = Double.parseDouble(monthStr.trim());
                if (monthDouble != Math.floor(monthDouble)) {
                    return "Tháng phải là số nguyên";
                }
                month = (int) monthDouble;
            } catch (NumberFormatException e) {
                return "Tháng phải là số";
            }

            // Kiểm tra và parse year
            int year;
            try {
                double yearDouble = Double.parseDouble(yearStr.trim());
                if (yearDouble != Math.floor(yearDouble)) {
                    return "Năm phải là số nguyên";
                }
                year = (int) yearDouble;
            } catch (NumberFormatException e) {
                return "Năm phải là số";
            }

            // Kiểm tra giá trị âm
            if (month < 0) {
                return "Tháng không được là số âm";
            }
            if (year < 0) {
                return "Năm không được là số âm";
            }

            // Kiểm tra phạm vi tháng
            if (month < 1 || month > 12) {
                return "Tháng phải từ 1 đến 12";
            }

            // Tính số ngày trong tháng
            int daysInMonth = getDaysInMonth(month, year);
            return "Tháng " + month + " năm " + year + " có " + daysInMonth + " ngày";

        } catch (Exception e) {
            return "Đã xảy ra lỗi: " + e.getMessage();
        }
    }

    public String validateDate(String dayStr, String monthStr, String yearStr) {
        try {
            // Kiểm tra input rỗng
            if (dayStr == null || dayStr.trim().isEmpty()) {
                return "Ngày không được để trống";
            }
            if (monthStr == null || monthStr.trim().isEmpty()) {
                return "Tháng không được để trống";
            }
            if (yearStr == null || yearStr.trim().isEmpty()) {
                return "Năm không được để trống";
            }

            // Kiểm tra và parse day
            int day;
            try {
                double dayDouble = Double.parseDouble(dayStr.trim());
                if (dayDouble != Math.floor(dayDouble)) {
                    return "Ngày phải là số nguyên";
                }
                day = (int) dayDouble;
            } catch (NumberFormatException e) {
                return "Ngày phải là số";
            }

            // Kiểm tra và parse month
            int month;
            try {
                double monthDouble = Double.parseDouble(monthStr.trim());
                if (monthDouble != Math.floor(monthDouble)) {
                    return "Tháng phải là số nguyên";
                }
                month = (int) monthDouble;
            } catch (NumberFormatException e) {
                return "Tháng phải là số";
            }

            // Kiểm tra và parse year
            int year;
            try {
                double yearDouble = Double.parseDouble(yearStr.trim());
                if (yearDouble != Math.floor(yearDouble)) {
                    return "Năm phải là số nguyên";
                }
                year = (int) yearDouble;
            } catch (NumberFormatException e) {
                return "Năm phải là số";
            }

            // Kiểm tra giá trị âm
            if (day < 0) {
                return "Ngày không được là số âm";
            }
            if (month < 0) {
                return "Tháng không được là số âm";
            }
            if (year < 0) {
                return "Năm không được là số âm";
            }

            // Kiểm tra phạm vi tháng
            if (month < 1 || month > 12) {
                return "Tháng phải từ 1 đến 12";
            }

            // Kiểm tra phạm vi ngày
            if (day < 1) {
                return "Ngày phải lớn hơn 0";
            }

            int daysInMonth = getDaysInMonth(month, year);
            if (day > daysInMonth) {
                return "Ngày " + day + "/" + month + "/" + year + " không tồn tại (tháng " + month + " chỉ có " + daysInMonth + " ngày)";
            }

            return "Ngày " + day + "/" + month + "/" + year + " tồn tại";

        } catch (Exception e) {
            return "Đã xảy ra lỗi: " + e.getMessage();
        }
    }

    private int getDaysInMonth(int month, int year) {
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                return 31;
            case 4: case 6: case 9: case 11:
                return 30;
            case 2:
                return isLeapYear(year) ? 29 : 28;
            default:
                return 0;
        }
    }

    private boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
}
