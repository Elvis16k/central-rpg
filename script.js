const jogadores = JSON.parse(localStorage.getItem("jogadores"))
const atual = localStorage.getItem("jogadorAtual")
const j = jogadores[atual]

if(!j.inventario) j.inventario=[]
if(!j.dano) j.dano=0
if(!j.folegoAtual) j.folegoAtual=5

nome.value = j.nome
fisico.value = j.fisico
mental.value = j.mental
personalidade.value = j.personalidade

function carregarFoto(){
    const img = document.getElementById("fotoJogador")
    if(j.foto){
        img.src = j.foto
    }else{
        img.style.display = "none"
    }
}

function alterarFoto(){
    const nova = prompt("Cole a nova URL da imagem:")
    if(!nova) return
    j.foto = nova
    salvar()
    carregarFoto()
}

function salvar(){
localStorage.setItem("jogadores", JSON.stringify(jogadores))
}

function atualizar(){

j.nome = nome.value
j.fisico = Number(fisico.value)
j.mental = Number(mental.value)
j.personalidade = Number(personalidade.value)

const limite = 6 + j.fisico
const folegoMax = 5 + j.fisico
const slotsMax = 5 + j.fisico

document.getElementById("limite").innerText = limite
document.getElementById("danoAtual").innerText = j.dano

document.getElementById("folegoTxt").innerText =
j.folegoAtual + " / " + folegoMax

document.getElementById("folegoBar").style.width =
(j.folegoAtual/folegoMax*100)+"%"

document.getElementById("slotsTotal").innerText = slotsMax

renderInventario()
salvar()
}

function addDano(v){
j.dano += v
atualizar()
}

function zerarDano(){
j.dano = 0
atualizar()
}

function gastarFolego(v){
j.folegoAtual -= v
if(j.folegoAtual < 0) j.folegoAtual = 0
atualizar()
}

function recuperarFolego(){
j.folegoAtual = 5 + j.fisico
atualizar()
}

function addItem(){
const nomeItem = itemNome.value
const peso = Number(document.getElementById("peso").value)

if(!nomeItem) return

j.inventario.push({nome:nomeItem,peso})
itemNome.value=""
atualizar()
}

function renderInventario(){
const ul = document.getElementById("inventario")
ul.innerHTML=""

let total=0

j.inventario.forEach((item,i)=>{
total += item.peso
ul.innerHTML +=
`<li>${item.nome} (${item.peso})
<button onclick="removerItem(${i})">X</button></li>`
})

document.getElementById("slotsUsados").innerText = total
}

function removerItem(i){
j.inventario.splice(i,1)
atualizar()
}

function rolar(){

const attr = atributo.value
const bonusVal = Number(bonus.value) || 0
const resultadoEl = document.getElementById("resultado")

resultadoEl.classList.add("rolling")

let anim = 0

const intervalo = setInterval(()=>{
    const fake = Math.floor(Math.random()*20)+1
    resultadoEl.innerText = "Rolando... " + fake
    anim++
    
    if(anim > 10){
        clearInterval(intervalo)

        const d20 = Math.floor(Math.random()*20)+1
        const total = d20 + j[attr] + bonusVal

        resultadoEl.classList.remove("rolling")

        resultadoEl.innerText =
        `d20(${d20}) + ${j[attr]} + ${bonusVal} = ${total}`
    }

}, 60)
}

document.querySelectorAll("input").forEach(i=>{
i.addEventListener("input", atualizar)
})

carregarFoto()
atualizar()
