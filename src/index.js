const Botkit = require('botkit')
const { VimHelp } = require('vimhelp')
const os = require('os')

const slackToken = process.env['SLACK_TOKEN']
const isDebug = (process.env['NODE_ENV'] === 'development')

if (slackToken == null || slackToken === '') {
    console.log('Error: Specify token in environment SLACK_TOKEN')
    process.exit(1)
}

let vimHelp = new VimHelp()
vimHelp.helplang = ['ja']

let controller = Botkit.slackbot({
  debug: isDebug
})

let bot = controller.spawn({
    token: slackToken
}).startRTM()

let receiveEvents = [
  'direct_message',
  'direct_mention',
  'mention',
  'ambient'
]

controller.hears([':h (.*)', ':help (.*)'], receiveEvents, (bot, message) => {
  let subject = message.match[1]
  vimHelp.search(subject).then((text) => {
    bot.reply(message, '```' + text + '```')
  })
})

