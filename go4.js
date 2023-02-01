// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
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
    console.log(statusCode + " " + statusMessage + "\n" + stringHeaders + "\n" + body);
}

function fileExist() {
    const fs = require('fs')

    const path = './passwords.txt'

    try {
        if (fs.existsSync(path)) {
          return true;
        }
      } catch(err) {
        return false;
      }
}

function getStatusCode(headers, uri) {
    if (!uri.includes("/api/checkLoginAndPassword") || !headers["Content-Type"] == "application/x-www-form-urlencoded") {
        return "HTTP/1.1 400";
    } else if (!fileExist()) {
        return "HTTP/1.1 500"
    }
    else return "HTTP/1.1 200";
}

function getStatusMessage(statusCode) {
    if (statusCode == "HTTP/1.1 400") {
        return "Bad Request";
    } else if (statusCode == "HTTP/1.1 500") {
        return " Internal Server Error";
    }
    else return "OK";
}

function getStatuts(headers, uri) {
    let statusCode = getStatusCode(headers, uri);
    return { "statusCode": statusCode, "statusMessage": getStatusMessage(statusCode) }

}

function getHeadrts(body) {
    return { "Server": "Apache/2.2.14 (Win32)", "Content-Length": body.length ,"Connection": "Closed", "Content-Type": "text/html; charset=utf-8"};
}


function userDataIsCorrect(body) {
    const fs = require('fs');
    let userData = body.substring(6, body.indexOf("&"))+":" + body.substring(body.indexOf("&") + 10, body.lenght);
    const data = fs.readFileSync('./passwords.txt',
        { encoding: 'utf8', flag: 'r' });
    return data.split("\r\n").find(element => element == userData) != undefined;
}

function getBody(statusMessage, body) {
    if (statusMessage == "OK" && userDataIsCorrect(body)) {
        return "<h1 style=\"color:green\">FOUND</h1>";
    } else {
        return "<h1 style=\"color:red\">NOT FOUND</h1>";
    }
}

function processHttpRequest($method, $uri, $headers, $body) {
    let statuts = getStatuts($headers, $uri);

    let statusCode = statuts.statusCode;
    let statusMessage = statuts.statusMessage
    let body = getBody(statusMessage, $body);
    outputHttpResponse(statusCode, statusMessage, getHeadrts(body), body);
}


function parseTcpStringAsHttpRequest(string) {
    let arr = string.split("\n")
    return {
        method: arr[0].substring(0, arr[0].indexOf(" ")),
        uri: arr[0].substring(arr[0].indexOf(" ") + 1, arr[0].indexOf(" HTTP")),
        headers: arr.filter((element, index) => index > 0 & element != "" & element.includes(":")).reduce((arr, element) => (arr[element.substring(0, element.indexOf(":"))] = element.substring(element.indexOf(":") + 2, element.lenght), arr), {}),
        body: arr.filter((element, index) => index > 1 & element != "" & !element.includes(":")).join()
    };
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);

