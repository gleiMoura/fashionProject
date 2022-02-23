//let person_name = prompt("Qual é o seu nome?");
let button = document.querySelector('button')
let link_clothes = document.querySelector('.link-clothes')
button.disabled = true;

let boolean_model = false;
let boolean_collar = false;
let boolean_fabric = false;
let put_link = false;

link_clothes.value = "";

function chooseModel(classe, type, chooice){

    let item_model = document.querySelectorAll('.item-model')
    let item_collar = document.querySelectorAll('.item-collar')
    let item_fabric = document.querySelectorAll('.item-fabric')
   
    if(type === 'model'){
        for(let i = 0; i < item_model.length; i++){
            item_model[i].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_model = true;
    }
    if(type === 'collar'){
        for(let j= 0; j < item_collar.length; j++){
            item_collar[j].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_collar = true;
    }
    if(type === 'fabric'){
        for(let k = 0; k < item_fabric.length; k++){
            item_fabric[k].classList.remove('selected')
        }
        classe.classList.add("selected");
        boolean_fabric = true;
    }
    if(link_clothes.value !== ''){
        put_link = true;
    }

    if(boolean_model && boolean_collar && boolean_fabric){
        button.disabled = false;
    }
    console.log('model', boolean_model)
    console.log('collar', boolean_collar)
    console.log('fabric', boolean_fabric)
    console.log('link',put_link)
}

function clickButton(){
    if(put_link = false){
        alert("coloque o link para concluir o seu pedido")
    }
}