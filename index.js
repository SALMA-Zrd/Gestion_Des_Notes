let CNE = document.getElementById('CNE');
let NOM = document.getElementById('nom');
let preNom = document.getElementById('prenom');
let module = document.getElementById('module');
let Note = document.getElementById('note');
let create = document.getElementById('btn');
let tbody = document.getElementById('tbody');
let tmp;
let mood ='create';
let reset = document.getElementById('reset');
let deleteAllButton = document.getElementById('deleteAllButton');


 // create object //

let data ;
if ( localStorage.Notes != null ) {
    data = JSON.parse(localStorage.Notes)
}
else {
    data=[];
}

create.onclick=function()

     
{




     if (
        CNE.value.trim() != '' &&
        NOM.value.trim() != '' &&
        preNom.value.trim() != '' &&
        module.value.trim() != '' &&
        Note.value.trim() != ''&&
        Note.value <=20 
    ) {

    let newNote={
        CNE : CNE.value.toUpperCase(),
        NOM : NOM.value.toLowerCase(),
        preNom : preNom.value.toLowerCase(),
        module : module.value.toLowerCase(),
        Note : Note.value,
    }

    if (mood=== 'create'){

    data.push(newNote);
    }
    else {
        data[tmp]=newNote;
        mood='create';
        create.innerHTML='Create';
    }

    localStorage.setItem('Notes', JSON.stringify(data));

    showData();
   
}
clearData();
} 

// show Data //

function showData() {
    let table ='';

    for(i=0;i<data.length ; i++){

   let status;

             if (data[i].Note >= 10 ) {
                   status = 'validé';
            } else {
                    status = 'rattrapage';
              }
   
        /* const status = data[i].Note >= 10 ? 'Admis' : 'Recalé';*/
        table = table +  
        `
        <tr> 
        <td> ${data[i].CNE} </td>
        <td> ${data[i].NOM} </td>
        <td> ${data[i].preNom} </td>
        <td> ${data[i].module} </td>
        <td> ${data[i].Note} </td>
        <td> ${ status }</td>
        <td> <button id="update" onclick="UpdateData (${i})">Update</button> </td>
        <td> <button onclick="Delete(${i})" id="delete">Delete</button> </td>

        </tr>
        `
        

    }
    
    tbody.innerHTML=table;

    if (data.length > 0) {
        deleteAllButton.style.display = 'block';
    } else {
        deleteAllButton.style.display = 'none';
    }

}
showData();

//   *****   clear Inputs   *****  //

function clearData() {
    CNE.value = '';
    NOM.value = '';
    preNom.value = '';
    module.value = '';
    Note.value = '';

  
    
}

//   *****   Delete Data   *****  //
function Delete (i){
    data.splice(i,1);
    localStorage.Notes=JSON.stringify(data);
    showData();

}

//  update Data //

function UpdateData (i) {
    CNE.value=data[i].CNE;
    NOM.value=data[i].NOM;
    preNom.value=data[i].preNom;
    module.value=data[i].module;
    Note.value=data[i].Note;
    create.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top : 0,
        behavior : "smooth",
    })

}

// serach By CNE //

function SearchCNE () {
    let searchValue = document.getElementById('search').value.trim();
    
    

    let table ='';
     for ( i=0 ; i<data.length ; i++){
        if (data[i].CNE === searchValue){

            let status;

             if (data[i].Note >= 10 ) {
                   status = 'validé';
            } else {
                    status = 'rattrapage';
              }
            table = table +
            ` 
            <tr> 
        <td> ${data[i].CNE} </td>
        <td> ${data[i].NOM} </td>
        <td> ${data[i].preNom} </td>
        <td> ${data[i].module} </td>
        <td> ${data[i].Note} </td>
        <td> ${ status }</td>
        <td> <button id="update" onclick="UpdateData (${i})">Update</button> </td>
        <td> <button onclick="Delete(${i})" id="delete">Delete</button> </td>

        </tr>

            `;
        }
     }
     tbody.innerHTML=table;
     if (table === ''){
        tbody.innerHTML = `<tr><td colspan="8">Aucun résultat trouvé pour le CNE : ${searchValue}</td></tr>`;

     }
     reset.style.display='block';
}
 


// serach By Module //

function SearchModule () {
    let searchValue = document.getElementById('search').value.trim().toLowerCase();
    
    

    let table ='';
     for ( i=0 ; i<data.length ; i++){
        if (data[i].module === searchValue){

            let status;

             if (data[i].Note >= 10 ) {
                   status = 'validé';
            } else {
                    status = 'rattrapage';
              }
            table = table +
            ` 
            <tr> 
        <td> ${data[i].CNE} </td>
        <td> ${data[i].NOM} </td>
        <td> ${data[i].preNom} </td>
        <td> ${data[i].module} </td>
        <td> ${data[i].Note} </td>
        <td> ${ status }</td>
        <td> <button id="update" onclick="UpdateData (${i})">Update</button> </td>
        <td> <button onclick="Delete(${i})" id="delete">Delete</button> </td>

        </tr>

            `;
        }
     }
     tbody.innerHTML=table;
     if (table === ''){
        tbody.innerHTML = `<tr><td colspan="8">Aucun résultat trouvé pour le Module : ${searchValue}</td></tr>`;

     }
     reset.style.display='block';
}


// reset table aprs la recherche //

function resetTable() {
    showData(); // Réaffiche toutes les données
    document.getElementById('search').value = ''; // Vide le champ de recherche
    reset.style.display='none';
}

// delete ALL data //

function deleteAll () {
    if (data.length > 0) {
        // Demander confirmation à l'utilisateur
        let confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer toutes les données ?");
        if (confirmDelete) {
            data = []; // Vider l'array contenant les données
            localStorage.removeItem('Notes'); // Supprimer les données du localStorage
            showData(); // Rafraîchir le tableau affiché
        }
    } else {
        alert("Aucune donnée à supprimer !");
    }
}


 
