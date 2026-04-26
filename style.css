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

idade:"",
genero:"",
especializacao:"",
descricao:"",

fisico:0,
mental:0,
personalidade:0,

pericias:[],

habEspecial:"",
outrasHab:"",

inventario:[],
dano:0,
folegoAtual:5,

dinheiro:"",
contatos:"",
base:"",
anotacoes:""
})

localStorage.setItem("jogadores",JSON.stringify(jogadores))
carregar()
}

function abrirFicha(i){
localStorage.setItem("jogadorAtual",i)
window.location.href="ficha.html"
}

/* ================= FICHA ================= */

if(window.location.pathname.includes("ficha.html")){

const jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")
const atual = Number(localStorage.getItem("jogadorAtual"))
const j = jogadores[atual]

if(j){

// defaults
j.pericias ||= []
j.inventario ||= []
j.dano ||= 0
j.folegoAtual ||= 5

/* ====== LOAD ====== */

nome.value = j.nome || ""
idade.value = j.idade || ""
genero.value = j.genero || ""
especializacao.value = j.especializacao || ""
descricao.value = j.descricao || ""

fisico.value = j.fisico || 0
mental.value = j.mental || 0
personalidade.value = j.personalidade || 0

habEspecial.value = j.habEspecial || ""
outrasHab.value = j.outrasHab || ""

dinheiro.value = j.dinheiro || ""
contatos.value = j.contatos || ""
base.value = j.base || ""
anotacoes.value = j.anotacoes || ""

/* ===== PERÍCIAS ===== */

document.querySelectorAll(".pericia").forEach(p=>{
p.checked = j.pericias.includes(p.value)
})

/* ===== FOTO ===== */

function carregarFoto(){
const img = document.getElementById("fotoJogador")
if(j.foto){
img.src = j.foto
}else{
img.style.display="none"
}
}

/* ===== SALVAR ===== */

function salvar(){
localStorage.setItem("jogadores", JSON.stringify(jogadores))
}

/* ===== ATUALIZAR ===== */

function atualizar(){

j.nome = nome.value
j.idade = idade.value
j.genero = genero.value
j.especializacao = especializacao.value
j.descricao = descricao.value

j.fisico = Number(fisico.value) || 0
j.mental = Number(mental.value) || 0
j.personalidade = Number(personalidade.value) || 0

j.habEspecial = habEspecial.value
j.outrasHab = outrasHab.value

j.dinheiro = dinheiro.value
j.contatos = contatos.value
j.base = base.value
j.anotacoes = anotacoes.value

/* PERÍCIAS */
j.pericias = []
document.querySelectorAll(".pericia:checked").forEach(p=>{
j.pericias.push(p.value)
})

/* STATUS */
const limite = 6 + j.fisico
const folegoMax = 5 + j.fisico
const slotsMax = 5 + j.fisico

if(j.dano > limite) j.dano = limite
if(j.folegoAtual > folegoMax) j.folegoAtual = folegoMax

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

/* ===== CONTROLES ===== */

window.voltar = ()=> window.location.href="index.html"

window.excluirFicha = ()=>{
if(confirm("Excluir personagem?")){
jogadores.splice(atual,1)
salvar()
window.location.href="index.html"
}
}

window.alterarFoto = ()=>{
const url = prompt("Nova URL:")
if(!url) return
j.foto = url
salvar()
carregarFoto()
}

/* ===== DANO ===== */

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

/* ===== FÔLEGO ===== */

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

/* ===== INVENTÁRIO ===== */

window.addItem = ()=>{
const nomeItem = itemNome.value
const peso = Number(document.getElementById("peso").value)

if(!nomeItem) return

const limite = 5 + j.fisico

let total = 0
j.inventario.forEach(i=> total+=i.peso)

if(total + peso > limite){
alert("Limite excedido")
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

document.getElementById("slotsUsados").innerText = total
}

window.removerItem = i=>{
j.inventario.splice(i,1)
atualizar()
}

/* ===== LISTENERS ===== */

document.querySelectorAll("input, textarea, select").forEach(e=>{
e.addEventListener("input", atualizar)
})

document.querySelectorAll(".pericia").forEach(e=>{
e.addEventListener("change", atualizar)
})

/* INIT */
carregarFoto()
atualizar()

}
}
