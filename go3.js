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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  let stringHeaders = "";
  for (var key in headers) {
    stringHeaders = stringHeaders + key + ": " + headers[key] + "\n";
}
  console.log(statusCode  + " " + statusMessage + "\n" + stringHeaders + "\n" + body);
}

function getStatusCode(method, uri) {
    if (method != "GET" || ! uri.includes("?nums=")) {
        return "HTTP/1.1 400";
    } else if (!uri.startsWith("/sum")) {
        return "HTTP/1.1 404";
    } else return "HTTP/1.1 200";
}

function getStatusMessage(statusCode) {
    if (statusCode == "HTTP/1.1 400") {
        return "Bad Request";
    } else if (statusCode == "HTTP/1.1 404") {
        return "Not Found";
    } else return "OK";
}

function getStatuts(method, uri){
    let statusCode = getStatusCode(method, uri);
    return {"statusCode" : statusCode ,"statusMessage" : getStatusMessage(statusCode)}

}

function getHeadrts(body) {
    return {"Server" : "Apache/2.2.14 (Win32)",  "Connection" : "Closed", "Content-Type" : "text/html; charset=utf-8", "Content-Length" : body.length};
}

function getSumm(uri) {
   return uri.substring(uri.indexOf("=") + 1,uri.lenght).split(",").reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0
      ) + "";
}

function getBody(statusMessage, uri) {
    if (statusMessage == "OK") {
        return getSumm(uri);
    } else {
        return "not found";
    }
}

function processHttpRequest($method, $uri, $headers, $body) {
let statuts = getStatuts($method, $uri);

let statusCode = statuts.statusCode;
let statusMessage = statuts.statusMessage
let body = getBody(statusMessage, $uri);
  outputHttpResponse(statusCode, statusMessage, getHeadrts(body), body);
}


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
processHttpRequest(http.method, http.uri, http.headers, http.body);

