const { Schema, model } = require('mongoose');

const caseSchema = new Schema(
    {
        state: {
            type: String,
            enum: ['Abierta', 'En curso', 'En pausa', 'Cerrada'],
            required: [true, 'Falta el estado'],
        },
        school: { 
            type: Schema.Types.ObjectId, 
            ref: 'School',
            required: [true, 'Necesitamos que indiques el colegio al que va la víctima.'],
        },
        province: {
            type: String,
            enum: ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
            'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
            'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
            'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
            'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'],
            required: [true, 'Indícanos la provincia.'],
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
            minLength: 3,
        },
        attached: [
            {}
        ],
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
        professional: { 
            type: Schema.Types.ObjectId, 
            ref: 'Professional'
        },
        comments: [
            {
                _id: false,
                comment: {
                    type: String,
                    minLength: 3,
                    required: true
                },
                date: { 
                    type: Date, 
                    required: true 
                },
                author: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Case = model("Case", caseSchema)

module.exports = Case