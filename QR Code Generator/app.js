const qrText = document.querySelector('#qr-text');
const sizes = document.querySelector("#sizes");
const generateBtn = document.querySelector('.row1-btn');
const downloadBtn = document.querySelectorAll('.row2-btn')[0];
const copyBtn = document.querySelectorAll('.row2-btn')[1];
const result = document.querySelector('.qr-body');

let size = 200;
let blob;
let QR_USING_API = 1;

/*function generateQRCode() {
    QR_USING_API = 0;
    size = sizes.value;
    result.innerHTML = "";
    new QRCode(result,{
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",
    });
}*/

async function generateQRCode() {
    size = sizes.value;
    const resp = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${qrText.value}&size=${size}x${size}`)
    blob = await resp.blob();
    let imageBase64 = URL.createObjectURL(blob);

    result.innerHTML = "";
    const image = document.createElement('img');
    image.src = imageBase64;
    result.append(image);
}

generateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (qrText.value.length < 1) {
        alert("Enter text or URL to generate QR Code");
    }
    else {
        generateQRCode();
    }
});

downloadBtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');

    if (img !== null) {
        imgArr = img.getAttribute('src');
        downloadBtn.setAttribute('href', imgArr);
    } else {
        alert('No QR Code generated!!!');
    }
});

copyBtn.addEventListener('click', async () => {
    let img = document.querySelector('.qr-body img');
    if (img !== null) {
        await setToClipboard(blob)
    } else {
        alert('No QR Code generated!!!');
    }
})

const setToClipboard = async (blob) => {

    if (!QR_USING_API) {
        let img = document.querySelector('.qr-body img');
        imgArr = img.getAttribute('src');

        const binaryData = atob(imgArr.split(',')[1]);

        // Create a Uint8Array from binary data
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        blob = new Blob([uint8Array], { type: 'image/png' });
    }

    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}