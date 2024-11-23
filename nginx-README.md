# NGINX Configuration for Node.js Cluster with HTTPS

This project demonstrates an NGINX configuration designed to proxy requests to a Node.js cluster and secure connections using SSL. It also includes optional HTTP-to-HTTPS redirection.

---

## Configuration Overview

### Global Settings
- **`worker_processes 1;`**: Configures NGINX to use one worker process. Adjust based on your server’s capabilities.
- **`worker_connections 1024;`**: Specifies the maximum number of connections a worker can handle.

---

### HTTP Block
Defines the main server logic, including:
1. **MIME Types**: 
   - Includes standard MIME types with `include mime.types;`.

2. **Upstream Block**:
   - **`upstream nodejs_cluster`**: Defines a load-balanced upstream group of Node.js servers running on ports `3001`, `3002`, and `3003`.

3. **HTTPS Server**:
   - Listens on port `443`.
   - Uses self-signed certificates located at `/home/sudheer/nginx-certs/nginx-selfsigned.crt` and `/home/sudheer/nginx-certs/nginx-selfsigned.key`.
   - Proxies requests to the Node.js cluster with:
     - `proxy_pass http://nodejs_cluster;`
     - Passes essential headers like `Host` and `X-Real-IP`.

4. **HTTP-to-HTTPS Redirection** (Optional):
   - Redirects all traffic from port `8080` (HTTP) to port `443` (HTTPS).

---

## File Structure

```
.
├── nginx.conf                     # Main NGINX configuration file
├── /home/sudheer/nginx-certs/     # Directory for SSL certificates
│   ├── nginx-selfsigned.crt       # Self-signed SSL certificate
│   └── nginx-selfsigned.key       # Self-signed SSL private key
```

---

## Usage Instructions

### 1. Install NGINX
Install NGINX on your system if it's not already installed. For Ubuntu:

```bash
sudo apt update
sudo apt install nginx
```

### 2. Update the Configuration File
Replace the default configuration with the provided `nginx.conf`:

1. Copy the configuration to the NGINX directory:

   ```bash
   sudo cp nginx.conf /etc/nginx/nginx.conf
   ```

2. Test the configuration for syntax errors:

   ```bash
   sudo nginx -t
   ```

3. Reload NGINX to apply changes:

   ```bash
   sudo systemctl reload nginx
   ```

---

### 3. Generate Self-Signed SSL Certificates
If you don’t already have certificates, generate them using the following commands:

```bash
mkdir -p /home/sudheer/nginx-certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /home/sudheer/nginx-certs/nginx-selfsigned.key \
  -out /home/sudheer/nginx-certs/nginx-selfsigned.crt
```

> Update the file paths in the `nginx.conf` if your certificates are located elsewhere.

---

### 4. Access the Application
- Open [https://localhost](https://localhost) in your browser for the HTTPS-secured endpoint.
- HTTP requests on [http://localhost:8080](http://localhost:8080) will be redirected to HTTPS.

---

## Troubleshooting

### Common Issues
1. **NGINX Fails to Start**:
   - Check for syntax errors in the configuration with `sudo nginx -t`.

2. **SSL Certificate Not Found**:
   - Verify the certificate paths in the `nginx.conf` file.

3. **Node.js Servers Not Responding**:
   - Ensure all Node.js servers are running on the specified ports.

---

## Notes

- The configuration uses **self-signed SSL certificates**, which will trigger browser warnings. For production, use a certificate from a trusted Certificate Authority (e.g., Let's Encrypt).
- Adjust `worker_processes` and `worker_connections` based on your server’s capacity and traffic requirements.

---

