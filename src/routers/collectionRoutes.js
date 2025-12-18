import { Router } from "express";
import { validateBody } from "../middlewares/validation.js";
import { createCollectionSchema} from "../models/collection.js";
import {authenticatetoken} from '../middlewares/authentificationToken.js'
import { getAllCollection,createCollection, deleteCollection } from "../controllers/collectionController.js";

const router = Router()

router.use(authenticatetoken)

router.get('/', getAllCollection)

router.post('/', validateBody(createCollectionSchema), createCollection)

router.delete('/:id', deleteCollection)

export default router