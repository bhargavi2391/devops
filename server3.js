const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

let users = [];
let students = [];
let nextId = 1;

/* ---------------- LOGIN PAGE ---------------- */

app.get('/', (req, res) => {
res.send(`
<html>
<head>
<title>StudentHub Login</title>
<style>
body {
  font-family: Arial;
  background: linear-gradient(135deg,#667eea,#764ba2);
}
.box {
  width:350px;
  margin:120px auto;
  background:white;
  padding:30px;
  border-radius:12px;
  box-shadow:0 0 20px black;
}
input,button {
  width:100%;
  padding:12px;
  margin-top:10px;
}
button { background:#667eea; color:white; border:none; }
a { text-decoration:none; }
</style>
</head>
<body>
<div class="box">
<h2>StudentHub Login</h2>
<form method="POST" action="/login">
<input name="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
<button>Login</button>
</form>
<br>
<a href="/signup">Create Account</a>
</div>
</body>
</html>
`);
});

/* ---------------- SIGNUP ---------------- */

app.get('/signup', (req,res)=>{
res.send(`
<html><body style="font-family:Arial;background:#ff9a9e">
<div class="box" style="background:white;width:350px;margin:100px auto;padding:25px;border-radius:10px">
<h2>Signup</h2>
<form method="POST" action="/signup">
<input name="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
<button>Create Account</button>
</form>
<a href="/">Back to Login</a>
</div>
</body></html>
`);
});

app.post('/signup',(req,res)=>{
users.push(req.body);
res.redirect('/');
});

/* ---------------- LOGIN ---------------- */

app.post('/login',(req,res)=>{
const u = users.find(x=>x.email===req.body.email && x.password===req.body.password);
if(u) res.redirect('/dashboard');
else res.send("Login failed ❌ <a href='/'>Try again</a>");
});

/* ---------------- DASHBOARD ---------------- */

app.get('/dashboard',(req,res)=>{
res.send(`
<html>
<head>
<title>Dashboard</title>
<style>
body { font-family:Arial; background:#f4f6fb; }
.header {
  background:linear-gradient(90deg,#36d1dc,#5b86e5);
  color:white;
  padding:20px;
  text-align:center;
  font-size:24px;
}
.grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  padding:30px;
}
.card {
  padding:30px;
  border-radius:12px;
  color:white;
  font-size:20px;
  text-align:center;
  box-shadow:0 0 10px gray;
}
.c1 { background:#ff6b6b }
.c2 { background:#feca57 }
.c3 { background:#1dd1a1 }
a { color:white; text-decoration:none; }
</style>
</head>

<body>
<div class="header">🎓 StudentHub Dashboard</div>

<div class="grid">
<div class="card c1"><a href="/add">Add Student</a></div>
<div class="card c2"><a href="/students">View Students</a></div>
<div class="card c3"><a href="/">Logout</a></div>
</div>

</body>
</html>
`);
});

/* ---------------- ADD STUDENT ---------------- */

app.get('/add',(req,res)=>{
res.send(`
<html><body style="font-family:Arial;background:#a18cd1">
<div style="background:white;width:420px;margin:60px auto;padding:25px;border-radius:12px">
<h2>Add Student Record</h2>
<form method="POST" action="/add-student">
<input name="name" placeholder="Name" required>
<input name="email" placeholder="Email" required>
<input name="marks" placeholder="Marks %" required>
<input name="attendance" placeholder="Attendance %" required>
<button>Add</button>
</form>
</div>
</body></html>
`);
});

app.post('/add-student',(req,res)=>{
students.push({
 id: nextId++,
 ...req.body
});
res.redirect('/students');
});

/* ---------------- STUDENT LIST ---------------- */

app.get('/students',(req,res)=>{

let rows = students.map(s=>`
<tr>
<td>${s.name}</td>
<td>${s.email}</td>
<td>${s.marks}</td>
<td>${s.attendance}</td>
<td><a href="/delete/${s.id}"></a></td>
</tr>
`).join("");

res.send(`
<html>
<body style="font-family:Arial;background:#fbc2eb">
<div style="background:white;margin:40px;padding:25px;border-radius:12px">
<h2>Student Records</h2>
<a href="/dashboard">⬅ Dashboard</a>
<table border="1" cellpadding="10">
<tr style="background:#667eea;color:white">
<th>Name</th><th>Email</th><th>Marks</th><th>Attendance</th><th>Delete</th>
</tr>
${rows}
</table>
</div>
</body>
</html>
`);
});

/* ---------------- DELETE ---------------- */

app.get('/delete/:id',(req,res)=>{
students = students.filter(s=>s.id != req.params.id);
res.redirect('/students');
});

/* ---------------- START ---------------- */

app.listen(port,()=>{
console.log("StudentHub Dashboard running → http://localhost:8000");
});