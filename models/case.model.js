const { Schema, model } = require('mongoose');

const caseSchema = new Schema(
    {
        status: {
            type: String,
            enum: ['abierto', 'en-curso', 'pausa', 'cerrado'],
            required: [true, 'Falta el estado'],
        },
        school: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: [true, 'Necesitamos que indiques el colegio al que va la víctima.'],
        },
        professional: { 
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        victim: {
            type: String,
            minLength: 2,
            required: [true, 'Necesitamos que nos indiques qué persona está sufriendo acoso para poder ayudarla.'],
        },
        place: {
            type: String,
            minLength: 3,
        },
        how: {
            type: String,
            minLength: 3,
        },
        attacker: {
            type: String,
            minLength: 3,
        },
        moreInformation: {
            type: String,
        },
        // attached: [
        //     {}
        // ],
        informant: {
            anonymous: {
                type: Boolean,
                required: [true, 'Necesitamos saber si quieres ser anónimo o no te importa indicar quién eres.'],
            },
            name: {
                type: String,
            },
            relation: {
                type: String,
            },
            contact: {
                type: String,
            },
        },
        // comments: [
        //     {
        //         _id: false,
        //         comment: {
        //             type: String,
        //             minLength: 3,
        //         },
        //         date: { 
        //             type: Date, 
        //         },
        //         author: {
        //             type: String,
        //         }
        //     }
        // ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Case = model("Case", caseSchema)

module.exports = Case