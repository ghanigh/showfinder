# Étape 1: Construction de l'application React
FROM node:18 AS build

WORKDIR /app

# Copier le package.json et package-lock.json (si présent)
COPY frontend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY frontend/ .

# Construire l'application React pour la production
RUN npm run build

# Étape 2: Servir l'application avec un serveur web léger (Nginx)
FROM nginx:alpine

# Copier les fichiers build de React vers le dossier approprié d'Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx en mode premier plan
CMD ["nginx", "-g", "daemon off;"]
