var name
var id_selected

document.getElementById('formData').addEventListener('submit', retrieveName)

function retrieveName (e) {
    e.preventDefault()

    var radios = document.getElementsByName('proj_path')
    
    for (var radio of radios)
    {
        if (radio.checked) {
            window.name =radio.value
        }
    }

    fetch(`http://localhost:5000/${window.name}`)
    .then((res)=> res.json())
    .then((data)=> {
        data=JSON.parse(data)
        console.log(data)
        console.log(data[0]['_id']['$oid'])
        text=""
        for(i=0;i<data.length;i++){
            text = text + `<input type="radio" id="hello" name="nameid" value=${data[i]['_id']['$oid']} class="list-group-item">
            <label for="hello">${data[i]['_id']['$oid']}</label>` + "<br>";
        }
        text = text+'<input type="submit" value="Submit"></input>'
        document.getElementById('outhead').innerHTML = `<h3> Filter By Document Id</h3>`
        document.getElementById('output').innerHTML = text
    })
}

document.getElementById('output').addEventListener('submit', retrieveID)

function retrieveID(e){
    e.preventDefault()
    var radios = document.getElementsByName('nameid')
    for (var radio of radios)
    {
        if (radio.checked) {
            window.id_selected =radio.value
            console.log(radio.value)
        }
    }
    localStorage.setItem("file_ml",window.name)
    console.log(window.id_selected)
    localStorage.setItem("idq",window.id_selected)
    window.open("updation.html")
    fetch(`http://localhost:5000/${window.name}/${window.id_selected}`)
    .then((res)=> res.json())
    .then((data)=> {
        data = JSON.parse(data)
        text=""
        for(i=0;i<data["contents"].length;i++){
            text = text + `<p>${data["contents"][i]}</p>`;
        }
        document.getElementById("context-q").innerHTML=text
    })

}

