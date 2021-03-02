const texts = {
    "text": "test"
}

const fetch = require("node-fetch");
const require = require("regenerator-runtime/runtime");


async function handleSubmit() {

    console.log("::: Form Submitted :::");
    const res = await fetch('http://localhost:8081/api');
    const data = await res.json();
    return data;
}

export { handleSubmit }