@echo off
echo Installation des librairies NPM...

REM Installation des dépendances principales
npm install nodemon
npm install express
npm install zod
npm install bcrypt
npm install jsonwebtoken

REM Installation de Drizzle ORM
npm install drizzle-orm @libsql/client dotenv
npm install -D drizzle-kit

echo Installation terminee !
pause