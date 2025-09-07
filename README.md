# **Todo List Web Application**

### **Project Description**
This is a simple and responsive full-stack Todo List web application. It allows users to create an account, log in securely, and manage their personal todo tasks. The application is built with a modern tech stack to demonstrate a clean and scalable architecture.

### **Tech Stack**
* **Backend**: Python, Django, Django REST Framework, Simple JWT  
* **Frontend**: Next.js, React, TypeScript  
* **Styling**: Tailwind CSS  
* **Database**: SQLite

### **Features**
* **User Authentication**: Users can register for a new account and log in with a username and password.  
* **Personalized Todo List**: Each authenticated user has their own private list of tasks.  
* **Task Management**: Users can perform all key operations (Create, Read, Update, Delete) on their tasks.  
  * **Add Task**: A responsive popup form is used to add new tasks with a title and description.  
  * **Mark as Completed**: Tasks can be marked as completed to visually track progress.  
  * **Delete Task**: Tasks can be permanently deleted from the list.  
* **Responsive Design**: The UI is designed to be fully responsive and provide a seamless experience on desktop, tablet, and mobile devices.

### **How to Run the Project**
Follow these steps to set up and run the application locally.

#### **1. Clone the Repository**
 $ git clone https://github.com/crestianrex/todo-list-app-test.git
 $ cd todo-list-app-test

#### **2. Backend Setup**
# irst, navigate to the backend directory.
 $ cd backend

**Step 2.1: Create and Activate the Virtual Environment**
# It's crucial to first create an isolated environment to install your dependencies.

**macOS / Linux**
 $ python3 -m venv venv
 $ source venv/bin/activate

**Windows**
 $ python -m venv venv
 $ venv\Scripts\activate

**Step 2.2: Install Dependencies**
# Now, with your virtual environment activated, install the required packages.
 $ pip install -r requirements.txt

**Step 2.3: Run the Server**
Run the following commands to set up the database and start the server.
# Run migrations and create a superuser
 $ python manage.py makemigrations
 $ python manage.py migrate
 $ python manage.py createsuperuser
# Run the server
 $ python manage.py runserver

#### **3. Frontend Setup**
Open a new terminal, navigate to the frontend directory, install dependencies, and run the dev server.

**Step 3.1: Create Environment File**
Create a new file named .env.local inside the frontend folder and add the following line to it:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/

**Step 3.2: Run the Application**
 $ npm install  
 $ npm run dev
*Note: The frontend is configured to connect to a backend running on http://localhost:8000/. Make sure your Django server is running before starting the frontend.*

### **Additional Information**
* The project structure follows a typical full-stack monorepo pattern, with separate folders for the frontend and backend.  
* Environment variables are used to manage the API URL, ensuring a smooth transition between development and production environments.  
* The Django admin panel is available at http://localhost:8000/admin/ for easy management of users and tasks.

### **Submission Notes**
This project was developed within the specified deadline and fulfills all the technical and feature requirements outlined in the test brief. The code is structured for readability and maintainability, with a strong focus on using the required technologies effectively.