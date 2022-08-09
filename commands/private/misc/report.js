const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

const channel_id = process.env.REPORTS
const pattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g

module.exports = {

    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Creates a styled report in #reports')
        .addStringOption(option => option
            .setName('title')
            .setDescription('Your report subject')
            .setRequired(true)
            .addChoices(
                { name: 'Rule breakers, such as hackers or spammers', value: 'Violator' },
                { name: 'Refund for lost values (e.g. stats, items)', value: 'Refund' },
                { name: 'Other', value: 'Other' }
            ))
        .addStringOption(option => option
            .setName('input')
            .setDescription('Your detailed description')
            .setRequired(true))
        .addStringOption(option => option
            .setName('evidence')
            .setDescription('Attach an unlisted youtube video link only')
            .setRequired(true)),
    async run(interaction) {

        await interaction.reply({
            content: 'Creating report',
            ephemeral: true
        })
        
        const channel = interaction.client
            .channels
            .cache
            .get(channel_id)

        if (!channel) {
            return interaction.reply({
                content: 'Failed to create report.',
                ephemeral: true
            })
        }
	
        const title = interaction.options.getString('title')
        const description = interaction.options.getString('input')
        const evidence = interaction.options.getString('evidence')

        if (!evidence.match(pattern)) {
            return interaction.followUp({
                content: 'Invalid Youtube video URL',
                ephemeral: true
            })
        }
            
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setColor('#2f3136')
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp(new Date())
            .setDescription(description)
            .addFields({
                name: 'Evidence', value: evidence
            })
            .setFooter({
                text: `${interaction.user.id}`
            })

        await channel.send({ 
            embeds: [ embed ]
        }).then((message) =>
            message.startThread({
                name: title,
                autoArchiveDuration: (60 * 24) * 7, 
                reason: 'To discuss the report subject attached to this thread.'
        })).catch((error) => {
            interaction.reply({
                content: 'Failed report',
                ephemeral: true
            })
            throw new Error(error)
        })

        await interaction.followUp({
            content: 'Completed detailed report.',
            ephemeral: true
        })
    }
}