module.exports = async (interaction) => {    
    const label = interaction.component.label
    const roles = config.roles

    if (!roles || roles.some((id) => id === label)) return
    
    const role = interaction.guild.roles
        .cache.get(interaction.component.customId)

    if (!role) {
        return interaction.reply({
            content: "This role doesn't exist.",
            ephemeral: true
        })
    }

    const member = interaction.member

    if (!member.manageable) {
        return interaction.reply({
            content: `Unable to modify roles of ${interaction.user.tag}`,
            ephemeral: true
        })
    }

    if (member.roles.cache.has(role.id)) {
        member.roles.remove(role).catch(console.error)
    } else {
        member.roles.add(role).catch(console.error)
    }

    interaction.reply({
        content: 'Updated your roles, double-check your roles if anything is missing or was suppose to be removed.',
        ephemeral: true
    })
    
}