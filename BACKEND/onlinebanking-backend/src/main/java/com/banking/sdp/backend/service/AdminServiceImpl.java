package com.banking.sdp.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.banking.sdp.backend.model.Admin;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.model.Staff;
import com.banking.sdp.backend.repository.AdminRepository;
import com.banking.sdp.backend.repository.CustomerRepository;
import com.banking.sdp.backend.repository.StaffRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public Admin checkAdminLogin(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public List<Customer> viewAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public List<Staff> viewAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public String addStaff(Staff staff) {
        staffRepository.save(staff);
        return "Staff Added Successfully";
    }

    @Override
    public String deleteCustomer(Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            customerRepository.deleteById(customerId);
            return "Customer Deleted Successfully";
        } else {
            return "Customer Not Found";
        }
    }

    @Override
    public String deleteStaff(Long staffId) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            staffRepository.deleteById(staffId);
            return "Staff Deleted Successfully";
        } else {
            return "Staff Not Found";
        }
    }

    @Override
    public long getCustomerCount() {
        return customerRepository.count();
    }

    @Override
    public long getStaffCount() {
        return staffRepository.count();
    }
}
