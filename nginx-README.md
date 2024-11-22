## Step 1: Install Dependencies

If you haven't installed the required Node.js dependencies, you need to do so:

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Start your Node.js application**:
   ```bash
   node server.js
   ```
   Ensure your application is running on port `3000`.

## Step 2: Install Nginx

If Nginx is not yet installed, you can install it using the following commands (for Ubuntu-based systems):

1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Start Nginx service**:
   ```bash
   sudo systemctl start nginx
   ```

## Step 3: Configure Nginx

If you pulled the `nginx.conf` file, you need to copy it to the appropriate location on your system and configure Nginx to use it.

1. **Copy the `nginx.conf` file to `/etc/nginx/`**:
   ```bash
   sudo cp nginx.conf /etc/nginx/nginx.conf
   ```

2. **Edit the `nginx.conf` file** (if needed):
   If the file is correct, you don't need to change anything, but if necessary, adjust the paths in the configuration to match your environment (such as the `root` path or `server_name`).

   Open the `nginx.conf` file in a text editor:
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   - **Important**: Make sure the `proxy_pass` in the `location / { ... }` block points to your Node.js server (e.g., `http://localhost:3000`).

## Step 4: Test the Nginx Configuration

Before restarting Nginx, test the configuration to ensure it's correct:

1. **Test the configuration**:
   ```bash
   sudo nginx -t
   ```

   You should see:
   ```
   nginx: configuration file /etc/nginx/nginx.conf test is successful
   ```

   If there are any errors, they will be displayed, and you can fix them.

## Step 5: Reload Nginx

If the configuration test was successful, reload Nginx to apply the changes:

1. **Reload Nginx**:
   ```bash
   sudo systemctl reload nginx
   ```

   This will apply the new configuration without restarting Nginx completely.

## Step 7: Ensure Nginx Starts on Boot (Optional)

You may want to configure Nginx to start automatically when the server boots:

1. **Enable Nginx to start on boot**:
   ```bash
   sudo systemctl enable nginx
   ```

## Step 8: Test the Application

Now that Nginx is configured, you can test the setup:

1. **Test the server locally**:
   ```bash
   curl -I http://localhost
   ```

   You should see a response like:
   ```
   HTTP/1.1 200 OK
   Server: nginx/1.24.0 (Ubuntu)
   Date: Fri, 22 Nov 2024 05:16:00 GMT
   Content-Type: text/html
   Content-Length: 166
   Connection: keep-alive
   ```

2. **Test the server from your IP address** (if your server is accessible from a different machine):
   ```bash
   curl -I http://your-server-ip
   ```

   Replace `your-server-ip` with the actual IP address of your server.

   You should get a similar response, indicating that Nginx is correctly forwarding requests to your Node.js application.

## Troubleshooting

- **502 Bad Gateway**: This typically means that Nginx cannot reach your Node.js server. Make sure your Node.js server is running and listening on port `3000`.
  
  - Check if the Node.js application is running:
    ```bash
    ps aux | grep node
    ```

- **404 Not Found**: Ensure that the `root` directory in the Nginx configuration is correct, and verify the file paths in the application.

- **Permission Issues**: Ensure that Nginx has read permissions for the `nginx.conf` file and other necessary directories.

## Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

