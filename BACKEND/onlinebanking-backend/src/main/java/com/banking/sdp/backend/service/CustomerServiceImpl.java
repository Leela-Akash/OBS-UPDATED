package com.banking.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.repository.CustomerRepository;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public String registerCustomer(Customer customer) {
        if (customerRepository.existsByUsername(customer.getUsername())) {
            return "Username already exists!";
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            return "Email already exists!";
        }
        if (customerRepository.existsByPhone(customer.getPhone())) {
            return "Phone number already exists!";
        }

        customerRepository.save(customer);
        return "Customer Registered Successfully";
    }

    @Override
    public Customer checkCustomerLogin(String username, String password) {
        return customerRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String updateCustomerProfile(Customer customer) {
        Customer existing = customerRepository.findById(customer.getId()).orElse(null);
        if (existing != null) {
            // Optional: prevent duplicates during update
            if (!existing.getUsername().equals(customer.getUsername()) &&
                customerRepository.existsByUsername(customer.getUsername())) {
                return "Username already exists!";
            }
            if (!existing.getEmail().equals(customer.getEmail()) &&
                customerRepository.existsByEmail(customer.getEmail())) {
                return "Email already exists!";
            }
            if (!existing.getPhone().equals(customer.getPhone()) &&
                customerRepository.existsByPhone(customer.getPhone())) {
                return "Phone number already exists!";
            }

            existing.setFullName(customer.getFullName());
            existing.setEmail(customer.getEmail());
            existing.setUsername(customer.getUsername());
            existing.setPassword(customer.getPassword());
            existing.setPhone(customer.getPhone());
            existing.setAddress(customer.getAddress());
            existing.setDob(customer.getDob());
            existing.setGender(customer.getGender());
            existing.setAccountBalance(customer.getAccountBalance());

            customerRepository.save(existing);
            return "Customer Profile Updated Successfully";
        }
        return "Customer Not Found";
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
