const t1 = document.querySelectorAll('.itm')
const d1 = document.querySelectorAll('.dte')
const s1 = document.querySelectorAll('.stat')
const c1 = document.querySelectorAll('.fa-circle-notch'||'.fa-check-circle')
let taskArr = Array.from(t1)
let dateArr = Array.from(d1)
let statArr = Array.from(s1)
let circleArr = Array.from(c1)

console.log('task ',taskArr,' date ',dateArr,' status ',statArr)

const delTask = document.querySelectorAll('.fa-trash')
//const compTask = document.querySelectorAll('.fa-circle-notch')

Array.from(delTask).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

circleArr.forEach((element)=>{
    element.addEventListener('click', taskStatus) 
})

/// totals///
let remaining = statArr.map(e=>e.innerText==false).length
document.querySelector('.tot').innerText = remaining
////////

statArr.forEach((element)=> {
    
    if(element.innerText=='false'){
        element.parentNode.firstElementChild.className='fa fa-circle-notch'
        element.parentNode.getElementsByClassName('itm')[0].id='off'
    }else {
        if(element.innerText=='true') {
            element.parentNode.firstElementChild.className='fa fa-check-circle'
            element.parentNode.getElementsByClassName('itm')[0].id='on'
        }
    }
})

////post////
    // being done in the form action no method needed. 


///get////
        //get request are happening on page reload and set to fire after each post, put and delete


////put////
 async function taskStatus (){
       const taskId1 = this.parentNode.childNodes[3].innerText
       const iStatus1 = (this.parentNode.childNodes[9].innerText=='true')?false:true         
        
        try{
            const response = await fetch('/taskStatus', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({  
                'TaskID': taskId1,
                'IStatus': iStatus1
                
              })            
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }

}
   
////delete////
async function deleteTask(){
    const taskDel1 = this.parentNode.childNodes[3].innerText //this represents the span where the delete button is. Then it goes up to the parent of the span the <li>. Then goes to the child node of the <li>. Finally stores its text in taskDel.
    console.log(this.parentNode.childNodes)
      
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
           // this is the body that will be sent to server.js if not hard coded
            body: JSON.stringify({  
              'TaskDel': taskDel1
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload() // reloads page triggering a new get request

    }catch(err){
        console.log(err)
    }
}

