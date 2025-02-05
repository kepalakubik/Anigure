const popupModal = document.querySelector(".popup-modal");
const popup = document.querySelector(".popup");
const loading = document.querySelector(".product-loading");
const more = document.querySelector(".more");

const format = new Intl.NumberFormat("id-ID");
const lazy = new LazyLoad();
let page = 0;
let products = [];

(() => {
    window.onload = () => document.querySelector(".loading").classList.add("hidden");
    getProducts().then(res => products = res);
})();

async function getProducts() {
    const dummy = document.querySelector(".product.dummy");
    const parent = dummy.parentElement;
    const database = await fetch("database.json").then(res => res.json());
    const data = database.slice(page, page + 10);
    
    for (const item of data) {
        const product = dummy.cloneNode(true);
        product.removeAttribute("style");
        product.classList.remove("dummy");
        product.id = item.slug;
        
        const thumb = product.querySelector(".thumb img");
        const image = item.image;
        
        thumb.className = "lazy";
        thumb.setAttribute("data-src", image);
        
        product.querySelector(".product-title").innerHTML = item.name;
        product.querySelector(".from").innerHTML = item.from;
        product.querySelector(".price").innerHTML = "Rp " + format.format(item.price);
        
        parent.appendChild(product);
    }
    
    lazy.update();
    if (database.slice(page, page + 11).length > data.length) {
        more.classList.remove("d-none");
    } else {
        more.parentElement.classList.add("d-none");
    }
    loading.classList.add("d-none");
    
    return database;
}

function product(id) {
    popupModal.classList.remove("hidden");
    popup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    
    const item = products.find((obj) => obj.slug.includes(id));
    
    popup.querySelector(".thumb img").src = item.image;
    popup.querySelector(".popup-product-title").innerHTML = item.name;
    popup.querySelector(".popup-product-price").innerHTML = "Rp " + format.format(item.price);
    popup.querySelector(".popup-product-type").innerHTML = item.type;
    popup.querySelector(".popup-product-from").innerHTML = item.from;
    popup.querySelector(".popup-product-producer").innerHTML = item.producer;
    
    popup.querySelector(".popup-product-sold").innerHTML = String(Math.floor(Math.random() * 720));
    popup.querySelector(".popup-product-rating").innerHTML = String(Math.floor(Math.random() * 3) + 3);
}

function closeProduct() {
    popupModal.classList.add("hidden");
    popup.classList.add("hidden");
    document.body.removeAttribute("style");
}

function loadMore() {
    more.classList.add("d-none");
    loading.classList.remove("d-none");
    
    page += 10; // Next page
    getProducts().then(res => products = res);
}

function notImplemented() {
    alert("Fungsi belum diimplementasikan ;)");
}