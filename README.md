To freshly install and run your project, follow these steps from scratch:

---

### **Step 1: Prerequisites**
Make sure the following tools are installed:
1. **Node.js and npm**  
   Install them using the NodeSource repository:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
   Verify installation:
   ```bash
   node -v
   npm -v
   ```

2. **Git**  
   Install Git:
   ```bash
   sudo apt update
   sudo apt install -y git
   ```
   Verify installation:
   ```bash
   git --version
   ```

---

### **Step 2: Clone the Project**
Clone the project repository from GitHub:
```bash
git clone https://github.com/TheSudheer/AWS-Session.git
cd AWS-Session
```

---

### **Step 3: Set Up Environment Variables**
Create a `.env` file in the project root and add the required variables:
```bash
nano .env
```
Add the following content (replace placeholders with actual values if needed):
```env
DOMAIN=""
PORT=3000
STATIC_DIR="./client"
PUBLISHABLE_KEY=""
SECRET_KEY=""
```
Save and exit the editor.

---

### **Step 4: Install Dependencies**
Install project dependencies using npm:
```bash
npm install
```

---

### **Step 5: Start the Application**
Start the application:
```bash
npm run start
```

This will run the app using `node`. If you’re in development mode and want hot-reloading, use:
```bash
npm run devStart
```

---

### **Step 6: Access the Application**
1. The app will run on `http://localhost:3000`.
2. Open your browser and navigate to the above URL.

---

### **Step 7: Optional – Deployment on AWS EC2**
If you plan to deploy the application on AWS, follow these additional steps:

1. **Set Up an EC2 Instance**:
   - Launch an Ubuntu EC2 instance.
   - Connect to the instance via SSH:
     ```bash
     ssh -i your-key.pem ubuntu@<EC2_IP_ADDRESS>
     ```

2. **Install Node.js, npm, and Git on EC2**:
   Repeat the steps to install Node.js, npm, and Git on the instance.

3. **Clone the Project on EC2**:
   ```bash
   git clone https://github.com/TheSudheer/AWS-Session.git
   cd AWS-Session
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the EC2 instance with the same content as Step 3.

5. **Install Dependencies**:
   ```bash
   npm install
   ```

6. **Start the Application**:
   ```bash
   npm run start
   ```

7. **Update Security Group**:
   - Go to the AWS EC2 dashboard.
   - Edit the **Inbound Rules** of the instance's security group to allow traffic on port `3000`.

8. **Access the App**:
   Use your EC2 public IP or Elastic IP:
   ```
   http://<EC2_PUBLIC_IP>:3000
   ```


