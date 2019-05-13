document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    alert('elo')
    addImageInputListener()
    addBDarkImageBackgroundLister()
    addSubmitListener()
}

const addImageInputListener = () => {
    let imageAddresInput = document.querySelector('#imageAddress')
    let imagePreview = document.querySelector('#imagePreview')
    imageAddresInput.addEventListener('input', () => {
        imagePreview.src = imageAddresInput.value
    })
}

const addBDarkImageBackgroundLister = () => {
    let isdark = document.querySelector('#isdark')
    let imagePreview = document.querySelector('#imagePreview')
    isdark.addEventListener('change', () => {
        if (isdark.checked) {
            imagePreview.style.background = '#646464'
        } else {
            imagePreview.style.background = 'none'
        }
    })
}

const getSelectValues = (select) => {
    let result = []
    let options = select && select.options
    let opt
    for (let i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i]
        if (opt.selected) {
            result.push(opt.value)
        }
    }
    return result
}

const addSubmitListener = () => {
    let form = document.querySelector('#submitNew')
    form.addEventListener('submit', e => {
        e.preventDefault()
        if (valid()) {
            let body = {}
            body.name = document.querySelector('#name').value
            body.pageUrl = document.querySelector('#page').value
            body.logoUrl = document.querySelector('#imageAddress').value
            body.isDark = document.querySelector('#isdark').checked
            body.cities = getSelectValues(document.querySelector('#cities'))
            body.diets = []

            document.querySelectorAll('.dietTable').forEach(table => {
                let diet = { type: table.id, caloriesPrice: [] }
                table.querySelectorAll('.caloriesPrice').forEach(caloriesPrice => {
                    let calories = caloriesPrice.querySelector('.calories').value
                    let price = caloriesPrice.querySelector('.price').value
                    if (calories !== '' && price !== '') {
                        diet.caloriesPrice.push({
                            calories,
                            price
                        })
                    }
                })
                body.diets.push(diet)
            })

            let xhr = new XMLHttpRequest()
            xhr.open('GET', '/catering/new', true)
            xhr.setRequestHeader("Content-Type", "application/json")
            console.log(body)
            xhr.send(JSON.stringify(body))
        }


    })
}

const valid = () => {
    return true
    let nameInput = document.querySelector('#name')
    let pageInput = document.querySelector('#page')
    let imageAddress = document.querySelector('#imageAddress')

    if (nameInput.value.trim() === '' || pageInput.value.trim() === '' || imageAddress.value.trim() === '') {
        alert('Name, page, or image address empty.')
        return false
    }
    return true
}