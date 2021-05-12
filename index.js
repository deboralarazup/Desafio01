
const  URL = 'http://localhost:3000/user';

const buildProfile = (profiles) => {
  const htmlProfile = profiles.map(profile => {
    const listProfile = `
      <li class="list-profile" id="profile">
        <div class="item-profile">
          <img src="${profile.img}" />
          <span>${profile.nome}</span>
        </div>
        <span class="span-email" title="${profile.email}">${profile.email}</span>
        <span>${profile.contato}</span>
        <span>${profile.estado}</span>
        <div class="table-action">
          <img src="./img/allselect.svg" />
          <img src="./img/check-all1.svg" data-email='${profile.email}' onclick="removeUser(this, 'attended')" /> 
          <img src="./img/trash.svg" data-email='${profile.email}' onclick="removeUser(this, 'remove')" /> 
        </div>
      </li>
    `;
  
    return listProfile;
  });
  
  return htmlProfile
}

const getProfile = async() => {
  const profiles = await fetch(URL)
  .then((resp)=> resp.json())
  return profiles
}

const renderTable = async(profiles) => {
  const wrapperProfile = document.querySelector('#wrapper-profile');
  const htmlProfiles = buildProfile(profiles);
  htmlProfiles.forEach(htmlProfile => wrapperProfile.insertAdjacentHTML('beforeend', htmlProfile));
}

const renderProfiles = async() => {
  const profiles = await getProfile()
  renderTable(profiles)
}

renderProfiles()
