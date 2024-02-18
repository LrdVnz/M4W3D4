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
let dataCopy = undefined; 

window.onload = async () => {
  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await result.json();
    dataCopy = usersData; 
    cycleData(usersData);
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
  tableBody.innerHTML = '';
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


/* Filtrare in base all'input dato dall'utente. 
*/

let searchBtn = document.getElementById('search-btn');
let searchInput = document.getElementById("search-input");
let inputValue = undefined; 

searchBtn.addEventListener('click', (event) => {
  controlInput()
})

let controlInput = () => {
  inputValue = searchInput.value.toLowerCase().trim(); 
  controlRows()
}

let controlRows = () => {
  if(inputValue === undefined) {
    cycleData(dataCopy)
    return
  }
   let newData = []
   dataCopy.forEach((el) => {
     Object.values(el).forEach((value) => {
       if (typeof value === 'object' || typeof value != 'string') {
        return
       } 
        if (value.toLowerCase().includes(inputValue)) {
          if (!newData.includes(el)) {
          newData.push(el)
          }
       }
     })
   })
  cycleData(newData)
}