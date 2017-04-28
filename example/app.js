//import { Model } from 'core/model';

class Animal extends Model {
    constructor (type = "Dog") {
        super();
        this.type = type;
    }
    
    setName (name) {
        this.name = name;
    }
    
    getType () {
        return this.type;
    }
};

class Zoo extends Model {
    
    constructor () {
        super();
        this.animals = [];
    }
    
    addAnimal (type, name) {
        let animal = new Animal(type);
        animal.setName(name);
        this.animals.push(animal);
        return animal;
    }
    
    addSexToAnimals () {
        this.animals.forEach((animal, idx) => {
            animal.sex = "male";
        });
    }
};

class App {
    constructor () {
        var zoo = new Zoo();
        zoo.on("data.changed", this.onZooChanged);
        
        let dog = zoo.addAnimal("Dog", "Lucky");
        dog.on("data.changed", this.onDogChanged);
        let cat = zoo.addAnimal("Cat", "Unix");
        cat.on("data.changed", this.onCatChanged);
        let rat = zoo.addAnimal("Rat", "Ratatui");
        
        dog.setName("Atos");
        zoo.addSexToAnimals();
        
        var tmpl = new TParser('templates/animal.html');
    }
    
    onZooChanged (data) {
        console.log("On zoo: ", data);
    }
    
    onDogChanged (data) {
        console.log("On dog: ", data);
    }
    
    onCatChanged (data) {
        console.log("On cat: ", data);
    }
};

let app = new App();