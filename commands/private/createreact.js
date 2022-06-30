const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('./utils/config.json')

const fetch = (...args) => import('node-fetch')
    .then(({
        default: fetch
    }) => fetch(...args))

module.exports = {

    data: new SlashCommandBuilder()
        .setName('createreact')
        .setDescription('Creates a post with buttons that assign a role on click')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async run(interaction) {


        const channel = interaction.channel //.client.channels.cache.get(config.channel)

        if (!channel) {
            return interaction.reply({
                content: 'Cannot find reaction channel.',
                ephemeral: true
            })
        }


        const roles = config.roles

        if (!roles || roles.size < 1) {
            return interaction.reply({
                content: 'There are no roles, therefore no point in making this.',
                ephemeral: true
            })
        }
        
        const row = new MessageActionRow()

        for (const id of roles) {

            let role = interaction.guild.roles.cache.get(id)
            if (!role) {
                return interaction.reply({
                    content: 'Failed to create reaction message.',
                    ephemeral: true
                })
            }
            row.addComponents(new MessageButton()
                .setCustomId(id)
                .setLabel(role.name)
                .setStyle('PRIMARY'))            
        }

        await channel.send({
            content: 'Click a button below to receive or remove a role.',
            components: [row]
        })

        interaction.reply({
            content: 'Completed your role react post.',
            ephemeral: true
        })

    }
}