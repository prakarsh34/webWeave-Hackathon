const chatContainer = document.querySelector(".chat-container");
const userInput = document.querySelector("#user-input");

// OpenAI API details (Replace with your key)
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";


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
        model: "gpt-3.5-turbo", // Change to "gpt-4" if needed
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 100
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
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
