# Server

## Development
Prerequisites:
* node v18.8.0
* yarn v1.22.19
* docker v20.10.17

Run mongo container with this command:
```
docker run -d --name advent-db --env MONGO_INITDB_DATABASE=advent -p "27017:27017" mongo:4.4.17
```

Create `.env` file and copy content from `.env.example`.

To run server in development mode:
```
yarn start
```

To build server:
```
yarn build
```

## Testing
Run all tests:
```
yarn test
```

Unit tests:
```
yarn test:unit
```

Functional/integration tests:
```
yarn test:func
```

## Env variables

|Name              |Description                           |
|------------------|--------------------------------------|
|PORT              |Port that application will listen on. |
|CONNECTION_STRING |Database connection string.           |

