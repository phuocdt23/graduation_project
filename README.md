prerequisite installed tools:
- docker
- kubernetes (enable in docker client(Windows/MacOS), with Ubuntu, have to install minikube)
- skaffold

scripts:

  +>install ingress-nginx:
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml

  +>create jwt secret key via kubectl
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=YOUR_SECRET_KEY

  +>create stripe secret key via kubectl
  kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=sk_test_51MJv0nCK7XRm1KmCuGLVYZncyMn6vzN7OqA965CvS7AZbRP0EkgoxVPFbf2jFsFTkg3l3Um6BEPsQZOGmDrMo5Om00ZUV8FaoU
  +>change host
  code C:\Windows\System32\drivers\etc\hosts