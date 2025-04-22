package com.prabhav.employee.auth;

import com.prabhav.employee.entity.Employee;
import com.prabhav.employee.repo.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmployeeRepo employeeRepo;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String login(String email, String password) {
        Employee employee = employeeRepo.findByEmail(email);

        if (employee != null && passwordEncoder.matches(password, employee.getPassword())) {
            return jwtUtil.generateToken(email);
        } else {
            return "Invalid email or password";
        }
    }

    public String register(String firstName, String lastName, String email, String password) {
        if (employeeRepo.findByEmail(email) != null) {
            return "Email already exists";
        }

        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setPassword(passwordEncoder.encode(password));
        employee.setTitle("Employee"); // Default title

        employeeRepo.save(employee);
        return "Registration successful";
    }
}
