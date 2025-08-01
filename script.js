
document.getElementById('agreeBtn').addEventListener('click', function () {
  document.querySelector('.legal').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
});

document.querySelectorAll('.phase').forEach(btn => {
  btn.addEventListener('click', async function () {
    const phase = this.dataset.phase;
    const chatbox = document.getElementById('chatbox');

    const userMessage = {
      role: "user",
      content: `Start a penetration test. What should I do during the ${phase} phase?`
    };

    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = userMessage.content;
    chatbox.appendChild(userMsg);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [userMessage] })
      });

      const data = await response.json();
      const reply = data.reply;

      const botMsg = document.createElement('div');
      botMsg.classList.add('message', 'bot');
      botMsg.textContent = reply;
      chatbox.appendChild(botMsg);
    } catch (error) {
      const errMsg = document.createElement('div');
      errMsg.classList.add('message', 'bot');
      errMsg.textContent = '❌ Error contacting backend.';
      chatbox.appendChild(errMsg);
    }
  });
});
