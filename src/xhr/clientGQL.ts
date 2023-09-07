/*
* Utitlity function to fetch data from Hasura
*/
export const clientGQL = (query: string, variables: any = {}) => {
    const headers: any = { "Content-Type": "application/json", 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET };
    return fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query, variables }),
    });
};
