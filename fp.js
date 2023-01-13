
const csv = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в этом файле три строки-коммента :)`;


const { match } = require("assert");
function parse(csv) {
    const  top = csv
    .split("\n")
    .filter(element => element.match(/^\d/))
    .map(element => element.split(","))
    .map(element => ({name: element[2].trim(), population: element[3]}))
    .sort((a, b) => b.population - a.population)
    .splice(0,10)
    .reduce((obj, entry, index) => Object.assign(obj, { [entry.name]: {
        population: entry.population,
        rating: index + 1
    }}), {})
    ;
    return function(text) {
        const regexp = new RegExp(Object.keys(top).join("|"), "g");
        return text.replace(regexp, match => 
            `${match} (${top[match].rating} місце в ТОП-10 найкрупніших міст України, населення ${top[match].population} чоловік)`);
    };
}
const replaceWithTop = parse(csv);

let text = `З розвитком промисловості, ремесла, торгівлі зростало й саме місто. 1846 
року в ньому налічувалося 1893 будинки, з яких лише 69 споруджені з цегли. Місто було 
невпорядкованим. У ньому налічувалося 11 вулиць, 80 провулків та 4 площі. 
За кількістю жителів у середині XIX століття Бердичів посідав п'яте місце 
на теренах сучасної Україні (після Одеси, Києва, Львова та Харкова) `;

text = replaceWithTop(text);
console.log(text);