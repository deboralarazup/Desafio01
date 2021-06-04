const URL = "http://localhost:3000/user";
let novaLIstaTodos = [];
let listaDetails = [];
let listaGlobal = [];
let currentList = [];

function mySearch() {
  // Declaração das variaveis
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("filtro-nome");
  filter = input.value.toUpperCase();
  ul = document.getElementById("wrapper-profile");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    span = li[i].getElementsByTagName("span")[0];
    txtValue = span.textContent || span.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//get info api
const getProfile = async () => {
  const profiles = await fetch(URL).then((resp) => resp.json());
  listaGlobal = profiles;
  return profiles;
};

const renderProfiles = async () => {
  const profiles = await getProfile();
  novaLIstaTodos = profiles;
  renderList('todos');
};

//construção da lista
const buildProfile = (profiles, iconsType) => {
  const htmlProfile = profiles.map((profile) => {
    let listProfile = "";
    
      listProfile = `
      <li class="list-profile" id="profile" >
        <div class="item-profile" onClick= "renderDetails('${profile.id}', 'details')" >
          <img src="${profile.img}" />
          <span>${profile.name}</span>
        </div>
        <span class="span-email" title="${profile.email}">${profile.email}</span>
        <span>${profile.number}</span>
        <span>${profile.city}</span>
        <div class="table-action">
        <img class="trash" src="./img/trash.svg"  onclick="moveProfile('${profile.id}', 'remove', 'todos')" /> 
        <img class="check2" src="./img/check2.svg"  onclick="moveProfile('${profile.id}', 'attended', 'todos')" /> 
        <img class="allselect" src="./img/allselect.svg"  onclick="moveProfile('${profile.id}', 'todos', 'attended')" />
        </div>
      </li>
    `;
    return listProfile;
  });
  return htmlProfile;
};

// Realiza uma "leitura" na lista atual e mapeia o status de cada um, realizando um filtro por status iguais
const moveProfile = (id, action) => {
  novaLIstaTodos = novaLIstaTodos.map(item => {
    if(item.id === id){
      return{ ...item, status: action}
    }else {
      return { ...item}
    }
  })
  renderList(currentList)
};

// Carregamento do html
const renderList = (typeList) => {
  if(typeList !== currentList){
    currentList = typeList
  }

  let newLista = novaLIstaTodos.filter(item => item.status === currentList)
  const wrapperProfile = document.querySelector("#wrapper-profile");
  wrapperProfile.innerHTML = "";

  // Valida lista, caso esteja vazia mostra mensagem do else
  if(newLista.length){
    const htmlProfiles = buildProfile(newLista, "todos");
    htmlProfiles.forEach((htmlProfile) =>
    wrapperProfile.insertAdjacentHTML("beforeend", htmlProfile)
  ); 
  } else {
    wrapperProfile.insertAdjacentHTML("beforeend", `<p> Nenhum item encontrado </p>`)
  }  
};
renderProfiles();

// Inicio Tela Detalhes do usuarios
const buildDetalhes = (listaDetails) => {
  const htmlDetais = listaDetails.map((listaDetail) => {
    let listDetais = `
    <button class="circle" onclick="returnProfile()"></button>
    <div class="card">
      <div class="banner">
        <img class="user" src="${listaDetail.img}" alt="">
      </div>
      <h2 class="info-user" id="exemplo">
        <div class="title">Hi, My name is</div> 
        ${listaDetail.name}
      </h2>
      <div class="actions">
        <div class="follow-btn">
              <ul class="lista-icones">
                  <img src="./img/profile-use.svg" alt="" class="icon" onmouseover="actionsDetails('name');">
                  <img src="./img/email.svg" alt="" class="icon"  onmouseover="actionsDetails('email')">
                  <img src="./img/calendar.svg" alt="" class="icon" onmouseover="actionsDetails('birthday')">
                  <img src="./img/mapa.svg" alt="" class="icon" onmouseover="actionsDetails('city')">
                  <img src="./img/phone.svg" alt="" class="icon" onmouseover="actionsDetails('phone')">
                  <img src="./img/key.svg" alt="" class="icon" onmouseover="actionsDetails('password')">
              </ul>
        </div>
      </div>
    </div>
    `;
    return listDetais;
  });
  return htmlDetais;
};

// pegando item e colocando na lista
const SetDetails = (id, list) => {
  const removidoProfile = renderDetails(id, list);
  if(List === 'details'){
  listaDetails.push(removidoProfile);
  }
}   

const renderDetails = (id, List) => {
  // Pegando a lista
    if(List === 'details'){
     //filtrando item clicado
      listaDetails = listaGlobal.filter((novaTodos) => novaTodos.id === id);
      document.querySelector(".page").style.display = "none";
      const wrapperProfile = document.querySelector("#detalhes");
      const htmlProfiles = buildDetalhes(listaDetails, "details");
      htmlProfiles.forEach((htmlProfile) =>
      wrapperProfile.insertAdjacentHTML("beforeend", htmlProfile)
      )
    }
};

const returnProfile= () => {
  document.querySelector("#detalhes").style.display = "none";
  const wrapperProfile = document.querySelector(".page");
  wrapperProfile.style.display = "";  
}

function actionsDetails(propriedade) {
  let person = listaDetails[listaDetails.length - 1];
  let finalPerson = listaGlobal.filter((el) => el.id == person.id);

  // coloca no html
  let info = null;
  info = document.querySelector(".info-user").textContent;

  switch (propriedade) {
    case "name":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">Hi, My name is</div>` + finalPerson[0].name;
      break;

    case "email":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">My email address is</div>` + finalPerson[0].email;
      break;
    case "birthday":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">My birthday is</div>` + finalPerson[0].birthday;
      break;
    case "city":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">My address is</div>` + finalPerson[0].city;
      break;
    case "phone":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">My phone number is</div>` + finalPerson[0].number;
      break;
    case "password":
      info = document.querySelector(".info-user").innerHTML =
        `<div class="title">My password is</div>` + finalPerson[0].password;
      break;
    default:
      break;
  }
}