const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { PermissionFlagsBits } = require('discord-api-types/v10')

const fetch = (...args) => import('node-fetch')
    .then(({
        default: fetch
    }) => fetch(...args))

module.exports = {

    data: new SlashCommandBuilder()
        .setName('createpost')
        .setDescription('Suggest something to #suggestions')
        .addAttachmentOption(option => option
            .setName('description')
            .setDescription('Your post file attachment.')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async run(interaction) {

        const attachment = interaction.options.getAttachment('description')

        if (!attachment.name.endsWith('txt')) {
            return interaction.reply({
                content: 'Please attach a text file.',
                ephemeral: true
            })
        }

        console.log('fetching text from attachment...')

        const text = await fetch(attachment.url)
            .then(async (response) => {
                if (!response || !response.ok) throw new Error(response)
                return await response.text().then(data => data)
            }).catch((error) => {
                interaction.reply({
                    content: 'Failed to send description from text file',
                    ephemeral: true
                })
                throw new Error(error)
            })

        console.log('successfully retrieved text from attachment.')

        try {
            interaction.channel.send(text)
        } catch (error) {
            console.error(error)
            return interaction.reply({
                content: 'Failed to post comment',
                ephemeral: true
            })
        }

        interaction.reply({
            content: 'Completed your post.',
            ephemeral: true
        })
    }
}