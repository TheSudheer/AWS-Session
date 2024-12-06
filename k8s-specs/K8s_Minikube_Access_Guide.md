
# **Kubernetes Application Deployment Guide**

This README provides a step-by-step guide for deploying and accessing an application on Kubernetes, specifically using Minikube. It also covers common challenges and their solutions.

---

## **1. Prerequisites**

Before starting, ensure the following are installed and configured:
- Kubernetes CLI (`kubectl`)
- Minikube
- A container runtime (e.g., Docker, Containerd)

---

## **2. Files and Configurations**

Below are the key Kubernetes YAML configuration files required:

1. **`deployment.yml`**: Defines the application deployment (pods and replica sets).
2. **`service.yml`**: Exposes the application as a Kubernetes service (NodePort in this case).
3. **`configmap.yml`**: (Optional) Stores configuration data.
4. **`secret.yml`**: (Optional) Manages sensitive data like passwords.
5. **Additional files**: (e.g., `ingress.yml`, if Ingress is used for external traffic routing).

---

## **3. Deployment Steps**

### **Step 1: Apply the Configurations**
Deploy your resources in the correct order:
```bash
kubectl apply -f configmap.yml
kubectl apply -f secret.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

### **Step 2: Verify Deployments and Services**
Check if the resources are created successfully:
```bash
kubectl get pods
kubectl get svc
kubectl describe svc <service-name>
```

- Example output for the service:
  ```
  NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
  my-app-service   NodePort   10.105.159.18   <none>        3000:31000/TCP   5m
  ```

### **Step 3: Accessing the Application**
Since we’re using Minikube, follow these steps:

#### **Option 1: Minikube Service Command**
Run the following to open the service in your browser:
```bash
minikube service my-app-service
```

#### **Option 2: Access NodePort**
1. Get the Minikube node’s IP:
   ```bash
   minikube ip
   ```
2. Access the service using:
   ```bash
   curl http://<MINIKUBE-IP>:31000
   ```
   Example:
   ```bash
   curl http://192.168.49.2:31000
   ```

---

## **4. Challenges and Solutions I faced during this project:**

### **Challenge 1: Service Not Accessible via NodePort**
- **Issue:** Accessing `NodePort` service using `curl` or a browser didn’t work.
- **Solution:** 
  - Use the `minikube service` command to get the correct URL.

### **Challenge 2: Correct Service Name**
- **Issue:** Commands like `kubectl get svc service` failed due to an incorrect service name.
- **Solution:** Always check the service name in `service.yml` under `metadata.name` and use:
  ```bash
  kubectl get svc <service-name>
  ```

### **Challenge 3: Verifying Pod Connectivity**
- **Issue:** Service wasn't responding even though the pod was running.
- **Solution:** Test pod connectivity using:
  ```bash
  kubectl exec <pod-name> -- curl http://<pod-IP>:<target-port>
  ```

---

## **5. Key Commands**

### **Check Resources**
```bash
kubectl get pods
kubectl get svc
kubectl describe svc <service-name>
kubectl logs <pod-name>
```

### **Port Forwarding using ClusterIP service*
```bash
kubectl port-forward <pod-name> 8080:<target-port>
curl http://localhost:8080
```

---

## **6. Additional Notes**
- **Minikube Specifics:**
  - Minikube runs a local Kubernetes cluster and uses a network bridge. The internal node IP may not always be accessible externally.
---

## **7. Conclusion**
This guide outlines how to deploy and access applications in Kubernetes using Minikube. It also includes tips for overcoming common issues, ensuring your applications are accessible and functional.

Feel free to modify this file for your project needs!

--- 

### **8. References**
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)

