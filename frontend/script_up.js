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
        document.getElementById("header-file").innerHTML = ` 
        <h2 style="text-align:center;color:black">${window.file_name}</h2>
        <h3 style="text-align:center;color:black">File name:-${window.file_id}</h3>
        `
        document.getElementById("cont-num").innerHTML = `<p style="margin-left:20vw;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Sentence :- ${window.count}</p>`
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
        document.getElementById("cont-num").innerHTML = `<p style="margin-left:20vw;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Sentence :- ${window.count}</p>`
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
        document.getElementById("cont-num").innerHTML = `<p style="margin-left:20vw;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Sentence :- ${window.count}</p>`
        document.getElementById("context-q").innerHTML=text
    })

}


function sublabels(){
    var relevant='',posneg='',opce='',timeline='',bfr='',extm=''
    var rad1 = document.getElementsByName('relevant') //relevant
    var rad2 = document.getElementsByName('posneg') //posneg
    var rad3 = document.getElementsByName('opce') //opce
    var rad4 = document.getElementsByName('timeline') //timeline
    var rad5 = document.getElementsByName('bfr') //bfr
    var rad6 = document.getElementsByName('extm') //extm

    var arr=[rad1,rad2,rad3,rad4,rad5,rad6]
    var labeling=[relevant,posneg,opce,timeline,bfr,extm]

    //----------------------------------------------------------
    // var count=0;
    // for (var arr1 of arr){
    //     for(var radio of arr1){
    //         if(radio.checked){
    //             labeling[0]
    //         }
    //     }
    // }
    //----------------

    for (var radio of rad1 ){
        if (radio.checked) {
            relevant =radio.value
        }}
    for (var radio of rad2){
        if (radio.checked) {
            posneg =radio.value
        }}
    for (var radio of rad3 ){
        if (radio.checked) {
                opce =radio.value
            }}
    for (var radio of rad4 ){
        if (radio.checked) {
            timeline =radio.value
        }}
    for (var radio of rad5 ){
        if (radio.checked) {
            bfr =radio.value
            }}
    for (var radio of rad6 ){
        if (radio.checked) {
            extm =radio.value
        }}

    var array5 = [relevant,posneg,opce,timeline,bfr,extm];
    console.log(array5);
    var sentence= ''
    sentence = document.getElementById('context-q')

    alert(array5)

    fetch(`http://localhost:5000/${window.file_name}/${window.file_id}/${window.count}/${relevant}/${posneg}/${opce}/${timeline}/${bfr}/${extm}`)
    .then((res)=> res.json())
    .then((data)=> {
        //document.getElementById('respost') = data.first
        document.getElementById('respost') = `<p>Hello World</p>`
        alert("bye")
    })

    //-----------------------

    // $.ajax({
    //     url:'{{url_for("array_post",name=${window.filename},id=${window.filed_id},count=${window.count})}}',
    //     type:'POST',
    //     data:{contacts:array5},
    //     success:function(res){
    //         document.getElementById('respost') = res
    //     }   
    // })

}