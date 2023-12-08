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

//creating groups
document.getElementById("newGroup").onclick = (e) => {
  e.preventDefault();
  const Input = document.createElement("input");
  Input.type = "text";
  Input.id = "groupname";
  Input.placeholder = "enter group name";
  //console.log(Input);

  const button = document.createElement("button");
  const text = document.createTextNode("create");
  button.id = "createButton";
  button.appendChild(text);
  
  //console.log(button);

  const parent1 = document.getElementById("group");
  const parent2 = document.getElementById("groupButton");
  parent1.appendChild(Input);
  parent2.appendChild(button);

  const createGrpButton = document.getElementById("createButton");
  console.log(createGrpButton);

  createGrpButton.onclick = async () => {
    try {
      //console.log("create button is clicked");
      const name = document.getElementById("groupname");
      const grp = {
        gname: name.value,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/group/addgroup",
        grp,
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};

window.addEventListener("DOMContentLoaded", async (e) => {
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
    const response = await axios.get("http://localhost:8000/group/getname", {
      headers: { Authorization: token },
    });
    console.log(response);
    const parent = document.getElementById("groupButtons");
    const groupNames = response.data.groupNames;
    const groupId = response.data.groupId;
    console.log(groupNames, groupId);
    for (let i = 0; i < groupNames.length; i++) {
      console.log(groupId);

      let child = `<button onclick="insideGroup(${groupId[i]})">${groupNames[i]}</button>`;

      parent.innerHTML = parent.innerHTML + child;
    }
  } catch (err) {
    console.log("group not found", err);
  }
}
//once you are inside a group

async function insideGroup(id) {
  try {
    localStorage.setItem("groupId", id);
    window.location.href = "../Message/message.html";
  } catch (err) {
    console.log("error in inside group ", err);
  }
}
