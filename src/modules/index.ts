export const getData = async (params: string) => {
    const response = await fetch('http://localhost:3000'+ params);
    const data =  response;
    return data;
};