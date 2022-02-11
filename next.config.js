module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://tsales.herokuapp.com',
    //BASE_URL: 'http://localhost:3000',
    MONGO_URL:
      'mongodb+srv://next-ecormmerce:sRKyd4dCU7sP6M6@cluster0.wu8rg.mongodb.net/next-ecormmerce?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: '5017since711645ladygroundjoinfish',
    REFRESH_TOKEN_SECRET: 'dfeiijf9340g9urbv984unvjefj4r99rjr090n0ri9v',
    B_SECRET: 'jdioen40g9urbv984unvjefj4r99rjr0rbeoe',
    CLOUD_UPDATE_PRESET: 'next_store',
    CLOUD_NAME: 'codexaver',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/codexaver/image/upload',
    DB_HOST: 'localhost',
    DB_PORT: '3306',
    DB_DIALECT: 'mysql',
    DB_NAME: 'ecommerce',
    DB_USER: 'root',
    DB_PASS: 'password'
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback = { fs: false };
    return config;
  }
};
