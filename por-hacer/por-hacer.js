const fs = require('fs');

let listadoPorHacer = [];



//función que guarda la información en el archivo json
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}





//función que lee el contenido del archivo data.jason
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}





//función que obtiene la información que captura el usuario
const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion, //es igual que descripcion = descripcion, pero como es redundante solo se deja una descripcion
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}





//listado del contenido de data.json
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}





//Actualizar estado de la tarea
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}





//Borramos un arreglo de data.jason
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}





//exportamos las funciones que ocuparemos en app.js
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}