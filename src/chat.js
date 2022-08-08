const fs = require("fs")
const { builtinModules } = require("module")

class contenedor {
    constructor (archivo){
        this.archivo = archivo
    }

    async save(obj){
    try{
        const contenido = await fs.promises.readFile(this.archivo, "utf-8")

        const contenidoObj = JSON.parse(contenido)
        let id
        // if (contenidoObj.length == 0){
        //     id = 1;
        // }else{
        //     let nid = contenidoObj[contenidoObj.length-1].id
        //     id = parseInt(nid) +1
        //     }
            const newMessage = {...obj}
        
            console.log(newMessage)
            contenidoObj.push(newMessage)
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj, null, 2));
    
    } catch(err){
         console.log(`Error,no se puede leer el archivo: ${err.message}`);
     }
    }

    getAll() {
        try{
            const contenido = fs.readFileSync(this.archivo, "utf-8")
            const contenidoObj = JSON.parse(contenido)
            return contenidoObj;
        }catch (err) {
            throw new Error(`Error ${err.message}`)
        }
        // }
        // fs.readFile(this.archivo, "utf-8", (err, contenido) =>{
        //     if (err) throw new Error(`No se puede leer el archivo: ${err.message}`)
            
        //     let contenidoObj = JSON.parse(contenido)
        //     //console.log(contenidoObj)
        //     return { contenidoObj }  
    }
}
module.exports = contenedor