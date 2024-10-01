const form = document.getElementById('imageForm');
const imagePreview = document.getElementById('imagePreview');
const resultSection = document.getElementById('resultSection');
const classificationResult = document.getElementById('classificationResult');

document.getElementById('imageUpload').addEventListener('change', function (event) {
        const file = event.target.files[0];
if (file) {
            const reader = new FileReader();
reader.onload = function (e) {
    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Imagem da Ferramenta">`;
            };
reader.readAsDataURL(file);
        } else {
    imagePreview.innerHTML = '<i class="fas fa-image"></i>';
        }
    });                 

form.addEventListener('submit', function (event) {
    event.preventDefault();

const fileInput = document.getElementById('imageUpload');
if (fileInput.files.length === 0) {
    classificationResult.textContent = 'Por favor, selecione uma imagem.';
return;
        }

const toolList = ['Chave de Fenda', 'Chave Allen', 'Martelo', 'Alicate', 'Chave Inglesa'];
const randomTool = toolList[Math.floor(Math.random() * toolList.length)];

classificationResult.textContent = `A ferramenta foi classificada como: ${randomTool}`;
        resultSection.classList.remove('d-none');
    });
