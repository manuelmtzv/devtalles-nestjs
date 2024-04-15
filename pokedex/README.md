# Pokedex

## Iniciar entorno de desarrollo

1. Clonar repositorio.
2. Ejecutar:

```
npm install
```

3. Tener Nest CLI instalado.

```
npm install -g @nestjs/cli
```

4. Levantar la base de datos.

```
npm run db:start
```

5. Establecer variables de entorno creando un `.env` en base a `.env.example`.

```
PORT=3000
NODE_ENV=dev

MONGO_URI=mongodb://root:password@localhost:27017/pokedex?authSource=admin (por defecto)

...
```

6. Iniciar la aplicación

```
npm run start:dev
```

7. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```

## Stack utilizado

- MongoDB.
- Nest.
- Docker.
