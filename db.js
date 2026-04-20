let DB = {
  loans: JSON.parse(localStorage.getItem("loans") || "[]"),
};

// =====================
// SAVE DATABASE
// =====================
function saveDB(){
  localStorage.setItem("loans", JSON.stringify(DB.loans));
}

// =====================
// CREATE LOAN
// =====================
function createLoan(data){
  DB.loans.push({
    id: Date.now(), // unique ID
    name: data.name || "",
    amount: Number(data.amount) || 0,
    type: data.type || "single",
    rider: data.rider || "",
    status: "pending",
    createdAt: new Date().toISOString()
  });

  saveDB();
}

// =====================
// UPDATE LOAN
// =====================
function updateLoan(id, update){
  DB.loans = DB.loans.map(l =>
    String(l.id) === String(id)
      ? { ...l, ...update }
      : l
  );

  saveDB();
}

// =====================
// DELETE LOAN (IMPORTANT FIX)
// =====================
function deleteLoan(id){
  DB.loans = DB.loans.filter(l => String(l.id) !== String(id));
  saveDB();
}

// =====================
// GET LOANS (ROLE BASED)
// =====================
function getLoansByRole(role, user){
  if(!role) return [];

  if(role === "rider"){
    if(!user) return [];
    return DB.loans.filter(l => l.rider === user.username);
  }

  return DB.loans;
}

// =====================
// GET STATS (FOR DASHBOARD)
// =====================
function getStats(){
  return {
    total: DB.loans.length,
    pending: DB.loans.filter(l => l.status === "pending").length,
    paid: DB.loans.filter(l => l.status === "paid").length,
    overdue: DB.loans.filter(l => l.status === "overdue").length
  };
}