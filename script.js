
const productNameInput = document.getElementById("productName");
const productWeightInput = document.getElementById("productWeight");
const topOfferInput = document.getElementById("topOffer");
const productPriceInput = document.getElementById("productPrice");
const productOfferInput = document.getElementById("productOffer");
const barcodeValueInput = document.getElementById("barcodeValue");
const taxTextArInput = document.getElementById("taxTextAr");
const taxTextEnInput = document.getElementById("taxTextEn");
const productImageInput = document.getElementById("productImageInput");

const previewName = document.getElementById("previewName");
const previewWeight = document.getElementById("previewWeight");
const previewTopOffer = document.getElementById("previewTopOffer");
const previewPrice = document.getElementById("previewPrice");
const previewOffer = document.getElementById("previewOffer");
const previewTaxAr = document.getElementById("previewTaxAr");
const previewTaxEn = document.getElementById("previewTaxEn");
const previewImage = document.getElementById("previewImage");
const qrImage = document.getElementById("qrImage");
const currencyMarkImg = document.getElementById("currencyMarkImg");
const footerLogo = document.getElementById("footerLogo");
const tagCard = document.getElementById("tagCard");

const updateBtn = document.getElementById("updateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const printBtn = document.getElementById("printBtn");

currencyMarkImg.onerror = function () {
  console.warn("ملف sar.png غير موجود في نفس مجلد المشروع");
};

footerLogo.onerror = function () {
  console.warn("ملف logo.png غير موجود في نفس مجلد المشروع");
};

function makeBarcode(value) {
  JsBarcode("#barcode", value || "4210177488818", {
    format: "CODE128",
    lineColor: "#000000",
    width: 1.35,
    height: 28,
    displayValue: true,
    fontSize: 9,
    margin: 0,
    textMargin: 1,
  });
}

function updateCard() {
  const name = productNameInput.value.trim() || "اسم المنتج";
  const weight = productWeightInput.value.trim() || "Volume - 1 KG";
  const topOffer = topOfferInput.value.trim() || "قطعة - 1";
  const price = productPriceInput.value.trim() || "0";
  const offer = productOfferInput.value.trim() || "1 حبة";
  const barcodeValue = barcodeValueInput.value.trim() || "4210177488818";
  const taxAr = taxTextArInput.value.trim() || "شامل الضريبة";
  const taxEn = taxTextEnInput.value.trim() || "Tax Included";

  previewName.textContent = name;
  previewWeight.textContent = weight;
  previewTopOffer.textContent = topOffer;
  previewPrice.textContent = price;
  previewOffer.textContent = offer;
  previewTaxAr.textContent = taxAr;
  previewTaxEn.textContent = taxEn;

  makeBarcode(barcodeValue);

  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
    encodeURIComponent(`${name} | Price: ${price} | Barcode: ${barcodeValue}`);
}

function readLocalImage(input, targetElement) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    targetElement.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

productImageInput.addEventListener("change", function () {
  readLocalImage(productImageInput, previewImage);
});

updateBtn.addEventListener("click", function () {
  updateCard();
});

downloadBtn.addEventListener("click", async function () {
  try {
    updateCard();
    downloadBtn.disabled = true;
    downloadBtn.textContent = "جاري الحفظ...";

    const canvas = await html2canvas(tagCard, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#b7e3ee",
      logging: false,
    });

    canvas.toBlob(function (blob) {
      if (!blob) {
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const win = window.open();
        if (win) {
          win.document.write(
            `<title>product-price-tag.png</title><img src="${dataUrl}" style="max-width:100%">`,
          );
        } else {
          alert("تعذر الحفظ التلقائي. تم منع النافذة المنبثقة.");
        }
        downloadBtn.disabled = false;
        downloadBtn.textContent = "تحميل كصورة";
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product-price-tag.png";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        downloadBtn.disabled = false;
        downloadBtn.textContent = "تحميل كصورة";
      }, 300);
    }, "image/png");
  } catch (error) {
    console.error("فشل الحفظ:", error);
    alert("حدث خطأ أثناء حفظ الصورة");
    downloadBtn.disabled = false;
    downloadBtn.textContent = "تحميل كصورة";
  }
});

printBtn.addEventListener("click", function () {
  updateCard();
  setTimeout(() => {
    window.print();
  }, 150);
});

updateCard();
