await queryInterface.createTable("tasks", {

id:{
type:Sequelize.INTEGER,
autoIncrement:true,
primaryKey:true,
allowNull:false
},

title:{
type:Sequelize.STRING,
allowNull:false
},

description:{
type:Sequelize.TEXT
},

project_id:{
type:Sequelize.INTEGER,
allowNull:false,
references:{
model:"projects",
key:"id"
},
onDelete:"CASCADE",
onUpdate:"CASCADE"
},

assigned_to:{
type:Sequelize.INTEGER,
allowNull:false,
references:{
model:"users",
key:"id"
},
onDelete:"CASCADE",
onUpdate:"CASCADE"
},

priority:{
type:Sequelize.ENUM(
"LOW",
"MEDIUM",
"HIGH"
),
defaultValue:"MEDIUM"
},

status:{
type:Sequelize.ENUM(
"TODO",
"IN_PROGRESS",
"DONE"
),
defaultValue:"TODO"
},

due_date:{
type:Sequelize.DATEONLY,
allowNull:false
},

createdAt:{
type:Sequelize.DATE
},

updatedAt:{
type:Sequelize.DATE
}

});