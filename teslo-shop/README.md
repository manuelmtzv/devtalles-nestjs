# Teslo Shop

## Ejecución:

### 1. Copiar `.env.example` y ponerlo en un archivo llamado `.env`.

### 2. Configurar `.env` con las variables de entorno a usar (algunas vendrán con un valor por defecto, pero se pueden modificar dependiendo de las necesidades).

```
PORT=3000

POSTGRES_PASSWORD=postgres
POSTGRES_USER=root
POSTGRES_DB=teslo-shop-db

...
```

### 3. Levantar base de datos con Docker:

```
docker-compose up -d
```

### 4. Instalar las dependencias de node.

```
npm install
```

### 5. Ejecutar la aplicación de Nest en modo de desarrollo.

```
npm run start:dev
```
