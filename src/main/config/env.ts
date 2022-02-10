export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongodb:docker@localhost:27017/clean-api?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'a12bBjdjewjmdqio7wruqriofacZsolç3'
}
