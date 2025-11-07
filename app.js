const url = "http://localhost:8080/api/database"
const kba = document.querySelector(".send_to_database");


kba?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataToDabatase = Object.fromEntries(new FormData(kba));
    console.log(dataToDabatase)

try {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(dataToDabatase)
    });

    if(!res.ok) {
        console.log("Error: " + res.status);
    }

    const answer = await res.text();
    alert(answer);
} catch (err) {
    console.error(err);
}

})