function carregar(){
const jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")
const lista = document.getElementById("lista")
if(!lista) return

lista.innerHTML=""

jogadores.forEach((j,i)=>{
const div=document.createElement("div")
div.className="card"

div.innerHTML=`
<div class="foto-container">
${j.foto 
? `<img src="${j.foto}" class="foto">`
: `<div class="foto-placeholder">👤</div>`}
</div>

<strong>${j.nome}</strong>
<br><br>
<button onclick="abrirFicha(${i})">Abrir</button>
`
lista.appendChild(div)
})
}

function novoJogador(){
const nome=prompt("Nome do jogador:")
if(!nome) return

const foto=prompt("URL da foto (opcional):")

const jogadores=JSON.parse(localStorage.getItem("jogadores")||"[]")

jogadores.push({
nome,
foto:foto||"",
fisico:0,
mental:0,
personalidade:0,
inventario:[],
dano:0,
folegoAtual:5
})

localStorage.setItem("jogadores",JSON.stringify(jogadores))
carregar()
}

function abrirFicha(i){
localStorage.setItem("jogadorAtual",i)
window.location.href="ficha.html"
}

if(window.location.pathname.includes("ficha.html")){
const jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")
const atual = localStorage.getItem("jogadorAtual")
const j = jogadores[atual]

if(j){

if(!j.inventario) j.inventario=[]
if(!j.dano) j.dano=0
if(!j.folegoAtual) j.folegoAtual=5

nome.value = j.nome
fisico.value = j.fisico
mental.value = j.mental
personalidade.value = j.personalidade

function salvar(){
localStorage.setItem("jogadores", JSON.stringify(jogadores))
}

function carregarFoto(){
const img = document.getElementById("fotoJogador")
if(j.foto){
img.src = j.foto
}else{
img.style.display = "none"
}
}

window.alterarFoto = function(){
const nova = prompt("Cole a nova URL da imagem:")
if(!nova) return
j.foto = nova
salvar()
carregarFoto()
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
document.getElementById("folegoTxt").innerText = j.folegoAtual + " / " + folegoMax
document.getElementById("folegoBar").style.width = (j.folegoAtual/folegoMax*100)+"%"
document.getElementById("slotsTotal").innerText = slotsMax

renderInventario()
salvar()
}

window.addDano = v => { j.dano+=v; atualizar() }
window.zerarDano = ()=>{ j.dano=0; atualizar() }

window.gastarFolego = v=>{
j.folegoAtual -= v
if(j.folegoAtual < 0) j.folegoAtual = 0
atualizar()
}

window.recuperarFolego = ()=>{
j.folegoAtual = 5 + j.fisico
atualizar()
}

window.addItem = ()=>{
const nomeItem = itemNome.value
const peso = Number(document.getElementById("peso").value)
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
ul.innerHTML += `
<li>${item.nome} (${item.peso})
<button onclick="removerItem(${i})">X</button>
</li>`
})

document.getElementById("slotsUsados").innerText = total
}

window.removerItem = i=>{
j.inventario.splice(i,1)
atualizar()
}

document.querySelectorAll("input").forEach(i=>{
i.addEventListener("input", atualizar)
})

carregarFoto()
atualizar()

}
}
