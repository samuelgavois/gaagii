'use strict';

function setResponseWithDocument(response, jsonDoc) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(jsonDoc));
    response.end();
}