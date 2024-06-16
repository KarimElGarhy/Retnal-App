import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRoutes from './src/modules/user/user.routes.js'
import carRouter from './src/modules/car/car.routes.js'
import rentalRoutes from './src/modules/rental/rental.routes.js'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/cars', carRouter)
app.use('/rentals', rentalRoutes)

dbConnection()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
