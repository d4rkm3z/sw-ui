export default class SwapiService {
    apiBase = 'https://swapi.co/api';
    imgBase = 'https://starwars-visualguide.com/assets/img';

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

    getPersonImage = (id) => {
        return `${this.imgBase}/characters/${id}.jpg`
    };

    getAllPlanets = async () => {
        const res = await this.getResource('/planets/');
        return res.results.map(this._transformPlanetData);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanetData(planet);
    };

    getPlanetImage = (id) => {
        return `${this.imgBase}/planets/${id}.jpg`;
    };

    getAllStarships = async () => {
        const res = await this.getResource('/starships/');
        return res.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const res = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(res);
    };

    getStarshipImage = (id) => {
        return `${this.imgBase}/starships/${id}.jpg`;
    };

    _extractId = (item) => {
        const idRegExp = /\/(\d+)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformStarship = (starship) => {
        const id = this._extractId(starship);
        return {
            id,
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
            img: this.getStarshipImage(id)
        }
    };

    _transformPerson = (person) => {
        const id = this._extractId(person);
        return {
            id,
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
            img: this.getPersonImage(id)
        }
    };

    _transformPlanetData = (planet) => {
        const id = this._extractId(planet);
        return {
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
            img: this.getPlanetImage(id)
        }
    }
}