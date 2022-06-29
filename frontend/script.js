var name
var id_selected
var minLen
var maxLen

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
            <label for="hello">${i} . ${data[i]['_id']['$oid']}</label>` + "<br>";
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

    text = ""
    text = text + `  <label for="minLength">Min length:</label>
    <input type="text" id="minLen" name="minLen" value="John"><br>
    <label for="maxLength">Max length:</label>
    <input type="text" id="maxLen" name="maxLen" value="Doe"><br><br>
    <input type="submit" value="Submit"></input>`

    document.getElementById('page-out').innerHTML = text
    //window.open("updation.html")
    // fetch(`http://localhost:5000/${window.name}/${window.id_selected}`)
    // .then((res)=> res.json())
    // .then((data)=> {
    //     data = JSON.parse(data)
    //     text=""
    //     for(i=0;i<data["contents"].length;i++){
    //         text = text + `<p>${data["contents"][i]}</p>`;
    //     }
    //     document.getElementById("page-num").innerHTML=text
    // })

}

document.getElementById('page-out').addEventListener('submit', pageID)

function pageID(e){
    e.preventDefault()

    window.minLen = document.getElementById('minLen').value
    window.maxLen = document.getElementById('maxLen').value
    localStorage.setItem("proj_minq",window.minLen)
    localStorage.setItem("proj_maxq",window.maxLen)
    console.log(window.minLen)
    console.log(window.maxLen)

    window.open("updation.html")
}



