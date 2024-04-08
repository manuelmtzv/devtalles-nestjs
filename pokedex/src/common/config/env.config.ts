export const EnvConfig = () => ({
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'dev',
  mongo_uri: process.env.MONGODB_URI,
  pokeapiBaseUrl: process.env.POKEAPI_BASE_URL,
});
