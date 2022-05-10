const mongoose = require('mongoose');

// Informações do Usuário
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    //username: { type: String, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true, lowercase: true },
    profileImage: { type: String, required: false },
    selectedCauses: [{ type: String, required: true }],

    cpf: { type: String, required: false, unique: true },
    birthDate: { type: Date, required: false },
    gender: { type: String, required: false },

    cnpj: { type: String, required: false, unique: true },
    razaoSocial: { type: String, required: false }

}, { timestamps: {} });

module.exports = mongoose.model('User', UserSchema);
