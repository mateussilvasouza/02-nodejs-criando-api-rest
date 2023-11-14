import { env } from './env'
import app from './app'

app.listen({ port: env.DB_PORT }).then(() => console.log('HTTP Server Running'))
