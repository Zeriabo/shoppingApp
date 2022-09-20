'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const secrets_1 = require("../util/secrets");
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
let sequelize;
sequelize = new sequelize_1.default(secrets_1.POSTGRES_URI);
console.log("file");
fs_1.default
    .readdirSync(__dirname)
    .filter((file) => {
    console.log(file);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
})
    .forEach((file) => {
    console.log(file);
    const model = require(path_1.default.join(__dirname, file))(sequelize);
    console.log(model);
    // db[model.name] = model;
});
console.log(db);
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
module.exports = db;
//# sourceMappingURL=index.js.map