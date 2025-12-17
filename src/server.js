import express from 'express'
// import questionsRoutes from './routers/questionsRoutes.js'
import userRoutes from './routers/UsersRoutes.js'
// import logger from './middleware/logger.js'
// import authRouter from './routers/authRouter.js'
// import adminUsersRouter from './routers/adminUsersRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
// app.use(logger)
// app.use(`/questions`, questionsRoutes)
app.use('/users', userRoutes)
// app.use('/auth', authRouter)
// app.use('/admin/users', adminUsersRouter)
//--------------- A RENNOMER -----------------//

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
