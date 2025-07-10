"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EstoqueRepository_1 = require("./repository/EstoqueRepository");
async function main() {
    const exemplar = new EstoqueRepository_1.EstoqueRepository();
    await exemplar.createTable();
    await exemplar.insertExemplar("123456789023", 1, 0);
}
main();
