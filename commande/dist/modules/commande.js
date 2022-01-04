"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let commandeSchema = new mongoose_1.default.Schema({
    client: { type: String, required: true },
    orderiltems: { type: String, required: true },
    Date: { type: Date, required: true, default: new Date() },
});
commandeSchema.plugin(mongoose_paginate_1.default);
const Commande = mongoose_1.default.model("Commande", commandeSchema);
exports.default = Commande;
