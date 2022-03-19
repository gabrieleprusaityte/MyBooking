const host = "http://localhost:4000"

export default {
    post: async (data, url) => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }
        let res = await fetch(host+url, options)
        res = await res.json()

        return res
    },
    get: async (url) => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
        }

        let res = await fetch(host+url, options)
        res = await res.json()

        return res
    }
}