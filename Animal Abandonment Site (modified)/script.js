document.addEventListener("DOMContentLoaded", () => 
  {
    const form = document.getElementById("formCadastro");
    const listaAnimais = document.getElementById("listaAnimais");
  
    form.addEventListener("submit", (e) => 
      {
      e.preventDefault();
      alert("Você entrou na sua conta");
      form.reset();
    });

  
    animais.forEach(animal => 
      {
      const card = document.createElement("div");
      card.className = "animal-card";
      card.innerHTML = 
      `
        <img src="${animal.imagem}" alt="${animal.nome}">
        <h3>${animal.nome}</h3>
        <p>${animal.especie}</p>
        <button>Adotar</button>
      `;
      listaAnimais.appendChild(card);
    });
  });
    
  function irparapaginacadastro()
  {
      window.location.href = "cadastrodeconta.html";
  };

  function adocao()
  {
    window.location.href = "adocao.html";
  };

  // --------------------------->  CPF 1  <-------------------------------

  const cpfInput = document.getElementById('cpf');
  
  cpfInput.addEventListener('input', function () 
  {
    let value = cpfInput.value.replace(/\D/g, ''); // Remove tudo que não for número
  
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
  
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    cpfInput.value = value;
  });

  // --------------------------->  Telefone  <-------------------------------

  const telefoneInput = document.getElementById('telefone');
  
  telefoneInput.addEventListener('input', function () 
  {
    let value = telefoneInput.value.replace(/\D/g, ''); // Remove tudo que não for número
  
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
    
    value = value.replace(/(\d{0})(\d)/, '$1($2');
    value = value.replace(/(\d{2})(\d)/, '$1)$2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  
    telefoneInput.value = value;
  });
  
  // --------------------------->  Buscador de CPF  <-------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
  
    cepInput.addEventListener('blur', function () {
      const cep = cepInput.value.replace(/\D/g, '');
  
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              ruaInput.value = data.logradouro;
              bairroInput.value = data.bairro;
              cidadeInput.value = data.localidade;
              estadoInput.value = data.uf;
            } else {
              alert('CEP não encontrado.');
            }
          })
          .catch(() => alert('Erro ao buscar o CEP.'));
      }
    });
  });

  //----------------------------------- Correção dos botões -----------------------------------------

  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); //impede o envio padrão

    //Aqui você poderia enviar os dados com fetch(), se quiser.

    //Simulando envio com sucesso
    console.log("Formulário enviado!");

    //Redireciona para outra página apos o "envio"
    window.location.href = "cadastrodeconta.html";
  });

  //-------------------------------------- JS -------------------------------------

const form = document.getElementById("form");
const lista = document.getElementById("lista-alimentos");

let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];

function renderAlimentos() {
  lista.innerHTML = "";
  alimentos.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      CPF: ${item.cpf}<br>
      <button onclick="editar(${index})">Editar</button>
      <button onclick="remover(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const novoAlimento = {
    nome: form.nome.value,
    cpf: form.cpf.value
  };

  alimentos.push(novoAlimento);
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  form.reset();
  renderAlimentos();
});

function remover(index) {
  alimentos.splice(index, 1);
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  renderAlimentos();
}

function editar(index) {
  const alimento = alimentos[index];
  form.nome.value = alimento.nome;
  form.cpf.value = alimento.cpf;
  alimentos.splice(index, 1);
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  renderAlimentos();
}

renderAlimentos();

//--------------------------------------- Foto do Pet -------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const dropArea = document.getElementById("drop-area");
  const fileElem = document.getElementById("fileElem");
  const preview = document.getElementById("preview");

  if (!dropArea || !fileElem || !preview) {
    console.error("Elemento não encontrado no DOM.");
    return;
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
      e.preventDefault();
      dropArea.classList.add('highlight');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
      e.preventDefault();
      dropArea.classList.remove('highlight');
    }, false);
  });

  dropArea.addEventListener('drop', e => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  fileElem.addEventListener('change', () => {
    handleFiles(fileElem.files);
  });

  function handleFiles(files) {
    if (files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Imagem do pet" style="max-width: 100%; max-height: 300px; margin-top: 10px;">`;
    };
    reader.readAsDataURL(file);
  }
});