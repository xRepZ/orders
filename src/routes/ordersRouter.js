import { Router } from "express"
import { OrdersController } from "../controllers/OrdersController.js"

const router = Router()



router.get('/clients', OrdersController.getСlients)
router.get('/count', OrdersController.getСount)



export default router