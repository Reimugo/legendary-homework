function divInsert(n) {
    let container= document.createElement("div");
    let name= countries[n].name;
    let continent= countries[n].continent;
    let cities= countries[n].cities;
    let photos= countries[n].photos;


    let h= document.createElement("h2");
    h.appendChild(document.createTextNode(name));
    let caption= document.createElement("p");
    caption.appendChild(document.createTextNode(continent));

    let citiesBox= document.createElement("div");
    let ct= citiesBox.appendChild(document.createElement("h3"));
    ct.appendChild(document.createTextNode("Cities"));
    let citiesList= citiesBox.appendChild(document.createElement("ul"));
    for (let i= 0; i< cities.length; i++) {
        let c= citiesList.appendChild(document.createElement("li"));
        c.appendChild(document.createTextNode(cities[i]));
    }

    let photosBox= document.createElement("div");
    let p= photosBox.appendChild(document.createElement("h3"));
    p.appendChild(document.createTextNode("Popular Photos"));
    for (let i= 0; i< photos.length; i++) {
        let photo= photosBox.appendChild(document.createElement("img"));
        photo.src= "images/"+ photos[i];
        photo.className= "photo";
    }

    let visitButton = document.createElement("Button");
    let visitTxt = document.createTextNode("Visit");
    visitButton.appendChild(visitTxt);


    container.appendChild(h);
    container.appendChild(caption);
    container.appendChild(citiesBox);
    container.appendChild(photosBox);
    container.appendChild(visitButton);


    container.className="item";
    citiesBox.className="inner-box";
    photosBox.className="inner-box";


    document.getElementById("bodyDiv").appendChild(container);
}

for (let i= 0; i< countries.length; i++) {
    divInsert(i);
}

