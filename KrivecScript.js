"use strict;"

class Film {

  naziv = "";
  opis = "";
  igralci = [];
  ocena = 0.0;
  slika = "";
    
  constructor(naziv, opis, igralci = [], ocena, slika) {
    this.naziv = naziv;
    this.opis = opis;
    this.igralci = igralci;
    //this.ocena = parseFloat(ocena.toFixed(2));
    this.ocena = ocena;
    this.slika = slika;
  }
  
    izpisNaslova() {
     // console.log(`Naziv filma:${this.naziv}\tOcena:${this.ocena}`);
     return `${this.naziv}`;
    }
  
    izpisPodrobnosti() {
     // console.log(`Opis filma ${this.naziv} (${this.ocena}): ${this.opis}. Igrajo: ${this.igralci.join("; ")}`);
     return `${this.opis}`;
    }
  }


class SeznamFilmov {

    filmi = [];
    
  
    dodaj(film) {
      if (film instanceof Film) {
        this.filmi.push(film);
      } else {
        throw new Error("Dodan film ni primerek razreda Film.");
      }
    }
  
    izpisi() {
      for (let film of this.filmi) {
        film.izpisPodrobnosti();
      }
    }
  
    brisi() {
      const filmsSection = document.getElementById('filmsi');
      filmsSection.removeChild(filmsSection.firstChild);
    }
  
    isciPoIgralcu(ime) {
      let rezultati = [];
      for (let film of this.filmi) {
        for (let igralec of film.igralci) {
          if (igralec.toLowerCase().includes(ime.toLowerCase())) {
            rezultati.push(film);
            break;
          }
        }
      }
      return rezultati;
    }
  }

  class Program {
    static PrikaziDelovanje() {

        try {
            /* let igralci1 = ["Timothy chalame", "Zendaya", "Jason Mamoa"];
        let igralci2 = ["Leonardo Dicaprio", "Jennifer lawrence"];
        let igralci3 = ["Benedict cumberbatch", "Jesse Plemons", "Sebastian Cavazza"];
  
        let film1 = new Film("Dune", "Peščeni planet", igralci1, 8.8, "https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/219677/FND_poster_Dune_InTheaters.jpg");
        let film2 = new Film("Dont look Up", "Bolj slaba komedija", igralci2, 7.9, "https://pics.filmaffinity.com/Don_t_Look_Up-492729563-large.jpg");
        let film3 = new Film("Power of the Dog", "zelo dober film", igralci3, 9.9, "https://m.media-amazon.com/images/M/MV5BZGRhYjE2NWUtN2FkNy00NGI3LTkxYWMtMDk4Yjg5ZjI3MWI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg");
  
        console.log("Izpis naslova in ocene:");
        film1.izpisNaslova();

        console.log("Izpis Podrobnosti:");
        film1.izpisPodrobnosti();
  
  
        let seznamFilmov = new SeznamFilmov();
        seznamFilmov.dodaj(film1);
        seznamFilmov.dodaj(film2);
        seznamFilmov.dodaj(film3);
  
        console.log("Izpis vseh filmov:");
        seznamFilmov.izpisi();
  
        console.log("Iskanje po imenu igralca:");
        let rezultatiIskanja = seznamFilmov.isciPoIgralcu("Leonardo");
        console.log(rezultatiIskanja);

        seznamFilmov.brisi(1);*/

            document.addEventListener("DOMContentLoaded", function() {
                console.log("DOM is fully loaded.");
                var slider = document.getElementById("ocena");
                var output = document.getElementById("sliderValue");
                output.textContent = slider.value; 

                slider.onchange = function() {
                    output.textContent = this.value;
                }


                const form = document.querySelector('form');

                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const naziv = document.getElementById('naslov').value;
                    const opis = document.getElementById('Opis').value;
                    const igralci = document.getElementById('Igralci').value.split('\n');
                    const ocena = document.getElementById('ocena').value;
                    const slika = document.getElementById('slika').value;

                    const film = new Film(naziv, opis, igralci, ocena, slika);


                    const filmElement = createFilmElement(film);

                    const filmsSection = document.getElementById('filmsi');
                    filmsSection.appendChild(filmElement);
                });

                function createFilmElement(film) {
                    const div = document.createElement('div');
                    div.classList.add('list-group');

                    const a = document.createElement('a');
                    a.classList.add('list-group-item', 'list-group-item-action');

                    const div2 = document.createElement('div');
                    div2.classList.add('d-flex', 'w-100', 'justify-content-between');

                    const h5 = document.createElement('h5');
                    h5.classList.add('mb-1');
                    const h5Text = document.createTextNode(film.izpisNaslova());
                    h5.appendChild(h5Text);

                    const small = document.createElement('small');
                    const smallText = document.createTextNode(`Ocena: ${film.ocena}`);
                    small.appendChild(smallText);

                    div2.appendChild(h5);
                    div2.appendChild(small);
                    div.appendChild(div2);

                    const p = document.createElement('p');
                    p.classList.add('mb-1');

                    const opisText = film.izpisPodrobnosti();
                    if (opisText.length > 50) {
                        let startIndex = 0;

                        while (startIndex < opisText.length) {
                            const endIndex = startIndex + 50;
                            const lineText = document.createTextNode(opisText.slice(startIndex, endIndex));
                            const lineBreak = document.createElement('br');
                            p.appendChild(lineText);
                            p.appendChild(lineBreak);
                            startIndex = endIndex;
                        }
                    } else {
                        const pText = document.createTextNode(`Opis filma: ${opisText}`);
                        p.appendChild(pText);
                    }

                    const listGroupItem = document.createElement('a');
                    listGroupItem.setAttribute('href', '#');
                    listGroupItem.classList.add('list-group-item', 'list-group-item-action');
                    listGroupItem.appendChild(p);


                    const small2 = document.createElement('small');
                    const ul = document.createElement('ul');
                    film.igralci.forEach((igralec) => {
                        const li = document.createElement('li');
                        const liText = document.createTextNode(igralec);
                        li.appendChild(liText);
                        ul.appendChild(li);
                    });
                    small2.appendChild(ul);

                    a.appendChild(div2);
                    a.appendChild(p);
                    a.appendChild(small2);

                    const deleteButton = document.createElement('a');
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.setAttribute('href', '#');
                    const deleteText = document.createTextNode('Izbriši film');
                    deleteButton.appendChild(deleteText);

                    const img = document.createElement('img');
                    img.classList.add('img-fluid', 'img-thumbnail');
                    img.setAttribute('src', film.slika);

                    div.appendChild(a);
                    div.appendChild(deleteButton);
                    div.appendChild(img);

                    const seznamFilmov = new SeznamFilmov();

                    seznamFilmov.dodaj(film);

                    deleteButton.addEventListener('click', function() {
                        seznamFilmov.brisi();
                    });

                    return div;


                }


            });

        } catch (error) {
            console.error(error);
        }
    }
}

  Program.PrikaziDelovanje();




  


  
  

