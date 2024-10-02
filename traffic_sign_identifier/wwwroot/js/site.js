const form = document.getElementById('imageForm');
const imagePreview = document.getElementById('imagePreview');

document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Imagem da Ferramenta" style="max-width: 100%; height: auto;">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '<i class="fas fa-image"></i>';
    }
});

if ('@ViewBag.ClassificationResult' !== '') {
    document.getElementById('resultSection').classList.remove('d-none');
}