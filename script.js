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

// BOTÕES GLOBAIS (CORREÇÃO PRINCIPAL)
window.voltar = ()=>{
window.location.href = "index.html"
}

window.excluirFicha = ()=>{
const jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")
const atual = Number(localStorage.getItem("jogadorAtual"))

if(isNaN(atual) || !jogadores[atual]){
alert("Ficha inválida.")
return
}

const confirmar = confirm("Tem certeza que deseja excluir essa ficha?")
if(!confirmar) return

jogadores.splice(atual,1)
localStorage.setItem("jogadores", JSON.stringify(jogadores))

window.location.href = "index.html"
}

// DETECTA PÁGINA DA FICHA (MAIS SEGURO)
if(window.location.href.includes("ficha.html")){

const jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")
const atual = Number(localStorage.getItem("jogadorAtual"))
const j = jogadores[atual]

// PROTEÇÃO
if(isNaN(atual) || !j){
window.location.href = "index.html"
}

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
j.fisico = Number(fisico.value) || 0
j.mental = Number(mental.value) || 0
j.personalidade = Number(personalidade.value) || 0

const limite = 6 + j.fisico
const folegoMax = 5 + j.fisico
const slotsMax = 5 + j.fisico

if(j.dano > limite) j.dano = limite
if(j.folegoAtual > folegoMax) j.folegoAtual = folegoMax

document.getElementById("limite").textContent = limite
document.getElementById("danoAtual").textContent = j.dano

document.getElementById("folegoTxt").textContent =
j.folegoAtual + " / " + folegoMax

document.getElementById("folegoBar").style.width =
(j.folegoAtual/folegoMax*100)+"%"

document.getElementById("slotsTotal").textContent = slotsMax

renderInventario()
salvar()
}

window.addDano = v=>{
const limite = 6 + j.fisico
j.dano += v
if(j.dano > limite) j.dano = limite
atualizar()
}

window.zerarDano = ()=>{
j.dano=0
atualizar()
}

window.gastarFolego = v=>{
j.folegoAtual -= v
if(j.folegoAtual < 0) j.folegoAtual = 0
atualizar()
}

window.recuperarFolego = ()=>{
const max = 5 + j.fisico
j.folegoAtual += 2
if(j.folegoAtual > max) j.folegoAtual = max
atualizar()
}

window.addItem = ()=>{
const nomeItem = itemNome.value
const peso = Number(document.getElementById("peso").value)

const limite = 5 + j.fisico

let totalAtual = 0
j.inventario.forEach(item => totalAtual += item.peso)

if(totalAtual + peso > limite){
alert("Limite de carga excedido!")
return
}

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

document.getElementById("slotsUsados").textContent = total
}

window.removerItem = i=>{
j.inventario.splice(i,1)
atualizar()
}

document.querySelectorAll("input, select").forEach(i=>{
i.addEventListener("input", atualizar)
})

carregarFoto()
atualizar()
}
}
