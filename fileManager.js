const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const pathProducts = './products.txt';

class Contenedor {

    save = async (object) => {
        try {
            if (!fs.existsSync(pathProducts)){
                object.id = 1;
                await fs.promises.writeFile(pathProducts, JSON.stringify([object], null, 2));
                return object.id
            } else {
                let products = await fs.promises.readFile(pathProducts, 'utf-8');
                let newProducts = JSON.parse(products);
                let id = newProducts[newProducts.length-1].id + 1;
                object.id = id;
                newProducts.push(object);
                await fs.promises.writeFile(pathProducts, JSON.stringify(newProducts, null, 2));
                return object.id
            }
        }
        catch(err){ return {'error': err} }
        
    }

    getById = async (id) => {
        try {
            if(!id){
                return {status: "Error", message: "Id required"}
            } else {
                let buffer = await fs.promises.readFile(pathProducts, 'utf-8');
                let products = JSON.parse(buffer);
                try{
                    let product = products.find(p => p.id === id);
                    return product
                } catch{
                    return null
                }
            }
        }
        catch (err){ return {'error': err} }
        
    }

    getAll = async () =>{
        try {
            if (fs.existsSync(pathProducts)){
                let data = await fs.promises.readFile(pathProducts,'utf-8');
                let products = JSON.parse(data);
                return products;
            } else {
                return {status: "error", message: "el archivo no se encuentra disponible para consultar"}
            }
        }
        catch (err){ return {'error': err} }
    }

    deleteById = async(id)=>{
        try{
            if (fs.existsSync(pathProducts)){
                let data = await fs.promises.readFile(pathProducts,'utf-8');
                let products = JSON.parse(data);
                let newProducts = products.filter(p => p.id != id)
                await fs.promises.writeFile(pathProducts, JSON.stringify([newProducts], null, 2));
            } else {
                return {status: "error", message: "el archivo no se encuentra disponible"}
            }
        }
        catch (err){ return {'error': err} }
    }

    deleteAll = async () =>{
        try {
            fs.unlinkSync(pathProducts)
            console.log({status: "success", message:"File removed"})
          } catch(err) {
            console.error({status: "error", message: 'Something wrong happened removing the file', error: err})
          }
    }

}

module.exports = Contenedor