const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            minLength: 1,
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                'Este email no es válido.',
            ],
            required: [true, 'Indícanos un email del colegio.'],
        },
        password: {
            salt: {
                type: String,
                required: true
            },
            hash: {
                type: String,
                required: true
            }
        },
        role: {
            type: String,
            enum: ['colegio', 'psicologo'],
            required: true
        },
        name: {
            type: String,
            minLength: 3,
            required: [true, 'Indícanos el nombre del colegio.'],
        },
        registrationNumber: {
            // Solo para los profesionales
            type: String,
            // unique: true,
            minLength: 5,
            // required: [true, 'Indícanos tu número de colegiado.'],
        },
        address: {
            type: String,
            minLength: 10,
            // required: [true, 'Indícanos la dirección del colegio.'],
        },
        postalCode: {
            type: Number,
            minLength: 5,
            maxLength: 5,
            // required: [true, 'Indícanos el código postal.'],
        },
        province: {
            type: String,
            enum: ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
            'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
            'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
            'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
            'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'],
            // required: [true, 'Indícanos la provincia.'],
        },
        contactPerson: {
            // Solo para los colegios
            type: String,
            minLength: 3
            // required: [true, 'Indícanos tu nombre.'],
        },
        phone: {
            type: Number,
            // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            minLength: 9,
            maxLength: 9,
            // required: [true, 'Indícanos el teléfono del colegio.'],
        },
        phoneSecondary: {
            // Un segundo teléfono de contacto solo para los colegios
            type: Number,
            // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            minLength: 9,
            maxLength: 9,
        },
        cases: [{
            type: Schema.Types.ObjectId, 
            ref: 'Cases'
        }]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
              delete ret.password;
              return ret;
            },
        }
    }
)

const User = model("User", userSchema)

module.exports = User