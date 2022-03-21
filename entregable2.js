const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }

    async save(obj){

        await fs.promises.readFile(this.file, 'utf-8')
            .then(content =>{
                const parsedFile = JSON.parse(content);
                const updateObj = { genId: parsedFile.length + 1, ...obj }

                parsedFile.push(updateObj);

                fs.writeFileSync(this.file, JSON.stringify(parsedFile));
                console.log(`Producto ${ genId } guardado correctamente.`);

                return genId;
            })
            .catch(e => console.log(e));

    }

    async getById(id){
        
        await fs.promises.readFile(this.file, 'utf-8')
            .then(content => {
                const parsedFile = JSON.parse(content);
                const foundProd = parsedFile.filter(p => p.genId === id)

                console.log(foundProd);
            })
            .catch(e => console.log(e));
    }

    async getAll(){

        await fs.promises.readFile(this.file, 'utf-8')
            .then(content =>{
                let parsedFile = JSON.parse(content);
                console.log(parsedFile);
            })
            .catch(e => console.log(e));
    }

    async deleteById(id){
        await fs.promises.readFile(this.file, 'utf-8')
            .then(content =>{
                let parsedFile = JSON.parse(content);
                const updatedFile = parsedFile.filter(p => p.genId !== id);
                fs.writeFileSync(this.file, JSON.stringify(updatedFile));
                console.log('Producto borrado correctamente');
            })
            .catch(e => console.log(e));
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, JSON.stringify([]));
    }

}

const container = new Contenedor ('text.txt');

// container.save({
//     modelo: 'Adidas Yeezy Boost 350 v2 Zebra',
//     price: 50,
//     stock: 10
// });
// container.getById(3);
//container.getAll();
//container.deleteById(4);
container.deleteAll();

