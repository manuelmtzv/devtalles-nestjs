# Teslo Shop

## Ejecución:

### 1. Copiar `.env.example` y ponerlo en un archivo llamado `.env`.

### 2. Configurar `.env` con las variables de entorno a usar (algunas vendrán con un valor por defecto, pero se pueden modificar dependiendo de las necesidades).

```
API_PORT=3000
API_PREFIX=api

POSTGRES_PASSWORD=
POSTGRES_USER=

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
