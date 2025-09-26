package com.banking.sdp.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.banking.sdp.backend.model.Admin;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.model.Staff;
import com.banking.sdp.backend.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Admin a = adminService.checkAdminLogin(admin.getUsername(), admin.getPassword());
        if (a != null) return ResponseEntity.ok(a);
        else return ResponseEntity.status(401).body("Invalid Username or Password");
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(adminService.viewAllCustomers());
    }

    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(adminService.viewAllStaff());
    }

    @PostMapping("/addstaff")
    public ResponseEntity<String> addStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(adminService.addStaff(staff));
    }

    @DeleteMapping("/deletecustomer")
    public ResponseEntity<String> deleteCustomer(@RequestParam Long customerId) {
        return ResponseEntity.ok(adminService.deleteCustomer(customerId));
    }

    @DeleteMapping("/deletestaff")
    public ResponseEntity<String> deleteStaff(@RequestParam Long staffId) {
        return ResponseEntity.ok(adminService.deleteStaff(staffId));
    }

    @GetMapping("/customercount")
    public ResponseEntity<Long> getCustomerCount() {
        return ResponseEntity.ok(adminService.getCustomerCount());
    }

    @GetMapping("/staffcount")
    public ResponseEntity<Long> getStaffCount() {
        return ResponseEntity.ok(adminService.getStaffCount());
    }
}
