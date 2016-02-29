# Accessing the dashboard

You can access the application by browsing to: `http://<kubernetes_api_address>/api/v1/proxy/namespaces/kube-system/services/kube-admin/`

Why the long URL? well, Kubernetes API server starts by default with CORS disabled therefore we need to access it from the same domain.
So that long URL should work regardless of CORS being enabled or disabled.

If you have CORS enabled, then the URL is simply `http://<kube-admin_service-ip-address>`

# Obtaining the kube-admin service IP address

The install script prints out the kube-admin service IP address before exiting.

Alternatively, you can find out the address with this command:

```bash
$ kubectl get service --namespace=kube-system -l k8s-app=kube-admin
```

# Enabling CORS in the API sever

You can add the flag `--cors-allowed` to the API server command. For example:


```bash
hyperkube apiserver --cors-allowed_origins=http://<hostname>
```

or

```bash
hyperkube apiserver --cors-allowed_origins=.*
```

Keep in mind that this requires restarting the server

# Configuration

By default, the kubernetes API server address is set to `http://localhost:8080`. This can be changed in the settings section.
