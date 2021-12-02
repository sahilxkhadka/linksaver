let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const fromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (fromLocalStorage) {
   myLeads = fromLocalStorage
   render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
}) 
  
function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        //ulEl.innerHTML += "<li>" + "<i>" + myLeads[i] + "</i>"  + "</li>"
        //1.create element
        //set the text inside
        //append to ul
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
        listItems += `
        <li>
            <a target = '_blank' href = '${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}   
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value= ""
    console.log(localStorage.getItem("myLeads"))
})


   

