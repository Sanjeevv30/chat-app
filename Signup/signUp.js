async function signup(e) {
    try {
        e.preventDefault();
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            password:e.target.password.value
        };

        const response = await axios.post('http://localhost:8000/add-user/Signup', signupDetails);
        console.log(response);

        if (response.status === 201) {
            alert(response.data.message);
            console.log('User signed up successfully');
            window.location.href = "../Login/login.html";
        }else if (response.status === 400 && response.data.existingUser) {
                alert(response.data.message);
                console.log("already exist")

        } else {
            throw new Error('Failed to sign up');
        }
    } catch (err) {
        document.body.innerHTML = `<div style="color:red">${err.message}</div>`;
    }

     try {
        const getResponse = await axios.get('http://localhost:8000/get-user/signup');
        console.log(getResponse);
    } catch (err) {
        console.error('Error fetching user data:', err);
    }
}
