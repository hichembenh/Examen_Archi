import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";


let commandeSchema=new mongoose.Schema({
    client:{type:String,required:true },
    orderiltems:{type: Object, required: true},
    Date:{type:Date, default:new Date()},
   
    });

commandeSchema.plugin(mongoosePaginate);
const Commande=mongoose.model("Commande",commandeSchema);
export default Commande;