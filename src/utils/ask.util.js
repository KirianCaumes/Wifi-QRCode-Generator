import readline from 'readline'

/**
 * Ask
 * @param {string} question Question
 * @returns {Promise<any>} Value
 */
export default async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise(resolve => {
        rl.question(question, data => {
            resolve(data)
            rl.close()
        })
    })
}
