# Étape 1: Installer les dépendances
FROM node:18

WORKDIR /app

# Copier le package.json et package-lock.json (si présent)
COPY backend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source du backend
COPY backend/ .

# Exposer le port de l'API (par exemple, 5000)
EXPOSE 5000

# Démarrer le serveur
CMD ["npm", "start"]
