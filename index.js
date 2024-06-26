// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Declares the member and the channel where the message is sent
const memberID = '646341289792765953';
const channelID = '1062973965036945479';

// Mention user when a specific user joins a voice channel
client.on(Events.VoiceStateUpdate, async (oldState) => {
    const user = await client.users.fetch(memberID);
    const channel = await client.channels.fetch(channelID);
    if(oldState.member.id === memberID) {
        if(oldState.channelId === null) {
            console.log(user);
            channel.send('<@151797733508907008>');
        }
    }
});

// Log in to Discord with your client's token
client.login(token);