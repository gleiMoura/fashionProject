let person_name = prompt("Qual é o seu nome?");
let button = document.querySelector('button')
let link_clothes = document.querySelector('.link-clothes')
button.disabled = true;

let boolean_model = false;
let boolean_collar = false;
let boolean_fabric = false;
let put_link = false;

let list_model = [];
let list_collar = [];
let list_fabric = [];
let order_object = null;
let order_from_footer = null;

let orders_in_footer = document.querySelector(".orders");

let shirt_list = null;

link_clothes.value = "";

function chooseModel(classe, type, choice){

    let item_model = document.querySelectorAll('.item-model')
    let item_collar = document.querySelectorAll('.item-collar')
    let item_fabric = document.querySelectorAll('.item-fabric')
   
    if(type === 'model'){
        for(let i = 0; i < item_model.length; i++){
            item_model[i].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_model = true;

        list_model.push(choice)
    }
    if(type === 'collar'){
        for(let j= 0; j < item_collar.length; j++){
            item_collar[j].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_collar = true;

        list_collar.push(choice)
    }
    if(type === 'fabric'){
        for(let k = 0; k < item_fabric.length; k++){
            item_fabric[k].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_fabric = true;

        list_fabric.push(choice)
    }
    if(link_clothes.value !== ''){
        put_link = true;
    }

    if(boolean_model && boolean_collar && boolean_fabric && put_link){
        button.disabled = false;
    }
    
    order_object = {
        "model": list_model[0],
        "neck": list_collar[0],
        "material": list_fabric[0],
        "image": link_clothes.value,
        "owner": person_name,
        "author": person_name
    }
}

function takeData(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");

    promise.then(putElementsOnScreen)

    promise.catch((err) => {
        console.error(err.status, err.message);
    })
}

function putElementsOnScreen(element){
    shirt_list = element.data;

    orders_in_footer.innerHTML = ''

    for(let i = 0; i < shirt_list.length; i++){
        orders_in_footer.innerHTML = orders_in_footer.innerHTML + `
            <div class="shirt-image" onclick = "sendOrderFromFooter(${shirt_list[i].id})">
                <img src="${shirt_list[i].image}" alt="imagem da camisa">
                <div class="text">
                    <h1>Criador:</h1>
                    <p> ${shirt_list[i].owner}</p>
                </div>
            </div>
        `
    }
}

function sendOrder(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", order_object);

    promise.then((answer) =>{
        console.log(answer.data)
    })
    promise.catch((err)=>{
        console.error(err.status, err.message)
    })
}

function sendOrderFromFooter(identifier){
    for(let i = 0; i < shirt_list.length; i++){
        if(identifier === shirt_list[i].id){
           order_from_footer = shirt_list[i];
        }
    }

    order_object = {
        "model": order_from_footer.model,
        "neck": order_from_footer.neck,
        "material": order_from_footer.material,
        "image": order_from_footer.image,
        "owner": person_name,
        "author": person_name
    }

    console.log(order_object)
    console.log(order_from_footer)
    console.log(identifier)
    console.log(shirt_list)
    let question = confirm("você deseja enviar este pedido?")
    if(question){
        sendOrder();
    }
}

setInterval(takeData, 3000)


