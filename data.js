let DB = {
  users: JSON.parse(localStorage.getItem("users")) || []
};

// ----------------------
// SAVE USERS
// ----------------------
function saveUsers(){
  localStorage.setItem("users", JSON.stringify(DB.users));
}

// ----------------------
// DEFAULT ACCOUNTS (AUTO CREATE)
// ----------------------
(function initUsers(){

  if(DB.users.length === 0){
    DB.users = [
      { id:1, username:"superadmin", password:"123", role:"superadmin" },
      { id:2, username:"admin", password:"123", role:"admin" },
      { id:3, username:"cashier", password:"123", role:"cashier" },
      { id:4, username:"rider1", password:"123", role:"rider" }
    ];

    saveUsers();
  }

})();

// ----------------------
// LOGIN FUNCTION
// ----------------------
function loginUser(username, password){

  const user = DB.users.find(u =>
    u.username === username && u.password === password
  );

  if(!user) return null;

  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("role", user.role);

  return user;
}

// ----------------------
// GET CURRENT USER
// ----------------------
function getCurrentUser(){
  return JSON.parse(localStorage.getItem("currentUser"));
}

// ----------------------
// LOGOUT
// ----------------------
function logout(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}