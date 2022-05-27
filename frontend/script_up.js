var file_name
var file_id 
var count

function counter(){
    window.count = 0;
}



function myFunction(){
    window.file_name = localStorage.getItem("file_ml");  
    window.file_id = localStorage.getItem("idq");
    fetch(`http://localhost:5000/${window.file_name}/${window.file_id}/${window.count}`)
    .then((res)=> res.json())
    .then((data)=> {
        data = JSON.parse(data)
        text=""
        text = text + `<p>${data["contents"][window.count]}</p>`;
        document.getElementById("context-q").innerHTML=text
    })
}

function sentload(){
    window.count = window.count+1
    document.getElementById("prevb").disabled=false
    window.file_name = localStorage.getItem("file_ml");  
    window.file_id = localStorage.getItem("idq");
    fetch(`http://localhost:5000/${window.file_name}/${window.file_id}/${window.count}`)
    .then((res)=> res.json())
    .then((data)=> {
        data = JSON.parse(data)
        text=""
        text = text + `<p>${data["contents"][window.count]}</p>`;
        document.getElementById("context-q").innerHTML=text
    })

}

function prevload(){
    window.count = window.count-1
    window.file_name = localStorage.getItem("file_ml");  
    window.file_id = localStorage.getItem("idq");
    fetch(`http://localhost:5000/${window.file_name}/${window.file_id}/${window.count}`)
    .then((res)=> res.json())
    .then((data)=> {
        data = JSON.parse(data)
        text=""
        text = text + `<p>${data["contents"][window.count]}</p>`;
        document.getElementById("context-q").innerHTML=text
    })

}