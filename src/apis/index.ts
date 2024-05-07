import { BASE_URL } from "./config";

export const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/Data.json`);
    const data = await response.json();
    return data;
};
