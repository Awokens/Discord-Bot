// const { SlashCommandBuilder } = require('@discordjs/builders')
// const { PermissionFlagsBits } = require('discord-api-types/v10')

// const API = 'https://api.thecatapi.com/v1/images/search'

// const fetch = (...args) => import('node-fetch')
//     .then(({
//         default: fetch
//     }) => fetch(...args))


// const pattern = /([jpg|png]*)$/g


// module.exports = {

//     data: new SlashCommandBuilder()
//         .setName('animal')
//         .setDescription('sends a random cat picture')
//         .addStringOption(option => option
//             .setName('animal')
//             .addChoices(
//                 { name: 'cat', value: 'https://api.thecatapi.com/v1/images/search' },
//                 { name: 'dog', value: 'https://dog.ceo/api/breeds/image/random' },
//                 { name: 'bird', value: 'https://some-random-api.ml/animal/birb' },
//                 { name: 'zoo animal', value: 'https://zoo-animal-api.herokuapp.com/animals/rand' }
//             )
//             .setDescription('retrieve a random picture, such as a cat!')
//             .setRequired(true)),
//     async run(interaction) {


//         const URL = interaction.options.getString('animal')
        
//         let data = await fetch(URL)
//             .then(async (response) => {
//                 if (!response || !response.ok) {
//                     throw new Error(`${animal} is probably API down.`)
//                 }
//                 return await response.json()
//             }).catch((error) => {
//                 interaction.reply({
//                     content: 'Failed to retrieve a picture.',
//                     ephemeral: true
//                 })
//                 throw new Error(error)
//             })

//         if (data instanceof Array) {
//             data = data[0]
//         }

//         if (!data) {
//             interaction.reply({
//                 content: 'Failed to retrieve a picture',
//                 ephemeral: true
//             })
//             throw new Error(`Invalid type from image API, ${URL}, expected an Object`) 
//         }

        

//         console.log(data)



//         interaction.reply({
//             content: 'test'
//         })
        
//         // console.log(cat_jpeg)

//         // if (!cat_jpeg.match(pattern)) {
//         //     return interaction.reply({
//         //         content: 'The cat picture jpeg pink is either invalid or the API is down.',
//         //         ephemeral: true
//         //     })
//         // }
 
//         // interaction.reply({
//         //     content: cat_jpeg
//         // })


        
        
//     }

// }