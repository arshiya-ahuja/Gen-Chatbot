let id = 1;
let inputBox = document.getElementById("userBox");
let inputColor = document.getElementById("inputColor");
let chatBox = document.getElementById("chatBox");
let toggleViewBtn = document.getElementById("toggleViewBtn");
let chatContainer = document.getElementById("chatContainer");
let themeContainer = document.getElementById("themes");
let chatBoxHeader = document.getElementById("chatBoxHeader");
let colors = ['black','darkgreen','red','darkblue'];
//import axios from 'axios'

//const cors = require('cors');
//let gatewayUrl = "https://aqueous-springs-50974.herokuapp.com/"
const gatewayUrl = "http://localhost:3000/detectIntent";
let query;
// When user hit send the message following function executes. 
const userAction = async () => {
let input = inputBox.value;
inputBox.value = "";
if(input!=""){
var jsondata = '{"text": "'+ input +'"}';
query = JSON.parse(jsondata);
//query = JSON.parse(JSON.stringify(input));
addMe(input, "sent", id++);
//console.log('Making call',id);


// axios({
// method:'post',
// url:gatewayUrl,
// data: {
// "text": input
// }
// })
// .then(resp=> {console.log(resp); addMe(resp.data, "received", id++);})
// .catch(err=> console.log(err))

var response = await fetch(gatewayUrl, {
method: "GET",
// mode: 'no-cors',
body: jsondata,
headers: {
"Content-Type": "application/json",
"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3MzY3MzkzMDcwOSwiaWF0IjoxNTY0MDY3MjI1fQ.XKr25tlEs1EalkMO8bhWX1htsV593pm3lBTMBDW4seo"
}
});
console.log("------------->",response);
var body = await response.json();
console.log(body);
addMe(body.data, "received", id++);



//const myJson = await response.json();
// do something with myJson
//let res = myJson.queryResult.fulfillmentText; //RESPONSE RECEIVED HERE
// if(res.trim()!=''){
//
// }
//
// addMe(res, "received", id++);
//const otherParameters = {
// headers:{
// "content-type":"application/json; charset=UTF-8"
// },
// body:{
// "text":"input"
// },
// method:"POST"
// };
//
// fetch(gatewayUrl, otherParameters)
// .then(data=>{return data.json()})
// .then(res=>{console.log(res)})
// .then(error=>console.log(error))

}
};

// This function adds message when message is sent or received
function addMe(input, msgDetails, id) {
chatContainer.innerHTML +=
'<div id="msg' + id + '" class="' + msgDetails + ' box-shadow">' + input + "</div>";
chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Toggling chatbox (Minimizing and maximizing)
function toggleView() {
if (toggleViewBtn.innerText == "-") {
toggleViewBtn.innerText = "^";
chatBox.style.height = "50px";
inputBox.style.display = "none";
} else {
toggleViewBtn.innerText = "-";
chatBox.style.height = "450px";
inputBox.style.display = "block";

var node = document.getElementById('chatContainer');
if(node.innerText == ""){
    search_p();
}
}
}

// Add color function 
function addColor() {
if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(inputColor.value)) { // matching hex values
//Match
if(!colors.includes(inputColor.value)){
colors.push(inputColor.value);
renderThemes();
}
changeTheme(inputColor.value);
} else if(inputColor.value!='white'&&isColor(inputColor.value)){
if(!colors.includes(inputColor.value)){
colors.push(inputColor.value);
renderThemes();
}
changeTheme(inputColor.value);
} else {
alert('Please choose a valid color');
}

}

// Theme changing function 
function changeTheme(color){
chatBoxHeader.style.backgroundColor = color;
chatBoxHeader.style.color = 'white';
toggleViewBtn.style.backgroundColor = color;
toggleViewBtn.style.color = 'white';
chatBox.style.backgroundImage= 'linear-gradient(to bottom, white 40%, '+color+')';
}

// Render themes
function renderThemes(){
//themeContainer.innerHTML = "";
for(let i of colors){
themeContainer.innerHTML += `<div class="theme-box box-shadow" style="background-color:${i};color:white;" onclick="changeTheme('${i}')">${i.toUpperCase()}</div>`;
}
}

// Is color valid
function isColor(strColor){
var s=new Option().style;
s.color = strColor;
return s.color == strColor;
}

function search_p(){
$.ajax({
url: "http://localhost:3000/firstmessage",
dataType: 'json',
contentType: "application/json",
//data: "",
//credentials: 'same-origin',
//mode:'no-cors',
method: "POST",
// headers: {
// 'Access-Control-Allow-Origin': '*'
// },
beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer xxxx'); }, //set tokenString before send
success: function (data, status, xhr) {
//sessionStorage.setItem('token',)
const token = xhr.getResponseHeader('token');
console.log(data);
//const res = JSON.parse(data);
addMe(data.message,"received box-shadow","123");
sessionStorage.setItem('firstCall',data);
//debugger;
//alert("Sucess");
},
error: function (xhr, status, error) {
//debugger;
alert("Error! :" + xhr.status);
//alert(status);
//alert(error);
}

});
}

changeTheme('black');
renderThemes();   