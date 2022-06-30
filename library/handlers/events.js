
const glob = require('glob')
const path = require('path')

module.exports = async (client) => {
    
    glob(path.resolve('./', './events/**/*.js'), async (error, files) => {

        if (error) throw new Error(error)

        console.info('Registering listeners (events):', files)

        try {
            for (const file of files) {
                const event = require(path.resolve('./', file))
                client.on(event.name, (...args) => event.run(...args))
            }
        } catch (error) {
            throw new Error(error)
        }
    })

}
