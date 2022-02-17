import { app } from './config/app'

const PORT = 5050

app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
)
