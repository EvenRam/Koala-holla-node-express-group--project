console.log('js');

function getKoala() {
  console.log('in getKoalas');
  // axios call to server to get koalas
  axios.get('/koalas')
    .then((response) => {
      renderKoala(response.data);

    })
} // end getKoalas

function saveKoala(koalaToAdd) {
  console.log('in saveKoala');
  // axios call to server to get koalas

  axios({
    method: 'POST',
    url: '/koalas',
    data: koalaToAdd

  }).then(function (response) {
    console.log('saveKoala()', response.data);
    refreshKoala();
    //needs to be refresh not render as the newly added quoala needs to be updated by get in database
  }).catch(function (error) {
    console.log('Error in POST', error)
    alert('Unable to add koala at this time. Please try again later.');
  });

}

//add a RenderKoala

function renderKoala(koalas) {
  let KoalaTable = document.getElementById('viewKoalas')
  //might have to let if program trouble
  KoalaTable.innerHTML = '';


  //add conditional based on koala.transfer for rendering the button


  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    // For each Koala, append a new row to our table
    if (koala.transfer === false) {
      KoalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>      
          
        <td>${koala.age}</td>
        <td>${koala.favorite_color}</td>

       <td>${koala.transfer}</td>
    
       <td>${koala.notes}</td>

       <td> <button onClick= "isReadyForTransfer(${koala.transfer}, ${koala.id})">
    Ready for Transfer
    </button>
    </td>
      </tr>


    `;
    }

    else if (koala.transfer === true) {

      KoalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>      
          
        <td>${koala.age}</td>
        <td>${koala.favorite_color}</td>

       <td>${koala.transfer}</td>
    
       <td>${koala.notes}</td>

       <td> 
      </td>
      </tr>


    `;
    }
  }
}

//add refresh Koala
function refreshKoala() {
  axios({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('refreshKoala() response', response.data);
    renderKoala(response.data);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}

function handleSubmit(event) {
  event.preventDefault();


  let koala = {};
  koala.name = document.getElementById('nameIn').value;
  koala.age = document.getElementById('ageIn').value;
  koala.favorite_color = document.getElementById('colorIn').value;

  if (document.getElementById('readyForTransferIn').value === ("false" || "False")) {
    koala.transfer = false;
  }
  else if (document.getElementById('readyForTransferIn').value === ("true" || "True")) {
    koala.transfer = true;
  }
  koala.notes = document.getElementById('notesIn').value;


  saveKoala(koala);
  let form = document.getElementById("form")
  form.reset();
}
//get the info from the input 

//call saveKoala

//clear the form


//getKoalas();


// Fuction to change boolean value of transfer, AKA displys whether a koala is ready to transfer or not
// based on booleans true/false

// May need to change koala parameter below
// Unfinished, left off here - Michael

function isReadyForTransfer(transfer, koalaId) {
  console.log("changing transfer status: ", transfer, koalaId);

  // use axios to send a PUT request to change song rank
  // Send direction and id in URL
  // For .then, will call the render function to change the DOM

  // note to self, removed isRead from url

  axios({
    method: "PUT",
    url: "/koalas/" + koalaId,
    data: {
      transfer: transfer
    }
  })
    .then((response) => {
      refreshKoala()
      // refreshloala() will retrieve all koalas and then update the DOM

    })
    .catch((error) => {
      console.log("error", error);

    });
}





