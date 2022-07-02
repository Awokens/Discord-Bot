
const id = require('../library/utils/config.json').joins_channel

module.exports = {
    name: 'guildMemberAdd',
    async run(member) {

        const channel = member.guild.channels.cache.get(id)

        if (!channel) {
            throw new Error(`Invalid channel ID ${id}`)
        }

        console.info(`${user} has joined the server`)
        
    }
}