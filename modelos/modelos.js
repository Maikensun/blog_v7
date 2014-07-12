//SOLUCION EJERCICIO modulos

var Sequelize = require("sequelize");

//DEFINE LA CONFIGURACION DE LA BASE
//primer argumento nombre de la base
// segundo y tercero usuario y password para conectarse a la base de datos
var sequelize = new Sequelize("database","usuario","password",{
	dialect:"sqlite", //mariadb,mysql,postgres
	//Este parametro es solo para sqlite
	storage:__dirname + "/database.db",
	port:3306, //este puerto sirve también para mysql, para postgres 5432
	define: {
		timestamps:false,
		freezeTableName:true
	}
});
//AQUI SE REALIZA LA CONEXION A LA BASE


module.exports.configurar = function(callback){
	sequelize.authenticate().complete(callback);
	console.log("modelos configurados");
};

// MAPEO DE TABLA A OBJETO
var Articulo = sequelize.define("Articulo",{
	id:{
		//le decimos que esta columna es la llave primaria
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	titulo:Sequelize.TEXT,
	contenido:Sequelize.TEXT,
	fecha_creacion:Sequelize.DATE
},{
	tableName:"articulos"
});

var Usuario = sequelize.define("Usuario",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT,
	email:Sequelize.TEXT,
	password:Sequelize.INTEGER
},{
	tableName:"usuarios"
});

var Categoria = sequelize.define("Categoria",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT
},{
	tableName:"categorias"
});

var Comentario = sequelize.define("Comentario",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	comentario:Sequelize.TEXT,
	autor:Sequelize.TEXT,
	fecha_creacion:Sequelize.DATE
},{
	tableName:"comentarios"
});

// ====================== MAPEO 1-N
Usuario.hasMany(Articulo,{
	foreignKey:"usuario_id",
	as:"articulos"
});
// ====================== Ejercicio de comentarios
Articulo.hasMany(Comentario,{
	foreignKey:"articulo_id",
	as:"comentarios"
});

//HACEMOS VISIBLE EL MODELO ASOCIADO AL A TABLA
module.exports.Articulo = Articulo;
module.exports.Usuario = Usuario;
module.exports.Categoria = Categoria;
module.exports.Comentario = Comentario;