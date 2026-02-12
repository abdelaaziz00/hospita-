# Portfolio Project: Balabil Clinic Appointment System

## Project Overview
**Balabil Clinic** is a full-stack web application designed for a cosmetic surgery clinic to streamline patient consultations and administrative management. The platform features a modern, responsive public-facing website where patients can learn about services and book appointments through a multi-step form, including photo uploads for pre-consultation analysis.

This project includes a secure administration dashboard that allows staff to view, manage, and edit patient records, ensuring efficient clinic operations.

## Key Features
*   **Modern Landing Page:** A visually appealing, responsive homepage showcasing clinic services with a premium design aesthetic.
*   **Secure Authentication:** Admin login system using session-based authentication to protect sensitive patient data.
*   **Multi-Step Appointment Form:** An intuitive, user-friendly form that guides patients through the booking process, collecting personal details, medical needs, and preferences.
*   **Image Upload functionality:** Integration with `Multer` to allow patients to securely upload photos for consultation.
*   **Admin Dashboard:** A comprehensive interface for administrators to view all appointments in a tabular format.
*   **Patient Record Management:** Full CRUD (Create, Read, Update) capabilities for patient profiles, allowing admins to modify appointment details and notes.
*   **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices using CSS Flexbox and Grid.

## Technology Stack

### Frontend
*   **HTML5:** Semantic structure and accessibility.
*   **CSS3:** Custom styling with CSS Variables, Flexbox, Grid, and Glassmorphism effects. No external CSS frameworks were used, demonstrating deep understanding of styling.
*   **JavaScript (ES6+):** Dynamic form handling, step navigation logic, and interactive UI elements.

### Backend
*   **Node.js:** Server-side runtime environment.
*   **Express.js:** Web framework for handling routing, middleware, and API endpoints.

### Database & Storage
*   **MySQL:** Relational database management system for storing patient records, appointment times, and user accounts.
*   **Multer:** Middleware for handling `multipart/form-data` and image uploads.

### Security
*   **Express-Session:** Session management for secure user authentication.
