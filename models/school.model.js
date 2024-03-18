const { Schema, model } = require('mongoose');

const schoolSchema = new Schema(
    {
        province: {
            type: String,
            enum: ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
            'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
            'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
            'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
            'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'],
            required: [true, 'Indícanos la provincia.'],
        },
        name: {
            type: String,
            minLength: 7,
            required: [true, 'Indícanos el nombre del colegio.'],
        },
        address: {
            type: String,
            minLength: 10,
            required: [true, 'Indícanos la dirección del colegio.'],
        },
        postalCode: {
            type: Number,
            minLength: 5,
            maxLength: 5,
            required: [true, 'Indícanos el código postal.'],
        },
        phone: {
            type: Number,
            // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            minLength: 9,
            maxLength: 9,
            required: [true, 'Indícanos el teléfono del colegio.'],
        },
        email: {
            type: String,
            required: [true, 'Indícanos un email del colegio.'],
            unique: true,
            minLength: 1,
            lowercase: true,
            trim: true,
            match: [
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              'Este email no es válido.',
            ],
        },
        cases: [{
            type: Schema.Types.ObjectId, 
            ref: 'Cases'
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const School = model("School", schoolSchema)

module.exports = School