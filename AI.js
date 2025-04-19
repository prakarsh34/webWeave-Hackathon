const chatContainer = document.querySelector(".chat-container");
const userInput = document.querySelector("#user-input");

// OpenAI API details (Replace with your key on the server-side, not exposed here)
const API_URL = "https://api.openai.com/v1/chat/completions";

// Function to send user message to OpenAI API and receive the response
async function sendMessage() {
    let userMessage = userInput.value.trim(); // Get the user input and trim spaces

    if (userMessage === "") return; // Stop if message is empty

    // Display user message in the chat
    appendMessage("user", userMessage);
    userInput.value = ""; // Clear input field

    // Show a loading message
    let aiMessageElement = appendMessage("ai", "Thinking...");

    // Prepare API request
    let requestBody = {
        model: "gpt-3.5-turbo", // You can switch this to "gpt-4" if needed
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 100
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: Bearer <API_KEY> should be handled server-side, not in the client
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let data = await response.json();
        let aiResponse = data?.choices?.[0]?.message?.content || "I couldn't understand that.";

        // Update AI message
        aiMessageElement.innerText = aiResponse;
    } catch (error) {
        console.error("API Error:", error);
        aiMessageElement.innerText = "⚠️ Error: Could not fetch response.";
    }
}

// Function to display messages in chat
function appendMessage(sender, message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "ai-message");
    messageElement.innerText = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

    return messageElement; // Return element to update later
}

// Send message when Enter key is pressed
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});
