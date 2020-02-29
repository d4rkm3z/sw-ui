export default class SwapiService {
    apiBase = 'https://swapi.co/api/';

    async getResource(url) {
        const res = await fetch(`${this.apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

    getPlanet(id) {
        return this.getResource('/planets/');
    }

    async getAllStarships() {
        const res = await this.getResource('/starships/');
        return res.results;
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}`);
    }
}