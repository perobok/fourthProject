const texts = {
    "text": "test"
}

const fetch = require("node-fetch");

async function handleSubmit() {

    console.log("::: Form Submitted :::");
    const res = await fetch('http://localhost:8081/api');
    const data = await res.json();
    return data;
}

export { handleSubmit }