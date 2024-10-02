using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using traffic_sign_identifier.Models;
using Traffic_sign_identifier;

namespace traffic_sign_identifier.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MLsignIdentifier _mlsignIdentifier;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _mlsignIdentifier = new MLsignIdentifier(); 
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ClassifyImage(IFormFile imageUpload)
        {
            if (imageUpload == null || imageUpload.Length == 0)
            {
                ViewBag.ClassificationResult = "Por favor, selecione uma imagem.";
                return View("Index");
            }

            using (var memoryStream = new MemoryStream())
            {
                await imageUpload.CopyToAsync(memoryStream);
                var imageBytes = memoryStream.ToArray();

                var input = new MLsignIdentifier.ModelInput
                {
                    ImageSource = imageBytes
                };

                var result = MLsignIdentifier.Predict(input);

                ViewBag.ClassificationResult = $"{result.PredictedLabel}";
            }

            return View("Index");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
