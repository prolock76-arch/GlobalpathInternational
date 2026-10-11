export default {
  async fetch(request, env, ctx) {
    if (request.method === 'GET') {
      return new Response('GlobalPath bot is running 🚀', { status: 200 });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const update = await request.json();
      console.log('Update received:', JSON.stringify(update));

      if (update.message?.text?.startsWith('/start')) {
        const chatId = update.message.chat.id;
        const name = update.message.from.first_name || 'there';

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `👋 <b>Welcome, ${name}!</b>\n\nGlobalPath bot is live.`,
            parse_mode: 'HTML'
          })
        });
      }

      return new Response('ok', { status: 200 });
    } catch (err) {
      console.error('Bot error:', err.message);
      return new Response('ok', { status: 200 });
    }
  }
};
