/* Progetto di creazione di un "database" di utenti interattivo.

API per ottenere gli utenti : 

https://jsonplaceholder.typicode.com/users

1. Mostra tutti gli utenti presi dall'api in una tabella bootstrap.
2. Crea un dropdown con 'nome', 'username', e 'email'. 
   - Il dropdown servirà a filtrare gli utenti per nome, username o email. 
3. Crea un input di testo. Questo deve permettere all'utente che utilizza il sito di cercare nel database tramite un input.
   - Devi filtrare usando sia il valore dell'input che l'opzione selezionata nel dropdown.  
*/

/// Primo passaggio per prendere il database di utenti.

///  ! Cercare come filtrare una lista di nodi usando come filtro le proprietà stesse dei nodi. 
/// Per ora assegno una classe a ogni row per poter fare un querySelectorAll, soluzione più veloce. 

let tableBody = document.getElementById("table-body");

window.onload = async () => {
  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await result.json();
    cycleData(usersData);
    getAllRows() 
  } catch (error) {
    console.log(error);
  }
};

/* Creare template per il row nella tabella. 
   Creare poi la funzione per inserire ciclicamente gli utenti dalla tabella. 
    row : 
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
*/
let cycleData = (data) => {
  data.forEach((element, index) => {
    createUserRow(element, index);
  });
};

let createUserRow = ({ name, username, email }, index) => {
  tableBody.innerHTML += `
    <tr class="table-row">
    <th scope="row">${index}</th>
    <td>${name}</td>
    <td>${username}</td>
    <td>${email}</td>
    </tr>
    `;
};

let searchInput = document.getElementById("search-input");

/* Filtrare in base all'input dato dall'utente. 
   
*/

let cycleRows = (table_body) => {
  table_body.forEach((element, index) => {
    element.forEach((inner_el, inner_index) => {
      console.log(inner_el);
    });
  });
};

let getAllRows = () => {
    let allRows = document.getElementsByClassName('table-row') /// una node Collection di tutti i rows creati. 
    allRows[1].childNodes.forEach((dd) => {
        console.log(dd) /// per ciclare sui nodi figli. ora ho bisogno di poter utilizzare innertext per filtrare dalla ricerca.
    })
}