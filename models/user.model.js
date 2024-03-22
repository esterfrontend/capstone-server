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
            required: [true, 'Indícanos un email de contacto.'],
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
            enum: ['colegio', 'profesional'],
            required: true
        },
        name: {
            type: String,
            minLength: 3,
            required: [true, 'Indícanos el nombre.'],
        },
        registrationNumber: {
            // Solo para los profesionales
            type: String,
        },
        address: {
            type: String,
            minLength: 10,
            required: [true, 'Indícanos la dirección.'],
        },
        postalCode: {
            type: Number,
            minLength: 5,
            maxLength: 5,
            required: [true, 'Indícanos el código postal.'],
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
        contactPerson: {
            // Solo para los colegios
            type: String
        },
        phone: {
            type: Number,
            minLength: 9,
            maxLength: 9,
            required: [true, 'Indícanos tu teléfono.'],
        },
        phoneSecondary: {
            // Solo para los colegios
            type: Number
        },
        professional: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        schools: [{
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }],
        cases: [{
            type: Schema.Types.ObjectId, 
            ref: 'Case'
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