// const productNameInput = document.getElementById("productName");
// const productWeightInput = document.getElementById("productWeight");
// const topOfferInput = document.getElementById("topOffer");
// const productPriceInput = document.getElementById("productPrice");
// const productOfferInput = document.getElementById("productOffer");
// const barcodeValueInput = document.getElementById("barcodeValue");
// const taxTextArInput = document.getElementById("taxTextAr");
// const taxTextEnInput = document.getElementById("taxTextEn");
// const productImageInput = document.getElementById("productImageInput");

// const updateBtn = document.getElementById("updateBtn");
// const downloadBtn = document.getElementById("downloadBtn");
// const printBtn = document.getElementById("printBtn");
// const printSheet = document.getElementById("printSheet");

// const previewImages = document.querySelectorAll(".preview-image");
// const qrImages = document.querySelectorAll(".qr-image");
// const barcodeSvgs = document.querySelectorAll(".barcode");
// const currencyImages = document.querySelectorAll(".currency-mark-img");
// const footerLogos = document.querySelectorAll(".footer-logo");

// // تنبيه إذا الصور غير موجودة
// currencyImages.forEach((img) => {
//   img.onerror = function () {
//     console.warn("ملف sar.png غير موجود");
//   };
// });

// footerLogos.forEach((img) => {
//   img.onerror = function () {
//     console.warn("ملف logo.png غير موجود");
//   };
// });

// // تحديث النصوص في كل البطاقتين
// function setText(fieldName, value) {
//   document.querySelectorAll(`[data-field="${fieldName}"]`).forEach((el) => {
//     el.textContent = value;
//   });
// }

// // إنشاء باركود لكل بطاقة
// function makeBarcodes(value) {
//   barcodeSvgs.forEach((svg) => {
//     JsBarcode(svg, value || "4210177488818", {
//       format: "CODE128",
//       lineColor: "#000000",
//       background: "transparent",
//       width: 1.7,
//       height: 48,
//       displayValue: true,
//       fontSize: 18,
//       margin: 0,
//       textMargin: 4,
//     });
//   });
// }

// // حذف الأخطاء القديمة
// function clearValidationErrors() {
//   document.querySelectorAll(".field-error").forEach((el) => el.remove());

//   [
//     productNameInput,
//     productWeightInput,
//     topOfferInput,
//     productPriceInput,
//     productOfferInput,
//     barcodeValueInput,
//     taxTextArInput,
//     taxTextEnInput,
//     productImageInput,
//   ].forEach((input) => {
//     input.classList.remove("input-error");
//   });
// }

// // إظهار رسالة الخطأ تحت الحقل
// function showFieldError(input, message) {
//   input.classList.add("input-error");

//   const field = input.closest(".field");
//   if (!field) return;

//   const oldError = field.querySelector(".field-error");
//   if (oldError) oldError.remove();

//   const errorEl = document.createElement("div");
//   errorEl.className = "field-error";
//   errorEl.textContent = message;
//   field.appendChild(errorEl);
// }

// // التحقق من الحقول
// function validateForm() {
//   clearValidationErrors();

//   const validations = [
//     {
//       input: productNameInput,
//       message: "يرجى إدخال اسم المنتج",
//       invalid: productNameInput.value.trim() === "",
//     },
//     {
//       input: productWeightInput,
//       message: "يرجى إدخال الوصف الصغير",
//       invalid: productWeightInput.value.trim() === "",
//     },
//     {
//       input: topOfferInput,
//       message: "يرجى إدخال النص أعلى الباركود",
//       invalid: topOfferInput.value.trim() === "",
//     },
//     {
//       input: productPriceInput,
//       message: "يرجى إدخال السعر",
//       invalid: productPriceInput.value.trim() === "",
//     },
//     {
//       input: productOfferInput,
//       message: "يرجى إدخال العرض",
//       invalid: productOfferInput.value.trim() === "",
//     },
//     {
//       input: barcodeValueInput,
//       message: "يرجى إدخال رقم الباركود",
//       invalid: barcodeValueInput.value.trim() === "",
//     },
//     {
//       input: taxTextArInput,
//       message: "يرجى إدخال النص العربي",
//       invalid: taxTextArInput.value.trim() === "",
//     },
//     {
//       input: taxTextEnInput,
//       message: "يرجى إدخال النص الإنجليزي",
//       invalid: taxTextEnInput.value.trim() === "",
//     },
//     {
//       input: productImageInput,
//       message: "يرجى اختيار صورة المنتج",
//       invalid: productImageInput.files.length === 0,
//     },
//   ];

//   let firstInvalidInput = null;

//   validations.forEach((item) => {
//     if (item.invalid) {
//       showFieldError(item.input, item.message);
//       if (!firstInvalidInput) {
//         firstInvalidInput = item.input;
//       }
//     }
//   });

//   if (firstInvalidInput) {
//     firstInvalidInput.focus();
//     firstInvalidInput.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//     return false;
//   }

//   return true;
// }

// // تحديث البطاقة
// function updateCard() {
//   const name = productNameInput.value.trim() || "اسم المنتج";
//   const weight = productWeightInput.value.trim() || "Volume - 1 KG";
//   const topOffer = topOfferInput.value.trim() || "قطعة - 1";
//   const price = productPriceInput.value.trim() || "0";
//   const offer = productOfferInput.value.trim() || "1 حبة";
//   const barcodeValue = barcodeValueInput.value.trim() || "4210177488818";
//   const taxAr = taxTextArInput.value.trim() || "شامل الضريبة";
//   const taxEn = taxTextEnInput.value.trim() || "Tax Included";

//   setText("name", name);
//   setText("weight", weight);
//   setText("topOffer", topOffer);
//   setText("price", price);
//   setText("offer", offer);
//   setText("taxAr", taxAr);
//   setText("taxEn", taxEn);

//   makeBarcodes(barcodeValue);

//   // QR ثابت - لا يوجد تعديل هنا
// }

// // قراءة صورة المنتج وتطبيقها على البطاقتين
// function readLocalImage(input) {
//   const file = input.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = function (e) {
//     previewImages.forEach((img) => {
//       img.src = e.target.result;
//     });
//   };
//   reader.readAsDataURL(file);
// }

// productImageInput.addEventListener("change", function () {
//   const field = productImageInput.closest(".field");
//   productImageInput.classList.remove("input-error");
//   if (field) {
//     const error = field.querySelector(".field-error");
//     if (error) error.remove();
//   }

//   readLocalImage(productImageInput);
// });

// // إزالة رسالة الخطأ أثناء الكتابة
// [
//   productNameInput,
//   productWeightInput,
//   topOfferInput,
//   productPriceInput,
//   productOfferInput,
//   barcodeValueInput,
//   taxTextArInput,
//   taxTextEnInput,
// ].forEach((input) => {
//   input.addEventListener("input", function () {
//     input.classList.remove("input-error");

//     const field = input.closest(".field");
//     if (!field) return;

//     const error = field.querySelector(".field-error");
//     if (error) error.remove();
//   });
// });

// // زر التحديث
// updateBtn.addEventListener("click", function () {
//   updateCard();
// });

// // تحميل كصورة (البطاقتين معًا)
// downloadBtn.addEventListener("click", async function () {
//   if (!validateForm()) {
//     return;
//   }

//   try {
//     updateCard();
//     downloadBtn.disabled = true;
//     downloadBtn.textContent = "جاري الحفظ...";

//     const canvas = await html2canvas(printSheet, {
//       scale: 3,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });

//     const link = document.createElement("a");
//     const rawBarcode = barcodeValueInput.value.trim() || "barcode";
//     const safeBarcode = rawBarcode.replace(/[\\/:*?"<>|]/g, "_");

//     link.href = canvas.toDataURL("image/png");
//     link.download = `${safeBarcode}.png`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } catch (error) {
//     console.error(error);
//     alert("حدث خطأ أثناء الحفظ");
//   } finally {
//     downloadBtn.disabled = false;
//     downloadBtn.textContent = "تحميل كصورة";
//   }
// });

// // الطباعة
// printBtn.addEventListener("click", function () {
//   if (!validateForm()) {
//     return;
//   }

//   updateCard();
//   window.print();
// });

// // تشغيل أولي
// updateCard();
// =========================
// عناصر الإدخال
// =========================
const inputs = {
  name: document.getElementById("productName"),
  weight: document.getElementById("productWeight"),
  topOffer: document.getElementById("topOffer"),
  price: document.getElementById("productPrice"),
  offer: document.getElementById("productOffer"),
  barcode: document.getElementById("barcodeValue"),
  taxAr: document.getElementById("taxTextAr"),
  taxEn: document.getElementById("taxTextEn"),
  image: document.getElementById("productImageInput"),
};

const updateBtn = document.getElementById("updateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const printBtn = document.getElementById("printBtn");
const printSheet = document.getElementById("printSheet");

const previewImages = document.querySelectorAll(".preview-image");
const barcodeSvgs = document.querySelectorAll(".barcode");

// =========================
// أدوات مساعدة
// =========================

// تحديث النصوص
function setText(field, value) {
  document
    .querySelectorAll(`[data-field="${field}"]`)
    .forEach((el) => (el.textContent = value));
}

// تنظيف الباركود
function sanitizeBarcode(value) {
  return value.replace(/[^0-9]/g, "").slice(0, 14);
}

// إنشاء باركود
function makeBarcodes(value) {
  const safeValue = value || "4210177488818";

  barcodeSvgs.forEach((svg) => {
    try {
      JsBarcode(svg, safeValue, {
        format: "CODE128",
        lineColor: "#000",
        background: "rgba(0,0,0,0)", // شفاف 100%
        width: 1.7,
        height: 48,
        displayValue: true,
        fontSize: 18,
        margin: 0,
        textMargin: 4,
      });

      // 🔥 إزالة أي خلفية من SVG
      svg.style.background = "transparent";
    } catch (e) {
      console.warn("Barcode error:", e);
    }
  });
}

// تنسيق السعر
function formatPrice(val) {
  const num = parseFloat(val);
  if (isNaN(num)) return "0";
  return num.toFixed(0);
}

// =========================
// تحديث البطاقة
// =========================
function updateCard() {
  setText("name", inputs.name.value || "اسم المنتج");
  setText("weight", inputs.weight.value || "Volume - 1 KG");
  setText("topOffer", inputs.topOffer.value || "قطعة - 1");

  setText("price", formatPrice(inputs.price.value));
  setText("offer", inputs.offer.value || "1 حبة");

  setText("taxAr", inputs.taxAr.value || "شامل الضريبة");
  setText("taxEn", inputs.taxEn.value || "Tax Included");

  makeBarcodes(inputs.barcode.value);
}

// =========================
// الصورة
// =========================
// function readImage(file) {
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     previewImages.forEach((img) => (img.src = e.target.result));
//   };
//   reader.readAsDataURL(file);
// }

// inputs.image.addEventListener("change", (e) => {
//   if (e.target.files[0]) {
//     readImage(e.target.files[0]);
//   }
// });
// =========================
// الصورة + إزالة الخلفية البيضاء
// =========================
function removeWhiteBackground(imageSrc, callback) {
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // تجاهل البكسلات الشفافة أصلًا
      if (a === 0) continue;

      // حذف الخلفية البيضاء أو القريبة من الأبيض
      const isNearWhite = r > 235 && g > 235 && b > 235;

      // حذف الخلفية الرمادية/الفاتحة جدًا أيضًا
      const isVeryLight =
        r > 225 &&
        g > 225 &&
        b > 225 &&
        Math.abs(r - g) < 12 &&
        Math.abs(g - b) < 12 &&
        Math.abs(r - b) < 12;

      if (isNearWhite || isVeryLight) {
        data[i + 3] = 0; // شفافية كاملة
      }
    }

    ctx.putImageData(imageData, 0, 0);
    callback(canvas.toDataURL("image/png"));
  };

  img.onerror = function () {
    callback(imageSrc);
  };

  img.src = imageSrc;
}

function readImage(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    removeWhiteBackground(e.target.result, (processedImage) => {
      previewImages.forEach((img) => {
        img.src = processedImage;
      });
    });
  };

  reader.readAsDataURL(file);
}

inputs.image.addEventListener("change", (e) => {
  if (e.target.files[0]) {
    readImage(e.target.files[0]);
  }ك
});

// =========================
// تحميل كصورة
// =========================
downloadBtn.addEventListener("click", async function () {
  try {
    if (typeof validateForm === "function" && !validateForm()) {
      return;
    }

    if (typeof updateCard === "function") {
      updateCard();
    }

    downloadBtn.disabled = true;
    downloadBtn.textContent = "جاري الحفظ...";

    document.body.classList.add("capture-mode");

    await new Promise((resolve) => setTimeout(resolve, 150));

    const canvas = await html2canvas(printSheet, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: printSheet.scrollWidth,
      height: printSheet.scrollHeight,
      windowWidth: Math.max(window.innerWidth, 1400),
      windowHeight: Math.max(window.innerHeight, 900),
    });

    document.body.classList.remove("capture-mode");

    const link = document.createElement("a");
    const rawBarcode =
      (inputs.barcode && inputs.barcode.value.trim()) || "barcode";

    const safeBarcode = rawBarcode.replace(/[\\/:*?"<>|]/g, "_");
    link.href = canvas.toDataURL("image/png");
    link.download = `${safeBarcode}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    document.body.classList.remove("capture-mode");
    console.error("Download error:", error);
    alert("حدث خطأ أثناء التحميل، تأكد من عدم وجود خطأ في الكود");
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "تحميل كصورة";
  }
});

// =========================
// الطباعة
// =========================
printBtn.addEventListener("click", () => {
  updateCard();
  window.print();
});

// =========================
// تحديث مباشر (Live)
// =========================
Object.values(inputs).forEach((input) => {
  if (input.type !== "file") {
    input.addEventListener("input", updateCard);
  }
});

// تشغيل أولي
updateCard();
