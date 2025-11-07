package sum25.se194159.datetimechecker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sum25.se194159.datetimechecker.model.User;
import sum25.se194159.datetimechecker.service.DateTimeService;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    private DateTimeService dateTimeService;

    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String username, @RequestParam String password,
                             Model model, HttpSession session) {
        // Hard-coded credentials
        if ("1".equals(username) && "1".equals(password)) {
            session.setAttribute("SE194159", username);
            return "redirect:/main";
        } else {
            model.addAttribute("error", "Tên đăng nhập hoặc mật khẩu không đúng");
            model.addAttribute("user", new User());
            return "login";
        }
    }

    @GetMapping("/main")
    public String mainPage(HttpSession session, Model model) {
        String username = (String) session.getAttribute("SE194159");
        if (username == null) {
            return "redirect:/login";
        }
        model.addAttribute("welcomeMessage", "Xin chào " + username);
        return "main";
    }

    @PostMapping("/check-days")
    public String checkDaysInMonth(@RequestParam String month, @RequestParam String year,
                                 HttpSession session, Model model) {
        String username = (String) session.getAttribute("SE194159");
        if (username == null) {
            return "redirect:/login";
        }

        String result = dateTimeService.validateAndGetDaysInMonth(month, year);
        model.addAttribute("welcomeMessage", "Xin chào " + username);
        model.addAttribute("result", result);
        return "main";
    }

    @PostMapping("/check-date")
    public String checkDateExists(@RequestParam String day, @RequestParam String month,
                                @RequestParam String year, HttpSession session, Model model) {
        String username = (String) session.getAttribute("SE194159");
        if (username == null) {
            return "redirect:/login";
        }

        String result = dateTimeService.validateDate(day, month, year);
        model.addAttribute("welcomeMessage", "Xin chào " + username);
        model.addAttribute("result", result);
        return "main";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
