
# Todo App


## Installation

1.Clone this Repository

```bash
  git clone https://github.com/hamzathul/Task-Manager.git
```
2.Navigate to the project folder:
```bash
  cd Task-Manager
```
To run this project, add the following environment variables to your .env file in the root directory of this project.
<br>
So, create a '.env' file, and add the following:


`JWT_SECRET = <your-jwt-secret>`

`MONGO_URI = <your-mongodb-uri>`




3.Install dependencies for the backend and run backend server:
```bash
  yarn install
  yarn run dev
```
The backend will run on http://localhost:5000.

4.Install dependencies for the frontend and run frontend server:
```bash
  cd frontend
```
```bash
  yarn install
  yarn dev
```
The frontend will run on http://localhost:5173.

Now you can open your browser and go to http://localhost:5173 to view the application.
