import mongoose from 'mongoose'

const formDataSchema = new mongoose.Schema({
    date: { type: Date }, 
    description: { type: String, required: true }, 
    person: { type: String, required: true }, 
    taskname: { type: String, required: true } 
});

const cardSchema = mongoose.Schema({
    id:{
        type:String,
        unique:true,
    },
    column:{
      type:String,
    },
    formData:{
        type:formDataSchema,
        default:null
    },
    image:{
        type:String,
    }
},{timestamps:true})

export const Card = mongoose.model('Card',cardSchema)