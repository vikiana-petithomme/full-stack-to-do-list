
document.querySelector('.hide').addEventListener('click', createNewItem)

function createNewItem(){
    document.querySelector('.create').classList.toggle('hidden')
}


Array.from(document.querySelectorAll('input[type=checkbox')).forEach(box => {
    console.log(box)
    box.addEventListener("click", (e) => {
        const toggleStrike = e.target.parentNode.querySelector('.actualText')

        console.log(toggleStrike)
        
        toggleStrike.classList.toggle('strikethrough')

      });
 })

document.querySelector('#clearCompleted').addEventListener('click', clearCompleted)
document.querySelector('#clearAll').addEventListener('click', clearAll)

function clearCompleted(e){
    console.log(document.querySelectorAll('.strikethrough'))
    document.querySelectorAll('.strikethrough').forEach(task => {
        console.log(task)
        let deleteTask =  task.parentElement.innerText

        console.log(deleteTask)

        fetch('trash', {
            method: 'delete',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            task: deleteTask,
            })
        }).then(function (response) {
            window.location.reload()
        })
    })

}

function clearAll(){

    Array.from(document.querySelectorAll('.listItem')).forEach(task => {
        let deleteTask =  document.querySelectorAll('.actualText').innerText

        fetch('trash', {
            method: 'delete',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            task: deleteTask,
            })
        }).then(function (response) {
            window.location.reload()
        })
    })
    
}