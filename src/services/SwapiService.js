export default class SwapiService {
    apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(`${this.apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    getPerson(id) {
        const res = this.getResource(`/people/${id}/`);
        return this._transformPerson(res);
    }

    async getAllPlanets() {
        const res = await this.getResource('/planets/');
        return res.results.map(this._transformPlanetData);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanetData(planet);
    }

    async getAllStarships() {
        const res = await this.getResource('/starships/');
        return res.results.map(this._transformStarship);
    }

    getStarship(id) {
        const res = this.getResource(`/starships/${id}/`);
        return this._transformStarship(res);
    }

    _extractId(item) {
        const idRegExp = /\/(\d+)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    };

    _transformPlanetData = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
}