import {Router} from 'express'
import { columnCards, createCard, deleteCard, deleteColumn, getCards, uniqueCards, updateColumn } from '../controllers/card.controller.js'

const cardRouter = Router()


cardRouter.get("/getcards",getCards)
cardRouter.post('/createcard',createCard)
cardRouter.get('/uniquecards', uniqueCards)
cardRouter.get('/column/:column',columnCards)
cardRouter.put('/updatecolumn/:cardid/:column',updateColumn)
cardRouter.delete('/delete/:cardid',deleteCard)
cardRouter.delete("/deletecolumn/:columnname",deleteColumn)
export default cardRouter