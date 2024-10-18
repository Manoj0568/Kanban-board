import { Card } from "../models/card.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const getCards = async (req,res,next)=>{
    try {
        const cards = await Card.find()
    if(!cards){
        return next(errorHandler(404,"NO cards found"))
    }
    res.status(200).json(cards)
    } catch (error) {
        next(error)
    }
}

export const createCard = async (req,res,next)=>{
   const {column,id,formData,image} = req.body

   const newCard = new  Card({
     column,
     id,
     image: image || null,
     formData: formData  || null
   })
   
   try {
     await newCard.save()
     res.status(200).json(newCard)
   } catch (error) {
      next(error)
   }
}

export const uniqueCards = async (req, res,next) => {
    try {
        const cards = await Card.find().sort({ createdAt: 1 });
        const uniqueColumns = [...new Set(cards.map(card => card.column))];
        res.status(200).json(uniqueColumns);
    } catch (error) {
         next(error)
    }
}


export const columnCards = async (req,res,next)=>{
    const column = req.params.column
    try {
        const cards = await Card.find({column})
        if(!cards) return next(errorHandler(404,"NO Columns found"))
        res.status(200).json(cards)
    } catch (error) {
        next(error)
    }
}

export const updateColumn = async (req,res,next)=>{
    const {column,cardid} = req.params
    console.log(column)
    try {
        const updated = await Card.findByIdAndUpdate(cardid,{column})
        res.status(200).json(updated)
    } catch (error) {
        next(error)
    }
}

export const deleteCard = async (req,res,next)=>{
    const {cardid} = req.params
    try {
        const deleted = await Card.findByIdAndDelete(cardid)
        res.status(200).json(deleted)
    } catch (error) {
        next(error)
    }
 }

 export const deleteColumn = async (req,res,next)=>{
     const {columnname} = req.params
     try {
       const deleted =  await Card.deleteMany({ column: columnname })

       if(!deleted) return next(errorHandler(403,"No items found"))
       res.status(200).json(deleted)
     } catch (error) {
        next(error)
     }
 }
