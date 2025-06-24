const qrText=document.getElementById('qr-text');
const sizes=document.getElementById('sizes');
const generateBtn=document.getElementById('generateBtn');
const downloadBtn=document.getElementById('downloadBtn');

const qrContainer=document.querySelector('.qr-body');

let size=sizes.value;

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();// helps to prevent loading of page even clicked on generate button
 
    isEmptyInput();
});
sizes.addEventListener('change',(e)=>{
    size=e.target.value;
    isEmptyInput();
})

function generateQRCode(){
    qrContainer.innerHTML="";
    var qrcode = new QRCode(qrContainer, {
    text: qrText.value,
    width: size,
    height: size,
    colorDark : "#000000",
    colorLight : "#ffffff",
    //correctLevel : QRCode.CorrectLevel.H
});
}

function isEmptyInput()
{
   if(qrText.value.length > 0){
        generateQRCode();
    }
    else{
        alert("Enter The Textor urrl to generate QR code");
    }
}

downloadBtn.addEventListener('click',()=>{
    let img=document.querySelector('.qr-body img');
    if(img!=null){
        let imgAtr=img.getAttribute('src');
        downloadBtn.setAttribute("href",imgAtr);
    }
    else{
        downloadBtn.setAttribute("href",`${document.querySelector('canvas').toDataURL}`);
    }
})