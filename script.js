// ============================
// 📦 BASE DE DADOS
// ============================
function getJogadores(){
    return JSON.parse(localStorage.getItem("jogadores") || "[]")
}

function setJogadores(lista){
    localStorage.setItem("jogadores", JSON.stringify(lista))
}

// ============================
// 📋 TELA INICIAL (INDEX)
// ============================
function carregar(){
    const lista = document.getElementById("lista")
    if(!lista) return // <- evita erro na ficha

    const jogadores = getJogadores()

    lista.innerHTML = ""

    jogadores.forEach((j,i)=>{
        const div = document.createElement("div")
        div.className = "card"

        div.innerHTML = `
        <div class="foto-container">
        ${
            j.foto
            ? `<img src="${j.foto}" class="foto">`
            : `<div class="foto-placeholder">👤</div>`
        }
        </div>

        <strong>${j.nome}</strong>

        <button onclick="abrirFicha(${i})">Abrir</button>
        `

        lista.appendChild(div)
    })
}

// ============================
// ➕ NOVO JOGADOR (CORRIGIDO)
// ============================
function novoJogador(){

    const nome = prompt("Nome do jogador:")
    if(!nome) return

    const foto = prompt("URL da foto (opcional):")

    const jogadores = getJogadores()

    jogadores.push({
        nome,
        foto: foto || "",
        idade:"",
        genero:"",
        especializacao:"",
        descricao:"",

        fisico:1,
        mental:1,
        personalidade:1,

        pericias:[],

        habilidades:{
            especial:"",
            outras:""
        },

        sincronia:0,

        dano:{leve:0,moderado:0,grave:0},

        folegoAtual:3,

        inventario:[],

        recursos:{
            dinheiro:"",
            contatos:"",
            base:""
        },

        anotacoes:""
    })

    setJogadores(jogadores)
    carregar()
}

// ============================
// 🔗 ABRIR FICHA
// ============================
function abrirFicha(i){
    localStorage.setItem("jogadorAtual", i)
    window.location.href = "ficha.html"
}

// ============================
// 📄 FICHA
// ============================
if(window.location.pathname.includes("ficha.html")){

const jogadores = getJogadores()
const atual = Number(localStorage.getItem("jogadorAtual"))
const j = jogadores[atual]

if(!j){
    alert("Ficha não encontrada")
    window.location.href = "index.html"
}

// ===== INIT =====
if(!j.inventario) j.inventario=[]
if(!j.sincronia) j.sincronia=0
if(!j.folegoAtual) j.folegoAtual=3
if(!j.dano) j.dano={leve:0,moderado:0,grave:0}
if(!j.pericias) j.pericias=[]

// ===== SALVAR =====
function salvar(){
    setJogadores(jogadores)
}

// ===== FOTO =====
function carregarFoto(){
    const img = document.getElementById("fotoJogador")
    if(!img) return

    if(j.foto){
        img.src = j.foto
    }else{
        img.style.display="none"
    }
}

window.alterarFoto = ()=>{
    const nova = prompt("URL da imagem:")
    if(!nova) return
    j.foto = nova
    salvar()
    carregarFoto()
}

// ===== VOLTAR =====
window.voltar = ()=> window.location.href="index.html"

window.excluirFicha = ()=>{
    if(!confirm("Excluir ficha?")) return
    jogadores.splice(atual,1)
    salvar()
    window.location.href="index.html"
}

// ===== PERÍCIAS =====
function carregarPericias(){
    document.querySelectorAll(".pericia").forEach(c=>{
        c.checked = j.pericias.includes(c.value)

        c.addEventListener("change", ()=>{
            if(c.checked){
                if(!j.pericias.includes(c.value)){
                    j.pericias.push(c.value)
                }
            }else{
                j.pericias = j.pericias.filter(p=>p!==c.value)
            }
            salvar()
        })
    })
}

// ===== SINCRONIA =====
window.addSincronia = (v)=>{
    j.sincronia += v
    if(j.sincronia < 0) j.sincronia = 0
    if(j.sincronia > 10) j.sincronia = 10
    atualizar()
}

window.zerarSincronia = ()=>{
    j.sincronia = 0
    atualizar()
}

// ===== DANO =====
window.addDano = (tipo)=>{

    const peso = {leve:1,moderado:2,grave:3}

    let total =
    (j.dano.leve*1)+(j.dano.moderado*2)+(j.dano.grave*3)

    const limite = j.fisico + 2

    if(total + peso[tipo] > limite){
        alert("Limite de dano atingido!")
        return
    }

    j.dano[tipo]++
    atualizar()
}

window.zerarDano = ()=>{
    j.dano = {leve:0,moderado:0,grave:0}
    atualizar()
}

// ===== FÔLEGO =====
window.gastarFolego = v=>{
    j.folegoAtual -= v
    if(j.folegoAtual < 0) j.folegoAtual = 0
    atualizar()
}

window.recuperarFolego = ()=>{
    const max = j.fisico + 2
    j.folegoAtual++
    if(j.folegoAtual > max) j.folegoAtual = max
    atualizar()
}

// ===== INVENTÁRIO =====
window.addItem = ()=>{
    const nome = itemNome.value
    const peso = Number(document.getElementById("peso").value)

    let total = j.inventario.reduce((s,i)=>s+i.peso,0)
    let limite = j.fisico * 2

    if(total + peso > limite){
        alert("Sem espaço!")
        return
    }

    j.inventario.push({nome,peso})
    itemNome.value=""
    atualizar()
}

window.removerItem = i=>{
    j.inventario.splice(i,1)
    atualizar()
}

function renderInventario(){
    const ul = document.getElementById("inventario")
    if(!ul) return

    ul.innerHTML=""
    let total=0

    j.inventario.forEach((item,i)=>{
        total+=item.peso
        ul.innerHTML+=`
        <li>${item.nome} (${item.peso})
        <button onclick="removerItem(${i})">X</button>
        </li>`
    })

    document.getElementById("slotsUsados").innerText = total
}

// ===== UPDATE =====
function atualizar(){

    j.nome = nome.value
    j.fisico = Number(fisico.value)||0
    j.mental = Number(mental.value)||0
    j.personalidade = Number(personalidade.value)||0

    // SINCRONIA
    sincroniaTxt.innerText = j.sincronia + " / 10"
    sincroniaBar.style.width = (j.sincronia/10*100)+"%"

    // DANO
    const limite = j.fisico + 2
    const total =
    (j.dano.leve*1)+(j.dano.moderado*2)+(j.dano.grave*3)

    document.getElementById("limite").innerText = limite
    document.getElementById("danoTxt").innerText =
    `${total} / ${limite}`

    const barra = document.getElementById("danoBar")
    barra.style.width = (total/limite*100)+"%"

    // FÔLEGO
    const maxF = j.fisico + 2
    folegoTxt.innerText = j.folegoAtual + " / " + maxF
    folegoBar.style.width = (j.folegoAtual/maxF*100)+"%"

    // INVENTÁRIO
    document.getElementById("slotsTotal").innerText = j.fisico*2
    renderInventario()

    salvar()
}

// ===== INIT =====
nome.value = j.nome || ""
fisico.value = j.fisico || 1
mental.value = j.mental || 1
personalidade.value = j.personalidade || 1

carregarFoto()
carregarPericias()
atualizar()

document.querySelectorAll("input, textarea, select").forEach(el=>{
    el.addEventListener("input", atualizar)
})

}
