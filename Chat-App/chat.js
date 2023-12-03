const logout = document.getElementById("logout");
const chatForm = document.getElementById("chatForm");
const messageDisplay = document.getElementById("messageDisplay");

logout.addEventListener("click", async () => {
  if (confirm("Do you want to logout?")) {
    window.location.href = "../Login/login.html";
  } else {
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    e.preventDefault();
    getAllGroupNames();
  } catch (err) {
    console.log("loading error...");
  }
});

async function getAllGroupNames(addGroup) {
  try {
    if (addGroup) {
      const parent = document.getElementById("groupButtons");
      parent.innerHTML = "";
    }
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:8000/group/getname", {
      headers: { Authentication: token },
    });
    console.log(response);
    const parent = document.getElementById("groupButtons");
    const groupNames = data.data.groupNames;
    const groupId = data.data.groupId;
    console.log(groupNames, groupId);
    for (let i = 0; i < groupNames.length; i++) {
      console.log(groupId);
      let child = `<button onclick="insideGroup(${groupId[i]}"})" class="btn btn-secondary btn-lg" style="width:100%;margin-bottom:>${groupNames[i]}</button>`;
      parent.innerHTML = parent.innerHTML + child;
    }
  } catch (err) {
    console.log("group not found", err);
  }
}
 //once you are inside a group

 async function insideGroup(id){
  try{
    localStorage.setItem('groupId',id);
    //window.location.href="./messages.html"
  }catch(err){
    console.log("error in inside group ",err)
  }
 }
 //creating groups
 document.getElementById('newGroup').onclick = async(e)=>{
  e.preventDefault();
  const Input = document.createElement('input');
  Input.type='text';
  Input.id = 'groupname';
  Input.placeholder='enter group name';
  console.log(Input);


  const button = document.createElement('button');
  const text = document.createTextNode('create');
  button.id='createButton';
  button.appendChild(text);
  console.log(button);

  const parent1 = document.getElementById('group');
  const parent2 = document.getElementById('groupButton');
  parent1.appendChild(Input);
  parent2.appendChild(button);

  const createGrpButton = document.getElementById('createButton');
  console.log(createGrpButton);

  createGrpButton.onclick = async ()=>{
    try{
      console.log("create button is clicked")
      const name=document.getElementById("groupname")
      const grp={
          gname:name.value
      }
      const token=localStorage.getItem("token")
      const response=await axios.post("http://localhost:8000/group/addgroup",grp,{
      headers:{"Authentication":token}
  })
  console.log(response)
    }catch(err){
      console.log(err)
    }
  }
 }
