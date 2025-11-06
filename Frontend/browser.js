const url = "http://localhost:8080/api/question"
const form = document.querySelector(".question");
const chatWindow = document.getElementById("chat-window");

console.log(form);


form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    

    const question = Object.fromEntries(new FormData(form));

    console.log(question);
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(question)
        });

        if(!res.ok) {
            console.log("Error: " + res.status);
        }

        const data = await res.text();
        
    // The section below is generated with chat gpt as I frontend is not my strong side
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user-message";
    userMsg.textContent = question.text;
    chatWindow.appendChild(userMsg);

    // Also here
    const botMsg = document.createElement("div");
    botMsg.className = "chat-message bot-message";
    botMsg.textContent = data;
    chatWindow.appendChild(botMsg);

    // And here
    form.reset();

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (err) {
        alert(err);
    }
})