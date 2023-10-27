export type revalidateObj = {
    tags?: string[],
    paths?: string[]
}

const revalidate = async (config: revalidateObj) => {
    const urls = (process.env.PAYLOAD_REVALIDATE_URLS).split(",");
    const promises = urls.map(url => fetch(`${url}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify(config),
    })
        .then(res => res.json())
        .then(json => {
            if (!json.revalidated) {
                throw new Error("Failed to revalidate");
            }
        })
        .catch(err => {
            throw new Error(err);
        })
    );

    return await Promise.all(promises);
}

export default revalidate;