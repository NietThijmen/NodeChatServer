function Append(message,time) {
    const date = new Date(time);
    const timeString = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const messageElement = document.createElement('tr');
    messageElement.innerHTML = `<td>${message}</td><td>${timeString}</td>`;
    document.getElementById('table').innerHTML = messageElement.outerHTML + document.getElementById('table').innerHTML;
}


const ws = new WebSocket('ws://localhost:8080');
ws.onmessage =(data) => {
    console.log(data.data);
    const message = JSON.parse(data.data);
    Append(message.message, message.time);
};


function Send() {
    const text = document.getElementById('textinput');
    const value = text.value;
    ws.send(value);
}