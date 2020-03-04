export default class SwapiService {
    apiBase = 'https://swapi.co/api';

    getResource = async (url) => {
        const res = await fetch(`${this.apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const res = await this.getResource(`/people/${id}/`);
        return this._transformPerson(res);
    };

    getAllPlanets = async () => {
        const res = await this.getResource('/planets/');
        return res.results.map(this._transformPlanetData);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanetData(planet);
    };

    getAllStarships = async () => {
        const res = await this.getResource('/starships/');
        return res.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const res = this.getResource(`/starships/${id}/`);
        return this._transformStarship(res);
    };

    _extractId = (item) => {
        const idRegExp = /\/(\d+)\/$/;
        return item.url.match(idRegExp)[1];
    };

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
            birthYear: person.birth_year,
            eyeColor: person.eye_color
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