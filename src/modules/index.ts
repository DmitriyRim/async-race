const baseUrl = 'http://localhost:3000';

export const getData = async (params: string) => {
    const response = await fetch(baseUrl + params);
    const data =  response;
    return data;
};

export const removeCar = (id: number) => {
    return fetch(baseUrl + `/garage/${id}/`, {method: 'DELETE'});
}

export const addCar = (id:number, data: {name: string, color: string}) => {
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(baseUrl + '/garage', headers);
}

export const updateCar = (id: number, data: {name: string, color: string}) => {
    const headers = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(baseUrl + `/garage/${id}/`, headers);
}