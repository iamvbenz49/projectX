document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("textInput");
    const sendButton = document.getElementById("sendButton");
    const chatContainer = document.querySelector(".chats");

    function addMessage(message, isUser = false) {
        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container";
        const chatElement = document.createElement("div");
        chatElement.className = isUser ? "chat_end" : "chat_begin";
        chatElement.innerHTML = `
            <div class="chat1_1">
                ${message}
            </div>
        `;
        messageContainer.appendChild(chatElement);
        chatContainer.appendChild(messageContainer);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendButton.addEventListener("click", () => {
        const userInput = textInput.value.trim();
        if (userInput !== "") {
            addMessage(userInput, true);
            textInput.value = "";

            // Make a request to the server to get the bot's response
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `textInput=${encodeURIComponent(userInput)}`,
            })
                .then(response => response.text())
                .then(botResponse => {
                    console.log(botResponse); // Add this line to check the server response
                    addMessage(botResponse, false);
                })
                
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    textInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
