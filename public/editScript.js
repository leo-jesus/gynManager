const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("deseja Deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})