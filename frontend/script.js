document.getElementById('formData').addEventListener('submit', retrieveName)
var name
var id_selected
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
    fetch(`http://localhost:5000/${window.name}/${window.id_selected}`)
    .then((res)=> res.json())
    .then((data)=> {
        data = JSON.parse(data)
        console.log(data["contents"][0])
        text=""
        for(i=0;i<data["contents"].length;i++){
            text = text + `<input type="radio" id="hello" name="nameid" value=${data["contents"][i]} class="list-group-item">
            <label for="hello">${data["contents"][i]}</label>` + "<br>";
        }
        document.getElementById("context-q").innerHTML=text
    })

}