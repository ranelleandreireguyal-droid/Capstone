const USERS = [
  { username:"superadmin", password:"123", role:"superadmin" },
  { username:"admin", password:"123", role:"admin" },
  { username:"cashier", password:"123", role:"cashier" },
  { username:"rider1", password:"123", role:"rider" }
];

function login(u,p){
  const user = USERS.find(x => x.username === u && x.password === p);

  if(!user) return false;

  sessionStorage.setItem("user", JSON.stringify(user));
  return user.role;
}

function getUser(){
  return JSON.parse(sessionStorage.getItem("user"));
}

function logout(){
  sessionStorage.clear();
  location.href="index.html";
}