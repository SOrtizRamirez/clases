import axios from "axios";

export async function fetchQuote() {
    const url = "https://zenquotes.io/api/random";
    const res = await axios.get(url);
    const data = res.data[0];

    return {
        phrase: `"${data.q}" — ${data.a}`,
        date: new Date().toISOString()
    };
}
