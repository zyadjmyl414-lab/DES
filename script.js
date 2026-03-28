const productNameInput = document.getElementById("productName");
const productWeightInput = document.getElementById("productWeight");
const topOfferInput = document.getElementById("topOffer");
const productPriceInput = document.getElementById("productPrice");
const productOfferInput = document.getElementById("productOffer");
const barcodeValueInput = document.getElementById("barcodeValue");
const taxTextArInput = document.getElementById("taxTextAr");
const taxTextEnInput = document.getElementById("taxTextEn");
const productImageInput = document.getElementById("productImageInput");

const updateBtn = document.getElementById("updateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const printBtn = document.getElementById("printBtn");
const printSheet = document.getElementById("printSheet");

const previewImages = document.querySelectorAll(".preview-image");
const qrImages = document.querySelectorAll(".qr-image");
const barcodeSvgs = document.querySelectorAll(".barcode");
const currencyImages = document.querySelectorAll(".currency-mark-img");
const footerLogos = document.querySelectorAll(".footer-logo");

// تنبيه إذا الصور غير موجودة
currencyImages.forEach((img) => {
  img.onerror = function () {
    console.warn("ملف sar.png غير موجود");
  };
});

footerLogos.forEach((img) => {
  img.onerror = function () {
    console.warn("ملف logo.png غير موجود");
  };
});

// تحديث النصوص في كل البطاقتين
function setText(fieldName, value) {
  document.querySelectorAll(`[data-field="${fieldName}"]`).forEach((el) => {
    el.textContent = value;
  });
}

// إنشاء باركود لكل بطاقة
function makeBarcodes(value) {
  barcodeSvgs.forEach((svg) => {
    JsBarcode(svg, value || "4210177488818", {
      format: "CODE128",
      lineColor: "#000000",
      background: "transparent",
      width: 1.7,
      height: 48,
      displayValue: true,
      fontSize: 18,
      margin: 0,
      textMargin: 4,
    });
  });
}

// تحديث البطاقة
function updateCard() {
  const name = productNameInput.value.trim() || "اسم المنتج";
  const weight = productWeightInput.value.trim() || "Volume - 1 KG";
  const topOffer = topOfferInput.value.trim() || "قطعة - 1";
  const price = productPriceInput.value.trim() || "0";
  const offer = productOfferInput.value.trim() || "1 حبة";
  const barcodeValue = barcodeValueInput.value.trim() || "4210177488818";
  const taxAr = taxTextArInput.value.trim() || "شامل الضريبة";
  const taxEn = taxTextEnInput.value.trim() || "Tax Included";

  setText("name", name);
  setText("weight", weight);
  setText("topOffer", topOffer);
  setText("price", price);
  setText("offer", offer);
  setText("taxAr", taxAr);
  setText("taxEn", taxEn);

  makeBarcodes(barcodeValue);

  // QR

}

// قراءة صورة المنتج وتطبيقها على البطاقتين
function readLocalImage(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImages.forEach((img) => {
      img.src = e.target.result;
    });
  };
  reader.readAsDataURL(file);
}

productImageInput.addEventListener("change", function () {
  readLocalImage(productImageInput);
});

// زر التحديث
updateBtn.addEventListener("click", function () {
  updateCard();
});

// تحميل كصورة (البطاقتين معًا)
downloadBtn.addEventListener("click", async function () {
  try {
    updateCard();
    downloadBtn.disabled = true;
    downloadBtn.textContent = "جاري الحفظ...";

    const canvas = await html2canvas(printSheet, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    const rawBarcode = barcodeValueInput.value.trim() || "barcode";
    const safeBarcode = rawBarcode.replace(/[\\/:*?"<>|]/g, "_");

    link.href = canvas.toDataURL("image/png");
    link.download = `${safeBarcode}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء الحفظ");
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "تحميل كصورة";
  }
});

// الطباعة
printBtn.addEventListener("click", function () {
  updateCard();
  window.print();
});

// تشغيل أولي
updateCard();
