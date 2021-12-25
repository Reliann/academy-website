//get, post, put, delete requests
const API_URL = ""
const getAllStudents = async ()=> {
    
    const resp = await fetch(`${API_URL}/students`)
    if (resp.ok === true){
        let students = await resp.json()
        console.log(students);
        return students
    }
    else{
        console.log("error fetching students")
        return false
    }
}

const getStudentById = async (id) =>{
    const resp = await fetch(`${API_URL}/students/${id}`)
    if (resp.ok === true){
        let student  = await resp.json()
        return student
    }
    else{
        console.log("error fetching student")
        return false
    }
}
const getStudentGrades = async (id)=>{
    const resp = await fetch(`${API_URL}/students/${id}/grades`)
    if (resp.ok === true){
        let grades  = await resp.json()
        console.log(grades);
        return grades
    }
    else{
        console.log("error fetching grades")
        return false
    }
}
const postStudentGrade = async (id,grade)=>{
    const resp = await fetch(`${API_URL}/students/${id}/grades`,{
        body: JSON.stringify(grade),
        method: 'post',
        headers: { "Content-type": "application/json" }
    })
    if (resp.ok===true){
        let new_grade = await resp.json()
        console.log(new_grade);
        return new_grade
    }else{
        console.log("error posting grade");
        return false
    }
}
const postStudent = async (new_student)=>{
    const resp =await fetch(`${API_URL}/students`,{
        body: JSON.stringify(new_student),
        method: 'post',
        headers: { "Content-type": "application/json" }
    })
    if(resp.ok === true){
        let answer = await resp.json()
        console.log(answer);
        return answer
    }
    else{
        console.log("error posting new student");
        return false
    }
}

const putGradeToStudent = async (s_id,g_id,grade)=>{
    const resp =await fetch(`${API_URL}/students/${s_id}/grades/${g_id}`,{
        body: JSON.stringify(grade),
        method: 'put',
        headers: { "Content-type": "application/json" }
    })
    if(resp.ok === true){
        let answer = await resp.json()
        console.log(answer);
        return answer
    }
    else{
        console.log("error puting new grade");
        return false
    }
}

const putStudent = async(id, student)=>{
    const resp =await fetch(`${API_URL}/students/${id}`,{
        body: JSON.stringify(student),
        method: 'put',
        headers: { "Content-type": "application/json" }
    })
    if(resp.ok === true){
        let answer = await resp.json()
        console.log(answer);
        return answer
    }
    else{
        console.log("error posting new student");
        return false
    }
}
const deleteStudent = async(id)=>{
    const resp = await fetch(`${API_URL}/students/${id}`,{
        method: 'delete'
    })
    if(resp.ok === true){
        let answer = await resp.json()
        console.log(answer);
        return true
    }
    else{
        console.log("error deleting student")
        return false
    }
}

const deleteStudentGrade = async(id,grade_id)=>{
    const resp = await fetch(`${API_URL}/students/${id}/grades/${grade_id}`,{
        method: 'delete'
    })
    if(resp.ok === true){
        let answer = await resp.json()
        console.log(answer);
        return true
    }
    else{
        console.log("error deleting student")
        return false
    }
}

const patchHonor=async (id,honor_bool)=>{
    const resp = await fetch(`${API_URL}/students/${id}`,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify({honor:honor_bool}),
        headers: { "Content-type": "application/json" }
        
    })
    if(resp.ok===true){
        let student = await resp.json()
        return student
    }else{
        console.log("error patching honor")
        return false
    }
}

const getAllFaculties = async ()=>{
    const resp = await fetch(`${API_URL}/faculties`)
    if (resp.ok==true){
        let faculties = await resp.json()
        return faculties
    }
    else{
        console.log("error fetching faculties");
        return false
    }
}

const postUser=async (username,password)=>{
    const resp = await fetch(`${API_URL}/user`,{
        method:'post',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({username:username,password:password})
        })
    if (resp.ok == true){
        let user = await resp.json()
        console.log(user);
        return user
    }else{
        console.log("error signup");
        return false
    }
}
const authUser=async (username,password)=>{
    const resp = await fetch(`${API_URL}/user/${username}/${password}`,{
        method:'post',
        headers: { "Content-type": "application/json" }
        })
    if (resp.ok == true){
        let user = await resp.json()
        console.log(user);
        return user
    }else{
        console.log("error signup");
        return false
    }
}


const redirectHome = ()=>{
    location.href = 'homepage.html'
}
const redirectToGrades=()=>{
    location.href = 'studentGrades.html'
}
const redirectToUpdate=()=>{
    location.href = 'updateStudent.html'
}
const redirectToAddStudent=()=>{
    location.href = 'addStudent.html'
}
const redirectToStudentProfile=()=>{
    location.href = 'studentProfile.html'
}
const redirectLogin = ()=>{
    sessionStorage.setItem('username',"")
    location.href = 'login.html'
}


const createElementsByRecipe = (recipe)=>{
    //creates elements by array of objects
    let elements = []
    recipe.forEach(element => {
        elements.push(createElementByObject(element))
    });
    
    return elements
}
const createElementByObject = (obj)=>{
    // create element by object 
    let el = document.createElement(obj.tagName)
    for (key in obj){
        if(key != "tagName" && key != "appended"){
            el[key] = obj[key]
        }
        if (key == "appended"){
            let elements = createElementsByRecipe(obj[key])
            elements.forEach(element => {
                el.append(element)
            });
        }
        if (key == "dataset"){
            for (k in obj[key]){
                el.dataset[k] = obj[key][k]
            }
        }
    }
    return el
}

const appendChildren = (node, children)=>{
    children.forEach(child => {
        node.appendChild(child)
    });
}

const goToStudentProfile = ()=>{
    s_id= document.getElementById("profileSearch").value
    sessionStorage.setItem("student",s_id)
    redirectToStudentProfile()
    
}
const initpage = ()=>{
    const username = sessionStorage.getItem('username')
    if(!username){
        location.href = 'login.html'
    }else{
        document.getElementById('navUsername').innerText = `signed as ${username}`
    }
}