var vitUtil = {
  appendStylesheetToHead: function (url) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;

    head.appendChild(link);
  }
}

// Define vitCookie
var vitCookie = {
  set: function (cname, cvalue, hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
  },
  get: function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

// Define vitModal
var vitModal = function (divId) {
  // default values
  var defaultValues = {
    LINK: '#',
    LINK_TARGET: '_self',
    IMAGE: '#',
    IMAGE_WIDTH: '450px',
    EXPIRE_IN_X_HOURS: 0
  }

  // inject modal
  var elem = document.getElementById(divId);
  var clone = document.getElementById("vit-modal").cloneNode(true);
  clone.removeAttribute('id');
  elem.appendChild(clone);

  // Set modal parameters from dataset
  var link = elem.dataset.link ? elem.dataset.link : defaultValues.LINK
  elem.getElementsByClassName('vit-modal__link')[0].href = link;
  var linkTarget = elem.dataset.hasOwnProperty('linkOpenInNewWindow') ? '_blank' : defaultValues.LINK_TARGET;
  elem.getElementsByClassName('vit-modal__link')[0].setAttribute('target', linkTarget);
  var image = elem.dataset.image ? elem.dataset.image : defaultValues.IMAGE;
  elem.getElementsByClassName('vit-modal__image')[0].src = image;
  var imageWidth = elem.dataset.imageWidth ? elem.dataset.imageWidth : defaultValues.IMAGE_WIDTH;
  elem.getElementsByClassName('vit-modal__image')[0].style.width = imageWidth;

  // Get the modal and useful elements
  var _modal = elem.getElementsByClassName('vit-modal')[0];
  var backdrop = elem.getElementsByClassName('vit-modal__backdrop')[0];
  var btnClose = elem.getElementsByClassName('vit-modal__btn-close')[0];

  // Event to close the modal when clicking the close button
  btnClose.onclick = function () {
    _modal.style.display = "none";
  }

  // Eventheto close the modal when clicking in the backdrop
  window.onclick = function (event) {
    if (event.target == backdrop) {
      _modal.style.display = "none";
    }
  }

  // Show modal if cookie function is defined then validate and set cookie
  if (typeof vit.cookie === 'undefined') {
    _modal.style.display = 'block';
  } else {
    if (!vit.cookie.get("vit-modal-" + divId)) {
      _modal.style.display = 'block';
      var expireInXHours = !isNaN(+elem.dataset.showAgainInXHours) ? +elem.dataset.showAgainInXHours : defaultValues.EXPIRE_IN_X_HOURS;
      vit.cookie.set("vit-modal-" + divId, true, expireInXHours);
    }
  }
}

var vitWhatsappButton = function (divId) {
  vit.util.appendStylesheetToHead('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

  // inject button
  var elem = document.getElementById(divId);
  var clone = document.getElementById("vit-whatsapp-button").cloneNode(true);
  clone.removeAttribute('id');
  elem.appendChild(clone);

  var link = elem.dataset.number ? "https://wa.me/" + elem.dataset.number + "?text=" + elem.dataset.text : '#';
  elem.getElementsByClassName('vit-whatsapp-button__link')[0].href = link;

  var _whatsappButton = elem.getElementsByClassName('vit-whatsapp-button')[0];
  _whatsappButton.style.display = 'block';
}

var vitProgressBar = function (divId) {

}

var vit = vit || {};

vit.util = vitUtil;
vit.modal = vitModal;
vit.cookie = vitCookie;
vit.whatsappButton = vitWhatsappButton;