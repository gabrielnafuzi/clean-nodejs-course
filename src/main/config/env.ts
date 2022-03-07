export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-ts-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '%g@u93cB.Shf~WNc',
}
