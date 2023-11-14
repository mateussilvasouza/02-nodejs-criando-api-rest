import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DB_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DB_URL: z.string(),
  PORT: z.coerce.number().default(8888),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log(_env)
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables.')
}

export const env = _env.data
