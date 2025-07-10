"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaFormatoData = verificaFormatoData;
exports.stringParaData = stringParaData;
exports.calculaDiferencaDiasEntreDatas = calculaDiferencaDiasEntreDatas;
exports.verificaFormatoDataDDMMYYYHHmm = verificaFormatoDataDDMMYYYHHmm;
exports.stringParaDataTempo = stringParaDataTempo;
function verificaFormatoData(dataString) {
    let dateIsCorrect = false;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regex.test(dataString)) {
        dateIsCorrect = true;
    }
    return dateIsCorrect;
}
function stringParaData(dataString) {
    const partes = dataString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);
    let data = new Date(ano, mes, dia);
    if (isNaN(data.getTime())) {
        throw new Error("Data inválida");
    }
    return data;
}
function calculaDiferencaDiasEntreDatas(menorData, maiorData) {
    let dias = maiorData.getFullYear() - menorData.getFullYear();
    const diferencaMeses = maiorData.getMonth() - menorData.getMonth();
    if (diferencaMeses < 0 || (diferencaMeses === 0 && maiorData.getDate() < menorData.getDate())) {
        dias--;
    }
    return dias;
}
// dd/MM/yyyy HH:mm
function verificaFormatoDataDDMMYYYHHmm(dataString) {
    const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
    return regex.test(dataString);
}
function stringParaDataTempo(dataString) {
    const [data, hora] = dataString.split(' ');
    const [dia, mes, ano] = data.split('/').map(part => parseInt(part, 10));
    const [horas, minutos] = hora.split(':').map(part => parseInt(part, 10));
    const dataFinal = new Date(ano, mes - 1, dia, horas, minutos);
    if (isNaN(dataFinal.getTime())) {
        throw new Error("Data inválida");
    }
    return dataFinal;
}
