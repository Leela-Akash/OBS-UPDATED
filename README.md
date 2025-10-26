# Online Banking System

A comprehensive online banking application built with **Spring Boot** (Backend) and **React** (Frontend), featuring secure authentication, fund transfers, loan management, and real-time notifications.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Security Features](#security-features)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

---

## 🎯 Project Overview

This is a full-stack online banking system with three main user roles:

1. **Customer** - End users who can manage accounts, transfer funds, apply for loans
2. **Staff** - Employees who can approve loans, view customer data, manage transactions
3. **Admin** - System administrators with full access to reports, customer management, and system statistics

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.6
- **Language**: Java 21
- **Database**: MySQL
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **PDF Generation**: iText 5.5.13.3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: JWT-based authentication with token expiration

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: React Icons
- **Styling**: CSS3 with modern gradients

---

## ✨ Features

### Customer Features
- ✅ User registration and authentication (JWT)
- ✅ View account balance and profile
- ✅ Deposit and withdraw funds
- ✅ Transfer funds between accounts (unique account numbers)
- ✅ Apply for loans (Personal, Home, Car, etc.)
- ✅ View loan status and details
- ✅ Download bank statements (PDF)
- ✅ View transaction history
- ✅ Update profile information
- ✅ **Real-time transaction notifications**
- ✅ **Notification badge with unread count**

### Staff Features
- ✅ Staff login and authentication (JWT)
- ✅ View all customers
- ✅ Manage loan approvals/rejections
- ✅ View and manage all transactions
- ✅ Staff dashboard with statistics
- ✅ Loan disbursement
- ✅ View customer profiles

### Admin Features
- ✅ Admin login and authentication (JWT)
- ✅ Add new staff members
- ✅ Manage customers (view, update, delete)
- ✅ View all transactions
- ✅ **Admin Dashboard with key metrics**
- ✅ **Detailed reports with charts**
  - Customer account statistics
  - Transaction volume analysis
  - Loan portfolio overview
  - Revenue analytics
- ✅ Staff management
- ✅ System health monitoring

### Security Features
- 🔐 JWT-based authentication
- 🔐 Token expiration (24 hours)
- 🔐 Role-based access control
- 🔐 Secure API endpoints
- 🔐 Axios interceptors for automatic token attachment
- 🔐 Session management

### UI/UX Features
- 🎨 **Modern gradient-based design**
- 🎨 Professional and clean interface
- 🎨 Smooth animations and transitions
- 🎨 Responsive design
- 🎨 Real-time updates
- 🎨 Intuitive navigation
- 🎨 Notification system with badges

---

## 📁 Project Structure

```
ONLINE_BANKING/
│
├── BACKEND/
│   └── onlinebanking-backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/banking/sdp/backend/
│       │   │   │   ├── model/              # Entity classes
│       │   │   │   │   ├── Admin.java
│       │   │   │   │   ├── Customer.java
│       │   │   │   │   ├── Staff.java
│       │   │   │   │   ├── Transaction.java
│       │   │   │   │   ├── Loan.java
│       │   │   │   │   ├── Notification.java
│       │   │   │   │   └── TransactionDTO.java
│       │   │   │   │   ├── controller/     # REST Controllers
│       │   │   │   │   │   ├── AdminController.java
│       │   │   │   │   │   ├── CustomerController.java
│       │   │   │   │   │   ├── StaffController.java
│       │   │   │   │   │   ├── TransactionController.java
│       │   │   │   │   │   ├── LoanController.java
│       │   │   │   │   │   └── NotificationController.java
│       │   │   │   │   ├── repository/     # Data Access Layer
│       │   │   │   │   │   ├── AdminRepository.java
│       │   │   │   │   │   ├── CustomerRepository.java
│       │   │   │   │   │   ├── StaffRepository.java
│       │   │   │   │   │   ├── TransactionRepository.java
│       │   │   │   │   │   ├── LoanRepository.java
│       │   │   │   │   │   └── NotificationRepository.java
│       │   │   │   │   ├── service/        # Business Logic
│       │   │   │   │   │   ├── AdminService.java
│       │   │   │   │   │   ├── AdminServiceImpl.java
│       │   │   │   │   │   ├── CustomerService.java
│       │   │   │   │   │   ├── CustomerServiceImpl.java
│       │   │   │   │   │   ├── StaffService.java
│       │   │   │   │   │   ├── StaffServiceImpl.java
│       │   │   │   │   │   ├── TransactionService.java
│       │   │   │   │   │   ├── TransactionServiceImpl.java
│       │   │   │   │   │   ├── LoanService.java
│       │   │   │   │   │   ├── LoanServiceImpl.java
│       │   │   │   │   │   └── NotificationService.java
│       │   │   │   │   ├── dto/            # Data Transfer Objects
│       │   │   │   │   │   ├── JwtResponse.java
│       │   │   │   │   │   └── TransactionDTO.java
│       │   │   │   │   └── util/           # Utility Classes
│       │   │   │   │       └── JwtUtil.java
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── pom.xml                          # Maven dependencies
│       └── HELP.md
│
└── FRONTEND/
    └── onlinebanking-frontend/
        ├── src/
        │   ├── admin/                       # Admin components
        │   │   ├── admincss/
        │   │   │   ├── AdminLogin.css
        │   │   │   ├── AdminNavbar.css
        │   │   │   ├── AdminDashboard.css
        │   │   │   └── Reports.css
        │   │   ├── AdminLogin.jsx
        │   │   ├── AdminNavbar.jsx
        │   │   ├── AdminDashboard.jsx
        │   │   ├── Reports.jsx
        │   │   ├── ManageCustomers.jsx
        │   │   ├── ManageStaff.jsx
        │   │   ├── AddStaff.jsx
        │   │   └── AllTransactions.jsx
        │   ├── customer/                    # Customer components
        │   │   ├── customercss/
        │   │   │   ├── CustomerLogin.css
        │   │   │   ├── CustomerRegistration.css
        │   │   │   ├── CustomerNavbar.css
        │   │   │   ├── CustomerProfile.css
        │   │   │   ├── DepositWithdraw.css
        │   │   │   ├── Transferfunds.css
        │   │   │   ├── Loans.css
        │   │   │   ├── Statement.css
        │   │   │   ├── UpdateProfile.css
        │   │   │   └── Notifications.css
        │   │   ├── CustomerLogin.jsx
        │   │   ├── CustomerRegistration.jsx
        │   │   ├── CustomerNavbar.jsx
        │   │   ├── CustomerProfile.jsx
        │   │   ├── DepositWithdraw.jsx
        │   │   ├── Transferfunds.jsx
        │   │   ├── Loans.jsx
        │   │   ├── Statements.jsx
        │   │   ├── UpdateProfile.jsx
        │   │   └── Notifications.jsx
        │   ├── staff/                       # Staff components
        │   │   ├── staffcss/
        │   │   │   ├── StaffLogin.css
        │   │   │   ├── StaffNavbar.css
        │   │   │   ├── Dashboard.css
        │   │   │   └── Transactions.css
        │   │   ├── StaffLogin.jsx
        │   │   ├── StaffNavbar.jsx
        │   │   ├── StaffDashboard.jsx
        │   │   ├── StaffProfile.jsx
        │   │   ├── Transcations.jsx
        │   │   ├── ViewAllCustomers.jsx
        │   │   └── LoanApproval.jsx
        │   ├── main/                        # Main pages
        │   │   ├── maincss/
        │   │   │   ├── Home.css
        │   │   │   ├── About.css
        │   │   │   ├── Contact.css
        │   │   │   └── style.css
        │   │   ├── Home.jsx
        │   │   ├── About.jsx
        │   │   ├── Contact.jsx
        │   │   ├── MainNavbar.jsx
        │   │   └── NotFound.jsx
        │   ├── contextapi/
        │   │   └── AuthContext.jsx          # Authentication context
        │   ├── utils/
        │   │   └── axiosConfig.js           # Axios interceptor setup
        │   ├── App.jsx                      # Main app component
        │   ├── main.jsx                     # Entry point
        │   └── index.css                    # Global styles
        ├── package.json                     # NPM dependencies
        ├── vite.config.js                   # Vite configuration
        └── .env                             # Environment variables
```

---

## 🗄️ Database Schema

### Tables Created Automatically by JPA

1. **customer_table**
   - id (Primary Key)
   - account_number (Unique)
   - full_name
   - username
   - password
   - email
   - phone
   - address
   - dob
   - gender
   - account_balance

2. **staff_table**
   - id (Primary Key)
   - staff_id
   - full_name
   - username
   - password
   - email
   - phone
   - department
   - role

3. **admin_table**
   - id (Primary Key)
   - username
   - password

4. **transaction_table**
   - id (Primary Key)
   - customer_id (Foreign Key)
   - amount
   - type (Credit/Debit)
   - description
   - transaction_date

5. **loan_table**
   - id (Primary Key)
   - customer_id (Foreign Key)
   - loan_amount
   - loan_type
   - tenure_months
   - purpose
   - status
   - applied_date
   - approved_date
   - disbursed_date
   - monthly_emi
   - interest_rate

6. **notification_table**
   - id (Primary Key)
   - customer_id (Foreign Key)
   - title
   - message
   - type
   - is_read
   - created_at

---

## 🔌 API Endpoints

### Admin Endpoints
```
POST   /admin/login                    # Admin login with JWT
GET    /admin/register                 # Register new admin
GET    /admin/staff/dashboard          # Staff dashboard statistics
POST   /admin/addstaff                 # Add new staff member
GET    /admin/getstaff                 # Get all staff
DELETE /admin/staff/{id}               # Delete staff
GET    /admin/getcustomers             # Get all customers
DELETE /admin/customer/{id}            # Delete customer
GET    /admin/transactions             # Get all transactions
GET    /admin/reports                  # Get system reports
```

### Customer Endpoints
```
POST   /customer/register              # Customer registration
POST   /customer/login                  # Customer login with JWT
GET    /customer/{id}                   # Get customer details
PUT    /customer/{id}                  # Update customer
DELETE /customer/{id}                   # Delete customer
GET    /customer/all                    # Get all customers
```

### Staff Endpoints
```
POST   /staff/login                    # Staff login with JWT
GET    /staff/dashboard                # Staff dashboard
GET    /staff/profile/{id}              # Get staff profile
PUT    /staff/{id}                     # Update staff
GET    /staff/customers                # Get all customers
```

### Transaction Endpoints
```
POST   /transaction/add/{customerId}   # Add transaction
GET    /transaction/{customerId}       # Get customer transactions
GET    /transaction/balance/{customerId}  # Get balance
POST   /transaction/transfer           # Transfer funds
POST   /transaction/transfer-by-account # Transfer by account number
GET    /transaction/customer/{id}/statement  # Download PDF statement
```

### Loan Endpoints
```
POST   /loan/request/{customerId}     # Request loan
GET    /loan/customer/{customerId}     # Get customer loans
GET    /loan/pending                  # Get pending loans
GET    /loan/all                      # Get all loans
PUT    /loan/approve/{loanId}          # Approve loan
PUT    /loan/reject/{loanId}           # Reject loan
PUT    /loan/disburse/{loanId}         # Disburse loan
```

### Notification Endpoints
```
GET    /notification/customer/{id}      # Get customer notifications
GET    /notification/customer/{id}/unread  # Get unread notifications
GET    /notification/customer/{id}/unread/count  # Get unread count
PUT    /notification/read/{id}         # Mark as read
PUT    /notification/customer/{id}/read-all  # Mark all as read
```

---

## 🚀 Installation & Setup

### Prerequisites
- Java 21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd BACKEND/onlinebanking-backend
   ```

2. **Configure database**
   - Open `src/main/resources/application.properties`
   - Update MySQL connection details:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/onlinebanking
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Install dependencies**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   
   Backend will run on: `http://localhost:2009`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd FRONTEND/onlinebanking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create `.env` file in the frontend root
   - Add the following:
   ```env
   VITE_API_URL=http://localhost:2009
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   
   Frontend will run on: `http://localhost:5173`

---

## 📝 Usage Guide

### Customer Workflow

1. **Registration**
   - Go to Registration page
   - Fill in personal details (unique account number auto-generated)
   - Submit and login

2. **Fund Management**
   - Navigate to Deposit/Withdraw
   - Choose deposit or withdrawal
   - Enter amount and submit

3. **Fund Transfer**
   - Go to Fund Transfer
   - Enter recipient account number
   - Enter amount and transfer
   - Receive instant notification

4. **Loan Application**
   - Navigate to Loans
   - Click "Request New Loan"
   - Fill loan details (amount, type, tenure, purpose)
   - Submit application
   - Track status (Pending → Approved → Active/Rejected)

5. **View Notifications**
   - Click Notifications in navbar
   - View all transaction alerts
   - Unread count badge shows on navbar
   - Click to mark as read

### Staff Workflow

1. **Login**
   - Go to Staff Login
   - Enter credentials

2. **Loan Management**
   - Navigate to Loan Approval
   - View pending loans
   - Approve/Reject with comments
   - Disburse approved loans

3. **Customer Management**
   - View All Customers
   - See customer details
   - View transaction history

### Admin Workflow

1. **Login**
   - Go to Admin Login
   - Enter credentials

2. **Dashboard**
   - View key metrics
   - Customer stats
   - Transaction summaries
   - System health

3. **Reports**
   - Navigate to Reports
   - View detailed analytics
   - Charts and graphs
   - Export data

4. **Management**
   - Manage Customers
   - Manage Staff
   - View All Transactions

---

## 🔐 Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: 24-hour validity
- **Role-based Access**: Customer, Staff, Admin roles
- **Password Storage**: Currently plain text (BCrypt recommended for production)

### API Security
- **CORS Configuration**: Configured for React frontend
- **Axios Interceptors**: Automatic token attachment to requests
- **401 Handling**: Auto-logout on unauthorized access

### Session Management
- **localStorage**: Stores JWT token and user info
- **sessionStorage**: Stores user profile data
- **Auto-refresh**: Tokens auto-renew on activity

---

## 📦 Dependencies

### Backend Dependencies (pom.xml)

```xml
<!-- Spring Boot -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>

<!-- PDF Generation -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itextpdf</artifactId>
    <version>5.5.13.3</version>
</dependency>
```

### Frontend Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "recharts": "^2.x",
    "react-icons": "^4.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

---

## 📊 Key Files Explained

### Backend Key Files

1. **JwtUtil.java**
   - JWT token generation
   - Token validation
   - Claims extraction
   - 24-hour expiration

2. **TransactionServiceImpl.java**
   - Transfer logic
   - Balance calculation
   - PDF generation
   - Notification creation on transfers

3. **NotificationService.java**
   - Create notifications
   - Mark as read functionality
   - Unread count tracking

4. **application.properties**
   - Database configuration
   - JWT secret key
   - Server port (2009)

### Frontend Key Files

1. **AuthContext.jsx**
   - Global auth state management
   - Login/logout functionality
   - User role tracking

2. **axiosConfig.js**
   - Request interceptor (attach JWT token)
   - Response interceptor (handle 401 errors)
   - Auto-redirect on logout

3. **Notifications.jsx**
   - Display all notifications
   - Real-time updates
   - Mark as read functionality

---

## 🎨 UI Features

### Design System
- **Color Scheme**: Purple-violet gradient (#667eea to #764ba2)
- **Typography**: Modern sans-serif (Inter, Segoe UI)
- **Animations**: Smooth transitions, hover effects, pulse animations
- **Responsive**: Mobile-friendly layouts
- **Glass Morphism**: Transparent cards with backdrop blur
- **Professional Look**: Clean, modern, banking-grade UI

### Components
- Login/Registration pages with gradient backgrounds
- Dashboard with statistics cards
- Charts using Recharts library
- Notification badges with real-time counts
- Modal dialogs for confirmations
- Form inputs with focus states
- Buttons with hover effects

---

## 🧪 Testing

### Test Credentials (Create via registration or database)

**Customer:**
- Username: customer1
- Password: password123

**Staff:**
- Username: staff1
- Password: password123

**Admin:**
- Username: admin
- Password: admin

---

## 📝 Notes

### Current Limitations
- Password encryption not implemented (use BCrypt in production)
- Input validation incomplete (add @Valid annotations)
- Email verification not implemented
- SMS notifications not implemented

### Recommended Enhancements
- Implement BCrypt password hashing
- Add email verification
- Implement 2FA (Two-Factor Authentication)
- Add transaction limits
- Implement account freeze/unfreeze
- Add export to Excel/CSV
- Dark mode toggle
- Real-time WebSocket notifications

---

## 📄 License

This project is for educational purposes only.

---

## 👥 Contributing

This is a solo project demonstrating full-stack development skills.

---

## 📧 Contact

For issues or questions, please refer to the codebase documentation.

---

**Built with ❤️ using Spring Boot & React**

