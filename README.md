# Web App Accelerator

## Contents

1. [Solution Overview](#solution-overview)
    - [Project Aim & Objectives](#project-aim--objectives)
1. [Feature Overview](#feature-overview)
    1.[Secure Authentication](#secure-authentication)
    1.[Detailed Car Information](#detailed-car-information)
    1.[Customization Options](#customization-options)
    1.[Real-Time Order Processing](#real-time-order-processing)
1. [Enterprise Considerations](#enterprise-considerations)
    1.[Performance](#performance)
    1.[Scalability](#scalability)
    1.[Robustness](#robustness)
    1.[Deployment](#deployment)
1. [Project prerequisites](#project-prerequisites)
1. [Cloning Instructions](#cloning-instructions)
    1. [Setting up SSH Keys](#setting-up-ssh-keys)
    1. [Using SSH](#using-ssh)
    1. [Using HTTPS](#using-https)
1. [Frontend](frontend/README.md)
        1. [Running the project](frontend/README.md#running-the-project)
1. [Backend](backend/README.md)
        1. [Set up database](backend/README.md#set-up-database)
        1. [Applying migrations to the Database](backend/README.md#applying-migrations-to-the-database)
        1. [Running the API](backend/README.md#running-the-api)
        1. [Querying the API](backend/README.md#querying-the-api)
        1. [Running backend tests](backend/README.md#running-backend-tests)
     
## Solution Overview

The BMW Customization App is a robust platform tailored for automotive enthusiasts and potential buyers, offering an interactive experience with select BMW models. By integrating detailed model information, customization options, and streamlined order processing, the application enriches user engagement and decision-making. Users can explore dedicated pages for BMW M3, M4, M5, visualize customization choices, and efficiently place orders—all within an intuitive interface.

## Project Aim & Objectives

### Main Goal

The primary goal of the BMW Customization App is to provide users with a comprehensive tool to explore, customize, and order BMW vehicles online, ensuring a seamless and engaging user experience.

### Key Objectives

- **Implement Secure Authentication**: Ensure user data and transactions are protected through robust login and registration mechanisms.
- **Enable Detailed Car Information**: Offer in-depth specifications and high-quality visuals for M3, M4, M5 models to enhance user knowledge and engagement.
- **Facilitate Customization Options**: Allow users to tailor their vehicle orders with customizable extras, reflecting personal preferences and needs.
- **Provide Real-Time Order Processing Updates**: Deliver immediate feedback and confirmations during order placements, enhancing the transactional experience.

## Feature Overview

### Secure Authentication

**Purpose**: Secure authentication ensures that user data is protected and that only authorized individuals can access their accounts and perform transactions within the app.

- **Code Location**: 
  - Frontend: `frontend/src/components/Login.js`, `frontend/src/components/Register.js`
  - Backend: `backend/Controllers/AuthController.cs`, `backend/Services/AuthService.cs`

- **Relevant Endpoints**:
  - `POST /api/Auth/register` - Handles user registration.
  - `POST /api/Auth/login` - Manages user login.

- **Related Modules**:
  - `AuthService`: Implements business logic for user credentials, password hashing, etc.

### Detailed Car Information

**Purpose**: Provide users with exhaustive details about BMW models M3, M4, and M5, including specifications, pricing, and visual content to support purchase decisions.

- **Code Location**: 
  - Frontend: `frontend/src/components/BMWM3.js`, `frontend/src/components/BMWM4.js`, `frontend/src/components/BMWM5.js`

- **Description**: 
  - Each component displays model-specific data, including images and a summary of specifications.

### Customization Options

**Purpose**: Allow users to personalize their vehicle orders with additional extras, enhancing user satisfaction by tailoring features to meet individual needs.

- **Code Location**: 
  - Frontend: `frontend/src/components/CarExtras.js`
  - Backend: `backend/Controllers/CarExtrasController.cs`

- **Relevant Endpoints**:
  - `GET /api/CarExtras` - Retrieves available customization extras.

### Real-Time Order Processing

**Purpose**: Provide immediate feedback and status updates during order placement, keeping users informed and enhancing the transactional experience.

- **Code Location**:
  - Frontend: `frontend/src/components/OrderPage.js`
  - Backend: `backend/Controllers/OrderController.cs`

- **Relevant Endpoints**:
  - `POST /api/Orders/place` - Processes new orders.
  - `DELETE /api/CarExtras/{id}` - Deletes a car extra post-order confirmation.

- **Additional Components**:
  - `OrderPage`: Displays order details, handles placements, and manages feedback popups.

### Responsive Web Design

**Purpose**: Ensure the application interface is accessible and usable across all devices, providing consistent and optimized experiences for desktop and mobile users.

- **Code Location**:
  - Frontend Styling: `frontend/src/styles`

- **Description**: 
  - SCSS files within the `styles` directory contain responsive design rules ensuring adaptability and engagement on diverse devices.


### Project prerequisites:

Windows                 | Mac 
------------------------|------------------------
Microsoft Azure SQL     | [Homebrew](https://brew.sh/)
Node.js                 | Node.js                  |
C#                      |
.NET SDK                | 

Homebrew is an open-source package manager for macOS, helping you install and update developer tools such as Node.

If you receive an error message that GTK is missing you will need to [install](https://www.gtk.org/docs/installations/windows) it.

## Enterprise Considerations

### Performance

To ensure efficient performance, several strategies and best practices have been implemented in the BMW Customization App:

- **Code Optimization**: Utilized efficient algorithms and data structures for managing data and processing user requests.
- **Asset Management**: Implemented lazy loading for images and code splitting to reduce initial load time and improve performance.
- **Caching Strategies**: Utilized in-memory caching at the backend to store frequently accessed data and reduce database calls.

### Scalability

The application is designed with scalability in mind to handle growth in both user base and data volume:

- **Microservices Architecture**: The backend follows a modular design that supports easy scaling of individual components as needed.

### Robustness

Robustness is achieved through careful error handling and monitoring:

- **Error Handling**: Implemented comprehensive error handling mechanisms throughout the application to catch and manage exceptions gracefully.
- **Graceful Degradation**: Where possible, the application is designed to degrade gracefully, continuing to provide essential functionality even if non-critical services fail.

### Security

Security measures ensure the safety and integrity of user data and transactions:

- **Password Hashing**: Implemented hashing (using BCrypt) to securely store user passwords.
- **CSRF Protection**: Ensured Cross-Site Request Forgery protection is in place to prevent unauthorized actions.
- **HTTPS**: All data in transit is encrypted using HTTPS to protect against interception and tampering.

### Deployment

The BMW Customization App is deployed using modern cloud infrastructure, providing reliability and scalability:

- **Cloud Hosting**: The application is hosted on Azure, leveraging Azure App Service for web applications and Azure SQL Database for data storage.

## Cloning instructions 

### Setting up SSH Keys

Please refer to the GitHub documentation to set up SSH keys [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

### Using SSH

- On the repository page, click the "Code" button.
- Select the SSH tab to view the SSH URL.
- Copy the SSH URL.
- In the terminal or command prompt, navigate to the directory where you want to clone the repository.
- Run the command `git clone <SSH_URL>` (replace `<SSH_URL>` with the copied SSH URL).
- The repository will be cloned to your local machine.

For setup, please see the [frontend](src/frontend/README.md) and [backend](src/backend/README.md) READMEs, which explain how to run the project locally, and the steps that should be taken to use it for development of a new asset.

### Using HTTPS

- On the repository page, click the "Code" button.
- Select the HTTPS tab to view the HTTPS URL.
- Copy the HTTPS URL.
- In the terminal or command prompt, navigate to the directory where you want to clone the repository.
- Run the command `git clone <HTTPS_URL>` (replace `<HTTPS_URL>` with the copied HTTPS URL).
- The repository will be cloned to your local machine.

Then once cloned please see the [frontend](src/frontend/README.md) and [backend](src/backend/README.md) READMEs, which explain how to run the project locally, and the steps that should be taken to use it for development of a new asset.
