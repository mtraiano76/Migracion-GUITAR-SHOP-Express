var pool = require ("./bd");

async function getNovedades(){
    var query = "select * from novedades";
    var rows = await pool.query(query);
    return rows;
}
async function insertNovedades(obj){
    try{
        var query = "insert into novedades set ?"; //por ejemplo, si aca pongo novedade, muestra error de no se guarda novedad, ingresamos todo bien pero al buscar la tabla NOVEDADES, NO LA ENCUENTRA
        var rows = await pool.query(query,[obj]);
        return rows;

    }catch(error){
        console.log(error)
        throw error; // este codigo va si o si, va por un camino o va por el otro en cuanto a errores
    }
}

async function deleteNovedadesByID(id){
    var query = "delete from novedades where id = ?";
    var rows = await pool.query(query,[id]);
    return rows;
}

async function  getNovedadesByID(id){
    var query = "select * from novedades where id = ?";
    var rows = await pool.query(query, [id])
    return rows[0];

}

async function modificarNovedadByID(obj,id){
    try{
        var query = "update novedades set ? where id=?"
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        throw error;
    }
}

async function buscarNovedades(busqueda){
    var query ="select * from novedades where titulo like? OR subtitulo like? OR cuerpo like?";
    var rows = await pool.query(query, ["%" + busqueda + "%", "%" + busqueda + "%", "%" + busqueda + "%"])
    return rows;

}

module.exports = {getNovedades, insertNovedades, deleteNovedadesByID, getNovedadesByID, modificarNovedadByID, buscarNovedades}
