const url = "http://localhost:8080/api/question"
const form = document.querySelector(".question");
const chatWindow = document.getElementById("chat-window");
const textarea = form.querySelector("textarea, input[type='text']");

const autoResize = (elem) => {
    elem.style.height = 'auto';
    elem.style.height = elem.scrollHeight + 'px';
};

if (textarea) {
    autoResize(textarea);
    textarea.addEventListener('input', () => {
        autoResize(textarea);
    });
}

const resetTextarea = () => {
    if (textarea) {
        textarea.style.height = '40px';
        textarea.value = '';
    }
};

textarea?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (!e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event("submit"));
        }
    }
});

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = Object.fromEntries(new FormData(form));

    //adding the user question here to make the user experience smoother
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user-message";
    userMsg.textContent = question.text;
    chatWindow.appendChild(userMsg);

    resetTextarea();

    console.log(question);
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(question)
        });

        if (!res.ok) {
            console.log("Error: " + res.status);
        }

        const data = await res.text();


        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot-message";
        botMsg.textContent = data;
        chatWindow.appendChild(botMsg);

        form.reset();

        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (err) {
        userMsg.textContent = "There has been a problem with reaching the server. Try again later";
    }
})