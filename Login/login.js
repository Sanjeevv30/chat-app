async function login(e){
    try{
        e.preventDefault();
        const form = new FormData(e.target);
        const loginDetails = {
            email:e.target.email.value,
            password:e.target.password.value
        }
        const postLogin = await axios.post('http://localhost:8000/login',loginDetails);
        console.log(postLogin);
        localStorage.setItem('token',postLogin.data.token)
        localStorage.setItem("userDetails", JSON.stringify(postLogin.data.user));
        alert(postLogin.data.message);
        window.location.href = "../Group/group.html";

    }catch(error){
        console.log(error)
        document.body.innerHTML += `<div style="color:red">${error.message}</div>`;
    }
}