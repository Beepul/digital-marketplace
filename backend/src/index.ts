import express,{ Express, Request, Response } from "express"
import mainRouter from "./routes/main.router"
import errorHandler from "./middlewares/errorHandler"
import morgan from "./middlewares/morgan"
import connectDB from "./config/db"
import cors from 'cors'
import corsOptions from "./config/cors"


const app: Express = express()

const PORT = process.env.PORT || 3000

// connectDB()
app.use(express.json())

app.use(cors(corsOptions))
app.use(morgan.successLogger)
app.use(morgan.errorLogger)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    app: "Digital Marketplace Api",
    status: "Working :)"
  })
})

app.use('/api/v1', mainRouter)

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    app: "Digital Marketplace Api",
    status: "Opps! not found what you are looking for :("
  })
})

app.use(errorHandler)

const server = app.listen( PORT ,() => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})


// If any unhandled exceptions then we will shut down the server
process.on('unhandledRejection', (err: Error) => {
	console.log(`[UnHandledRejection]: Shutting down the server for ${err.message}`);
	console.log(`[UnHandledRejection]: Shutting down the server for unhandle promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});