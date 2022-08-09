const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')

const date_formats = 'https://www.w3schools.com/js/js_date_formats.asp'
const pattern = /<t:([0-9])+:([t | T | d | D | f | F | R])>/g

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timestamp')
        .setDescription('create a custom timestamp format with ease.')
        .addStringOption(option => option
            .setName('date')
            .setDescription('date input for timestamp')
            .setRequired(true))
        .addStringOption(option => option
            .setName('format')
            .setDescription('output date formats')
            .addChoices(
                { name: 'short time', value: 't'},
                { name: 'long time', value: 'T'},
                { name: 'short date', value: 'd'},
                { name: 'long date', value: 'D' },
                { name: 'long date with short time', value: 'f' },
                { 
                    name: 'long date with day of week and short time', 
                    value: 'F' 
                },
                { name: 'relative', value: 'R' }
            ).setRequired(true)),
    async run(interaction) {
        
        const date = new Date(interaction.options.getString('date'))
        const unix = Math.floor(new Date(date.getTime() + 60 * 60000 * 7).getTime() / 1000)

        console.log(date)
        
        if (!date) {
            return interaction.reply({
                content: `Invalid date format, refer to ${date_formats}`,
                ephemeral: true
            })
        }
        
        const format = interaction.options.getString('format')
        const timestamp = `<t:${unix}:${format}>`

        if (!timestamp || !timestamp.match(pattern)) {
            return interaction.reply({
                content: `Improper timestamp found\n >>> ${timestamp}`,
                ephemeral: true
            })
        }

        interaction.reply({
            content: `<t:${unix}:${format}>`,
            ephemeral: true
        })  
    } 
}