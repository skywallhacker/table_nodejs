let tbody = document.querySelector('tbody')
let form = document.querySelector('form')
let inputName = document.querySelector('.names')
let inputAge = document.querySelector('.ages')
let bg = document.querySelector('.bg')
let model = document.querySelector('.model')
let close = document.querySelector('.close')
let model_name = document.querySelector('.model_name')
let model_age = document.querySelector('.model_age')
let form_edit = document.querySelector('.form_edit')
let form_edit_btn = document.querySelector('.xamro')


let date = new Date
date = date.getFullYear()
let dataBase = []
let list
let id
let data_url = 'http://localhost:555/users'
fetch(data_url)
    .then(l => l.json())
    .then(d => reload(d))


function reload(arr) {
    tbody.innerHTML = ""


    for (let item of arr) {
        let tr = document.createElement('tr')
        let num = document.createElement('td')
        let names = document.createElement('td')
        let year = document.createElement('td')
        let icons = document.createElement('td')
        let edit = document.createElement('img')
        let delet = document.createElement('img')

        tr.classList.add('tr')
        num.classList.add('num')
        names.classList.add('names')
        year.classList.add('year')
        icons.classList.add('icons')
        edit.classList.add('edit')
        delet.classList.add('delet')

        names.innerHTML = item.name
        year.innerHTML = item.age
        edit.src = "img/edit.png"
        delet.src = "img/delete (1).png"

        tbody.append(tr)
        tr.append(num, names, year, icons)
        icons.append(edit, delet)

        delet.onclick = () => {
            let id = item.id
            fetch(`${data_url}/${id}`, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    fetch(data_url)
                        .then(l => l.json())
                        .then(d => reload(d))
                })
            tr.remove()

        }

        edit.onclick = () => {
            bg.style.display = 'block'
            model.style.display = 'block'
            model_name.value = item.name
            model_age.value = item.age
            id = item.id

        }
    }

    close.onclick = () => {
        bg.style.display = 'none'
        model.style.display = 'none'
    }

    form_edit_btn.onclick = () => {

    }


}


form.onsubmit = (event) => {
    event.preventDefault();
    let list = {
        age: inputAge.value,
        name: inputName.value,
    }


    fetch(data_url, {
        method: "post",
        body: JSON.stringify(list),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            fetch(data_url)
                .then(l => l.json())
                .then(d => reload(d))
        })


}

form_edit.onsubmit = (event) => {
    event.preventDefault();
    bg.style.display = 'none'
    model.style.display = 'none'
    let finded
    fetch(data_url)
        .then(l => l.json())
        .then(d => {
            finded = d.find(item => item.id === id)
            console.log(finded);
            fetch(data_url + '/' + finded.id, {
                method: "put",
                body: JSON.stringify(
                    {
                        age: model_age.value,
                        name: model_name.value,
                    }
                ),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(a => a.json())
                .then(b => {
                    fetch(data_url)
                    .then(l => l.json())
                    .then(d => reload(d))
                })

        },)
    
}






