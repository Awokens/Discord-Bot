const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')
const { MessageEmbed } = require('discord.js')

const pattern = /([a-zA-Z0-9_]){0,12}/g
const BASE_API = 'https://api.minehut.com'

const fetch = (...args) => import('node-fetch')
    .then(({
        default: fetch
    }) => fetch(...args))

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Retrieve a specific server\'s stats')
        .addStringOption(option => option
            .setName('name')
            .setDescription('name of the to search')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async run(interaction) {


        interaction.reply({
            content: 'This command is disabled.',
            ephemeral: true
        })
        
        // const name = interaction.options.getString('name')
        // if (!name.match(pattern)) {
        //     return interaction.reply({
        //         content: 'Invalid Minehut server name pattern',
        //         ephemeral: true
        //     })
        // }

        // /* important -> remind me to allow defers with this, as it can cause issues in the future.

        // // await interaction.deferReply()

        
        // const server = await fetch(`${BASE_API}/${name}?byName`)
        //     .then((response) => {

        //         if (!response || !response.ok) return null
        //         return await response.json()
                
        //     }).catch((error) => {
        //         console.error(error)
        //         return interaction.reply({
        //             content: `Something happened while fetching the server, ${name}`,
        //             ephemeral: true
        //         })
        //     })

        // if (!server) {
        //     return interaction.reply({
        //         content: 'This server does not exist or API is down.',
        //         ephemeral: true
        //     })
        // }

        // const embed = new MessageEmbed()
        //     .setTitle('')

        

        
    }
}