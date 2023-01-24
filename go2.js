// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) { 
  let arr = string.split("\n")
  return { 
    method: arr[0].substring(0, arr[0].indexOf(" ")), 
    uri : arr[0].substring(arr[0].indexOf(" ") + 1, arr[0].indexOf(" HTTP")), 
    headers: arr.filter((element, index) => index > 0 & element != "" & element.includes(":")).reduce((arr,element) => (arr[element.substring(0, element.indexOf(":"))] = element.substring(element.indexOf(":") + 2, element.lenght), arr),{}), 
    body :  arr.filter((element, index) => index > 1 & element != "" & !element.includes(":")).join() 
  }; 
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));