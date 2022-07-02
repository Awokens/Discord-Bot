
const glob = require('glob')
const path = require('path')

module.exports = async (client) => {
    
    glob(path.resolve('./', './events/**/*.js'), async (error, files) => {

        if (error) throw new Error(error)

        const events = []

        try {
            for (const file of files) {
                const event = require(path.resolve('./', file))
                if (!event.name) continue
                client.on(event.name, (...args) => event.run(...args))
                events.push(event.name)
            }
        } catch (error) {
            throw new Error(error)
        } finally {
            console.info('Registering listeners (events):', events)
        }
    })

}
