const { Schema, model } = require('mongoose');

const professionalSchema = new Schema(
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
            minLength: 10,
            required: [true, 'Indícanos tu nombre.'],
        },
        surname: {
            type: String,
            minLength: 10,
            required: [true, 'Indícanos tu apellido.'],
        },
        registrationNumber: {
            type: String,
            unique: true,
            minLength: 5,
            required: [true, 'Indícanos tu número de colegiado.'],
        },
        address: {
            type: String,
            minLength: 10,
            required: [true, 'Indícanos tu dirección.'],
        },
        postalCode: {
            type: Number,
            minLength: 5,
            maxLength: 5,
        },
        phone: {
            type: Number,
            // match: /^[6]\d{8}$/,
            // validate: {
            //     validator: function(phone) {
            //         return /^[6]\d{8}$/.test(phone);
            //     },
            //     message: props => `${props.value} no es un número de teléfono móvil válido. Debe comenzar con 6 y tener 9 dígitos en total.`,
            // },
            required: [true, 'Indícanos tu teléfono.'],
        },
        email: {
            type: String,
            required: [true, 'Indícanos un email.'],
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

const Professional = model("Professional", professionalSchema)

module.exports = Professional