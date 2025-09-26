package com.banking.sdp.backend.controller;

import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        String result = customerService.registerCustomer(customer);

        if ("Customer Registered Successfully".equals(result)) {
            return ResponseEntity.ok(result); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); // 409 Conflict
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody Customer customer) {
        Customer loggedIn = customerService.checkCustomerLogin(
                customer.getUsername(), customer.getPassword());

        if (loggedIn != null) {
            return ResponseEntity.ok(loggedIn); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid username or password");
        }
    }

    // Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update customer profile
    @PutMapping("/update")
    public ResponseEntity<String> updateCustomer(@RequestBody Customer customer) {
        String result = customerService.updateCustomerProfile(customer);
        if ("Customer Profile Updated Successfully".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }

    // Get all customers
    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
}
