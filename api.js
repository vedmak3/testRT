loading();

let data
let oldName
let oldId
let poiskData

function dbclick(ind){
    var win=document.getElementsByClassName("popup")[0];
    win.innerHTML=`<h2>${data[ind]["name"]} ${data[ind]["email"]}</h2><div id="divPop"></div>`;
    drawPop(data,ind);
    win.innerHTML+='<span class="close" onclick="closeWin()">X</span>';
    win.style.display="block";
}
function closeWin(){ 
    document.getElementsByClassName("popup")[0].style.display="none";
}
function delRec(ind){
    oldId=data[ind]["id"]
    oldName=data[ind]["name"]
    delete data[ind];
    document.getElementById('pole').innerHTML="";
    drawDiv(data);
    alert(`Запись: ${oldId}, ${oldName} удалена!!!`)
}
function poisk(){
    var zn=document.getElementById("search").value;
    var search=zn;
    if(zn!=""){
        poiskData = Object.assign({}, data)
        for(key in poiskData){
            if(poiskData[key]["name"].indexOf(zn)==-1){
                    delete poiskData[key]
                }
        }
        document.getElementById('pole').innerHTML="";
        drawDiv(poiskData);
        zn=document.getElementById("search").value=search;
    }else{
        drawDiv(data);
    }
}

function drawDiv(obj){
var tabl='<input id="search" type="text" size="40"><input id="bSearch" value="Поиск" onclick="poisk()" type="button"><table border="1"><tr><td>Имя</td><td>e-mail</td><td>Адрес</td><td>Удалить?</td></tr>';
        for (i in obj){
            if (typeof data[i]!="undefined"){
            tabl+=`<tr ondblclick="dbclick(${i})">`
            tabl+=`<td>${obj[i]["name"]}</td><td>${obj[i]["email"]}</td>`;
            tabl+=`<td>${obj[i]["address"]["zipcode"]},${obj[i]["address"]["city"]},${obj[i]["address"]["street"]}</td>`;
            tabl+=`<td class="iks" onclick="delRec(${i})">X</td></tr>`
            }
        }
        tabl+='</table>';
        document.getElementById('pole').innerHTML=tabl;
}

function drawPop(obj,ind){
var tabl=`<img src="https://static-maps.yandex.ru/1.x/?ll=${obj[ind]["address"]["geo"]["lng"]},${obj[ind]["address"]["geo"]["lat"]}&size=250,250&z=3&l=map">`;
tabl+=`<table border="1"><tr><td>Параметр</td><td>Значение</td></tr>`;
    for(zn in obj[ind]){
        if(typeof data[ind][zn]=="object"){
            for(p in obj[ind][zn]){
                if(typeof data[ind][zn][p]=="object"){
                    for(q in data[ind][zn][p]){
                        tabl+=`<tr><td>${q}</td><td>${obj[ind][zn][p][q]}</td></tr>`;
                    }
                }else{
                    tabl+=`<tr><td>${p}</td><td>${obj[ind][zn][p]}</td></tr>`;
                }
            }
        }else{
            tabl+=`<tr><td>${zn}</td><td>${obj[ind][zn]}</td></tr>`;
        } 
    }
    tabl+='</table>';
    document.getElementById('divPop').innerHTML=tabl
}

function loading(){
fetch('https://jsonplaceholder.typicode.com/users')  
    .then( function(response) {  
        if (response.status !== 200) return;  
        response.json()
            .then(function(resp) {    
            data=resp;
            drawDiv(data);
        });  
        }  
  )  
}